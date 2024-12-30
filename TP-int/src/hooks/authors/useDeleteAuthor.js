import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useDeleteAuthor = () => {
  const [deleteAuthorState, setDeleteAuthorState] = useState({ //Initial State
    success: false,
    error: null,
    loading: false,
  });

  const deleteAuthor = async (authorId) => {
    setDeleteAuthorState({ //Loading
      success: false,
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.delete(`/authors/${authorId}`); //Wait for response
      if (response.status === 204) { //If response
        setDeleteAuthorState({
          success: true,
          error: null,
          loading: false,
        });
      } else {
        setDeleteAuthorState({ //If not response
          success: false,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setDeleteAuthorState({ //Show error
        success: false,
        error: error,
        loading: false,
      });
    }
  };

  return {
    deleteAuthor,
    deleteAuthorSuccess: deleteAuthorState?.success,
    deleteAuthorError: deleteAuthorState?.error,
    deleteAuthorLoading: deleteAuthorState?.loading,
  };
};