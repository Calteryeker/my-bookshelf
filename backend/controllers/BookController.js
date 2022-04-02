const User = require('../models/User');

module.exports = {
    async create(req, res){
        const {titulo, autor, imagem, ano_publicacao, descricao, lista_generos, avaliacao} = req.body;

        await User.updateOne({_id: req.userId}, {$addToSet: {lista_livros: {titulo: titulo, autor: autor,
            imagem: imagem, ano_publicacao: ano_publicacao,descricao: descricao, lista_generos: lista_generos,
            avalicacao: avaliacao}}}).then((result, err) => {
                if(result)
                    return res.status(200).send('Success: New book created!');

                return res.status(500).send({err: err, msg:'Error: Server failed to create a new book!'});
            });
        
       
    },

    async view(req, res){
        const user = await User.findOne({_id: req.userId});
        searchedBook = user.lista_livros.find(livro => livro._id == req.params.id);
        
        if(searchedBook != undefined)
            return res.status(200).send({book: searchedBook, msg: "Success: Book found!"});
        else{
            return res.status(400).send("Error: Book doesn't exist!");
        }
        
    },

    async edit(req, res){
        const {titulo, autor, imagem, ano_publicacao, descricao, lista_generos, avaliacao} = req.body;
        await User.updateOne({_id: req.userId, "lista_livros._id": req.params.id},
         {$set: {"lista_livros.$.titulo": titulo,
            "lista_livros.$.autor": autor,
            "lista_livros.$.imagem": imagem, 
            "lista_livros.$.ano_publicacao": ano_publicacao,
            "lista_livros.$.descricao": descricao, 
            "lista_livros.$.lista_generos": lista_generos,
            "lista_livros.$.avalicacao": avaliacao}}).catch(err => {
            return res.status(500).send("Error: Failed to update the book!")});

        res.status(200).send("Success: Book updated!");
    },

    async delete(req, res){
        await User.updateOne({_id: req.userId}, {$pull: {lista_livros: {_id: req.params.id}}})
        .then((result, err) => {
            if(result)
                return res.status(200).send('Success: Book deleted!');

            return res.status(500).send({err: err, msg:'Error: Server failed to delete the book!'});
        });

    },
};