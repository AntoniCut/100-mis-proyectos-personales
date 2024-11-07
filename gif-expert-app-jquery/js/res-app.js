//  ********************************************************
//  **********  /gif-expert-app-jquery/js/app.js  **********
//  ********************************************************


// $(document).ready(function () {
    
     //  -----  Documento cargado...  -----
     console.warn('----------  Documento Cargado!!!  ----- ', 'CDN Google - jQuery version:', $.fn.jquery, ' ----------', '\n');

//     //  -----  Crear un contenedor para añadir los gifts  -----
//     const $categoryContainer = $(`<div class="category-container"></div>`);


//     const apiKey = 'Bo2lAzEB44TJ9AMpsgFW8sFeknTezEHs';
//     let categories = [];


//     //  -----  Evento de envío del formulario  -----
//     $('#add-category-form').on('submit', function (e) {
//         e.preventDefault();
//         const category = $('#category-input').val().trim();
//         if (category.length > 1) {
//             addCategory(category);
//             $('#category-input').val('');
//         }
//     });


//     //  ----------  Función para agregar una nueva categoría  ----------
//     function addCategory(category) {
        
//         if (categories.includes(category)) {
//             alert(`La categoría "${category}" ya existe.`);
//             return;
//         }
        
//         categories.unshift(category);       // Agrega la categoría al inicio del array
//         loadGifs(category);                 // Llama a cargar los GIFs para la nueva categoría
//     }



//     //  ----------  Función para cargar GIFs desde la API de Giphy  ----------
//     function loadGifs(category) {
        

//         // Añadir el título de la categoría y un mensaje de "cargando"
//         $categoryContainer.append(`<h3>${category}</h3>`);
        
//         const $loadingMessage = $('<h2>Loading...</h2>');
//         $categoryContainer.append($loadingMessage);


//         // Insertar el contenedor de la categoría en la parte superior de #gif-container
//         $('#gif-container').prepend($categoryContainer);

        
        
//         //  -----  Petición HTTP usando AJAX  -----
//         $.ajax({
            
//             url: `https://api.giphy.com/v1/gifs/search`,
//             method: 'GET',
//             data: {
//                 api_key: apiKey,
//                 q: category,
//                 limit: 10
//             },
            
//             success: function (response) {
//                 $loadingMessage.remove(); // Eliminar el mensaje "Loading..."
                
//                 // Crear un grid para las imágenes
//                 const $grid = $('<div class="card-grid"></div>');
//                 response.data.forEach(img => {
//                     const $gifItem = $(`
//                         <div class="card">
//                             <p>${img.title}</p>
//                             <img src="${img.images.downsized_medium.url}" alt="${img.title}" />
//                         </div>
//                     `);
//                     $grid.append($gifItem);
//                 });


//                 // Añadir el grid de imágenes al contenedor de la categoría
//                 $categoryContainer.append($grid);

//             },

//             error: function (xhr) {
//                 $loadingMessage.remove(); // Eliminar el mensaje "Loading..." en caso de error
//                 if (xhr.status === 429) {
//                     alert('Límite de solicitudes excedido. Intenta nuevamente más tarde.');
//                 } else {
//                     alert('Error al cargar los GIFs.');
//                 }
//             }
//         });
//     }
// });


$(document).ready(function () {


    //  -----  Documento Cargado...  ----------
    console.warn('----------  Documento Cargado!!!  ----- ', 'CDN Google - jQuery version:', $.fn.jquery, ' ----------', '\n');
    
    //  -----  referencias al HTML  -----
    const $gifContainer = $('#gif-container');

    //  -----  creamos un grid donde iran las imágenes  -----
    const $grid = $('<div class="card-grid"></div>');


    //  -----  URL de la API  -----
    const apiKey = 'Bo2lAzEB44TJ9AMpsgFW8sFeknTezEHs';
    
    //  -----  array de categorias  -----
    let categories = [];


    //  ----------  Evento de envío del formulario  ----------
    $('#add-category-form').on('submit', function (e) {

        e.preventDefault();

        const category = $('#category-input').val().trim();

        if (category.length > 1) {

            addCategory(category);
            $('#category-input').val('');
        }
    })


    //  ----------  Función para agregar una nueva categoría  ----------
    function addCategory(category) {

        if (categories.includes(category)) {
            alert(`La categoría "${category}" ya existe.`);
            return;
        }

        //  -----  Agrega la categoría al inicio del array  -----
        categories.unshift(category);
        console.log(categories);
        loadGifs(category);
    }



    //  ----------  Función para cargar GIFs desde la API de Giphy  ----------
    function loadGifs(category) {

         //  -----  Limpia el contenido previo de #gif-container antes de cargar la nueva categoría  -----
         $gifContainer.empty();

         //  -----  Añadimos el título de la categoría y el mensaje de carga al contenedor  -----
         $gifContainer.prepend(`<h3>${category}</h3>`);
         const $loadingMessage = $('<h2>Loading...</h2>');
         $gifContainer.prepend($loadingMessage);

       
        //  -----  Petición HTTP utilizando AJAX  -----
        $.ajax({

            url: `https://api.giphy.com/v1/gifs/search`,
            method: 'GET',
            data: {
                api_key: apiKey,
                q: category,
                limit: 10
            },

            success: function (response) {
                
                $loadingMessage.remove();
                const gifs = response.data.map(img => ({
                    id: img.id,
                    title: img.title,
                    url: img.images.downsized_medium.url
                }));
                displayGifs(gifs);
            },

            error: function (xhr) {
                
                $loadingMessage.remove();
                if (xhr.status === 429) {
                    alert('Límite de solicitudes excedido. Intenta nuevamente más tarde.');
                } else {
                    alert('Error al cargar los GIFs.');
                }
            }
        });
    }



    //  ----------  Función para mostrar los GIFs en la interfaz  ----------
    function displayGifs(gifs) {

        

        //  -----  recorremos las imágenes obtenidas de la petición y 
        //  -----  añadimos cada imagen a una cardL  -----
        gifs.forEach(gif => {

            const $gifItem = $(`
                <div class="card">
                    <p>${gif.title}</p>
                    <img src="${gif.url}" alt="${gif.title}" />
                </div>
            `);

            $grid.append($gifItem);
        });


        //  -----  añadimos el grid con las imágenes al contenedor principal  -----
        $gifContainer.append($grid);
    }

})
