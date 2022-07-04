const postOrder = async (url, data) => {
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

export default postOrder;