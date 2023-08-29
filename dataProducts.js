const productsData = [
    {
    id: 1,
    nombre: "Air Jordan 1 Mid SE",
    precio: 82999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Air-Jordan-1Mid-SE-JS.png',
    },

    {
    id: 2,
    nombre: "Nike Air Force 1 Mid 07",
    precio: 89999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Force1-Mid-07-JS.png',
    },

    {
    id: 3,
    nombre: "Nike Air Max Pulse",
    precio: 54999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Max-Pulse-JS.png',
    },

    {
    id: 4,
    nombre: "Nike Dunk Low",
    precio: 65999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Dunk-Low-JS.png'
    },

    {
    id: 5,
    nombre: "Yeezy Boost 350",
    precio: 129999,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Yeezy-Boost-350-V2-JS.png'
    },

    {
    id: 6,
    nombre: "Ultraboost Light",
    precio: 111999,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Ultraboost-Light-JS.png'
    },

    {
    id: 7,
    nombre: "Stan Smith x Andre Saraiva",
    precio: 36299,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Stan-Smith-x-Andre-Saraiva2-Adidas-JS.png'
    },

    {
    id: 8,
    nombre: "Rebound",
    precio: 48999,
    category: "Converse",
    marca: "Converse",
    cardImg: './Products/Rebound.png',
    },

    {
    id: 9,
    nombre: "Fastbreak Pro Mid",
    precio: 56699,
    category: "Converse",
    marca: "Converse",
    cardImg: './Products/Fastbreak-Pro-Mid.png'
    },

    {
    id: 10,
    nombre: "Cuck Taylor All Star",
    precio: 50499,
    category: "Converse",
    marca: "Converse",
    cardImg: './Products/Cuck-Taylor-All-Star.png'
    },

    {
    id: 11,
    nombre: "Suede Classic XXI",
    precio: 37799,
    category: "Puma",
    marca: "Puma",
    cardImg: './Products/Suede-Classic-XXI.png'
    },

    {
    id: 12,
    nombre: "Slip Stream",
    precio: 50499,
    category: "Puma",
    marca: "Puma",
    cardImg: './Products/SlipStream.png'
    },

    {
    id: 13,
    nombre: "Court Rider Chaos",
    precio: 84950,
    category: "Puma",
    marca: "Puma",
    cardImg: './Products/basketball-Court-Rider-Chaos.png'
    },

    {
        id: 14,
        nombre: "Fila Renno Animal",
        precio: 69340,
        category: "Fila",
        marca: "Fila",
        cardImg: './Products/Fila-Renno-Animal.png'
    },

    {
    id: 15,
    nombre: "Gucci Ace con Tribanda - Mujer",
    precio: 261015,
    category: "Gucci",
    marca: "Gucci",
    cardImg: './Products/Gucci-Ace-Tribanda.png'
    },

    {
    id: 16,
    nombre: "Gucci Light con Tribanda - Hombre",
    precio: 261015,
    category: "Gucci",
    marca: "Gucci",
    cardImg: './Products/Gucci-Light-Tribanda.png'
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
