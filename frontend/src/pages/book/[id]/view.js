import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Axios from 'axios';

const BookView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async (id) =>{
        const { ['mybookshelf-token']: token} = parseCookies();

        const res = await Axios.get(`http://localhost:3030/b/${id}/view`, {
            headers :{
                'Authorizathion': `Bearer ${token}`,
            }
        }).catch(err => {
            
        });
       
        res ? setBook(res.data.book) : setBook({});
          
    };

    fetchBook(id);
  }, [book]);

  const generos = (lista_generos) => {
    return (
        lista_generos.map(genero => (
            <li key={genero} className='list-group-item'>
                {genero}
            </li>
        ))
    )
  }

  return (
        <>
            <p>Título: {book.titulo}</p>
            <p>Autor: {book.autor}</p>
            <p>Ano de Publicação: {book.ano_publicacao}</p>
            <p>Descrição: {book.descricao}</p>
            <label>Gêneros:<ul>{book.lista_generos ? generos(book.lista_generos): ''}</ul></label>
            <p>Avaliação: {book.avaliacao}</p>
        </>
  )
};

export default BookView;