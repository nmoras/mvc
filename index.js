/* this is our server file that will give us all the cool stuff we need */
const express = require( 'express' );
const PORT = process.env.PORT || 8080;
const orm = require( './orm' );
const app = express();
app.use( express.static('public') );
app.use( express.urlencoded({ extended: false }) );

app.post('api/results', async function(req, res){
    console.log(`[POST api/results recieved]`, req.body)
    await orm.saveResult(req.body);
    response.send({message:`Thank you. saved ${req.body.name}`})
})

app.get('api/result', async function(req, res){
    let myList = await orm.displayResult(rq.params);
    response.send(myList)
})