import express from "express";
import router from "./Router/Router.js";
import connect from "./Connection/Connection.js";
import URL from "./Model/Mode.js";

const app = express();
const PORT = 8080;
app.use(express.json());
connect('mongodb://127.0.0.1:27017/URL')
.then(() => {console.log(`Connection Established`);})
.catch((error) => {console.log(`Internal Error Occured: ${error}`);})

app.use('/URL', router);
app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    console.log(shortID);
    try {        
        if(!shortID){
            res.status(400).json({message: `Bad Request`})
        }
        const entry = await URL.findOneAndUpdate({
            shortID,
        }, {
            $push:{
                visitHistory:{
                    timestamp: new Date().toLocaleString(),
                }
            }
        })
        res.redirect(entry.redirectURL)
    } catch (error) {
        console.log(error);
        res.send(`Internal Error Occured`);
    }
})

app.listen(PORT, console.log(`Server Started`));