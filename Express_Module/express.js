// Debug module is used for debugging and spitting about the file when we run in debug mode
//mode. importing it with require(debug).(filename). To run it in debug mode we have to use DEBUG=* node name.js in windows
// we have use like set DEBUG=* & node name.js . Its useful for production as itwould not emit messages in noraml mode
//DEBUG=*, DEBUG=filename,
// Morgan  = write something related to web traffic . like a middlewere gives info about web traffic
// to run npm script for debug we have to use npm run debug (use run ) not like npm debug
//env variables put it in nodemonCongif{"env":{PORT:8080}}
//template engine (ejs). To set template engine we use app.set('view engine','ejs)
// and where views are located using app.set('views','path')
// the variables to pass to the template engine view we declare it using app.render('viewname', {variabalename:val})to be used in index.ejs

const express = require('express');
const debug = require('debug')('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

//automatically looks for index.html, ifn not found it goes to below code
// app.use(express.static(path.join(__dirname, '/public/')));

//where views ar located
app.set('views', path.join(__dirname, '../src/vies'));
//this is how you tell what the view enegine is
app.set('view engine','ejs');

app.get('/', (req, res) => {
    // res.send('Welcome')
    res.render('index',{title: 'Welcome to sai',data:[1,2,3,4]});
})

app.listen(port,() =>{
    debug('listening on port 4200')
})