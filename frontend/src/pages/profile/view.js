import { Formik, Form, Field, ErrorMessage } from "formik";
import { parseCookies, destroyCookie } from "nookies";
import { useState, useContext } from "react";
import { useRouter } from "next/router"
import { AuthContext } from "../../contexts/AuthContext";
import Head from "next/head";
import Modal from '../../components/Modal';
import Header from "../../components/Header";
import UserInfo from '../../components/UserInfo';
import * as yup from "yup";
import axios from "axios";
import Footer from "../../components/Footer";

export default function ProfileView() {
  const router = useRouter()
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const validationDelete = yup.object().shape({
    password: yup.string().min(8, "Senha deve tem no mínimo 8 caracteres!").max(20, "Tamanho máximo da senha é de 20 caracteres!").required("Informe a senha"),
  });

  const handleClickEdit = () => {
      router.push(`/profile/edit`);
  }

  const handleReturn = () => {
    router.push(`/home`);
  }

  async function deleteAccount(dados){
    const { ['mybookshelf-token']: token} = parseCookies();
    
    if(dados.password){
      await axios.delete("http://localhost:3030/u/profile/delete", {
        headers: {
            'Authorizathion': `Bearer ${token}`,
        },  
        data:{
          senha: dados.password
        }
      }).then((response) => {
          destroyCookie(undefined, 'mybookshelf-token');
          router.push('/')
      }).catch(
        (error) => {
          document.getElementById('error-message').innerText = "Falha ao deletar, Senha Incorreta!"
        }
      )
    }
  }

  return !user ? (
    <div className="pt-28 flex flex-col justify-between min-h-screen bg-romantic-1 ">
      <Header title={"Meu Perfil"}>
          <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
      </Header>
      <div className="text-justify font-bold text-5xl cursor-pointer font-[Poppins] text-gray-800 flex flex-col items-center bg-white rounded-2xl mx-auto mb-auto px-4 py-10 ">
          Carregando ...
      </div>
    </div>
  ) :
  
  (
    <>
      <div className="bg-romantic-1 flex flex-col justify-content align-center min-h-screen">
        <Head>
          <title>MyBookshelf | Meu Perfil</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Header title={"Meu Perfil"}>
          <button onClick={handleReturn} className="rounded-xl left-0 md:left-10 fixed text-left text-base hover:bg-orange-500 hover:text-white duration-500 p-2 bg-romantic-1 text-brow_pod-1">Retornar</button>
        </Header>

        <div className="flex flex-col items-center mt-20 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[50vw]">
          <UserInfo user={user}/>
          <div className="flex flex-row justify-center items-center">
            <button className="inline rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-2 py-2 w-32 hover:bg-orange-500 duration-500 mr-1" type="button" onClick={handleClickEdit}>Editar Conta</button>
            <button className="inline rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-2 py-2 w-32 hover:bg-orange-500 duration-500 ml-1" type="button" onClick={() => setShowModal(true)}>Excluir Conta</button>
          </div>
                      
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className="px-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900 px-2">Deseja excluir permanentemente sua conta?</h3>
              <Formik initialValues={{}} validationSchema={validationDelete} onSubmit={deleteAccount}>
                <Form className="signup-form">
                  <div className="signup-form-group py-2">
                    <label className="sm_c:grid sm_c:grid-cols-1 sm_c:gap-0">Senha Atual:
                      <Field type="password" name="password" className="font-inter sm_c:form-field sm_c:rounded-2xl sm_c:py-3 sm_c:px-16 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:pl-2" placeholder="Digite sua senha" />
                      <ErrorMessage component="div" name="password" className="block text-xs text-red-700 text-center" />
                    </label>
                    <button className="mt-1 font-luck w-fit sm_c:px-12 sm_c:py-2 border-transparent sm_c:text-2xl rounded-md text-white bg-brow_pod-1 hover:text-white hover:bg-orange-500 duration-500 md:py-4 md_c:text-lg md_c:px-10" type="submit">Confirmar</button>
                  </div>
                </Form>
              </Formik>
              <p id="error-message" className="block text-xl text-red-700 text-center"></p>
            </div>
            
          </Modal>
        </div>
        
          
      </div>
      <Footer/>
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