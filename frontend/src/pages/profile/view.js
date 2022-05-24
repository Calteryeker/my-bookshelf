import Head from "next/head";
import { useRouter } from "next/router"
import { parseCookies, destroyCookie } from "nookies";
import { useState, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from '../../components/Modal'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

export default function ProfileView() {
  const router = useRouter()
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const validationDelete = yup.object().shape({
    password: yup.string().min(8, "Senha deve tem no mínimo 8 caracteres!").required("Informe a senha"),
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
          console.log(response.status)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
    }
  }

  return (
      <>
          <div>
              <Head>
                <title>MyBookshelf | Meu Perfil</title>
                <link rel="icon" href="/logo.png" />
              </Head>
              <h1>Meu Perfil:</h1>
              <div className="user-info">
                <p>Nome: {user ? user.nome : ""}</p>
                <p>Email: {user ? user.email : ""}</p>
                <p>Username: {user ? user.login : ""}</p>
                <p>Data de Nascimento: {user ? moment(user.data_nascimento).format("DD/MM/YYYY") : ""}</p>
              </div>
              <button className="button" onClick={handleClickEdit}>Editar Informações</button>
              <button className="button" onClick={() => setShowModal(true)}>Excluir Conta</button>
              <button className="button" onClick={handleReturn}>Retornar</button>
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <h3>Deseja excluir permanentemente sua conta?</h3>
                    <Formik initialValues={{}} validationSchema={validationDelete} onSubmit={deleteAccount}>
                      <Form className="signup-form">
                        <div className="signup-form-group">
                          <label className="signup-form-field-type">Senha Atual:
                            <Field type="password" name="password" className="form-field" placeholder="Digite sua senha" />
                            <ErrorMessage component="span" name="password" className="form-error" />
                          </label>
                          <button type="submit">Confirmar</button>
                        </div>
                      </Form>
                  </Formik>
          </Modal>  
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