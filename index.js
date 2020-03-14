/* this is our server file that will give us all the cool stuff we need */
const express = require( 'express' );
const PORT = process.env.PORT || 8080;
const orm = require( './orm' );
const app = express();
app.use( express.static('html') );
app.use( express.urlencoded({ extended: false }) );

app.post('/api/result', async function(req, res){
    // console.log(`[POST api/results recieved]`, req.body)
    const saveBurgerQuery = await orm.saveResultFn(req.body);
    // console.log(saveBurgerQuery);
    res.send('success!');
});

app.get('/api/result/:id', async function(req, res){
    console.log(`[POST api/results recieved]`, req.params.id);
    let burgerDbQuery = await orm.burgerDbFunc(req.params.id);
    // console.log(burgerDbQuery);
    res.send(burgerDbQuery);
});

app.get('/api/getburger/', async function(req, res){
    // console.log(`[POST api/results recieved]`, req.body);
    let getBurgerDbQuery = await orm.getBurgerFunc();
    // console.log(burgerDbQuery);
    res.send(getBurgerDbQuery);
});


app.listen(PORT, function () {
    console.log(`[Eat Da Burger] RUNNING, http://localhost:${PORT}`);
  });