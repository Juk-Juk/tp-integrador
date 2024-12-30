import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useGetAuthors = () => {
  const [getAuthorsState, setGetAuthorsState] = useState({ //Initial State
    data: [],
    error: null,
    loading: false,
  });

  const getAuthors = async () => {
    setGetAuthorsState({ //Loading
      data: [],
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.get("/authors"); //Wait for response
      if (response.status === 200) { //If response
        setGetAuthorsState({
          data: response.data,
          error: null,
          loading: false,
        });
      } else { //If not response
        setGetAuthorsState({
          data: [],
          error: true,
          loading: false,
        });
      }
    } catch (error) { //Show error
      setGetAuthorsState({
        data: [],
        error: error,
        loading: false,
      });
    }
  };

  return {
    getAuthors,
    data: getAuthorsState?.data,
    error: getAuthorsState?.error,
    loading: getAuthorsState?.loading,
  };
};
