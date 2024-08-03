const express = require('express');
const router = express.Router();
const {Multer} = require('../../middleware/Multer');
const googleViewers = require('../viewers/google/google.viewer');

router.get('/auth/google', googleViewers.GetGoogleAuthUrl);
router.get('/google/redirect', googleViewers.GetGoogleCallBackUrl);

module.exports = router;
