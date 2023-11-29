import React, { useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        console.log(accessToken)
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    if (isAuthenticated) {
      fetchAccessToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <main>
      <h1>Auth0</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome!</p>
          <LogoutButton />
          <Profile accessToken={accessToken} />
        </div>
      ) : (
        <LoginButton />
      )}
      <p>Amazing design by Joaco</p>
    </main>
  );
};

const AuthenticatedApp = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID}
      redirectUrl={window.location.origin}
    >
      <App />
    </Auth0Provider>
  );
};

export default AuthenticatedApp;
