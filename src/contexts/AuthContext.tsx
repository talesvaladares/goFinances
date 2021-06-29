import React,{createContext, useState} from 'react';

type User = { 
  id: string;
  name: string;
  email: string;
  photo?: string;
};

interface AuthContextData {
  user: User;

}

export const AuthContext = createContext({ } as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps){

  const user = {} as User;

  return(
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}

