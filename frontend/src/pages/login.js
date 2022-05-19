import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const { signIn } = useContext(AuthContext);

    const handleClickLogin = async (dados) => {
        await signIn(dados);
    };

    const validationLogin = yup.object().shape({
        username: yup.string().required("Campo USERNAME é obrigatório!"),
        password: yup.string().min(8, "Senha deve ter 8 caracteres!").required("Campo SENHA é obrigatório!"),
    });

    return (
        <div className="pt-28 flex flex-col justify-between bg-romantic-1 min-h-screen ">
            <Head>
                <title>MyBookshelf | Login</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar bgColor={`white`} tittleColor={`brow_pod-1`} currentPage={"Login"} />
            <div className="flex flex-col items-center mt-10 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-96 md_c:mx-auto md_c:mb-10">
                <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                    <Form className="items-center flex flex-col">
                        <img src="/images/logo_bg_brow.png" className="mx-auto mt-10" width={80} height={80} />
                        <h2 className="font-luck text-brow_pod-1 text-center text-3xl my-4">Fazer Acesso</h2>
                        <div className="mb-5">
                            <label className="">
                                <Field name="username" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite seu username/email" />
                                <ErrorMessage component="p" name="username" className="text-xs text-red-700 text-center" />
                            </label>
                        </div>
                        <div className="">
                            <label className="">
                                <Field type="password" name="password" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite sua senha" />
                                <ErrorMessage component="p" name="password" className="text-xs text-red-700 text-center" />
                            </label>
                        </div>
                        <button className="rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-24 py-2 mt-10" type="submit">
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
            <Footer />
        </div>

    )
}