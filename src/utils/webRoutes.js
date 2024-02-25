export default function addRoutes(app) {
    app.get('/auth', function (req, res) {
        res.render('pages/auth');
    });
    app.get('/success', (req, res) =>
        res.render('pages/success', { user: userProfile }),
    );
    app.get('/error', (req, res) => res.send('error logging in'));
}
