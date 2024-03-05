const apiUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
const data = {
    grant_type: 'password',
    username: process.env.AUTH0_TEST_USERNAME,
    password: process.env.AUTH0_TEST_PASSWORD,
    audience: process.env.AUTH0_AUDIENCE,
    scope: process.env.AUTH0_TEST_SCOPE,
    client_id: process.env.AUTH0_TEST_CLIENT_ID,
    client_secret: process.env.AUTH0_TEST_CLIENT_SECRET,
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data),
};

let responseData = {};

try {
    let response = await fetch(apiUrl, requestOptions);
    responseData = await response.json();
    if (response.status != 200 || !responseData.access_token) {
        throw Error('Auth Token fetch failed');
    }
} catch (error) {
    console.error('Error:', error);
    process.exit(1);
}

const auth = {
    accessToken: responseData.access_token,
    idToken: responseData.id_token,
};

export default auth;
