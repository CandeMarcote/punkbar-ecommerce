import React, {useState} from 'react'

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    
    function getDataHandler() {
        fetch('https://api.punkapi.com/v2/beers')
        .then(response => {
            return response.json()
        })
        .then(data => {
            const transformData = data.map(product => {
                return {
                name: product.name,
                id: product.id,
                description: product.description,
                ibu: product.ibu,
                abv: product.abv,
                img_url: product.image_url,
                };
            });
            setProducts(transformData)
        })
    }
  return (
    <div onClick={getDataHandler}>ItemListContainer</div>
  )
}

export default ItemListContainer