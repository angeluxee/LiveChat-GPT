const ChatModel = require("../models/chat");

exports.create = async (message) => {
    try {
        const newChat = new ChatModel({
            sender: message.sender,
            message: message.text,
            room: message.room,
            avatar: message.avatar
        });
        await newChat.save();
        return newChat;
    } catch (error) {
        console.error(`Error al crear chat: ${error.message}`);
        return { error: 'Hubo un error al crear el chat.' };
    }
};

exports.getMessages = async (req, res, next) => {
    try {
        console.log(req.params.room)
        var user = req.params.user;
        var room = req.params.room;
        var datos = {};

        if (user && room) {
            datos = { room: room, sender: user };
        } else if (user && !room) {
            datos = { sender: user };
        } else if (room && !user) {
            datos = { room: room };
        } else {
            return res.json({ error: "Faltan parámetros." });
        }

        return res.json(await ChatModel.find(datos).sort({ timestamp: 1 }));
    } catch (error) {
        console.error(`Error : ${error}`);
        return null;
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        if (!req.body.user || !req.body.msg || !req.body.room) {
            return res.json({ "error": "Faltan parámetros" });
        } else {
            req.message = new ChatModel({
                sender: req.body.user,
                message: req.body.msg,
                room: req.body.room,
                avatar: 'default_avatar.jpg'
            });
            await req.message.save();
            // Emitir el mensaje a la sala correspondiente
            io.to(req.body.room).emit('message', {
                sender: req.message.sender,
                text: req.message.message,
                avatar: req.message.avatar,
                date: req.message.createdAt
            });
            res.json({ "success": "Mensaje enviado correctamente" });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
        return null;
    }
};
