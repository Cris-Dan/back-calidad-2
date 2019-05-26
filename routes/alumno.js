const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/secret-alumno', (req, res) => {
    const mensaje = "";
    req.isAuthenticated() ? mensaje = "Alumno NO autenticado" : mensaje = "Alumno NO autenticado";
    res.json({ respuesta: mensaje });
});

router.post('/register-alumno', passport.authenticate('local-register-alumno'), (req, res) => {
    res.json({ respuesta: 'Alumno registrado' });
});

router.post('/login-alumno', passport.authenticate('local-login-alumno'), (req, res) => {
    res.json({ respuesta: 'Alumno ha iniciado sesion' });
});

router.get('/logout-alumno', (req, res) => {
    req.logOut();
    res.json({ respuesta: 'Alumno ha cerrado sesion' });
});

router.get('/facebook', passport.authenticate('facebook'));


router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;