const productsData = [
    {
    id: 1,
    nombre: "Air Jordan 1 Mid SE",
    precio: 70000,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Air-Jordan-1Mid-SE-JS.png',
    },

    {
    id: 2,
    nombre: "Nike Air Force 1 Mid 07",
    precio: 80000,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Force1-Mid-07-JS.png',
    },

    {
    id: 3,
    nombre: "Nike Air Max Pulse",
    precio: 90000,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Max-Pulse-JS.png',
    },

    {
    id: 4,
    nombre: "Nike Dunk Low",
    precio: 50000,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Dunk-Low-JS.png',
    },

    {
    id: 5,
    nombre: "Yeezy Boost 350",
    precio: 40000,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Yeezy-Boost-350-V2-JS.png',
    },

    {
    id: 6,
    nombre: "Ultraboost Light",
    precio: 30000,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Ultraboost-Light-JS.png',
    },

    {
    id: 7,
    nombre: "Stan Smith x Andre Saraiva",
    precio: 80000,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Stan-Smith-x-Andre-Saraiva2-Adidas-JS.png',
    },

    {
        id: 8,
        nombre: "Rebound",
        precio: 65000,
        category: "Converse",
        marca: "Converse",
        cardImg: './Products/Rebound.png',
    },

    {
        id: 9,
        nombre: "Fastbreak Pro Mid",
        precio: 75000,
        category: "Converse",
        marca: "Converse",
        cardImg: './Products/Fastbreak-Pro-Mid.png'
    }
];

// Función para dividir los productos en arrays.
const divideProducts = (size) => {
    let listaDeProductos = []
    for(let i = 0; i < productsData.length; i += size)
    listaDeProductos.push(productsData.slice(i, i + size));
return listaDeProductos
}

// Concepto de ESTADO (State). Este va a guardar informacion y escuchar informacion.
const appState = {
    products: divideProducts(3), // El boton va a ir dividiendo mis productos en 3. 
    currentProducts: 0, // Que empiece en 0.
    limiteProducts: divideProducts(3).length,
    activeFilter: null 
}

