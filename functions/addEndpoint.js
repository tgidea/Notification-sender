const mongoose = require('mongoose');
const expSchema = require('../schema/list_schema');

const addendpoint = async (channel, subscription, req, res) => {
    try {
        var Temp;        
        mongoose.connection.db.listCollections({ name: channel })
            .next(async (err, info) => {
                if (info) {
                    try {
                        Temp = mongoose.model(channel);
                    }
                    catch (err) {
                        try {
                            Temp = mongoose.model(channel, expSchema);
                        }
                        catch (err) {
                            console.log('innermost addendpoint', err);
                            return res.status(400).send({ "result": "This channel not found" });
                        }
                    }
                    try {
                        const document = new Temp({
                            "name" : "Test",
                            "subscription" : JSON.stringify(subscription)
                        })
                        await document.save();
                        console.log("success subscribed");
                        return res.status(200).send({ "result": `subscribe successfully &#127881;` })
                    }
                    catch (err) {   
                        console.log('Already subscibed');                     
                        return res.status(400).send({ "result": `You are already subscribed to this channel` })
                    }
                }
                else {
                    console.log('channel not found');
                    return res.status(400).send({ "result": "Channel not found" })
                }
            })
    }
    catch (err) {
        console.log(err, 'channel not found');
        res.status(400).send({ "result": "Channel not found" });
    }
}
module.exports = addendpoint;