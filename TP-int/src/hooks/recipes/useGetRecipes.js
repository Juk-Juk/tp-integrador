import { useCallback, useState } from "react";
import axios from "../../config/axiosConfig";
import { buildURLWithFilters } from "../../utils/buildUrlWithFilters";

export const useGetRecipes = () => {
  const [recipeState, setRecipeState] = useState({ //Initial State
    data: [],
    metaData: null,
    error: null,
    loading: false,
  });

  const getAllRecipes = useCallback(async (filters) => {
    try {
      setRecipeState({ //Loading State
        data: null,
        metaData: null,
        error: false,
        loading: true,
      });
      const urlRecipesWithFilters = buildURLWithFilters("/blogs", filters);
      const response = await axios.get(urlRecipesWithFilters);
      if (response.status === 200) { //If correct response
        setRecipeState({
          data: response.data.data,
          metaData: response.data.meta,
          error: false,
          loading: false,
        });
      } else {
        setRecipeState({ //If error
          data: null,
          metaData: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) { //Show error
      setRecipeState({
        data: null,
        metaData: null,
        error: error,
        loading: false,
      });
    }
  }, []);

  return {
    getAllRecipes,
    data: recipeState.data,
    metaData: recipeState.metaData,
    error: recipeState.error,
    loading: recipeState.loading,
  };
};
