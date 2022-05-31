import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react"
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as yup from "yup";
import axios from "axios";
import moment from "moment";

export default function Signup() {
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date(1995, 0, 1));
  const now = new Date()
  const maxDate = new Date(now.getFullYear()-8, 11, 31)

  const validationSignup = yup.object().shape({
    name: yup.string().required("Campo NOME é obrigatório!").max(50, "Nome deve ter no máximo 50 caracteres!"),
    username: yup.string().required("Campo USERNAME é obrigatório!").min(8, "Tamanho mínimo do username é de 8 caracteres!").max(15, "Tamanho máximo do username é de 15 caracteres!"),
    password: yup.string().min(8, "Senha deve ter 8 caracteres!").required("Campo SENHA é obrigatório!").max(20, "Tamanho máximo da senha é de 20 caracteres!"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais!"),
    email: yup.string().email("Insira um email válido!").required("Campo EMAIL é obrigatório!"),
  });

  async function testeLogin(){
    const field_username = document.getElementById('field-username')

    const res = await axios.post('http://localhost:3030/test/l', {
      login : field_username.value,
    }).catch((error) => {
      field_username.classList.remove('sm_c:border-brow_pod-1')
      field_username.classList.add('sm_c:border-[rgb(255,0,50)]')

    })

    if(res.status === 200){
      field_username.classList.remove('sm_c:border-brow_pod-1')
      if(field_username.classList.contains('sm_c:border-[rgb(255,0,50)]'))
        field_username.classList.remove('sm_c:border-[rgb(255,0,50)]')
      field_username.classList.add('sm_c:border-[rgb(10,255,100)]')
    }

  }

  async function testeEmail(){
    const field_email = document.getElementById('field-email')

    const res = await axios.post('http://localhost:3030/test/e', {
      email : field_email.value,
    }).catch(() => {
      field_email.classList.remove('sm_c:border-brow_pod-1')
      field_email.classList.add('sm_c:border-[rgb(255,0,50)]') 
    })

    if(res.status === 200){
      field_email.classList.remove('sm_c:border-brow_pod-1')
      if(field_email.classList.contains('sm_c:border-[rgb(255,0,50)]'))
        field_email.classList.remove('sm_c:border-[rgb(255,0,50)]')
      field_email.classList.add('sm_c:border-[rgb(10,255,100)]')
    }

  }

  async function handleClickSignUp(dados) {
    document.getElementById('error-signup-div').style.display = 'hidden'
    var validationFail = false
    await testeLogin().catch((error) => {
      console.log(error)
      validationFail = true
    });
    await testeEmail().catch((error) => {
      console.log(error)
      validationFail = true
    });
    if(validationFail){
      document.getElementById('error-signup-div').style.display = 'block'
      document.getElementById('error-signup-div').focus()
      return
    }
    
    const dateFake = moment(startDate).format('DD/MM/YYYY')
    
    await axios.post("http://localhost:3030/signup", {
      login: dados.username,
      senha: dados.password,
      nome: dados.name,
      email: dados.email,
      data_nascimento: dateFake,
      lista_livros: []
    }).then((response) => {

      router.push('/login');
    }).catch((error) => {
      console.log(error)
    })

    
  };

  function testDate() {
    startDate === null ? setStartDate(new Date(1995, 0, 1)) : startDate
  }

  return (
    <div className="flex flex-col justify-between bg-signup-bg bg-no-repeat bg-cover min-h-screen sm_c:pt-28 md_c:pt-28">
      <Head>
        <title>MyBookshelf | Cadastro</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar bgColor={`brow_pod-1`} tittleColor={`white`} currentPage={"Cadastre-se"} image={"logonova2.png"} />
      <div className="pt-10 flex flex-col items-center bg-white bg-opacity-80 rounded-lg sm_c:mt-10 sm_c:mx-4 sm_c:mb-10 md_c:w-[120] md_c:mx-auto md_c:mb-10">
        <img className="sm_c:mx-auto justify-center" width={80} height={80} src="/images/logo_bg_brow.png" />
        <h2 className="font-luck flex items-center justify-center sm_c:mt-10 sm_c:text-2xl sm_c:text-center sm_c:mx-2 sm_c:text-brow_pod-1 md_c:py-4 md_c:text-2xl md:px-10">Registre-se em Segundos</h2>
        <p className="mx-5 font-inter border-brow_pod-1 sm_c:text-center">
          Use sua conta de email para registrar-se no MyBookshelf. É gratuito!
        </p>
        <Formik initialValues={{}} onSubmit={handleClickSignUp} validationSchema={validationSignup}>
          <Form id="form-signup" className="signup-form">
            <div className="sm_c:grid sm_c:grid-cols-1 sm_c:justify-items-center">
              <div id='error-signup-div'className="hidden bg-red-700 bg-opacity-10 mx-10 my-2 rounded-xl">
                <p id='error-signup'className="block text-xm text-red-700 text-center">ID Login ou Email já cadastrados!</p>
              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Nome Completo:
                  <div><Field name="name" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite seu nome" /></div>
                  <div><ErrorMessage component="p" name="name" className="text-xs text-red-700 text-center" /></div>
                </label>
              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">ID Login:
                  <div><Field id='field-username' name="username" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite seu username"/></div>
                  <div><ErrorMessage component="p" name="username" className="text-xs text-red-700 text-center" /></div>
                </label>
              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Email:
                  <div><Field id='field-email' name="email" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="user@email.com.br"/></div>
                  <div><ErrorMessage component="p" name="email" className="text-xs text-red-700 text-center" /></div>
                </label>
              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-2">Data de Nascimento:
                  <DatePicker id="date-picker" showYearDropdown adjustDateOnChange dropdownMode="select" name="birthdate" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" selected={startDate} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} maxDate={maxDate}/>
                  <ErrorMessage component="p" name="birthdate" className="text-xs text-red-700 text-center" />
                </label>

              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Senha:
                  <div><Field type="password" name="password" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite sua senha" /></div>
                  <div><ErrorMessage component="p" name="password" className="text-xs text-red-700 text-center" /></div>
                </label>
              </div>
              <div className="signup-form-group py-2">
                <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Confirmar Senha:
                  <div><Field type="password" name="confirmPassword" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2 " placeholder="Confirme sua senha" /></div>
                  <div><ErrorMessage component="p" name="confirmPassword" className="text-xs text-red-700 text-center"/></div>
                </label>
              </div>
              <div className="flex items-center justify-center py-8">
                <button className="button font-luck w-fit sm_c:px-16 sm_c:py-4 border-transparent sm_c:text-2xl rounded-md text-white bg-brow_pod-1 hover:text-white hover:bg-orange-500 duration-500 md:py-4 md_c:text-lg md_c:px-10" type="submit">
                  Continuar
                </button>
              </div>
              <p className="sm_c:mx-5 sm_c:font-inter sm_c:border-brow_pod-1 sm_c:text-left sm_c:mb-10 "> Ao continuar você concorda com nossos termos de uso e políticas de privacidade.</p>
            </div>
          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  )
}