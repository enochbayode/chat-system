const { User } = require("../models/user");
const { Message } = require("../models/message");
const { Conversation } = require("../models/conversation");
const { Utils } = require("../middlewares/utils");

// instantiating the middlewares
const utils = new Utils();

const sendMessage = async (req, res) => {
    // const sender = req.user._id;
    const { sender } = req.body;

    try {
        // const Sender = await User.findById({ _id: sender })

        const newMessage = new Message({
            ...req.body,
            sender: req.user._id
        });
        await newMessage.save();

        return res.status(200).json({
            status: true,
            message: "message sent succefully",
            data: newMessage
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            status: false,
            message: "something went wrong.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
    
}

const getLastMessage = async(req, res) => {
    
    try {
         const Conversation = await Message.find({ });
        
        if (Conversation){
            return res.status(200).json({
                status: true,
                message: "Read previous conversion",
                data: Conversation
            })
        }

        res.status(200).json({
            status: true,
            message: "No previous conversation",
            error: utils.getMessage("NO_MESSAGE"),
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "something went wrong.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
}




module.exports = {
    sendMessage,
    getLastMessage
}