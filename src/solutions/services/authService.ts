import { SignInPayload, SignUpPayload } from '../models/authModels';
import { default as axios } from './axios';

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
