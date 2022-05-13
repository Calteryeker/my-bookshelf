import Head from "next/head";
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';

const BookView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async (id) =>{
        if(id == undefined){
            router.push('/home');
        }
        const { ['mybookshelf-token']: token} = parseCookies();

        await axios.get(`http://localhost:3030/b/${id}/view`, {
            headers :{
                'Authorizathion': `Bearer ${token}`,
            }
        }).then(res =>{
            setBook(res.data.book);
            return
        }).catch(err => {
            
        });
       
          
    };

    fetchBook(id);
  }, []);

  const generos = (lista_generos) => {
    return (
        lista_generos.map(genero => (
            <li key={genero} className='list-group-item'>
                {genero}
            </li>
        ))
    )
  }

  const confirmDelete = () => {
      return (
          <>
            <div className='modal'>
                <h2>Deseja remover o livro da sua bibilioteca?</h2>
                <button className='button' onClick={deleteBook}>Confirmar</button>
                <button className='button' onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </>
      )
  }

  const deleteBook = async () => {
    const { ['mybookshelf-token']: token} = parseCookies();
    
    await axios.delete(`http://localhost:3030/b/${id}/delete`, {
        headers: {
            'Authorizathion': `Bearer ${token}`,
        }
    }).then((res) => {
           if(res.status == 200){
               return (
                   <>
                        <div className='modal'>
                            <h2>Livro removido com sucesso!</h2>
                            <button className='button' onClick={handleReturn}>Retornar</button>
                        </div>
                   </>
               )
           }
           else {
               return (
                   <>
                        <div className='modal'>
                            <h2>Falha ao remover o livro!</h2>
                            <button className='button' onClick={handleReturn}>Retornar</button>
                        </div>
                   </>
               )
           }
      });
  }

  const handleEditClick = () => {
    Router.push(`/book/${id}/edit`);
  }

  const handleCancelDelete = () => {
      Router.reload();
  }

  const handleReturn = () => {
      Router.push('/home');
  }

  return (
        <>  
            <Head>
                <title>MyBookshelf | Informações do Livro</title>
            </Head>
            <p>Título: {book.titulo}</p>
            <p>Autor: {book.autor}</p>
            <p>Ano de Publicação: {book.ano_publicacao}</p>
            <p>Descrição: {book.descricao}</p>
            <label>Gêneros:<ul>{book.lista_generos ? generos(book.lista_generos): ''}</ul></label>
            <p>Avaliação: {book.avaliacao}</p>

            <button className='button' onClick={handleEditClick}>Editar</button>
            <button className='button' onClick={confirmDelete}>Remover</button>    
        </>
  )
};

export default BookView;