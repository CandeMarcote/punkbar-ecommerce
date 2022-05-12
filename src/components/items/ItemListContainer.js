import React, { useState, useEffect } from 'react';
import ItemPagination from './ItemPagination';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    let currentPage = undefined;

    const fetchProductsHandler = () => {
        setIsLoading(true);
        fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=10`)
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
            setProducts(transformProducts)
            setIsLoading(false)
        })
    }

    useEffect(()=> {
        fetchProductsHandler();
    }, [])

    const productInfoForFilters = products.map(product => {
        return {name: product.name, ibu: product.ibu, id: product.id}
    })

    function getCurrentPageHandler(page) {
        currentPage = page
    }

  return (
    <>
        {!isLoading && products.length > 0 && <ItemPagination products={products} onGetCurrentPage={getCurrentPageHandler} />}
    </>
  )
}

export default ItemListContainer