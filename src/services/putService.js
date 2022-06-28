const putRequestData = async (url, data) => {
    console.log('start of the PUT request')
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
        console.log('end of the PUT request')
    return resData;
}

export default putRequestData;