const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User } = require('../../db/models');
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

//create a review for a spot based on the spot's id
router.post(
    '/:spotId/reviews',
    requireAuth,

    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId)

        if (!targetSpot) {
            res.statusCode = 404
            return res.json({
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
            return res.json({
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

// Get details of a Spot from an id
router.get(
    '/:spotId',
    async (req, res, next) => {
        const targetSpot = await Spot.findByPk(req.params.spotId, {
            include: [{
                model: SpotImage
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


// Get all Spots owned by the Current User
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {

        let resBody = {}
        resBody.Spots = await Spot.findAll({
            include: [],
            where: { ownerId: req.user.id },
            raw: true
        })

        for (let i = 0; i < resBody.Spots.length; i++) {
            let currentSpot = resBody.Spots[i]
            const avgRating = await Review.findAll({
                where: { spotId: currentSpot.id },
                attributes:
                    [
                        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
                    ]
                ,
                raw: true
            })

            currentSpot.avgRating = avgRating[0].avgRating
            const previewImages = await SpotImage.findAll({
                where: {
                    spotId: currentSpot.id,
                },
                attributes: ['url', 'preview'],
                raw: true
            })

            const newArr = []
            for (let i = 0; i < previewImages.length; i++) {
                if (previewImages[i].preview) {
                    newArr.push(previewImages[i].url)
                    // currentSpot.previewImage = previewImages[i].url
                }
                newArr.length ? currentSpot.previewImage = newArr : null
            }
        }
        res.json(
            resBody
        )

    }
);

// Get all Spots
router.get(
    '/',
    async (req, res, next) => {

        let resBody = {}
        resBody.Spots = await Spot.findAll({
            include: [],
            raw: true
        })

        for (let i = 0; i < resBody.Spots.length; i++) {
            let currentSpot = resBody.Spots[i]
            const avgRating = await Review.findAll({
                where: { spotId: currentSpot.id },
                attributes:
                    [
                        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
                    ]
                ,
                raw: true
            })

            currentSpot.avgRating = avgRating[0].avgRating
            const previewImages = await SpotImage.findAll({
                where: {
                    spotId: currentSpot.id,
                },
                attributes: ['url', 'preview'],
                raw: true
            })

            const newArr = []
            for (let i = 0; i < previewImages.length; i++) {
                if (previewImages[i].preview) {
                    newArr.push(previewImages[i].url)
                    // currentSpot.previewImage = previewImages[i].url
                }
                newArr.length ? currentSpot.previewImage = newArr : null
            }
        }
        res.json(
            resBody
        )
    }
);

module.exports = router;
