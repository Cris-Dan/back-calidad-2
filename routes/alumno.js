const { Router } = require('express');
const router = Router();
const passport = require('passport');

const Alumno = require('../models/Alumno');

const jwt = require('jsonwebtoken');

router.get('/secret-alumno', (req, res) => {
    const mensaje = "";
    req.isAuthenticated() ? mensaje = "Alumno autenticado" : mensaje = "Alumno NO autenticado";
    res.json({ respuesta: mensaje });
});

router.post('/register-alumno', passport.authenticate('local-register-alumno',{failureFlash:true}), (req, res) => {
    
    if(req.user)
        res.json({ respuesta: 'Email enviado' });
    
});

router.get('/confirmation/:token', async (req,res)=>
{   

    console.log(req.params.token);
    const userdecode = jwt.decode(req.params.token);
    console.log(userdecode.data.email);
    if(!userdecode)
        res.json({estado:"Rechazado"});
    else {
        const alumno = await Alumno.findOne({email:userdecode.data.email});
        if(!alumno)
            res.json({estado:"Rechazado"});
        else
        {
            alumno.isVerified=true;
            await alumno.save();
            res.json({estado:"Aceptado"});
        }

}
});
   
router.post('/login-alumno', passport.authenticate('local-login-alumno',{failureRedirect:"/errorLogin"}), (req, res) => {
    if(req.user){
        console.log(req.user);
        res.json({ message: 'Alumno ha iniciado sesion' });
    }
    else
    {
        console.log(req.flash("error"));
        res.json({message:'Fallo en autenticacion'});
    }
});

/*Amiguitos intenten hacer que las apis devuelvan un mensaje */
/**cuando el login o el registro de alumnos estén erroneos */
/**Ejemplos: mensaje:"Error Login" o algo así XD */
router.get('/errorLogin',(req,res,next)=>{
    res.json({message:'Error Login'});
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