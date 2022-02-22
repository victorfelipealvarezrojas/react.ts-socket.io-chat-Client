export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchNoToken = async (endpoint: string, data: any, method: string = Method.GET) => {
    const url = `${BASE_URL}/${endpoint}`;
    if (method === Method.GET) {
        return await (await fetch(url)).json();
    } else {
        return await (await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })).json();
    }
}

export const fetchOkToken = async (endpoint: string, data?: any, method: any = 'GET') => {
    const url = `${BASE_URL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    if (method === Method.GET) {
        return await (await fetch(url, {
            headers: {
                'x-token': token
            }
        })).json();
    } else {
        return await (await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify(data)
        })).json();
    }
}


