import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { parseCookies } from "nookies";

export default function BookCreate(){
    const router = useRouter()

    const dataAtual = new Date()
    const maxYear = dataAtual.getFullYear()  

    const validationEdit = yup.object().shape({
        title: yup.string().required("Campo Título é obrigatório!"),
        author: yup.string().required("Campo Autor é obrigatório!"),
        year: yup.number().max(maxYear,`Ano máximo é ${maxYear}`).positive("Formato de ano inválido").required("Campo Ano é obrigatório!"),
        description: yup.string().required("Descrição ou Resumo é obrigatório!"),
        genres: yup.string().required("Pelo menos um gênero é obrigatório!"),
        rating: yup.number().max(5, "Avaliação deve ser menor que 5").positive("Avaliaçao deve ser um número positivo").required("Campo Avaliação é obrigatório!"),

    });
    
    async function handleClickEdit(dados) {
    const { ['mybookshelf-token']: token} = parseCookies();
    
    const rating = parseFloat(dados.rating)
    const lista_generos = dados.genres.split(';')

    await axios.post(`http://localhost:3030/b/create`, {
        titulo: dados.title,
        autor: dados.author,
        ano_publicacao: dados.year,
        descricao: dados.description,
        lista_generos: lista_generos,
        avaliacao: dados.rating,
    }, {
        headers: {
            'Authorizathion': `Bearer ${token}`,
        }
    }).then((response) => {
        console.log(response.status)
        router.push(`/home`)
    }).catch((error) =>{
        console.log(error)
    })

    };
    

    return (
        <>
            <Head>
                <title>MyBookshelf | Adicionar Livro</title>
            </Head>
            <div className="flex flex-col items-center">
                <Formik initialValues={{}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
                    <Form className="edit-book-form">
                        <h2 className="edit-book-form-title">Adicionar Livro</h2>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Título:
                                <Field name="title" className="form-field" placeholder="Título do livro" />
                                <ErrorMessage component="span" name="title" className="form-error" />
                            </label>
                        </div>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Autor:
                                <Field name="author" className="form-field" placeholder="Autor" />
                                <ErrorMessage component="span" name="author" className="form-error" />
                            </label>
                        </div>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Ano:
                                <Field name="year" className="form-field" placeholder="Ano de Publicação" />
                                <ErrorMessage component="span" name="year" className="form-error" />
                            </label>
                        </div>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Descrição:
                                <Field name="description" className="form-field" placeholder="Descrição/Resumo" />
                                <ErrorMessage component="span" name="description" className="form-error" />
                            </label>
                        </div>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Gêneros:
                                <Field name="genres" className="form-field" placeholder="Gêneros(separar por ;)" />
                                <ErrorMessage component="span" name="genres" className="form-error" />
                            </label>
                        </div>
                        <div className="edit-book-form-group">
                            <label className="edit-book-form-field-type">Avaliação:
                                <Field name="rating" className="form-field" placeholder="Avaliação (1-5)" />
                                <ErrorMessage component="span" name="rating" className="form-error" />
                            </label>
                        </div>
                        <button className="button" type="submit">
                            Cadastrar Livro
                        </button>

                    </Form>
                </Formik>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { ['mybookshelf-token']: token} = parseCookies(ctx);
     
    if(!token){
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
  
    return {
      props : {}
    }
  }