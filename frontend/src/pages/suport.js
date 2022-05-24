import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from '../contexts/AuthContext';
import { parseCookies } from "nookies";
import Head from "next/head";
import axios from "axios"
import * as yup from "yup";
import Modal from '../components/Modal';


export default function Suport(){
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { ['mybookshelf-token']: token } = parseCookies();

    const validationMessage = yup.object().shape({
        title: yup.string().required("Campo Título é obrigatório!"),
        message: yup.string().required("Mensagem é obrigatória!").test('len', "Tamanho máximo da mensagem é de 1500 caracteres", val =>  val != undefined? val.length <= 1500 : 1),
    });

    
    async function handleSubmit(dados){
        await axios.post(`http://localhost:3030/m`, {
            user_name: user.nome,
            user_email: user.email,
            titulo: dados.title,
            mensagem: dados.message
        }, {
            headers: {
                'Authorizathion': `Bearer ${token}`,
            }
        }).then((response) => {
            setSuccess(true)
            setShowModal(true);
        }).catch((error) => {
            setSuccess(false);
            setShowModal(true)
        })
    }
    
    const operationSucceed = (
        <>
            <h3>Obrigado pela sua mensagem!</h3>
        </>
    )
    
    const operationFail = (
        <>
            <h3>Ops! Algo deu errado, tente novamente mais tarde!</h3>
        </>
    )

    return (
        <>  
            <Head>
                <title>MyBookshelf | Suporte</title>
            </Head>
            <button><a href="/home">Retornar Para a Home</a></button>
            <h1>FAQ</h1>
            <h2>Envie sua mensagem</h2>
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validationMessage}>
                <Form>
                    <div>
                        <Field name="title" placeholder="Título da Mensagem"/>
                        <ErrorMessage component="p" name="title"/>
                    </div>
                    <div>
                        <Field as="textarea" name="message" placeholder="Mensagem"/>
                        <ErrorMessage component="p" name="message"/>
                    </div>
                    <button type="submit">Enviar Mensagem</button>
                </Form>
            </Formik>
            <Modal show={showModal} onClose={() => {setShowModal(false); router.back()}} textClose="Retornar" header={<h2>Operação {success ? "Bem Sucedida!" : "Falhou!"}</h2>}>
                {success ? operationSucceed : operationFail}
            </Modal>
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
        props: {
            token : token
        }
    }
}