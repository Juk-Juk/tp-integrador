import { useEffect, useState } from "react";
import { useGetRecipes } from "../../hooks/recipes/useGetRecipes";
import { format } from "date-fns";

import "./RecipesPage.css";

const initialFilters = { //Initial Filters
    pageSize: 10,
    title: '',
    sortBy: "createdDate",
    order: "desc",
};


const RecipesPage = () => {
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState(initialFilters)

    const { data: recipes, metaData, error, getAllRecipes, loading } = useGetRecipes();

    useEffect(() => {
        const filtersWithPage = { ...filters, page }
        getAllRecipes(filtersWithPage);
    }, [getAllRecipes, filters, page]);

    const getImageSrc = (image) => {
        if (!image || !image.data || !image.type) return null;

        // Change the binary array into a Base64 array
        const binaryString = Array.from(new Uint8Array(image.data))
            .map((byte) => String.fromCharCode(byte))
            .join('');
        const base64String = btoa(binaryString);

        // Make an url with the image data
        return `data:${image.type};base64,${base64String}`;
    };

    const handleChangeSearch = (event) => setSearchInput(event.target.value);

    const handleKeyUpSearch = (event) => { //Filters upon searching
        if (event.code === "Enter") {
            setFilters(prevState => ({
                ...prevState,
                title: event.target.value,
            }));
        }
    };

    const handleCleanSearch = () => { //Filters upon cleaning the search bar
        setSearchInput('');
        setFilters(prevState => ({
            ...prevState,
            title: '',
        }));
    };

    if (loading) { //Show loading state
        return <p>Cargando noticias...</p>;
    }

    if (error) { //Show error state
        return <p>Error al cargar noticias: {error.message}</p>;
    }

    return (
        <>
            <div className="search-container">
                <input
                    className="search-input"
                    onKeyUp={handleKeyUpSearch}
                    onChange={handleChangeSearch}
                    value={searchInput}
                    type="text"
                    placeholder="Buscar por título..."
                />
                <button
                    className="search-btn"
                    onClick={handleCleanSearch}
                >
                    X
                </button>
            </div>
            <div className="recipes-list">
                {recipes?.length ? (
                    recipes.map((recipe, index) => {
                        const createdDate = recipe.createdDate ? format(new Date(recipe.createdDate), 'dd/MM/yyyy') : '-';
                        return (
                            <div className="recipes-item" key={index}>
                                <h2>{recipe.title}</h2>
                                <p><strong>Autor:</strong> {recipe.author.name || "Desconocido"}</p>
                                <p><strong>Fecha de creación:</strong> {createdDate}</p>
                                <p>{recipe.description}</p>
                                <img src={getImageSrc(recipe.image)} alt={recipe.title} className="recipes-image" />
                            </div>
                        );
                    })
                ) : (
                    <h3>No se encontraron resultados</h3>
                )}

                {recipes?.length && (
                    <div className="pagination">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={!metaData?.hasPrevPage}
                        >
                            Anterior
                        </button>
                        <span>Página {page} de {metaData?.totalPages}</span>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={!metaData?.hasNextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default RecipesPage;