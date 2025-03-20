import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RefreshTokenRequestConfig, TokenResponse, TokenResponseConfig } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

const domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;

export const readTokenFromStorage = async (setUser: any) => {
    const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ?? '';
    const discovery = {
        authorizationEndpoint: `${domain}/authorize`,
        tokenEndpoint: `${domain}/oauth/token`,
    };

    const { getItem, setItem } = useAsyncStorage('jwtToken')

    const tokenString:string | null = await getItem();

    if (!tokenString)
        return;
    
    const tokenConfig: TokenResponseConfig = JSON.parse(tokenString);
    if (tokenConfig) {
        let tokenResponse = new TokenResponse(tokenConfig);
        
        if (tokenResponse.shouldRefresh()) {
            const refreshConfig: RefreshTokenRequestConfig = { clientId: auth0ClientId, refreshToken: tokenConfig.refreshToken }
            const endpointConfig: Pick<AuthSession.DiscoveryDocument, "tokenEndpoint"> = discovery
            
            tokenResponse = await tokenResponse.refreshAsync(refreshConfig, endpointConfig);
        }
        setItem(JSON.stringify(tokenResponse.getRequestConfig()));
        
        const decoded = jwtDecode(tokenResponse.accessToken);
        setUser({ jwtToken: tokenResponse.accessToken, decoded })
    }
};

export const removeTokenFromStorage = async () => {
    const { removeItem } = useAsyncStorage('jwtToken');
    await removeItem();
    return true;
}

export const revokeToken = async (token:string) => {
    try {
        const result = await AuthSession.revokeAsync(
            { token },
            { revocationEndpoint: `${domain}/v2/logout` }
        );
    } catch (error) {
        console.error('Error revoking token:', error);
    }
};