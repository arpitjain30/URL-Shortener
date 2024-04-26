import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        require: true,
    },
    visitHistory: [{
        timestamp: {
            type: String,
            default: () => new Date().toLocaleString(),
        },
    }]
}, { timestamp: true, })

const URL = mongoose.model("URL", urlSchema);

export default URL;