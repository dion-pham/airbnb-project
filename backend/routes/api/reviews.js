const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Sequelize, SpotImage, User, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const spot = require('../../db/models/spot');

const router = express.Router();

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
