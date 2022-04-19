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
        const searchedBook = user.lista_livros.find(livro => livro._id == req.params.id);
        
        if(searchedBook != undefined)
            return res.status(200).send({book: searchedBook, msg: "Success: Book found!"});
        else{
            return res.status(404).send("Error: Book doesn't exist!");
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

        return res.status(200).send("Success: Book updated!");
    },

    async delete(req, res){
        await User.updateOne({_id: req.userId}, {$pull: {lista_livros: {_id: req.params.id}}})
        .catch((err) => {
            return res.status(500).send({err: err, msg:'Error: Server failed to delete the book!'});
            
        });
        return res.status(200).send('Success: Book deleted!');
    },

    async getBooks(req, res){
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = page > 0 ? (page - 1) * limit : 0;
        const endIndex = page == 0 ? limit : page * limit;

        await User.findById(req.userId, {lista_livros: {$slice :[startIndex, endIndex]}})
        .then(result => {
            const resPage = {};

            if(limit == Object.keys(result.lista_livros).length){
                resPage.next = {
                    page: page+1,
                    limit: limit,
                };
            }
    
            if(page > 0){
                resPage.previous = {
                    page: page-1,
                    limit: limit,
                }
            }
    
            resPage.books = result.lista_livros;
    
            return res.status(200).send(resPage);
        })
        .catch(err => {
            return res.status(500).send({err: err, msg: 'Error: Server failed to get the page!'});
        });
    },    
};