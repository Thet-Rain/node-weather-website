const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Deefine paths for express config
const publicDir = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

console.log(partialsPath)

//Setup handlebars engine and views location
app.set('view engine' , 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDir));

//Use handle bar
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Thet Rain'
    });
})

//about page with handle bar
app.get('/about' , (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'Thet Rain'
    })
})

app.get('/help' , (req,res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is help message',
        name: 'Thet Rain'
    })
})



app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address to search"
        })
    }

    geocode(req.query.address ,  (error , {latitude, longitude, location} = {} )  => {
        if (error){
                res.send({ error })
        }
        else
        {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    res.send({
                        error: error
                    })
                }
                else
                {
                    res.send({
                        forecast: forecastData,
                        location
                    })
                }
           })
        }        
    })

})



//404 page for help
app.get('/help/*', (req,res) => {
    res.render('404page', {
        title: '404Page',
        error: 'Help article not found!',
        name: 'Thet Rain'
    })
})
//* get request for all 
app.get('*', (req,res) => {
    res.render('404page', {
        title: '404 Page',
        error: 'Page not found!',
        name: 'Thet Rain'
    })
})

app.listen( port , () => {
    console.log('Server is up on port ' + port);
});