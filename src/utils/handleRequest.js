const baseUrl = 'http://localhost:4005/graphql';

const POST = async (data) => {

    const res = await fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('tknTriider')}`
        },
        body: JSON.stringify(data)
    });

    return await res.json(); 
}

export { POST }