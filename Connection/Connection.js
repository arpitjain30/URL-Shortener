import mongoose from "mongoose";

async function connect(URL){
    return mongoose.connect(URL);
}

export default connect;