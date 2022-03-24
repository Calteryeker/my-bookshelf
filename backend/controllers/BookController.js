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

    },

    async edit(req, res){

    },

    async delete(req, res){
        await User.updateOne({_id: req.userId}, {$pull: {lista_livros: {_id: req.body.bookId}}})
        .then((result, err) => {
            if(result)
                return res.status(200).send('Success: Book deleted!');

            return res.status(500).send({err: err, msg:'Error: Server failed to delete the book!'});
        });

    },
};