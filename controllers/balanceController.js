const Balance = require('../models/balanceModel')
const mongoose = require('mongoose')



// get single workout
const getBalance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such deposit'})
    }

    const deposit = await Balance.findById(id)
    
    if (!deposit) {
        return res.status(404).json({error: 'No such deposit'})
    }
    res.status(200).json(deposit)

}
// add doc to db
try { 
    const user_id = req.user._id
    const deposit = await Balance.create({amount, user_id})
    res.status(200).json(amount)
} catch(error) { 
    res.status(400).json({error: error.message})
}



// update a workout




module.exports = {

    getBalance,
   
}