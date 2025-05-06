const axios = require('axios');

const BASE_URL = 'https://sandbox-partners-api.airalo.com';

async function getToken() {
    const response = await axios.post(`${BASE_URL}/v2/token`, {
        client_id: '7e29e2facf83359855f746fc490443e6',
        client_secret: 'e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb',
        grant_type: 'client_credentials'
    });
    return response.data.data.access_token;
}

async function placeOrder(token, packageSlug, quantity) {
    return await axios.post(`${BASE_URL}/v2/orders`, {
        package_id: packageSlug,
        quantity: quantity
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// async function getEsims(token, packageSlug, quantity) {
//     console.log('token>>', token);
//     console.log('packageSlug>>', packageSlug);
//     console.log('quantity>>', quantity);
//     const response = await axios.get(`${BASE_URL}/v2/sims`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         params: {
//             packages: packageSlug, // If supported
//             limit: quantity           // Use 'limit' if supported; fallback to slicing below otherwise
//         }
//     });
//     return response;
// }

async function getEsims(token, packageSlug, quantity) {
    const response = await axios.get(`${BASE_URL}/v2/sims`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            package_id: packageSlug,
            limit: quantity
        }
    });

    console.log('token', token);

    return response.data?.data || [];
}

module.exports = { getToken, placeOrder, getEsims };
