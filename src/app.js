import nodemailer from 'nodemailer';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import config from './config/config.js';
import path from 'path';
import __dirname from './utils/utils.js' 

const app = express();
const port = process.env.PORT || 3000

app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs', // Extensión de archivos Handlebars
    layoutsDir: path.join(process.cwd(), 'src/views/layouts/'),
    defaultLayout: 'main', // Nombre del archivo de layout predeterminado (main.hbs en tu caso)
}));
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'hbs'); // Motor de vistas
  
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('publics'))
app.use('/public', express.static(path.join(__dirname, 'public')));

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

app.post('/procesar-formulario', async (req, res) => {
    const { mailDestinatario, dedicatoria, remitente, codigo, monto } = req.body;
    
    let img = `https://maling-production.up.railway.app/public/assets/Gift_Cards_Imagenes/${monto}.png`
    
    try {
        await transport.sendMail({
            from: `Zoom <${config.mailing.auth.user}>`,
            to: mailDestinatario,
            subject: 'Gift card',
            html: `
            <center>
            <h1>❤${dedicatoria}❤</h1>
            <h3>${remitente}</h3>
            <h2>Te enviaron una GIFT CARD de ZOOM !!!!</h2>
            </center>
            <p>Para hacer uso de tu regalo, <br>
            1) Ingresa a https://tiendazoom.com.ar <br>
            2) Elegí lo que más te guste. <br>
            3) Al momento de finalizar la compra pone el cupón de descuento y listo... se descontara de tu compra el importe de la Gift Card. <br>
            
            Si queres utilizar tu gift card en nuestras sucursales
            Envianos un mensaje al whatsapp 116911-6683 con al menos un día de anticipación para que te cambiemos el código por otro que deberás mostrar al realizar la compra en cualquiera de nuestros locales.</p>
            <center>
            <p>TU CUPON ES</p>
            <p>${codigo}</p>
            <img src="${img}" style="width: 500px;"/>
            <h2><b>Condiciones de uso:</b></h2>
            <p>* El cupón debe utilizarse en una única compra pudiendo elegir todos los artículos que quieras. Si hay una diferencia, podras abonar en cualquier medio de pago disponible.
            <br>* Los gastos de envío no están incluidos en el cupón.
            <br>* No se reintegra la diferencia en caso de saldo a favor</p>
            </center>
            `
        });
        res.send('Mail sent');
    } catch (e) {
        res.json({ error: e });
    }
});

app.get('/', (req, res) => {
  res.render('index', {});
});
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

app.listen(port, () => console.log('Listening'));