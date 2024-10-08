import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/tasks.js'
import userRouter from "./routes/user.js";

const app = express();


app.use(express.json({limit:'50mb'}));
app.use(cors());

app.use('/tasks', routes);
app.use("/user", userRouter);

// app.post('/signup' , async (req , res) => {
//   const {email , password} = req.body;
//   try{
    

//   }
//   catch(err){
//     console.log(err)
//   }
// })

// app.post('/login' , async (req , res) => {
//   const {email , password} = req.body;
//   try{

//   }
//   catch(err){
//     console.log(err)
//   }
// })

const CONNECTION_URL = 'mongodb+srv://ransiwalsuryansh:PKCHiUvNPL5CiEhX@cluster0.st9ygsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const CONNECTION_URL = 'mongodb+srv://user1:user1234@cluster0.dxi8aa0.mongodb.net/DB?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


