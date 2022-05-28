import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head";
import Modal from '../../../components/Modal';
import BookInfo from "../../../components/BookInfo";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from 'axios';


export default function BookView(){
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    var bookStateChanged = false

    useEffect(() => { 
        const fetchBook = async (id) =>{
            setIsLoading(true);
            if(id == undefined){
                router.replace('/home');
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

    const deleteBook = async (id) => {
        const { ['mybookshelf-token']: token} = parseCookies();
        
        await axios.delete(`http://localhost:3030/b/${id}/delete`, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((res) => {
            if(res.status == 200){
                router.replace('/home')
            }
        });
    }

    const handleEditClick = () => {
        router.push({pathname:`/book/${book._id}/edit`, query:{book: JSON.stringify(book)}});
    }

    const handleReturn = () => {
        router.replace('/home');
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

    return !book ? 
    (
        <div className="pt-28 flex flex-col justify-between min-h-screen bg-romantic-1 ">
            <Header title={"Seu Livro"}>
                <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
            </Header>
            <div className="text-justify font-bold text-5xl cursor-pointer font-[Poppins] text-gray-800 flex flex-col items-center bg-white rounded-2xl mx-auto mb-auto px-4 py-10 ">
                Carregando ...
            </div>
        </div>
    ) 
    : 
    (   
        <>
            <div className="bg-romantic-1 flex flex-col justify-content align-center min-h-screen">  
                <Head>
                    <title>MyBookshelf | Informações do Livro</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Header title={"Seu Livro"}>
                        <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
                </Header>
                <div className="flex flex-col items-center mt-20 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[50vw]">
                    <BookInfo book={book}></BookInfo>
                    <div className="justify-center items-center">
                        <Formik initialValues={{picked: book.estado ? book.estado.toString() : '0'}} onSubmit={handleStateChange}>
                            {({values}) => (
                            <Form >
                                <div id="my-radio-group" className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full mt-1 pt-2">Estado Atual do Livro</div>
                                <div role="group" aria-labelledby="my-radio-group" className="bg-romantic-1 flex flex-row justify-center">
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

                                {values.picked != book.estado ? <div className="flex flex-col bg-romantic-1"><button className="justify-center rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-20 py-2 hover:bg-orange-500 hover:text-white duration-500" type="submit">Salvar</button></div> : null}
                            </Form>
                            )}     
                        </Formik>
                    </div>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <button className="inline rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-2 py-2 w-32 hover:bg-orange-500 duration-500" type="button" onClick={handleEditClick}>Editar</button>
                    <button className="inline rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-2 py-2 w-32 hover:bg-orange-500 duration-500" type="button" onClick={() => setShowModal(true)}>Remover</button>
                </div>
                
                <Modal show={showModal} onClose={() => setShowModal(false)} onAction={() => deleteBook(id)}>
                    <div className="text-lg leading-6 font-medium text-gray-900">
                        <h3>Deseja remover o livro da sua bibilioteca?</h3>
                    </div>
                </Modal> 
                
            </div>
            <Footer/>
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