const express = require('express')
const userModel = require('../models/User')
const errorHandler = require('./../middleware/errorHandler')
const successHandler = require('./../middleware/successHandler')
const authFunction = require('./../middleware/auth')
const { UserCreatedSuccess, UserLoggedInSuccess,UserLoggedOutSuccess , UserDeletedSuccess} = require('../utils/success')
const { BadRequestError, AuthenticationError, SchemaValidationError,InvalidFileTypeError, NotFoundError } = require('../utils/error')
const multer = require('multer')
const upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if (!file.originalname.endsWith('.jpg'||'.jpeg'||'.png')){
            return cb(new InvalidFileTypeError)
            //return cb(new Error('Ipload an img'))
        }
        // cb(new Error('File must be an Image!'))
        cb(undefined,true)
        // cb(undefined,false)
    }
})

const router = new express.Router()

router.post('/user/me/avatar',authFunction, upload.single('avatar'), async(req,res)=>{
    req.user.avatar=req.file.buffer
    await req.user.save()
    res.send(200)
})
router.delete('/user/me/avatar',authFunction, async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send(200)
})
router.get('/users/:id/avatar',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user||!user.avatar){
            errorHandler(new NotFoundError)
        }
        // res.set('Content-Type','image/png')
        res.send('hi')
    } catch (e) {
        
    }
})
//route for sign up
router.post('/signup',async(req,res)=>{
   const user = new userModel(req.body)
   
    try {
        const token = await user.generateAuthToken()
        const success = new UserCreatedSuccess
        successHandler(success,res)
       console.log(token)
       } catch (e) {
        
        errorHandler(new SchemaValidationError,req,res)
       }
})

//route for login
router.post('/login',async(req,res)=>{
    try {
        const user = await userModel.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        const success=new UserLoggedInSuccess
        successHandler(success,res)
    } catch (e) {
        errorHandler(new AuthenticationError,req,res)
    }
})

//route for logout
//?
router.post('/logout',authFunction,async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        const success=new UserLoggedOutSuccess
       successHandler(success,res)
    } catch (e) {
        
        errorHandler(new BadRequestError,req,res)
    }
})
router.post ('/users/logOutAll',authFunction,async(req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send()
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
})

//route for deleting user
router.delete('/delete',authFunction, async(req,res)=>{
    try {
        
       const user =await req.user.remove()
       console.log(user)
       const success=new UserDeletedSuccess
       successHandler(success,res)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
})

module.exports=router
