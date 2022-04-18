import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from "next/router";
import Axios from "axios";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    signIn: async (dados) => {}
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const {'mybookshelf-token': token} = parseCookies();

        if(token){
            async () => 
            await Axios.get("http://localhost:3030/user", {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            }).then(response => {
                const { user } = response.data;
                setUser(user);
                  
            });
        }

    }, []);

    async function signIn(dados){
        await Axios.post("http://localhost:3030/login", {
            loginEmail: dados.username,
            senha: dados.password
        }).then(response => {
            const { user, token } = response.data;

            setCookie(undefined, 'mybookshelf-token', token, {
                maxAge: 86400, //1 dia
            });
    
            setUser(user);
    
            Router.push('/home');

        });
    };

    const context = { user, isAuthenticated, signIn }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}