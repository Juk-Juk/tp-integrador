import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useCreateRecipe = () => {

    const [createRecipeState, setCreateRecipeState] = useState({ //Initial State
        data: null,
        error: null,
        loading: false,
    });

    const createRecipe = async ({ author, createdDate, stepByStep, description, image, title }) => {

        const formData = new FormData();
        formData.append("author", author);
        formData.append("createdDate", createdDate.toISOString());
        formData.append("stepByStep", stepByStep);
        formData.append("description", description);
        formData.append("title", title);
        image && formData.append("image", image);

        try {
            setCreateRecipeState({ //Set loading to true
                data: null,
                error: null,
                loading: true,
            });
            const response = await axiosInstance.post("/recipes", formData, { //Wait for server response
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data) { //If there's response save data
                setCreateRecipeState({
                    data: response.data,
                    error: null,
                    loading: false,
                });
            } else {
                setCreateRecipeState({ //If not response
                    data: null,
                    error: 'Error',
                    loading: false,
                });
            }
        } catch (error) {
            setCreateRecipeState({ //Show error
                data: null,
                error: error.message,
                loading: false,
            });
        }
    };

    const cleanError = () => {
        setCreateRecipeState(prevState => ({
            ...prevState,
            error: null,
        }));
    };

    return {
        createRecipe,
        cleanError,
        data: createRecipeState.data,
        error: createRecipeState.error,
        loading: createRecipeState.loading,
    };
};