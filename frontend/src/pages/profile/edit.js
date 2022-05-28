import Header from "../../components/Header";
import Head from "next/head";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { parseCookies, destroyCookie } from "nookies";
import { useContext, useState } from "react"
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import * as yup from "yup";
import axios from "axios";
import moment from "moment";



export default function AccountEdit() {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [startDate, setStartDate] = useState(null);

  const now = new Date()
  const maxDate = new Date(now.getFullYear()-8, 11, 31)
  
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
        router.replace('/')
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
        router.replace('/profile/view');
        console.log(response.status)
      })
    }

  };

  function testDate() {
    startDate === null ? setStartDate(moment(user.data_nascimento).toDate()) : startDate
  }

  const handleReturn = () => {
    router.replace(`/profile/view`);
  }

  return !user ? <h1>Carregando ...</h1> :(
    <>
      <div className="pt-28 flex flex-col justify-between bg-romantic-1 min-h-screen">
        <Head>
          <title>MyBookshelf | Editar Perfil</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Header title={"Editar Informações"}>
          <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
        </Header>
        <div className="flex flex-col items-center my-10 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[500px] md_c:mx-auto md_c:mb-10">
          <Formik initialValues={{name: user.nome, email: user.email, birthdate: moment(user.data_nascimento).toDate()}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
            <Form className="items-center flex flex-col mt-10">
              <img className="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
              <div className="mt-5">
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
                  <DatePicker showYearDropdown adjustDateOnChange dropdownMode="select" name="birthdate" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" selected={startDate ? startDate : moment(user.data_nascimento).toDate()} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} maxDate={maxDate}/>
                  <ErrorMessage component="P" name="birthdate" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <button className="rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-4 py-2 mt-10 hover:bg-orange-500 hover:text-white duration-500" type="submit">
                Confirmar
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