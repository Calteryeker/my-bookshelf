import Router from "next/router"
import { parseCookies } from "nookies";
import { useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../contexts/AuthContext";

export default function ProfileView() {
    const { user } = useContext(AuthContext);

    const handleClickEdit = () => {
        Router.push(`/profile/edit`);
      }

    return (
        <>
            <div>
                <h1>Meu Perfil:</h1>
                <div className="user-info">
                    <p>Nome: {user ? user.nome : ""}</p>
                    <p>Email: {user ? user.email : ""}</p>
                    <p>Username: {user ? user.login : ""}</p>
                    <p>Data de Nascimento: {user ? moment(user.data_nascimento).format("DD/MM/YYYY") : ""}</p>
                </div>
                <button className="button" onClick={handleClickEdit}>Editar Informações</button>
                <button className="button" >Excluir Conta</button>   
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