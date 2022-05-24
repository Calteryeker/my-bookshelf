import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react"
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { parseCookies } from "nookies";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function BookEdit() {
    const router = useRouter()
    const { id } = router.query

    const dataAtual = new Date()
    const maxYear = dataAtual.getFullYear()


    const validationEdit = yup.object().shape({
        title: yup.string().required("Campo Título é obrigatório!"),
        author: yup.string().required("Campo Autor é obrigatório!"),
        year: yup.number().max(maxYear, `Ano máximo é ${maxYear}`).positive("Formato de ano inválido").required("Campo Ano é obrigatório!"),
        description: yup.string().required("Descrição ou Resumo é obrigatório!"),
        genres: yup.string().required("Pelo menos um gênero é obrigatório!"),
        rating: yup.number().max(5, "Avaliação deve ser menor que 5").positive("Avaliaçao deve ser um número positivo").required("Campo Avaliação é obrigatório!"),

    });

    async function handleClickEdit(dados) {
        const { ['mybookshelf-token']: token } = parseCookies();

        const rating = parseFloat(dados.rating)
        const lista_generos = dados.genres.split(';')

        await axios.put(`http://localhost:3030/b/${id}/edit`, {
            titulo: dados.title,
            autor: dados.author,
            ano_publicacao: dados.year,
            descricao: dados.description,
            lista_generos: lista_generos,
            avaliacao: rating,
        }, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.status)
            router.push(`/book/${id}/view`)
        }).catch((error) => {
            console.log(error)
        })

    };

    const handleReturn = () => {
        router.push(`/book/` + `${id}` + `/view`);
    }


    return (
        <>
            <div className="pt-28 flex flex-col justify-between bg-signup-bg bg-no-repeat bg-cover min-h-screen">
                <Head>
                    <title>MyBookshelf | Editar Livro</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Header tittle={"Editar Livro"}>
                    <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
                </Header>
                <div className="flex flex-col items-center my-10 bg-white bg-opacity-80 rounded-2xl mx-auto w-96 pb-10 md_c:w-[500px] md_c:mx-auto md_c:mb-10">
                    <Formik initialValues={{}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
                        <Form className="items-center flex flex-col mt-10">
                            <img classname="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
                            <div className="mt-5">
                                <label className="">
                                    <p>Título:</p>
                                    <Field name="title" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Título do livro" />
                                    <ErrorMessage component="p" name="title" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="">
                                <label className="">
                                    <p>Autor:</p>
                                    <Field name="author" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Autor" />
                                    <ErrorMessage component="p" name="author" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="">
                                <label className="">
                                    <p>Ano:</p>
                                    <Field name="year" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Ano de Publicação" />
                                    <ErrorMessage component="p" name="year" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="">
                                <label className="">
                                    <p>Descrição:</p>
                                    <Field name="description" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Descrição/Resumo" />
                                    <ErrorMessage component="p" name="description" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="">
                                <label className="">
                                    <p>Gêneros:</p>
                                    <Field name="genres" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Gêneros(separar por ;)" />
                                    <ErrorMessage component="p" name="genres" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="">
                                <label className="">
                                    <p>Avaliação:</p>
                                    <Field name="rating" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Avaliação (1-5)" />
                                    <ErrorMessage component="p" name="rating" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <button className="rounded-xl bg-brow_pod-1 text-white hover:bg-orange-500 duration-500 font-luck text-xl px-4 py-2 mt-10" type="submit">
                                Concluir Edição
                            </button>

                        </Form>
                    </Formik>
                </div>
                <Footer />
            </div>
        </>
    )
}

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