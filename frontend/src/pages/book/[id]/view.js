import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Modal from '../../../components/Modal';

export default function BookView(){
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState({});
    const [showModal, setShowModal] = useState(false);

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

    const deleteBook = async (id) => {
        const { ['mybookshelf-token']: token} = parseCookies();
        
        await axios.delete(`http://localhost:3030/b/${id}/delete`, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((res) => {
            if(res.status == 200){
                router.push('/home')
            }
        });
    }

    const handleEditClick = () => {
        router.push(`/book/${id}/edit`);
    }

    const handleReturn = () => {
        router.push('/home');
    }

  return (
        <>  
            <Head>
                <title>MyBookshelf | Informações do Livro</title>
            </Head>
            <button className='button' onClick={handleReturn}>Retornar</button>
            <p>Título: {book.titulo}</p>
            <p>Autor: {book.autor}</p>
            <p>Ano de Publicação: {book.ano_publicacao}</p>
            <p>Descrição: {book.descricao}</p>
            <label>Gêneros:<ul>{book.lista_generos ? generos(book.lista_generos): ''}</ul></label>
            <p>Avaliação: {book.avaliacao}</p>

            <button className='button' onClick={handleEditClick}>Editar</button>
            <button className='button' onClick={() => setShowModal(true)}>Remover</button>
            <Modal show={showModal} onClose={() => setShowModal(false)} onAction={() => deleteBook(id)}>
                <div className='modal'>
                    <h3>Deseja remover o livro da sua bibilioteca?</h3>
                </div>
            </Modal>  
        </>
  )
};