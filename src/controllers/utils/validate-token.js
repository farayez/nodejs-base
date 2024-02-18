export default function validateToken(req, res) {
    res.send({
        msg: 'Your access token was successfully validated!',
    });
}
