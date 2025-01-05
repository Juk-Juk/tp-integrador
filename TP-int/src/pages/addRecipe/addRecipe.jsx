import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useCreateRecipe } from "../../hooks/recipes/useCreateRecipe";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import './addRecipe.css';

const initRecipeValue = {
    author: '',
    createdDate: new Date(),
    stepByStep: '',
    description: '',
    title: '',
    image: '',
    urlToImage: '',
};

const AddRecipe = () => {

    const [recipe, setRecipe] = useState(initRecipeValue);
    //    const [isModalOpen, setIsModalOpen] = useState(false);

    const { createRecipe, error, loading, data } = useCreateRecipe();
    const { data: authors, error: authorsError, getAuthors, loading: authorsLoading } = useGetAuthors();

    useEffect(() => {
        getAuthors();
    }, []);

    useEffect(() => {
        if (!authorsLoading && authorsError) { //Show error loading the authors
            toast.error("Error al obtener los autores.");
        }
        if (authors?.length > 0) {
            setRecipe(prevState => ({
                ...prevState,
                author: authors[0]._id,
            }));
        }
    }, [authors, authorsError, authorsLoading]);

    useEffect(() => {
        if (loading) return;
        if (!error && data) {
            //handleCloseModal();
            setRecipe(initRecipeValue);
            toast.success("La receta se creó con éxito.");
        };
    }, [error, loading, data]);

    const isBtnDisabled = !(recipe.author && recipe.title && recipe.description && recipe.stepByStep);

    // const handleCloseModal = () => {
    //     cleanError();
    //     setIsModalOpen(false);
    // }

    const handleChange = (value, type) => {
        setRecipe((prevState) => {
            return {
                ...prevState,
                [type]: value,
            };
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setRecipe((prevState) => {
            return {
                ...prevState,
                image: file || null,
                urlToImage: file ? URL.createObjectURL(file) : null,
            };
        });
    };

    const handleClearImage = () => {
        if (recipe.urlToImage) {
            URL.revokeObjectURL(recipe.urlToImage);
        }
        setRecipe((prevState) => ({
            ...prevState,
            image: null,
            urlToImage: null,
        }));
    };

    const handleConfirm = () => createRecipe(recipe);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // if (recipe.author && recipe.title) {
        //     setIsModalOpen(true);
        // };
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form-recipe">
                    <label htmlFor="" className="label-recipe">Autor</label>
                    <select
                        className="input-recipe"
                        value={recipe.author}
                        onChange={(event) => handleChange(event.target.value, 'author')}
                    >
                        {authors?.length > 0 && authors?.map((author) => {
                            return <option value={author._id} key={author._id}>{author.name}</option>
                        })}
                    </select>
                    <label htmlFor="" className="label-recipe">Titulo</label>
                    <input
                        className="input-recipe"
                        type="text"
                        value={recipe.titulo}
                        onChange={(event) => handleChange(event.target.value, 'title')}
                        placeholder="Ingrese titulo"
                    />
                    <label htmlFor="" className="label-recipe">Fecha de publicación</label>
                    <DatePicker
                        className="input-recipe"
                        selected={recipe.createdDate}
                        onChange={(date) => handleChange(date, 'createdDate')}
                        dateFormat={'dd/MM/YYYY'}
                    />
                    <label htmlFor="" className="label-recipe">Ingredientes</label>
                    <textarea
                        className="input-recipe text-area-recipe"
                        value={recipe.stepByStep}
                        onChange={(event) => handleChange(event.target.value, 'stepByStep')}
                        placeholder="Ingrese ingredientes"
                    />
                    <label htmlFor="" className="label-recipe">Paso a paso</label>
                    <textarea
                        className="input-recipe text-area-recipe"
                        value={recipe.description}
                        onChange={(event) => handleChange(event.target.value, 'description')}
                        placeholder="Ingrese paso a paso"
                    />
                    <label className="label-recipe">
                        Seleccionar imagen:
                    </label>
                    <input
                        className="input-recipe"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {recipe.urlToImage && (
                        <div className="image-preview-container">
                            <p className="label-recipe">Vista previa de la imagen:</p>
                            <img
                                className="image-preview"
                                src={recipe.urlToImage}
                                alt="Vista previa"
                                onClick={handleClearImage}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn-recipe"
                        disabled={isBtnDisabled}
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                </form>
            </div>
            {/* {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    errorMsg={error && 'Ocurrió un error al crear la receta.'}
                    loading={loading}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    message="¿Estás seguro que desea crear un recipe?"
                />
            )} */}
        </>
    );
};

export default AddRecipe;