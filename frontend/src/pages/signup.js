import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react"
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import moment from "moment";

export default function Signup() {
  const [startDate, setStartDate] = useState(new Date(1995, 0, 1));

  const validationSignup = yup.object().shape({
    name: yup.string().required("Campo NOME é obrigatório!"),
    username: yup.string().required("Campo USERNAME é obrigatório!"),
    password: yup.string().min(8, "Senha deve ter 8 caracteres!").required("Campo SENHA é obrigatório!"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais!"),
    email: yup.string().email().required("Campo EMAIL é obrigatório!"),
  });

  async function handleClickSignUp(dados) {

    const dateFake = moment(startDate).format('DD/MM/YYYY')

    await Axios.post("http://localhost:3030/signup", {
      login: dados.username,
      senha: dados.password,
      nome: dados.name,
      email: dados.email,
      data_nascimento: dateFake,
      lista_livros: []
    }).then((Response) => {
      console.log(Response.status)
    })

    Router.push('/login');
  };

  function testDate() {
    startDate === null ? setStartDate(new Date(1995, 0, 1)) : startDate
  }

  return (
    <div className=" flex flex-col overflow-y-scroll justify-between bg-signup-bg bg-no-repeat bg-cover min-h-screen sm_c:pt-28 md_c:pt-28">
      <Head>
        <title>MyBookshelf | Cadastro</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <div className=" pt-10  flex flex-col items-center bg-white bg-opacity-80 rounded-lg sm_c:mt-10 sm_c:mx-4 sm_c:mb-10 md_c:mx-80 md_c:mb-10">
      <img classname="sm_c:mx-auto justify-center" width={80} height={80} src="/images/logo_bg_brow.png"/>
      <h2 className="font-luck flex items-center justify-center sm_c:mt-10 sm_c:text-2xl sm_c:text-center sm_c:mx-2 sm_c:text-brow_pod-1  md_c:py-4 md_c:text-lg md:px-10 ">Faça Login ou Registre-se em Segundos</h2>
      <p className="mx-5 font-inter border-brow_pod-1 sm_c:text-center">
        Use sua conta de email para registrar-se no mybookshelf. É gratuito!
      </p>
        <Formik initialValues={{}} onSubmit={handleClickSignUp} validationSchema={validationSignup}>
          <Form className="signup-form">
            <div className="sm_c:grid sm_c:grid-cols-1 sm_c:justify-items-center">
            <div class="flex items-center justify-center py-8">        
            </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Nome Completo:
                <div><Field name="name" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite seu nome" /></div>
                <div><ErrorMessage component="span" name="name" className="form-error" /></div>
              </label>
            </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">ID Login:
                <div><Field name="username" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite seu username" /></div>
                <div><ErrorMessage component="span" name="username" className="form-error" /></div>
              </label>
            </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Email:
                <div><Field name="email" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="user@email.com.br" /></div>
                <div><ErrorMessage component="span" name="email" className="form-error" /></div>
              </label>
              </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-2">Data de Nascimento:
                <DatePicker showYearDropdown dropdownMode="select" name="birthdate" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" selected={startDate} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} />
                <ErrorMessage component="span" name="birthdate" className="form-error" />
              </label>
            
            </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Senha:
                <div><Field type="password" name="password" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite sua senha" /></div>
                <div><ErrorMessage component="span" name="password" className="form-error" /></div>
              </label>
            </div>
            <div className="signup-form-group py-2">
              <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Confirmar Senha:
                <div><Field type="password" name="confirmPassword" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2 " placeholder="Confirme sua senha" /></div>
                <div><ErrorMessage component="span" name="confirmPassword" className="form-error" /></div>
              </label>
            </div>
            <div class="flex items-center justify-center py-8">
            <button className="button font-luck w-fit sm_c:px-16 sm_c:py-4 border-transparent sm_c:text-2xl  rounded-md text-orange-900 bg-romantic-1  hover:text-white hover:bg-orange-500 duration-500 md:py-4 md:text-lg md:px-10 " type="submit">
              Continuar
            </button>
            </div>
            <p className="sm_c:mx-5 sm_c:font-inter sm_c:border-brow_pod-1 sm_c:text-left sm_c:mb-10"> Ao continuar você concorda com nossos termos de uso e políticas de privacidade.</p>
            </div>

          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  )
}