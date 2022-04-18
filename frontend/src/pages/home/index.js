import { parseCookies } from "nookies"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "../../contexts/AuthContext"

export default function Index() {
  const { user } = useContext(AuthContext)
  
  return (
    <>
      <Head>
        <title>MyBookshelf | Home</title>
      </Head>
      <h1>Welcome {user.nome}</h1>
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