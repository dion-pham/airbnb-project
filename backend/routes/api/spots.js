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
