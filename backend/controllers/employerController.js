const asyncHandler = require('express-async-handler')
const Employer = require('../models/employerModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//To Register a Employer
const registerEmployer = asyncHandler(async(req, res) => {
    const {first_name, last_name, phone, email, password} = req.body

    if(!first_name || !last_name || !phone || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields!")
    }

    const employerExists = await Employer.findOne({email})
    if(employerExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const employer = await Employer.create({
        first_name, 
        last_name, 
        phone, 
        email, 
        password: hashedPassword
    })

    if(!employer){
        res.status(400)
        throw new Error("Account not registered")
    }

    res.status(201).json({
        _id: employer.id,
        first_name: employer.first_name,
        last_name: employer.last_name,
        phone: employer.phone,
        email: employer.email,
        token: await generateToken(employer.id)
    })
    
    res.status(201).json({message: "You are registered"})
})

//To login a Employer
const loginEmployer = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const employer = await Employer.findOne({email})

    if(employer && await bcrypt.compare(password, employer.password)){
        res.status(200).json({
            _id: employer.id,
            first_name: employer.first_name,
            last_name: employer.last_name,
            phone: employer.phone,
            email: employer.email,
            token: await generateToken(employer.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})

const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerEmployer, loginEmployer};