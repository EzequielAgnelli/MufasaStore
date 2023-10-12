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
    nombre: "Air Force 1 Mid 07",
    precio: 89999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Force1-Mid-07-JS.png',
    },

    {
    id: 3,
    nombre: "Air Max Pulse",
    precio: 54999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Nike-Air-Max-Pulse-JS.png',
    },

    {
    id: 18,
    nombre: "Air Max 97 OG",
    precio: 89999,
    category: "Nike",
    marca: "Nike",
    cardImg: './Products/Air-Max-97-OG.png',
    },

    {
    id: 4,
    nombre: "Dunk Low",
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
    nombre: "Stan Smith x AS",
    precio: 36299,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Stan-Smith-x-Andre-Saraiva2-Adidas-JS.png'
    },

    {
    id: 17,
    nombre: "Forum Bold",
    precio: 58999,
    category: "Adidas",
    marca: "Adidas",
    cardImg: './Products/Forum-Bold.png'
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
    id: 20,
    nombre: "Run Star Legacy CX",
    precio: 100000,
    category: "Converse",
    marca: "Converse",
    cardImg: './Products/Run-Star-Legacy-CX.png',
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
    nombre: "Renno Animal",
    precio: 69340,
    category: "Fila",
    marca: "Fila",
    cardImg: './Products/Fila-Renno-Animal.png'
    },

    {
    id: 19,
    nombre: "Electrowave 2",
    precio: 41750,
    category: "Fila",
    marca: "Fila",
    cardImg: './Products/Fila-Electrowave-2.png',
    },

    {
    id: 15,
    nombre: "Gucci Ace Tribanda - F",
    precio: 261015,
    category: "Gucci",
    marca: "Gucci",
    cardImg: './Products/Gucci-Ace-Tribanda.png'
    },

    {
    id: 16,
    nombre: "Gucci Light Tribanda - M",
    precio: 261015,
    category: "Gucci",
    marca: "Gucci",
    cardImg: './Products/Gucci-Light-Tribanda.png'
    },
];

// Función para dividir los productos en arrays.
const divideProducts = (size) => {
    let listaDeProductos = []
    for(let i = 0; i < productsData.length; i += size)
    listaDeProductos.push(productsData.slice(i, i + size));
return listaDeProductos
}

const appState = {
    products: divideProducts(3), // El boton va a ir dividiendo los productos en 3. 
    currentProducts: 0, // Que empiece en 0.
    limiteProducts: divideProducts(3).length,
    activeFilter: null 
}
