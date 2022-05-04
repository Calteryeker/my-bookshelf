import axios from "axios";
import Router from "next/router"
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ProfileView() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const { ['mybookshelf-token']: token} = parseCookies();
        
        const fetchUser = async () => {
            await axios.get('http://localhost:3030/user', {
                headers : {
                    Authorizathion : `Bearer ${token}`,
                }
            }).then(
                (res) => {
                    if(res.status == 200){
                        setUser(res.data.user)
                    }
                }
            ).catch();
        }

        fetchUser();
    }, [])

    const handleClickEdit = () => {
        Router.push(`/profile/edit`);
      }

    return (
        <>
            <div>
                <h1>Meu Perfil:</h1>
                <div class="user-info">
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