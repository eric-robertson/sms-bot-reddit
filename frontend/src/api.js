const api = 'https://mptduze5ug.execute-api.us-east-1.amazonaws.com/dev'

export async function request ( route, body, callback ) {

    const data = await fetch(`${api}/${route}`, {
        method: 'POST',
        body : JSON.stringify(body)
    })
    
    return data.json()

}