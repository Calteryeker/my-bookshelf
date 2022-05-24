import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head";
import Modal from '../../../components/Modal';
import axios from 'axios';


export default function BookView(){
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    var bookStateChanged = false

    useEffect(() => { 
        const fetchBook = async (id) =>{
            setIsLoading(true);
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
                setInitialState(book.estado.toString())
                return
            }).catch(err => {
                
            });
            
            setIsLoading(false);
        };

        fetchBook(id);
        
    }, [bookStateChanged]);

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

    const handleStateChange = async (dados) => {
        const { ['mybookshelf-token']: token} = parseCookies();
        
        await axios.patch(`http://localhost:3030/b/${id}/state?new_state=${dados.picked}`, {},{
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((res) => {
            if(res.status == 200){
                bookStateChanged = true
                book.estado = dados.picked;
            }
        });
    }

    return isLoading ? (<div>Carregando ...</div>) : (
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
            <div>
                <Formik initialValues={{picked: book.estado ? book.estado.toString() : '0'}} onSubmit={handleStateChange}>
                    {({values}) => (
                    <Form>
                        <div id="my-radio-group">Estado Atual do Livro</div>
                        <div role="group" aria-labelledby="my-radio-group">
                            <label>
                                <Field type="radio" name="picked" value="0"/>
                                Guardado
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="1"/>
                                Lendo
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="2"/>
                                Finalizado
                            </label>
                        </div>

                        {values.picked != book.estado ? <button type="submit">Salvar</button> : null}
                    </Form>


                    )}
                        
                </Formik>
            </div>

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

export const getServerSideProps = async (ctx) => {
    const { ['mybookshelf-token']: token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}