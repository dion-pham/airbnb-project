const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { Op, Model } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');

const router = express.Router();

// const validateReviewCreate = [
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .isBefore()
//         .withMessage('endDate cannot come before startDate'),
//     handleValidationErrors]


//delete a booking
router.delete(
    '/:bookingId',
    requireAuth,

    async (req, res, next) => {
        const targetBooking = await Booking.findByPk(req.params.bookingId, {
            include: { model: Spot }
        })

        if (!targetBooking) {
            res.statusCode = 404
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
            })
        }

        const targetSpot = await Spot.findByPk(targetBooking.spotId)

        const existingBookingsStart = new Date(targetBooking.startDate).getTime()
        const currentDate = new Date().getTime()
        if (currentDate >= existingBookingsStart) {
            res.statusCode = 403
            res.json({
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            })
        }

        if ((req.user.id === targetBooking.userId) || (req.user.id === targetSpot.ownerId)) {
            await targetBooking.destroy()
            res.json(
                {
                    "message": "Successfully deleted",
                    "statusCode": 200
                }
            )
        } else {
            res.statusCode = 404
            res.json("This spot does not belong to the current user")
        }


    }
);


// Edit a Booking
router.put(
    '/:bookingId',
    requireAuth,

    async (req, res, next) => {
        const targetBooking = await Booking.findByPk(req.params.bookingId)

        //add validation for errors.

        if (!targetBooking) {
            res.statusCode = 404
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetBooking.userId) {
            res.statusCode = 404
            res.json("Booking has to belong to the owner")
        }


        const { startDate, endDate } = req.body
        let newStartDate = new Date(startDate).getTime()
        let newEndDate = new Date(endDate).getTime()

        let existingBookingsStart = new Date(targetBooking.startDate).getTime()
        let existingBookingsEnd = new Date(targetBooking.endDate).getTime()

        if (newEndDate < newStartDate) {
            res.statusCode = 400
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            })
        }

        const currentDate = new Date().getTime()
        if (currentDate > existingBookingsEnd) {
            res.statusCode = 403
            res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            })
        }

        if ((newStartDate <= existingBookingsStart && newEndDate >= existingBookingsEnd) || (newStartDate >= existingBookingsStart && newEndDate <= existingBookingsEnd)) {
            res.statusCode = 403
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }

        await targetBooking.update({
            startDate,
            endDate
        })
        res.json(
            targetBooking
        )
    }
);


// Get all of the Current User's Bookings
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {

        const userBookings = await Booking.findAll({
            where: { userId: req.user.id },
            include: {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                raw: true
            }
        })

        for (const individualBooking of userBookings) {
            // alternate: findAll
            const previewImages = await SpotImage.findOne({
                where: {
                    spotId: individualBooking.Spot.id
                },
                attributes: ['url'],
                raw: true
            })
            individualBooking.Spot.dataValues.previewImage = previewImages.url
            //   individualBooking.Spot.dataValues.previewImage = previewImages[0].url if findAll
        }
        res.json({
            Bookings: userBookings
        })
    }
);



module.exports = router;
