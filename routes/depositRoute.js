const { response } = require("express")
const express = require("express")
const {
    getDeposits,
    getDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit,
} = require('../controllers/depositController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// require auth for all bank routes
router.use(requireAuth)

// gets all workouts
router.get('/', getDeposits)

// gets single workout

router.get('/:id', getDeposit)

// post new workout
router.post('/', createDeposit)

// delete new workout
router.delete('/:id', deleteDeposit)
// update new workout
router.patch('/:id', updateDeposit)


module.exports = router