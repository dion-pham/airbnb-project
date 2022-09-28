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


//delete a spot image
router.delete(
    '/:imageId',
    requireAuth,

    async (req, res, next) => {
        const targetImage = await SpotImage.findByPk(req.params.imageId, {
            include: { model: Spot }
        })


        if (!targetImage) {
            res.statusCode = 404
            return res.json({
                "message": "Spot Image couldn't be found",
                "statusCode": 404
            })
        }

        if (req.user.id !== targetImage.Spot.ownerId) {
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
