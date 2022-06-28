<<<<<<< HEAD
const deleteRequestData = async (url) => {
=======
const deleteRequestData = async (url, data) => {
>>>>>>> b300187a556d8350e5f9c1f4e76f370b4953a12a
    console.log('start of the DELETE request')
    let resData = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
<<<<<<< HEAD
        }
=======
        },
        body: JSON.stringify(data)
>>>>>>> b300187a556d8350e5f9c1f4e76f370b4953a12a
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