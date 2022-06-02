import Head from "next/head";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useState } from "react"
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { parseCookies } from "nookies";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function BookEdit({book}) {
    const {titulo, autor, ano_publicacao, descricao, lista_generos, avaliacao} = book;
    const router = useRouter()
    const { id } = router.query

    const dataAtual = new Date()
    const maxYear = dataAtual.getFullYear()


    const validationEdit = yup.object().shape({
        title: yup.string().required("Campo Título é obrigatório!").max(60, "Título deve ter no máximo 60 caracteres!"),
        author: yup.string().required("Campo Autor é obrigatório!").max(50, "Autor deve ter no máximo 50 caracteres!"),
        year: yup.number().max(maxYear, `Ano máximo é ${maxYear}`).positive("Formato de ano inválido").required("Campo Ano é obrigatório!"),
        description: yup.string().required("Descrição ou Resumo é obrigatório!").max(400, "Descrição não pode ter mais de 400 caracteres"),
        genres: yup.array().of(yup.string().max(15, "Tamanho máximo de 15 caracteres!").required("Gênero não pode ser vazio!")).min(1, "Um Gênero é obrigatório!"),
        rating: yup.number().max(5, "Avaliação deve ser menor que 5").positive("Avaliaçao deve ser um número positivo").required("Campo Avaliação é obrigatório!"),

    });

    async function handleClickEdit(dados) {
        const { ['mybookshelf-token']: token } = parseCookies();

        await axios.put(`http://localhost:3030/b/${id}/edit`, {
            titulo: dados.title,
            autor: dados.author,
            ano_publicacao: dados.year,
            descricao: dados.description,
            lista_generos: dados.genres,
            avaliacao: parseFloat(dados.rating),
        }, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.status)
            router.replace(`/book/${id}/view`)
        }).catch((error) => {
            console.log(error)
        })

    };

    const handleReturn = () => {
        router.replace(`/book/` + `${id}` + `/view`);
    }

    const initialValues = {
        title: titulo,
        author: autor,
        year: ano_publicacao,
        description: descricao,
        genres: lista_generos,
        rating: avaliacao
    }

    function validateGenre(input){
        if(input != undefined){
            if(input  === ''){
                return "Gênero não pode ser vazio!"
            }
            else if(input.lenght > 15){
                return "Tamanho máximo de 15 caracteres!"
            }
        }
        
    }

    return (
        <>
            <div className="pt-28 flex flex-col justify-between bg-signup-bg bg-no-repeat bg-cover min-h-screen">
                <Head>
                    <title>MyBookshelf | Editar Livro</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Header title={"Editar Livro"}>
                    <button onClick={handleReturn} className="rounded-xl left-2 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
                </Header>
                <div className="flex flex-col items-center my-10 bg-white bg-opacity-80 rounded-2xl mx-auto w-96 pb-10 md_c:w-[500px] md_c:mx-auto md_c:mb-10">
                    <Formik initialValues={initialValues ? initialValues : {}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
                        <Form className="flex flex-col mt-10 w-[90%] items-center mx-5">
                            <img className="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
                            <div className="mt-5 w-[95%]">
                                <label className="items-center">
                                    <p>Título:</p>
                                    <Field name="title" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Título do livro" />
                                    <ErrorMessage component="p" name="title" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="items-center">
                                    <p>Autor:</p>
                                    <Field name="author" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Autor" />
                                    <ErrorMessage component="p" name="author" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="items-center">
                                    <p>Ano:</p>
                                    <Field name="year" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Ano de Publicação" />
                                    <ErrorMessage component="p" name="year" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="items-center">
                                    <p>Descrição:</p>
                                    <Field as="textarea" name="description" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Descrição/Resumo" />
                                    <ErrorMessage component="p" name="description" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="items-center">
                                    <p>Gêneros:</p>
                                    <FieldArray name="genres" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 font-inter">
                                        {fieldArrayProps => {
                                            const { remove, push, form} = fieldArrayProps;
                                            const { values } = form
                                            const { genres } = values
                                            return (
                                                <>
                                                    {genres.map((genre, index) => (
                                                        <label key={index} className="block">
                                                            <Field name={`genres[${index}]`} className="mb-2 w-[96%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder={`Gênero ${index+1}`} validate={(input) => validateGenre(input)}/>
                                                            {index != 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                            {Object.keys(genres).length < 5 ? <button type="button" onClick={() => push('')}>+</button> : null}
                                                            <ErrorMessage component="p" name={`genres[${index}]`} className="text-xs text-red-700 text-center"></ErrorMessage>
                                                        </label>
                                                    ))}
                                                </>
                                            )
                                        }}
                                    </FieldArray>
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="items-center">
                                    <p>Avaliação:</p>
                                    <Field name="rating" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Avaliação (1-5)" />
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
        props: { book: JSON.parse(ctx.query.book) }
    }
}