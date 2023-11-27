import nodemailer from 'nodemailer';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import config from './config/config.js';
import path from 'path';
import __dirname from './utils/utils.js' 

const app = express();

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
    
    let img = ''
    switch (parseInt(monto)) {
        case 5000:
            img = '../public/assets/Gift_Cards_Imagenes/5000.png';
            break;
        case 6000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 6000.png';
            break;
        case 7000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 7000.png';
            break;
        case 8000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 8000.png';
            break;
        case 9000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 9000.png';
            break;
        case 10000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 10000.png';
            break;
        case 11000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 11000.png';
            break;
        case 12000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 12000.png';
            break;
        case 13000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 13000.png';
            break;
        case 14000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 14000.png';
            break;
        case 15000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 15000.png';
            break;
        case 16000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 16000.png';
            break;
        case 17000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 17000.png';
            break;
        case 18000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 18000.png';
            break;
        case 19000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 19000.png';
            break;
        case 20000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 20000.png';
            break;
        case 25000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 25000.png';
            break;
        case 30000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 30000.png';
            break;
        case 35000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 35000.png';
            break;
        case 40000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 40000.png';
            break;
        case 45000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 45000.png';
            break;
        case 50000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 50000.png';
            break;
        case 60000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 60000.png';
            break;
        case 70000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 70000.png';
            break;
        case 80000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 80000.png';
            break;
        case 90000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 90000.png';
            break;
        case 100000:
            img = './assets/Gift_Cards_Imagenes/Gift Card 100000.png';
            break;                              
      }
    try {
        await transport.sendMail({
            from: `Zoom <${config.mailing.auth.user}>`,
            to: mailDestinatario,
            subject: 'Gift card',
            html: `
            <center>
            <h1>${dedicatoria}</h1>
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
            <h2>${codigo}</h2>
            <img src="${img}"/>
            <h2><b>Condiciones de uso:</b></h2>
            <p>* El cupón debe utilizarse en una única compra pudiendo elegir todos los artículos que quieras. Si hay una diferencia, podras abonar en cualquier medio de pago disponible.
            * Los gastos de envío no están incluidos en el cupón.
            * No se reintegra la diferencia en caso de saldo a favor</p>
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


app.listen(8080, () => console.log('Listening'));