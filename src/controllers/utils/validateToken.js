export default function validateToken(req, res) {
    res.json({
        msg: 'Your access token was successfully validated!',
        auth: req.auth,
    });
}
