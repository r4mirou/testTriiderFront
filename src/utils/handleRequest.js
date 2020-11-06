const baseUrl = 'http://localhost:4005/graphql';

const POST = async (data) => {

    const res = await fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwMzIwMTczMH0.mkIz9wKfKhrM6_IXsLDHdJPBvGbf13tKILEoAHpnDLc'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return await res.json(); 
}

export { POST }