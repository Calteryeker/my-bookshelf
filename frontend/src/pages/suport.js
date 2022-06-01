import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from '../contexts/AuthContext';
import { parseCookies } from "nookies";
import Head from "next/head";
import axios from "axios"
import * as yup from "yup";
import Modal from '../components/Modal';
import Header from "../components/Header";


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
        <div className="text-[1.5rem] leading-6 font-medium text-gray-900 my-[7rem]">
            <h3>Obrigado pela sua mensagem!</h3>
        </div>
    )
    
    const operationFail = (
        <div className="text-[1.5rem] leading-6 font-medium text-gray-900 my-[7rem]">
            <h3 >Ops! Algo deu errado, tente novamente mais tarde!</h3>
        </div>
    )

    return (
        <div className="pt-28 flex flex-col justify-between bg-romantic-1 min-h-screen">  
            <Head>
                <title>MyBookshelf | Suporte</title>
            </Head>
            <Header title={"Suporte"}>
                <button className="rounded-xl left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1"><a href="/home">Home</a></button>
            </Header>
            <div className="flex flex-col items-center my-10 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[858px] md_c:mx-auto">
                <img src="/images/logo_bg_brow.png" className="mx-auto mt-10" width={80} height={80} />
                <h1 className="text-[2rem] leading-6 font-medium text-gray-900 mt-5">Suporte MyBookshelf</h1>
                <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validationMessage}>
                    <Form className="items-center flex flex-col mt-3">
                        <h2 className="text-[1.5rem] leading-6 font-medium text-gray-900 mt-[2rem]">Envie sua mensagem</h2>
                        <div className="my-2">
                            <Field className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" name="title" placeholder="Título da Mensagem"/>
                            <ErrorMessage component="p" name="title" className="text-xs text-red-700 text-center"/>
                        </div>
                        <div className="my-2">
                            <Field className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter w-max" as="textarea" name="message" placeholder="Mensagem"/>
                            <ErrorMessage component="p" name="message" className="text-xs text-red-700 text-center"/>
                        </div>
                        <button type="submit" className="font-luck rounded-xl text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Enviar Mensagem</button>
                    </Form>
                </Formik>
            </div>
            
            <Modal show={showModal} onClose={() => {setShowModal(false); router.back()}} textClose="Retornar">
                {success ? operationSucceed : operationFail}
            </Modal>
        </div>
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