const { User } = require("../models/user");
const { Notification } = require('../models/notification');
const { Message } = require("../models/message");
const { Conversation } = require("../models/conversation");
const { Utils } = require("../middlewares/utils");

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
        .populate('partner users')
        .exec();
  
      // generating the user JWT
      const token = auth.generateAuthToken(user);
  
      //   returning response
      return res.status(200).json({
        status: true,
        message: 'QUERY_SUCCESS',
        conversations: conversations,
      });

    } catch (error) {
      res.status(500).json({
        status: false,
        message: "You've got some errors.",
        error: utils.getMessage("UNKNOWN_ERROR"),
      });
    }
};

const conversate = async (req, res) => {
    const user = req.user;
    
    try {
        // checking if there exists a previous conversation 
  
        const conversation = await Conversation.findOne({
          users: { $all: [user._id, receiver._id] },
        });
  
        // creating a new converation if there's none existing
        if (!conversation) {
          const newConvo = new Conversation({
            users: [user._id, receiver._id],
            receiver: receiver._id,
            _id: new mongoose.Types.ObjectId(),
          });
  
          // creating the message object
          const chat = new Message({
            _id: new mongoose.Types.ObjectId(),
            convId: newConvo._id,
            messages: [body],
          });
  
          const message = await chat.save();
  
          newConvo.lastMessage = {
            dateTime: message.messages[0].dateTime,
            message: body.message,
            senderName: body.senderName,
            senderId: body.senderId,
            // senderImage: body.senderImage,
            hasRead: false,
          };
  
          const convo = await newConvo.save();
  
          // emmiting a socket for the message event
          socket.emit('message');
  
          // creating a notification object
          const notification = new Notification({
            _id: new mongoose.Types.ObjectId(),
            title: `Direct Message from ${user.name}`,
            body: `${body.message ? body.message : 'Some media file'}`,
            user: user._id,
            owner: receiver._id,
            category: 'message',
          });
  
          // saving the notification
          await notification.save();
  
          //sending a push notification
          utils.sendPushNotification(partner._id, notification);
  
          // generating the user JWT
          var token = auth.generateAuthToken(user);
  
          //   returning response
          return res.status(201).json({
            status: true,
            message: 'MESSAGE_SUCCESS',
            messages: message,
            conversation: convo,
            token: token,
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
    sendMessage,
    getLastMessage
}