import React, { useState, useEffect, useCallback } from 'react';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const fetchProductsHandler = () => {
        setIsLoading(true);
        fetch('https://api.punkapi.com/v2/beers')
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

   

  return (
    <>
        {!isLoading && products.length> 0 && <ItemList products={products} />}
    </>
  )
}

export default ItemListContainer