import Axios from "axios";

export async function recoverUser(token){
    const response = await Axios.get('http://localhost:3030/user', {
        headers: {
            'Authorizathion': `Bearer ${token}`,
        }
    })

    const recoveredUser = await response.data;

    return recoveredUser.user;
}