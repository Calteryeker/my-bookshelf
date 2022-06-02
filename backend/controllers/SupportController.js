const SupportMessage = require("../models/utils/SupportSchema");

module.exports = {
    async create(req, res){
        const {user_name, user_email, titulo, mensagem} = req.body;

        await SupportMessage.create({
            user_name: user_name,
            user_email: user_email,
            titulo: titulo,
            mensagem: mensagem
        }).then(() => {
            return res.status(200).send("Success: Message Created!");
        }).catch(err => {
            if(err.message.includes('mensagem' || 'titulo' || 'user_name' || 'user_email'))
                return res.status(400).send({err: err, msg:"Error: Some Required Information are missing!"})

            return res.status(500).send({err: err, msg:"Error: Server was unable to complete the request"})
        })

        
    }
}