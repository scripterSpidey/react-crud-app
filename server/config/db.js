import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGO_URI)
//     .then(console.log(`mongodb connected`))
//     .catch(error=>console.log('databse connection error',error));

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo db connected `)
    } catch (error) {
        console.log(`database error ${error}`);
        process.exit(1)
    }
}


export default connectDB;