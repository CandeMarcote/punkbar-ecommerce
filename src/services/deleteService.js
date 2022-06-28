const deleteRequestData = async (url, data) => {
    console.log('start of the DELETE request')
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
        console.log('end of the DELETE request')
    return resData;
}

export default deleteRequestData;