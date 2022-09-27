const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');

const router = express.Router();

// Get all Spots owned by the Current User
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
        const response = await SpotImage.findByPk(newImage.spotId);
        res.json(
            response
        )
    }
);


router.get(
    '/',
    async (req, res, next) => {

        let resBody = {}
        resBody.Spots = await Spot.findAll({
            include: [],
            raw: true
        })
        console.log(resBody.Spots)

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

            const previewImage = await SpotImage.findAll({
                where: {
                    spotId: currentSpot.id
                },
                attributes: ['url'],
                raw: true
            })

            currentSpot.previewImage = previewImage[0].url

            // console.log(previewImage[0])
            // let { id, ownerId, address, city, state, country, lat, lng, name, description, price } = currentSpot
            // resBody.push({
            //     id, ownerId, address, city, state, country, lat, lng, name, description, price,
            //     avgRating: avgRating[0].avgRating,
            //     previewImage: previewImage[0].url

            // })
        }
        res.json(
            resBody
        )
    }
);

module.exports = router;
