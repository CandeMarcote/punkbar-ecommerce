export const getCartItems = async (url) => {
    try {
        let resData = await fetch(url)
        if(resData.status === 500) {
            throw new SyntaxError("Problems with the server")
        }
        return resData;
    } catch (e) {
        console.error(e)
    }
}

export const postCartItem = async (url, data) => {
    let resData = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( async (result) => {
            return result
        } ,
        (error) => { 
            return error 
        });
    return resData;
}

export const deleteCartItem = async (url, data) => {
    let resData = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( async (result) => {
            return result
        } ,
        (error) => { 
            return error 
        });
    return resData;
}

export const updateCartItem = async (url, data) => {
    let resData = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( async (result) => {
            return result
        } ,
        (error) => { 
            return error 
        });
    return resData;
}

