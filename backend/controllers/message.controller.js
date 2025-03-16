import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSiderbar = async (req, res) => {
  try {
    const loggedIdUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedIdUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsersForSiderbar: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatId },
        { sender: userToChatId, receiver: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
        // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: realtime functionality goes here => socket.io

    res.status(201).json({ message: "Message sent successfully" });

  } catch (err) {
    console.log("Error in sendMessage: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
