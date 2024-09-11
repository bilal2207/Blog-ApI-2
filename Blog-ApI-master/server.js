require('dotenv').config()

//express
const express = require('express');
const app = express();

//database 
const connectDB = require('./db/connect')
console.log(connectDB)

//routers

const authRouter = require('./routes/authRoutes');
const articleRouter = require('./routes/articleRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const verify = require('./middleware/verifySource') 
// const errorhandlerMiddleware = require('./middleware/error-handler')


app.use(express.json());
app.use(verify)//verify and log from where the requests are coming 



app.use('/api/v1', authRouter)
app.use('/api/v1/articles', articleRouter)

app.use(notFoundMiddleware)
// app.use(errorhandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, ()=>{
            console.log(`server listening on port ${port}...`);
            
        })
    }
    catch(error){
        console.log(error);
        
    }
}
start();