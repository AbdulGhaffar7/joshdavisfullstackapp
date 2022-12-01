const { response } = require("express")
const express = require("express")
const {
    getWithdrawals,
    getWithdrawal,
    createWithdrawal,
    updateWithdrawal,
    deleteWithdrawal,
} = require('../controllers/withdrawalController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// require auth for all bank routes
router.use(requireAuth)

// gets all workouts
router.get('/', getWithdrawals)

// gets single workout

router.get('/:id', getWithdrawal)

// post new workout
router.post('/', createWithdrawal)

// delete new workout
router.delete('/:id', deleteWithdrawal)
// update new workout
router.patch('/:id', updateWithdrawal)


module.exports = router