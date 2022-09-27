const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');

const router = express.Router();

router.get(
    '/',
    async (req, res, next) => {
        const allSpots = await Spot.findAll({
            include: [],

        })

        let resBody = []
        for (let i = 0; i < allSpots.length; i++) {
            let currentSpot = allSpots[i]
            const avgRating = await Review.findAll({
                where: { spotId: currentSpot.id },
                attributes:
                    [
                        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
                    ]
                ,
                raw: true
            })

            const previewImage = await SpotImage.findAll({
                where: {
                    spotId: currentSpot.id
                },
                attributes: ['url'],
                raw: true
            })

            console.log(previewImage[0])
            let { id, ownerId, address, city, state, country, lat, lng, name, description, price } = currentSpot
            resBody.push({
                id, ownerId, address, city, state, country, lat, lng, name, description, price,
                avgRating: avgRating[0].avgRating,
                previewImage: previewImage[0].url

            })
        }


        res.json({
            Spots: resBody
            // previewImage:
        }
        )
        // res.json(allSpotsReviews)
    }
);

module.exports = router;
