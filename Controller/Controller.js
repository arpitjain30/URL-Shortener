import URL from "../Model/Mode.js";
import shortid from "shortid";

function handleWelcome(req, res) {
    res.send(`Hey, Welcome`);
}

async function handleAndGenerateShortID(req, res) {
    const body = req.body;
    if (Object.keys(body).length === 0) {
        res.status(404).json(`Bad Request`);
        return;
    }
    const shortID = shortid();
    console.log(body);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    res.send(`${shortID}`);
}

async function handleAnalytics(req, res){
    const shortID = req.params.id;
    if(!shortID){
        return res.status(404).json({message: `Enter the ID to get Analytics`});
    }
    const result = await URL.findOne({shortID});
    if (!result) {
        return res.status(404).json({message: `No URL found with the provided ID`});
    }
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

export {
    handleWelcome,
    handleAndGenerateShortID,
    handleAnalytics,
}