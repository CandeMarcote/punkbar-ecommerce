const productsAPI = [];

const fetchProductsHandler = () => {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
    .then(response => {
            return response.json();
        }
    )
    .then(data => {
        const transformProducts = data.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                ibu: product.ibu,
                abv: product.abv,
                price: product.ph,
                img: product.image_url,
            };
        });
        products = transformProducts;
    })
}
console.log(productsAPI)

fetchProductsHandler();
export default productsAPI