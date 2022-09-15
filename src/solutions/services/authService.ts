import { default as axios } from './axios';

type SignInPayload = { username: string; password: string; };
type SignUpPayload = { username: string; password: string; firstName: string; lastName: string; };

class AuthenticationService {
  signIn = async (payload: SignInPayload) => {
    return await axios.post('/auth/sign-in', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
  signUp = async (payload: SignUpPayload) => {
    return await axios.post('/auth/sign-up', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
}

const authService = new AuthenticationService();
export default authService;
