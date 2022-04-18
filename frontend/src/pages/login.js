import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext }  from "../contexts/AuthContext";

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
        <>  
            <Head>
                <title>MyBookshelf | Login</title>
            </Head>
            <Navbar />
            <div className="image-bg">
                <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                    <Form className="login-form">
                        <h2 className="login-form-title">Login</h2>
                        <div className="login-form-group">
                            <label className="login-form-field-type">Username/Email:
                                <Field name="username" className="form-field"  placeholder="Digite seu username ou email"/>
                                <ErrorMessage component="span" name="username" className="form-error"/>    
                            </label>
                        </div>
                        <div className="login-form-group">
                            <label className="login-form-field-type">Senha:
                                <Field name="password" className="form-field"  placeholder="Digite sua senha"/>
                                <ErrorMessage component="span" name="password" className="form-error"/>
                            </label>
                        </div>
                        <button className="button" type="submit">
                            Login
                        </button>

                    </Form>
                </Formik>
            </div>
            <Footer />
        </>
        
    )
}