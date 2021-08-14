const express = require("express");

const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(require("./categories.route"));
router.use(require("./products.route"));

module.exports = router;