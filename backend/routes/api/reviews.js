const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');

const router = express.Router();

// Get all Reviews of the Current User
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {

        const _reviews = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url'],
                }
            ],
            where: { userId: req.user.id },
        })

        for (const individualReview of _reviews) {
            // alternate: findAll
            const previewImages = await SpotImage.findOne({
                where: {
                    preview: true,
                    spotId: individualReview.Spot.dataValues.id
                },
                attributes: ['url'],
                raw: true
            })

            //alternate: allows for an array of image url's with key previewImage
            // const newArr = []
            // for (let i = 0; i < previewImages.length; i++) {
            //     {
            //         newArr.push(previewImages[i].url)
            //     }
            //     newArr.length ? individualReview.Spot.dataValues.previewImage = newArr : null
            // }
            individualReview.Spot.dataValues.previewImage = previewImages.url
        }

        res.json({
            Reviews: _reviews
        })
    }

);



// Add an Image to a Review based on the Review's id
router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res, next) => {
        const targetReview = await Review.findByPk(req.params.reviewId)

        if (!targetReview) {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        } else if (req.user.id !== targetReview.userId) {
            res.statusCode = 403
            res.json("This review does not belong to the current user")
        }

        const targetImages = await ReviewImage.findAll({
            where: {
                reviewId: targetReview.id
            }
        })

        if (targetImages.length > 10) {
            res.statusCode = 403
            return res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
        }

        const { url } = req.body
        const newImage = await ReviewImage.create({
            reviewId: targetReview.id,
            url,

        })

        const response = await ReviewImage.scope('removeReviewId').findByPk(newImage.id);
        res.json(
            response
        )
    }
);


module.exports = router;
