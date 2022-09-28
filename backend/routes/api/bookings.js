const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');

const router = express.Router();

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
        // console.log(userBookings[0].Spot.id)

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
        }
        res.json({
            Bookings: userBookings
        })
    }
);



module.exports = router;
