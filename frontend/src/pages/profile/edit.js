import Head from "next/head";
import Footer from "../../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react"
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import { parseCookies, destroyCookie } from "nookies";
import NavbarDashboard from "../../components/NavbarDashboard";

export default function AccountEdit() {
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date(1995, 0, 1));

  const validationEdit = yup.object().shape({
    name: yup.string().required("Campo NOME é obrigatório!"),
    actual_password: yup.string().min(8, "Senha deve ter 8 caracteres!"),
    new_password: yup.string().min(8, "Senha deve ter 8 caracteres!"),
    confirmPassword: yup.string().oneOf([yup.ref("new_password"), null], "As senhas não são iguais!"),
    email: yup.string().email().required("Campo EMAIL é obrigatório!"),
  });

  async function handleClickEdit(dados) {
    const { ['mybookshelf-token']: token } = parseCookies();
    const dateFake = moment(startDate).format('DD/MM/YYYY')

    if (dados.actual_password) {
      await axios.put("http://localhost:3030/u/profile/edit", {
        senhaAntiga: dados.actual_password,
        novaSenha: dados.new_password,
        nome: dados.name,
        email: dados.email,
        data_nascimento: dateFake,
      }, {
        headers: {
          'Authorizathion': `Bearer ${token}`
        }
      }).then((response) => {
        destroyCookie(undefined, 'mybookshelf-token');
        router.push('/')
        console.log(response.status)
      })
    }
    else {
      await axios.put("http://localhost:3030/u/profile/edit", {
        nome: dados.name,
        email: dados.email,
        data_nascimento: dateFake,
      }, {
        headers: {
          'Authorizathion': `Bearer ${token}`
        }
      }).then((response) => {
        router.push('/home');
        console.log(response.status)
      })
    }

  };

  function testDate() {
    startDate === null ? setStartDate(new Date(1995, 0, 1)) : startDate
  }

  return (
    <>
      <div className="pt-28 flex flex-col justify-between bg-romantic-1 min-h-screen">
        <Head>
          <title>MyBookshelf | Editar Perfil</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <NavbarDashboard />
        <div className="flex flex-col items-center my-10 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[500px] md_c:mx-auto md_c:mb-10">
          <Formik initialValues={{}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
            <Form className="items-center flex flex-col mt-10">
              <img classname="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
              <h2 className="font-luck text-brow_pod-1 text-center text-2xl my-4">Editar Informações</h2>
              <div className="">
                <label className="">
                  <p>Nome Completo:</p>
                  <Field name="name" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite seu nome" />
                  <ErrorMessage component="p" name="name" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Email:</p>
                  <Field name="email" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite seu email" />
                  <ErrorMessage component="P" name="email" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Senha Atual:</p>
                  <Field type="password" name="actual_password" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite sua senha" />
                  <ErrorMessage component="P" name="actual_password" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Nova Senha:</p>
                  <Field type="password" name="new_password" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite sua senha" />
                  <ErrorMessage component="P" name="new_password" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Confirmar Senha:</p>
                  <Field type="password" name="confirmPassword" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Confirme sua senha" />
                  <ErrorMessage component="P" name="confirmPassword" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Data de nascimento:</p>
                  <DatePicker showYearDropdown dropdownMode="select" name="birthdate" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" selected={startDate} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} />
                  <ErrorMessage component="P" name="birthdate" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <button className="rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-2 py-2 mt-10" type="submit">
                Confirmar Alterações
              </button>

            </Form>
          </Formik>
        </div>
        <Footer />
      </div>
    </>
  )
}