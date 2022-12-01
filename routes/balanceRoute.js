const { response } = require("express")
const express = require("express")
const {
    getBalance,
 
} = require('../controllers/balanceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', getBalance)


module.exports = router