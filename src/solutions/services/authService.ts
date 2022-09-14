import { default as axios } from './axios';

class AuthenticationService {
  signIn = async (payload: { username: string; password: string; }) => {
    return await axios.post('/auth/sign-in', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
}

const authService = new AuthenticationService();
export default authService;
