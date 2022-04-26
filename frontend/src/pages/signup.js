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
    <div className="flex flex-col overflow-y-scroll items-stretch justify-between bg-romantic-1 min-h-screen">
      <Head>
        <title>MyBookshelf | Cadastro</title>
      </Head>
      <Navbar />
      <div className="flex flex-col items-center">
        <Formik initialValues={{}} onSubmit={handleClickSignUp} validationSchema={validationSignup}>
          <Form className="signup-form">
            <h2 className="signup-form-title">Cadastro</h2>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Nome:
                <Field name="name" className="form-field" placeholder="Digite seu nome" />
                <ErrorMessage component="span" name="name" className="form-error" />
              </label>
            </div>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Username:
                <Field name="username" className="form-field" placeholder="Digite seu username" />
                <ErrorMessage component="span" name="username" className="form-error" />
              </label>
            </div>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Email:
                <Field name="email" className="form-field" placeholder="Digite seu email" />
                <ErrorMessage component="span" name="email" className="form-error" />
              </label>
            </div>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Senha:
                <Field type="password" name="password" className="form-field" placeholder="Digite sua senha" />
                <ErrorMessage component="span" name="password" className="form-error" />
              </label>
            </div>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Confirmar Senha:
                <Field type="password" name="confirmPassword" className="form-field" placeholder="Confirme sua senha" />
                <ErrorMessage component="span" name="confirmPassword" className="form-error" />
              </label>
            </div>
            <div className="signup-form-group">
              <label className="signup-form-field-type">Data de nascimento:
                <DatePicker showYearDropdown dropdownMode="select" name="birthdate" selected={startDate} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} />
                <ErrorMessage component="span" name="birthdate" className="form-error" />
              </label>
            </div>
            <button className="button" type="submit">
              Cadastrar
            </button>

          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  )
}