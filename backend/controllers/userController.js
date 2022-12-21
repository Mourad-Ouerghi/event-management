const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password}= req.body

    //making sure that all fields are filled
    if(!name || !password || !email)
    {
        res.status(400)
        throw new Error('please add all fields')
    }
    //checking if user exists
    const userExists = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roles: ["visitor"],
    })

    if(user){
        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                //token: generateToken(user.id)
            }
        )
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({message: 'Register user'})
})

//@desc Authnticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password}= req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

    //res.json({message: 'Login user'})
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req,res)=>{
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generate JWT
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}