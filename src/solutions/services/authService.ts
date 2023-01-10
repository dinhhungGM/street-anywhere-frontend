import { ISignInPayload, ISignUpPayload } from '../models/authModels';
import { default as axios } from './axios';

class AuthenticationService {
  signIn = async (payload: ISignInPayload) => {
    return await axios.post('/auth/sign-in', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
  signUp = async (payload: ISignUpPayload) => {
    return await axios.post('/auth/sign-up', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
  signInByGoogle = async (payload) => {
    return await axios.post('/auth/sign-in-by-google', payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
}

const authService = new AuthenticationService();
export default authService;
