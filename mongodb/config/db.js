import mongoose, { connect } from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/cohort"
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connectToDB