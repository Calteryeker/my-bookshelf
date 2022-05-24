const SupportMessage = require("../models/utils/SupportSchema");

module.exports = {
    async create(req, res){
        const {user_name, user_email, titulo, mensagem} = req.body;

        await SupportMessage.create({
            user_name: user_name,
            user_email: user_email,
            titulo: titulo,
            mensagem: mensagem
        }).catch(err => {
            return res.status(500).send({err: err, msg:"Error: Server Failed to create the resource!"})
        })

        return res.status(200).send("Success: Message Created!");
    }
}