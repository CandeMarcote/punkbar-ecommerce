const postUser = async (url, data) => {
    try {
        const resData = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(resData.status !== 200) {
            throw new SyntaxError("incorrect email or password")
        }
        return resData;
    } catch (e) {
        console.error(e)
    }
}

export default postUser;