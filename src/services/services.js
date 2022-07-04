const getRequestData = async (url) => {
    let resData = await fetch(url)
        .then( res => res.json() )
        .then( async (result) => {
            return result
        } ,
        (error) => { 
            return error 
        });
    return resData;
}

export default getRequestData;