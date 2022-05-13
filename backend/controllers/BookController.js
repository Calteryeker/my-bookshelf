const User = require('../models/User');

module.exports = {
    async create(req, res){
        const {titulo, autor, imagem, ano_publicacao, descricao, lista_generos, avaliacao} = req.body;

        await User.updateOne({_id: req.userId}, 
            {$addToSet: {
                    lista_livros: {
                        titulo: titulo, 
                        autor: autor,
                        imagem: imagem, 
                        ano_publicacao: ano_publicacao,
                        descricao: descricao, 
                        lista_generos: lista_generos,
                        avaliacao: avaliacao
                    }
                }
            }).then((result) => {
                return res.status(200).send('Success: New book created!');

            }).catch(err => {
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
        {
            $set: {
                "lista_livros.$.titulo": titulo,
                "lista_livros.$.autor": autor,
                "lista_livros.$.imagem": imagem,
                "lista_livros.$.ano_publicacao": ano_publicacao,
                "lista_livros.$.descricao": descricao,
                "lista_livros.$.lista_generos": lista_generos,
                "lista_livros.$.avaliacao": avaliacao,
            }
        }).catch(err => {
            return res.status(500).send("Error: Failed to update the book!")});

        return res.status(200).send("Success: Book updated!");
    },

    async delete(req, res){
        await User.updateOne({_id: req.userId}, {$pull: {lista_livros: {_id: req.params.id}}}).then(res => {
            return res.status(200).send('Success: Book deleted!');
        })
        .catch((err) => {
            return res.status(500).send({err: err, msg:'Error: Server failed to delete the book!'});
            
        });
        
    },

    async getBooks(req, res){
        const page = parseInt(req.query.page);
        const startIndex = page <= 1 ? 0 : (page - 1) * 1000;
        const endIndex = startIndex == 0 ? 1000 : page * 1000;

        var totalBooks, totalPages;

        await User.findById(req.userId).then(result => {
            totalBooks = Object.keys((result.lista_livros)).length;
            totalPages = Math.ceil(totalBooks/1000);
        }).catch(async err =>{
            return res.status(500).send({err: err, msg: 'Error: Server failed to get the page!'});
        });
        
        if(totalPages == 0){
            return res.status(200).send({books: []})
        }
        else if(page <= totalPages){
            await User.findById(req.userId, {lista_livros: {$slice :[startIndex, endIndex]}})
            .then(async result => { 
                const resPage = {
                    _meta:{
                        success: true,
                        currentPage: page,
                        totalBooks: totalBooks,
                        totalPages: totalPages,
                        perPage: 1000,
                    }
                };
                
                resPage.books = result.lista_livros;
        
                return res.status(200).send(resPage);
            })
            .catch(err => {
                return res.status(500).send({err: err, msg: 'Error: Server failed to get the page!'});
            });
        }
        else {
            return res.status(400).send({err: 'Error: Bad Page Resquest!'});
        }
    },    
};