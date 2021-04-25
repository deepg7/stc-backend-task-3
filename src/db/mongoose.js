const mongoose = require('mongoose')
const User = require('../models/User')

const dbpath=process.env.MONGO_DB||'mongodb://127.0.0.1/user-profile-api'

mongoose.connect(dbpath, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await User.init()
})