import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useRegister = () => {
  const [RegisterState, setRegisterState] = useState({ //Initial State
    error: null,
    loading: false,
    success: false,
  });

  const registerFn = async ({ email, password, role="user" }) => {
    const urlRegister = 'auth/register';
    try {
      setRegisterState({ //Set loading to true
        error: null,
        loading: true,
        success: false,
      });
      const response = await axiosInstance.post(urlRegister, { email, password, role }); //Posts the email and password
      if (response.status === 200) {
        setRegisterState({
        error: null,
        loading: false,
        success: true,
        })
      } else {
        setRegisterState({ //Set loading to false
          error: null,
          loading: false,
          success: false,
        });
      }
    } catch (error) {
      console.error("Register failed:", error);
      setRegisterState({
        error: error.message,
        loading: false,
        success: false,
      });
    }
  };

  return {
    registerFn,
    registerStateError: RegisterState?.error,
    registerStateLoading: RegisterState?.loading,
    registerStateSuccess: RegisterState?.success,
  };
};
