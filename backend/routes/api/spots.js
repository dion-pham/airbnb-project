const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');

const router = express.Router();

//create a spot
router.post(
    '/',
    requireAuth,
    // validateSignup,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newUser = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.json(
            newUser
        )
    }
);


// Create a Booking from a Spot based on the Spot's id
router.post(
    '/:spotId/bookings',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id === targetSpot.userId) {
            res.statusCode = 404
            res.json("Spot must NOT belong to the current user")
        }

        let { startDate, endDate } = req.body

        let newStartDate = new Date(startDate).getTime()
        let newEndDate = new Date(endDate).getTime()

        const currentBookings = await Booking.findAll({
            where: {
                spotId: targetSpot.id
            }
        })

        for (let i = 0; i < currentBookings.length; i++) {
            let individualBooking = currentBookings[i]
            let existingBookingsStart = new Date(individualBooking.startDate).getTime()
            let existingBookingsEnd = new Date(individualBooking.endDate).getTime()
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
        }

        //add error that endDate cannot be on or before startDate

        const newBooking = await Booking.create({
            spotId: targetSpot.id,
            userId: req.user.id,
            startDate,
            endDate
        })

        res.json(
            newBooking
        )
    }
);


//create a review for a spot based on the spot's id
router.post(
    '/:spotId/reviews',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        const targetReview = await Review.findAll({
            where: {
                userId: req.user.id,
                spotId: targetSpot.id
            }
        })

        console.log('this is targetReview', targetReview)
        if (targetReview.length > 0) {
            res.statusCode = 403
            res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        }
        const { review, stars } = req.body
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: targetSpot.id,
            review,
            stars
        })

        res.json(
            newReview
        )
    }
);

//delete a spot
router.delete(
    '/:spotId',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetSpot.ownerId) {
            res.statusCode = 404
            res.json("This spot does not belong to the current user")
        }

        await targetSpot.destroy()
        res.json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    }
);

// Edit a Spot
router.put(
    '/:spotId',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)


        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetSpot.ownerId) {
            res.statusCode = 404
            res.json("This spot does not belong to the current user")
        }
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        await targetSpot.update({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.json(
            targetSpot
        )
    }
);


// Add an Image to a Spot based on the Spot's id
router.post(
    '/:spotId/images',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        } else if (req.user.id !== targetSpot.ownerId) {
            res.statusCode = 403
            res.json("This spot does not belong to the current user")
        }
        const { url, preview } = req.body
        const newImage = await SpotImage.create({
            spotId: targetSpot.id,
            url,
            preview,
        })

        const response = await SpotImage.findByPk(newImage.id);
        res.json(
            response
        )
    }
);

// Get all Spots owned by the Current User
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {

        // let resBody = {}
        const Spots = await Spot.findAll({
            include: [],
            where: { ownerId: req.user.id },
            raw: true
        })

        for (let i = 0; i < Spots.length; i++) {
            let currentSpot = Spots[i]
            const avgRating = await Review.findAll({
                where: { spotId: currentSpot.id },
                attributes:
                    [
                        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
                    ]
                ,
                raw: true
            })

            if (avgRating[0].avgRating === null) {
                currentSpot.avgRating = "There are no reviews"
            } else if (avgRating) {
                currentSpot.avgRating = Number(parseFloat(avgRating[0].avgRating).toFixed(1))
            }
            //findAll is the alternative multiple previewImage urls
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: currentSpot.id
                },
                attributes: ['url', 'preview'],
                raw: true
            })
            currentSpot.previewImage = previewImage.url
            //alternative for multiple spots. an array of preview image urls
            // const newArr = []
            // for (let i = 0; i < previewImages.length; i++) {
            //     if (previewImages[i].preview) {
            //         newArr.push(previewImages[i].url)
            //         // currentSpot.previewImage = previewImages[i].url
            //     }
            //     newArr.length ? currentSpot.previewImage = newArr : null
            // }
        }
        res.json({
            Spots
        }
        )
    }
);



// Get all Reviews by a Spot's id
router.get(
    '/:spotId/reviews',
    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        }

        const targetReview = await Review.findAll({
            where: {
                spotId: targetSpot.id
            },
            include: [{
                model: ReviewImage,
                attributes: ['id', 'url']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }]
        })
        res.json({
            Reviews: targetReview
        })
    }
);

// Get all Bookings for a Spot based on the Spot's id . currentprob
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {

        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetSpot.ownerId) {
            const nonownerBookings = await Booking.findAll({
                where: {
                    spotId: targetSpot.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            })
            return res.json({
                Bookings: nonownerBookings
            }
            )
        }

        if (req.user.id === targetSpot.ownerId) {
            const ownerBookings = await Booking.findAll({
                where: {
                    spotId: targetSpot.id
                },
                include: { model: User }
            })
            return res.json({
                Bookings: ownerBookings
            }
            )
        }
    }
);

// Get details of a Spot from an id
router.get(
    '/:spotId',
    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId, {
            include: [{
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
            ]
        })

        if (!targetSpot) {
            res.statusCode = 404
            res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        }

        const targetReviews = await Review.findAll({
            where: { spotId: targetSpot.id },
            attributes: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('id')),
                    'numReviews'
                ],
                [
                    Sequelize.fn('AVG', Sequelize.col('stars')),
                    'avgStarRating'
                ]
            ],
            raw: true,
        })

        const targetSpotJSON = targetSpot.toJSON()

        targetSpotJSON.numReviews = targetReviews[0].numReviews
        targetSpotJSON.avgStarRating = targetReviews[0].avgStarRating

        res.json(
            targetSpotJSON
        )
    }

);

// Get all Spots
router.get(
    '/',
    async (req, res, next) => {

        let { page, size } = req.query
        page = parseInt(page)
        size = parseInt(size)

        if (!Number.isInteger(page) || page > 10 || page < 1) {
            page = 1
        }
        if (!Number.isInteger(size) || size > 20 || size < 1) {
            size = 20
        }

        // let resBody = {}
        // resBody.Spots
        const Spots = await Spot.findAll({
            include: [],
            raw: true
        })

        for (let i = 0; i < Spots.length; i++) {
            let currentSpot = Spots[i]
            const avgRating = await Review.findAll({
                where: { spotId: currentSpot.id },
                attributes:
                    [
                        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
                    ]
                ,
                raw: true
            })


            if (avgRating[0].avgRating === null) {
                currentSpot.avgRating = "There are no reviews"
            } else if (avgRating) {
                currentSpot.avgRating = Number(parseFloat(avgRating[0].avgRating).toFixed(1))
            }
            //findAll is the alternative multiple previewImage urls
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: currentSpot.id,
                },
                attributes: ['url', 'preview'],
                raw: true
            })
            currentSpot.previewImage = previewImage.url
            //alternative for multiple spots. an array of preview image urls
            // const newArr = []
            // for (let i = 0; i < previewImages.length; i++) {
            //     if (previewImages[i].preview) {
            //         newArr.push(previewImages[i].url)
            //         // currentSpot.previewImage = previewImages[i].url
            //     }
            //     newArr.length ? currentSpot.previewImage = newArr : null
            // }
        }

        // const spotsKey = resBody.Spots
        res.json({
            Spots,
            page,
            size
        })
    }
);

module.exports = router;
