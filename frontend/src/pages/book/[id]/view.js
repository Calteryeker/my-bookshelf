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


export default function BookView() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    var bookStateChanged = false

    useEffect(() => {
        const fetchBook = async (id) => {
            setIsLoading(true);
            if (id == undefined) {
                router.replace('/home');
            }
            const { ['mybookshelf-token']: token } = parseCookies();

            await axios.get(`http://localhost:3030/b/${id}/view`, {
                headers: {
                    'Authorizathion': `Bearer ${token}`,
                }
            }).then(res => {
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
        const { ['mybookshelf-token']: token } = parseCookies();

        await axios.delete(`http://localhost:3030/b/${id}/delete`, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.status == 200) {
                router.replace('/home')
            }
        });
    }

    const handleEditClick = () => {
        router.push({ pathname: `/book/${book._id}/edit`, query: { book: JSON.stringify(book) } });
    }

    const handleReturn = () => {
        router.replace('/home');
    }

    const handleStateChange = async (dados) => {
        const { ['mybookshelf-token']: token } = parseCookies();

        await axios.patch(`http://localhost:3030/b/${id}/state?new_state=${dados.picked}`, {}, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.status == 200) {
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
                <div className="pt-28 bg-section-logo-2 bg-romantic-1 flex flex-col justify-between align-center min-h-screen">
                    <Head>
                        <title>MyBookshelf | Informações do Livro</title>
                        <link rel="icon" href="/logo.png" />
                    </Head>
                    <Header title={"Seu Livro"}>
                        <button onClick={handleReturn} className="rounded-xl left-2 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
                    </Header>
                    <div className="flex flex-col items-center my-10 bg-white rounded-[50px] sm_c:rounded-[25px] mx-auto w-96 sm:w-[600px] pb-10 md_c:w-[700px] md_c:mx-auto md_c:mb-10">
                        <BookInfo book={book}></BookInfo>
                        <div className="justify-center items-center">
                            <Formik initialValues={{ picked: book.estado ? book.estado.toString() : '0' }} onSubmit={handleStateChange}>
                                {({ values }) => (
                                    <Form className="flex flex-col border-2 border-brow_pod-1 rounded-2xl pb-4">
                                        <div id="my-radio-group" className="text-brow_pod-1 text-center text-[14px] sm_c:text-[25px] font-luck mt-1 pt-2">Estado Atual do Livro</div>
                                        <div role="group" aria-labelledby="my-radio-group" className="flex flex-row justify-center">
                                            <label className="mx-3">
                                                <Field type="radio" name="picked" value="0" />
                                                Guardado
                                            </label>
                                            <label className="mx-3">
                                                <Field type="radio" name="picked" value="1" />
                                                Lendo
                                            </label>
                                            <label className="mx-3">
                                                <Field type="radio" name="picked" value="2" />
                                                Finalizado
                                            </label>
                                        </div>
                                        {values.picked != book.estado ? <button className="mx-24 mt-4 rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-3 py-2 hover:bg-orange-500 hover:text-white duration-500" type="submit">Salvar</button> : null}

                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="flex flex-row justify-around items-center mx-auto mt-5">
                            <button className="mx-5 inline rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-4 py-2 w-32 hover:bg-orange-500 hover:text-brow_pod-1 duration-500" type="button" onClick={handleEditClick}>Editar</button>
                            <button className="mx-5 inline rounded-xl bg-red-600 text-white font-luck text-xl px-4 py-2 w-32 hover:bg-[rgb(255,0,0)] duration-500" type="button" onClick={() => setShowModal(true)}>Remover</button>
                        </div>
                    </div>


                    <Modal show={showModal} onClose={() => setShowModal(false)} onAction={() => deleteBook(id)}>
                        <div className="text-lg leading-6 font-medium text-gray-900 my-[2rem]">
                            <h3>Deseja remover o livro da sua bibilioteca?</h3>
                        </div>
                    </Modal>

                    <Footer />
                </div>
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