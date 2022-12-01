const Withdrawal = require('../models/withdrawalModel')
const mongoose = require('mongoose')


// get all workouts
const getWithdrawals = async(req, res) => {
    const user_id = req.user._id


    const withdrawals = await Withdrawal.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(withdrawals)
}


// get single workout
const getWithdrawal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such withdrawal'})
    }

    const withdrawal = await Withdrawal.findById(id)
    
    if (!withdrawal) {
        return res.status(404).json({error: 'No such withdrawal'})
    }
    res.status(200).json(withdrawal)

}

// create new workout
const createWithdrawal = async (req, res) => {
const {type, amount} = req.body

let emptyFields = []

if(!type) {
    emptyFields.push("type")
}
if(!amount) {
    emptyFields.push("amount")
    
  }

  if (emptyFields.length > 0) {
    return  res.status(400).json({error: "Please fill in all fields!", emptyFields})
  }


// add doc to db
try { 
    const user_id = req.user._id
    const withdrawal = await Withdrawal.create({type, amount, user_id})
    res.status(200).json(withdrawal)
} catch(error) { 
    res.status(400).json({error: error.message})
}
}

// delete a workout
 const deleteWithdrawal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such withdrawal'})
    }

    const withdrawal = await Withdrawal.findOneAndDelete({_id: id})

        
    if (!withdrawal) {
        return res.status(404).json({error: 'No such withdrawal'})
    }

    res.status(200).json(withdrawal)
 }



// update a workout

const updateWithdrawal = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such withdrawal'})
    }

    const withdrawal = await Withdrawal.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!withdrawal) {
        return res.status(404).json({error: 'No such withdrawal'})
    }

    res.status(200).json(withdrawal)

}


module.exports = {
    getWithdrawals,
    getWithdrawal,
    createWithdrawal,
    deleteWithdrawal,
    updateWithdrawal
}