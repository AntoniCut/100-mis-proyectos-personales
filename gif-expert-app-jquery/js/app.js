//  ********************************************************
//  **********  /gif-expert-app-jquery/js/app.js  **********
//  ********************************************************


$(document).ready(function () {


    //  -----  Documento cargado...  -----
    console.warn('----------  Documento Cargado!!!  ----- ', 'CDN Google - jQuery version:', $.fn.jquery, ' ----------', '\n');

    //  -----  referencia al HTML  -----
    const $gifContainer = $('#gif-container');

    //  -----  URL de la API y array de categorias  -----
    const apiKey = 'Bo2lAzEB44TJ9AMpsgFW8sFeknTezEHs';
    let categories = [];


    //  ----------  Evento de envío del formulario  ----------
    $('#add-category-form').on('submit', function (e) {

        e.preventDefault();

        const category = $('#category-input').val().trim();

        if (category.length > 1) {
            addCategory(category);
            $('#category-input').val('');       // Limpia el input
        }
    });


    //  ----------  Función para agregar una nueva categoría  ----------
    function addCategory(category) {

        if (categories.includes(category)) {
            alert(`La categoría "${category}" ya existe.`);
            return;
        }

        categories.push(category);      // Añadir la nueva categoría
        loadGifs(category);             // Cargar GIFs para la nueva categoría
    }



    //  ----------  Función para cargar GIFs desde la API de Giphy  ----------
    function loadGifs(category) {

        //  -----  Crear un contenedor separado para cada categoría  -----
        const $categoryContainer = $('<div class="category-container"></div>');

        //  -----  Añadir el título de la categoría y el mensaje "Loading..." en el nuevo contenedor  -----
        const $loadingMessage = $('<h2>Loading...</h2>');
        
        $categoryContainer.append($loadingMessage);
        $categoryContainer.append(`<h3>${category}</h3>`);
       

        //  -----  Insertar el contenedor de la nueva categoría al principio de #gif-container  -----
        $gifContainer.prepend($categoryContainer);


        //  -----  Realizar la petición AJAX  -----
        $.ajax({

            url: `https://api.giphy.com/v1/gifs/search`,
            method: 'GET',
            data: {
                api_key: apiKey,
                q: category,
                limit: 10
            },

            success: function (response) {

                //  -----  Eliminar el mensaje "Loading..."  -----
                $loadingMessage.remove();

                //  -----  Crear un grid para los GIFs  -----
                const $grid = $('<div class="card-grid"></div>');

                //  -----  obtenemos la información de la data y la guardamos en un div  -----
                response.data.forEach(img => {
                    const $gifItem = $(`
                        <div class="card">
                            <p>${img.title}</p>
                            <img src="${img.images.downsized_medium.url}" alt="${img.title}" />
                        </div>
                    `);

                    //  -----  Añadir el GIF al grid  -----
                    $grid.append($gifItem);
                });


                //  -----  Añadir el grid al contenedor de la categoría  -----
                $categoryContainer.append($grid);
            },

            error: function (xhr) {

                //  -----  Eliminar el mensaje "Loading..."  -----
                $loadingMessage.remove();

                if (xhr.status === 429) alert('Límite de solicitudes excedido. Intenta nuevamente más tarde.');
                else alert('Error al cargar los GIFs.');
            }
        });
    }
});
