const { User } = require("../models/user");
const { Message } = require("../models/message");
const { Conversation } = require("../models/conversation");
const { Utils } = require("../middlewares/utils");
const { socket } = require("../app");
const { mongoose } = require("mongoose");

// instantiating the middlewares
const utils = new Utils();

// get all user conversations controller
const getConversations = async (req, res) => {
  
    // getting the user from JWT
    const user = req.user;
  
    try {
      // querying the clinks from the databse
      const conversations = await Conversation.find({ users: user._id })
        .sort({ createdAt: -1 })
        .populate('reciever')
        .exec();
  
      //   returning response
      return res.status(200).json({
        status: true,
        message: 'QUERY_SUCCESS',
        conversations: conversations,
      });

    } catch (error) {
        console.log(error)
        res.status(500).json({
          status: false,
          message: "You've got some errors.",
          error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const conversate = async (req, res) => {
    const user = req.user;
    const reciever = req.user

    try {
        // checking if there exists a previous conversation 
  
        const conversation = await Conversation.findOne({
          users: { $all: [user._id, reciever._id] },
        });
        
        console.log("userID:", user._id);
        console.log("recieverID:", reciever._id);

        // creating a new converation if there's none existing
        if (!conversation) {
          const newConvo = new Conversation({
            users: [user._id, reciever._id],
            reciever: reciever._id,
            _id: new mongoose.Types.ObjectId(),
          });
  
          // creating the message object
          const chat = new Message({
            _id: new mongoose.Types.ObjectId(),
            convId: newConvo._id,
            messages: req.body,
          });
  
          const message = await chat.save();
  
          newConvo.lastMessage = {
            dateTime: message.messages[0].dateTime,
            ...req.body,
            hasRead: false,
          };
  
          const convo = await newConvo.save();
  
          // emmiting a socket for the message event
          socket.emit('message');
  
          //   returning response
          return res.status(201).json({
            status: true,
            message: 'MESSAGE_SUCCESS',
            messages: message,
            conversation: convo,
          });
        }
        
      } catch (error) {
        console.log(error);

        return res.status(500).json({
          status: false,
          message: "You've got some errors.",
          error: error,
        });
       
      }
}



// const sendMessage = async (req, res) => {
//     // const sender = req.user._id;
//     const { sender } = req.body;

//     try {
//         // const Sender = await User.findById({ _id: sender })

//         const newMessage = new Message({
//             ...req.body,
//             sender: req.user._id
//         });
//         await newMessage.save();

//         return res.status(200).json({
//             status: true,
//             message: "message sent succefully",
//             data: newMessage
//         });
//     } catch (error) {
//         // console.log(error)
//         res.status(500).json({
//             status: false,
//             message: "something went wrong.",
//             error: utils.getMessage("UNKNOWN_ERROR"),
//         });
//     }
    
// }

// const getLastMessage = async(req, res) => {
    
//     try {
//          const Conversation = await Message.find({ });
        
//         if (Conversation){
//             return res.status(200).json({
//                 status: true,
//                 message: "Read previous conversion",
//                 data: Conversation
//             })
//         }

//         res.status(200).json({
//             status: true,
//             message: "No previous conversation",
//             error: utils.getMessage("NO_MESSAGE"),
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: "something went wrong.",
//             error: utils.getMessage("UNKNOWN_ERROR"),
//         });
//     }
// }




module.exports = {
    getConversations,
    conversate,
    // sendMessage,
    // getLastMessage
}