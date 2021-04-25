const mongoose = require('mongoose')
const User = require('../models/User')

const dbpath=`mongodb+srv://admin:bakchodi@cluster0.hrpgp.mongodb.net/user-profile-api?retryWrites=true&w=majority` ||'mongodb://127.0.0.1/user-profile-api'

mongoose.connect(dbpath, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await User.init()
})