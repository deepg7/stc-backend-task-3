const express = require('express')
require('./src/db/mongoose')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./src/routers/userRouter')

// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000,
//     }
// })
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send('hi')
// })
const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')

app.use(express.json())
app.use(userRouter)

app.all('*',(req,res,next)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log('Server is up on Port:', port)
})