import React, { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import sedeApi from '@/api/sede.Api';
import axios from 'axios';





export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}



const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};


interface Props {
	children?: React.ReactNode | undefined;
}


export const AuthProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
	const {data,status} =useSession()
	const router = useRouter();

    useEffect(() => {
        if(status==="authenticated"){
           //console.log({user:data?.user})
           dispatch({type:"[Auth] - Login", payload:data?.user as IUser})
 
        } 
 
     }, [status,data])


     
    const loginUser = async (Email: string, Password: string): Promise<boolean> => {
		try {
			const { data } = await sedeApi.post('/user/login', { Email, Password });
			const { token, user } = data;
			console.log(token,user);
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		Email:string,Password:string,Firstname:string,Lastname:string,Address:string,Sector:string
	  ): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await sedeApi.post('/user/register', {Email,Password,Firstname,Lastname,Address,Sector});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			//Todo return
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data.message === '--Este correo ya esta registrado') {
				  return {
					hasError: true,
					message: 'El correo electrónico ya está registrado',
				  };
				} else if (error.response?.data.message === '-cedula registrada') {
				  return {
					hasError: true,
					message: 'La cédula ya está registrada',
				  };
				}
			  }
			
			  
			return {
				hasError: true,
				message: ' no se pudo crear el usuario - intento de nuevo',
			};
		}
	};


	const logout = () => {
		
		signOut();
		//router.reload();
		//Cookies.remove('token');

	};


    return (<AuthContext.Provider value={{
           ...state,
           //method:
                loginUser,
				registerUser,
				logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
};