import { useState } from "react";
import { useAuth } from "./useAuth";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../config/axiosConfig";

export const useLogin = () => {
  const [loginState, setLoginState] = useState({ //Initial State
    error: null,
    loading: false,
  });

  const { login } = useAuth();

  const loginFn = async ({ email, password }) => {
    const urlLogin = 'auth/login';
    try {
      setLoginState({ //Set loading to true
        error: null,
        loading: true,
      });
      const response = await axiosInstance.post(urlLogin, { email, password }); //Posts the email and password
      if (response.status === 200) {
        const { accessToken } = response.data;
        const decodedToken = jwtDecode(accessToken);
        login(accessToken, decodedToken?.role);
      } else {
        setLoginState({ //Set loading to false
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginState({
        error: error.message,
        loading: false,
      });
    }
  };

  return {
    loginFn,
    loginStateError: loginState?.error,
    loginStateLoading: loginState?.loading,
  };
};
