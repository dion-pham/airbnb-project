const router = require('express').Router();

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get('/', (req, res) => {
    res.send("hello")
})

module.exports = router;
