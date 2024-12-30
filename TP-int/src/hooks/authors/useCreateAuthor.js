import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useCreateAuthor = () => {
  const [createAuthorState, setCreateAuthorState] = useState({ //Initial State
    data: null,
    error: null,
    loading: false,
  });

  const createAuthor = async (author) => {
    setCreateAuthorState({ //Loading
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.post("/authors", author);
      if (response.status === 201) { //If response
        setCreateAuthorState({
          data: response.data,
          error: null,
          loading: false,
        });
      } else {
        setCreateAuthorState({ //If not response
          data: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setCreateAuthorState({ //Show error
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  return {
    createAuthor,
    createAuthorData: createAuthorState?.data,
    createAuthorError: createAuthorState?.error,
    createAuthorLoading: createAuthorState?.loading,
  };
};
