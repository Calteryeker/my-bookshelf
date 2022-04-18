import { useContext } from "react"
import { AuthContext, AuthProvider } from "../../contexts/AuthContext"

export default function Index() {
  const { user } = useContext(AuthContext)
  
  return (
        <h1>Welcome {user.nome}</h1>
    )
  }