// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { TokenResponseConfig } from 'expo-auth-session';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';
import { readTokenFromStorage } from '@/lib/utils';

const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ?? '';
const domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
const redirectUri = AuthSession.makeRedirectUri({scheme: 'exp'})

const discovery = {
  authorizationEndpoint: `${domain}/authorize`,
  tokenEndpoint: `${domain}/oauth/token`,
};

interface User {
  jwtToken?: string;
  decoded?: any;
}

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  promptAsync: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
WebBrowser.maybeCompleteAuthSession();

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const { setItem: setToken } = useAsyncStorage('jwtToken')

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
      {
          clientId: auth0ClientId,
          scopes: ["openid", "profile", "email", "offline_access"],
          extraParams: {
            audience: `${domain}/api/v2/`,
            access_type: "offline",
            prompt: 'login'
          },
          redirectUri
      },
      discovery
  );

  useEffect(() => {
      readTokenFromStorage(setUser)
      if (result) {
          if (result?.type === 'error') {
              Alert.alert(
                  'Authentication error',
                  result.params.error_description || 'something went wrong'
              );
              return;
          }
          else if (result?.type === 'cancel') {
              Alert.alert('Authentication error', 'Authentication was canceled');
              return;
          }
          else if (result?.type === 'success') {
              const code = result.params.code;
              if (code) {
                  const getToken = async () => {
                      const codeRes = await AuthSession.exchangeCodeAsync(
                          {
                          code,
                          redirectUri,
                          clientId: auth0ClientId,
                          clientSecret: 'sQ-eaXLPfLF1qGBy0FrKhVppypRAuw-HCyL_dN-GrSVqw2oivD6-AlSZAwvkgLJz',
                          extraParams: { code_verifier: request?.codeVerifier ?? '' }
                          },
                          discovery
                      );
                      const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
                      
                      const jwtToken = tokenConfig.accessToken;
                      
                      setToken(JSON.stringify(tokenConfig));
                      
                      const decoded = jwtDecode(jwtToken);
                      setUser({ jwtToken, decoded })

                  }
                  getToken()
              }
          }
      }
  }, [result]);

  return (
    <UserContext.Provider value={{ user, setUser, promptAsync }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
