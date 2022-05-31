import Header from "../../components/Header";
import Head from "next/head";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../components/Modal"
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
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const now = new Date()
  const maxDate = new Date(now.getFullYear()-8, 11, 31)
  
  const validationEdit = yup.object().shape({
    name: yup.string().required("Campo NOME é obrigatório!").max(50, "Nome deve ter no máximo 50 caracteres!"),
    actual_password: yup.string().min(8, "Senha deve ter 8 caracteres!").max(20, "Tamanho máximo da senha é de 20 caracteres!"),
    new_password: yup.string().min(8, "Senha deve ter 8 caracteres!").max(20, "Tamanho máximo da senha é de 20 caracteres!"),
    confirmPassword: yup.string().oneOf([yup.ref("new_password"), null], "As senhas não são iguais!"),
    email: yup.string().email("Insira um email válido!").required("Campo EMAIL é obrigatório!"),
  });

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

  async function handleClickEdit(dados) {
    document.getElementById('error-edit-div').style.display = 'hidden'
    if(dados.email != user.email){
      var validationFail = false
      await testeEmail().catch((error) => {
        validationFail = true
      });
      if(validationFail){
        document.getElementById('error-edit-div').style.display = 'block'
        document.getElementById('error-edit-div').focus()
        return
      }
    }
    
    const { ['mybookshelf-token']: token } = parseCookies();

    const dateFake = moment(startDate).format('DD/MM/YYYY')
    if (dados.actual_password != '') {
      if(dados.new_password === undefined || dados.new_password === ''){
        setSuccess(false)
        setShowModal(true)
        return
      }
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
        if(response.status === 200){
          destroyCookie(undefined, 'mybookshelf-token');
          setSuccess(true)
          setShowModal(true)  
        }
      }).catch((error) => {
        console.log(error)
        setSuccess(false)
        setShowModal(true)
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
        if(response.status === 200){
          setSuccess(true)
          setShowModal(true)  
        }
      }).catch((error) => {
        console.log(error)
        setSuccess(false)
        setShowModal(true)
        
      })
    }

  };

  function testDate() {
    startDate === null ? setStartDate(moment(user.data_nascimento).toDate()) : startDate
  }

  const handleReturn = () => {
    router.replace(`/profile/view`);
  }

  const handleSuccess = () => {
    setShowModal(false)
    if(document.getElementById('new-password').value === ''){
      router.replace('/profile/view').then(() => router.reload())
      
    }
    else{
      router.replace('/')
    }
  }

  const validatePasswords = () =>{
    const actualpass = document.getElementById('actual-password')
    const newpass = document.getElementById('new-password')
    if(actualpass.value != ''){
      if(newpass.value === ''){
        newpass.classList.remove('border-brow_pod-1')
        newpass.classList.add('border-[rgb(255,0,50)]')   
      }
      else{
        newpass.classList.remove('border-[rgb(255,0,50)]')
        newpass.classList.add('border-brow_pod-1')
      }
      actualpass.classList.remove('border-[rgb(255,0,50)]')
      actualpass.classList.add('border-brow_pod-1')
      
    }
    else if(newpass.value != ''){
      if(actualpass.value === ''){
        actualpass.classList.remove('border-brow_pod-1')
        actualpass.classList.add('border-[rgb(255,0,50)]')
      }
      newpass.classList.remove('border-[rgb(255,0,50)]')
      newpass.classList.add('border-brow_pod-1')

    }else{
      actualpass.classList.remove('border-[rgb(255,0,50)]')
      actualpass.classList.add('border-brow_pod-1')

      newpass.classList.remove('border-[rgb(255,0,50)]')
      newpass.classList.add('border-brow_pod-1')
    }

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
          <Formik initialValues={{name: user.nome, email: user.email, actual_password: '', new_password : '', confirmPassword: '', birthdate: moment(user.data_nascimento).toDate()}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
            <Form className="items-center flex flex-col mt-10">
              <img className="mx-auto" width={80} height={80} src="/images/logo_bg_brow.png" />
              <div id='error-edit-div'className="hidden bg-red-700 bg-opacity-10 mx-10 my-2 rounded-xl">
                <p id='error-edit'className="block text-xm text-red-700 text-center px-2">Email já cadastrado!</p>
              </div>
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
                  <Field id="field-email" name="email" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite seu email" />
                  <ErrorMessage component="P" name="email" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Senha Atual:</p>
                  <Field id="actual-password" type="password" name="actual_password" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite sua senha" validate={validatePasswords}/>
                  <ErrorMessage component="P" name="actual_password" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Nova Senha:</p>
                  <Field id="new-password" type="password" name="new_password" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Digite sua nova senha" validate={validatePasswords}/>
                  <ErrorMessage id="error-new-password" component="P" name="new_password" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Confirmar Senha:</p>
                  <Field type="password" name="confirmPassword" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" placeholder="Confirme sua nova senha" />
                  <ErrorMessage component="P" name="confirmPassword" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <div className="">
                <label className="">
                  <p>Data de nascimento:</p>
                  <DatePicker showYearDropdown adjustDateOnChange dropdownMode="select" name="birthdate" className="rounded-2xl py-3 border-brow_pod-1 border-2 pl-2 font-inter" selected={startDate ? startDate : setStartDate(moment(user.data_nascimento).toDate())} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} maxDate={maxDate}/>
                  <ErrorMessage component="P" name="birthdate" className="text-xs text-red-700 text-center" />
                </label>
              </div>
              <button className="rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-4 py-2 mt-10 hover:bg-orange-500 hover:text-white duration-500" type="submit">
                Confirmar
              </button>

            </Form>
          </Formik>

          {
            success ? 
            <Modal show={showModal} textClose={document.getElementById('new-password').value === '' ? "Continuar Editando" : "Logar Novamente"} onClose={document.getElementById('new-password').value != '' ? () => {destroyCookie(undefined, 'mybookshelf-token'); router.replace('/login')} : () => {setShowModal(false)}} onAction={handleSuccess}>
                <div className="text-xl leading-6 font-medium text-gray-900 my-[7rem]">
                  <h3>Edições salvas!</h3>
                </div>
            </Modal>
            :
            <Modal show={showModal} textClose={"Tentar Novamente"} onClose={() => setShowModal(false)}>
              <div className="text-lg leading-6 font-medium text-gray-900 my-[7rem]">
                <h3>Erro ao salvar!</h3>
              </div>
                
                
            </Modal>
          }
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