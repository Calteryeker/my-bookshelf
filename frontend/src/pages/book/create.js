import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import * as yup from "yup";
import axios from "axios";

export default function BookCreate() {
    const router = useRouter()

    const dataAtual = new Date()
    const maxYear = dataAtual.getFullYear()

    const validationEdit = yup.object().shape({
        title: yup.string().required("Campo Título é obrigatório!").max(60, "Título deve ter no máximo 60 caracteres!"),
        author: yup.string().required("Campo Autor é obrigatório!").max(50, "Autor deve ter no máximo 50 caracteres!"),
        year: yup.number().max(maxYear, `Ano máximo é ${maxYear}`).positive("Formato de ano inválido").required("Campo Ano é obrigatório!"),
        description: yup.string().required("Descrição ou Resumo é obrigatório!").max(400, "Descrição não pode ter mais de 400 caracteres"),
        genres: yup.array().of(yup.string().required("Gênero não pode ser vazio!")).min(1, "Um Gênero é obrigatório!"),
        rating: yup.number().max(5, "Avaliação deve ser menor que 5").positive("Avaliaçao deve ser um número positivo").required("Campo Avaliação é obrigatório!"),

    });

    async function handleClickEdit(dados) {
        const { ['mybookshelf-token']: token } = parseCookies();

        await axios.post(`http://localhost:3030/b/create`, {
            titulo: dados.title,
            autor: dados.author,
            ano_publicacao: dados.year,
            descricao: dados.description,
            lista_generos: dados.genres,
            avaliacao: dados.rating,
            estado: 0
        }, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.status)
            router.replace(`/home`)
        }).catch((error) => {
            console.log(error)
        })

    };

    const handleReturn = () => {
        router.replace(`/home`);
    }

    const initialValues = {
        title: '',
        author: '',
        year: '',
        description: '',
        genres: [''],
        rating: ''
    }

    return (
        <>
            <div className="pt-28 flex flex-col justify-between bg-signup-bg bg-no-repeat bg-cover min-h-screen">
                <Head>
                    <title>MyBookshelf | Adicionar Livro</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Header title={"Criar Livro"}>
                    <button onClick={handleReturn} className="rounded-xl left-2 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
                </Header>
                <div className="flex flex-col items-center my-10 bg-white bg-opacity-80 rounded-2xl mx-auto w-96 pb-10 md_c:w-[500px] md_c:mx-auto md_c:mb-10">
                    <Formik initialValues={initialValues} onSubmit={handleClickEdit} validationSchema={validationEdit}>
                        <Form className="flex flex-col mt-10 w-[85%] items-center mx-5">
                            <img className="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
                            <div className="mt-5 w-[95%]">
                                <label className="">
                                    <p>Título:</p>
                                    <Field name="title" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Título do livro" />
                                    <ErrorMessage component="p" name="title" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="">
                                    <p>Autor:</p>
                                    <Field name="author" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Autor" />
                                    <ErrorMessage component="p" name="author" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="">
                                    <p>Ano:</p>
                                    <Field name="year" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Ano de Publicação" />
                                    <ErrorMessage component="p" name="year" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="">
                                    <p>Descrição:</p>
                                    <Field as="textarea" name="description" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Descrição/Resumo" />
                                    <ErrorMessage component="p" name="description" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="">
                                    <p>Gêneros:</p>
                                    <FieldArray name="genres" >
                                        {fieldArrayProps => {
                                            const { remove, push, form } = fieldArrayProps;
                                            const { values } = form
                                            const { genres } = values

                                            return (
                                                <>
                                                    {genres.map((genre, index) => (
                                                        <label key={index} className="block m-1">
                                                            <Field name={`genres[${index}]`} className="mb-2 w-[94%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder={`Gênero ${index+1}`}/>
                                                            {index != 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                            {Object.keys(genres).length < 5 ? <button type="button" onClick={() => push('')}>+</button> : null}
                                                        </label>
                                                    ))}
                                                </>
                                            )
                                        }}
                                    </FieldArray>
                                    <ErrorMessage name="genres"  >{msg => msg ? <p className="text-xs text-red-700 text-center">Gênero não pode ser vazio</p> : null}</ErrorMessage>
                                </label>
                            </div>
                            <div className="w-[95%]">
                                <label className="">
                                    <p>Avaliação:</p>
                                    <Field name="rating" className="w-[100%] rounded-2xl py-3 border-brow_pod-1 border-2 px-2 font-inter" placeholder="Avaliação (1-5)" />
                                    <ErrorMessage component="p" name="rating" className="text-xs text-red-700 text-center" />
                                </label>
                            </div>
                            <button className="rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-4 py-2 mt-10 hover:bg-orange-500 hover:text-white duration-500" type="submit">
                                Cadastrar Livro
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