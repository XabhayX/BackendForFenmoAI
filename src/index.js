import connectDB from './db/index.js'
import { app } from './app.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
});

connectDB()
.then(
    ()=>{
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running at port: `, process.env.PORT); 
        })
    }
)
.catch((err)=>{
    console.log('Mohgo DB connection failed ', err); 
})
; 














// ; ( async ()=>{
//     try{
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); 
//         app.on('error', ()=>{
//             console.log("Err", error); 
//             throw error; 
//         })
//         console.log(connectionInstance.connection);

//         app.listen(process.env.PORT, ()=>{
//             console.log("App is listening on port ", process.env.PORT);  
//         })
//     }catch(err){
//         console.log("ERROR: ", err);
//         throw err;  
//     }
// })() 
