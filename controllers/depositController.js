const Deposit = require('../models/depositModel')
const mongoose = require('mongoose')


// get all workouts
const getDeposits = async(req, res) => {
    const user_id = req.user._id


    const deposits = await Deposit.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(deposits)
}


// get single workout
const getDeposit = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such deposit'})
    }

    const deposit = await Deposit.findById(id)
    
    if (!deposit) {
        return res.status(404).json({error: 'No such deposit'})
    }
    res.status(200).json(deposit)

}

// create new workout
const createDeposit = async (req, res) => {
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
    const deposit = await Deposit.create({type, amount, user_id})
    res.status(200).json(deposit)
} catch(error) { 
    res.status(400).json({error: error.message})
}
}

// delete a workout
 const deleteDeposit = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such deposit'})
    }

    const deposit = await Deposit.findOneAndDelete({_id: id})

        
    if (!deposit) {
        return res.status(404).json({error: 'No such deposit'})
    }

    res.status(200).json(deposit)
 }



// update a workout

const updateDeposit = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such deposit'})
    }

    const deposit = await Deposit.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!deposit) {
        return res.status(404).json({error: 'No such deposit'})
    }

    res.status(200).json(deposit)

}


module.exports = {
    getDeposits,
    getDeposit,
    createDeposit,
    deleteDeposit,
    updateDeposit
}