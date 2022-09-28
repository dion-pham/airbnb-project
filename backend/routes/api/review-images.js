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


//delete a review image
router.delete(
    '/:imageId',
    requireAuth,

    async (req, res, next) => {
        const targetImage = await ReviewImage.findByPk(req.params.imageId, {
            include: { model: Review }
        })

        console.log(targetImage)

        if (!targetImage) {
            res.statusCode = 404
            return res.json({
                "message": "Review Image couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetImage.Review.userId) {
            res.statusCode = 404
            return res.json("This spot does not belong to the current user")
        }

        await targetImage.destroy()

        return res.json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    }
);


module.exports = router;
