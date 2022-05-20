const connectToMongoose = require('./db');
const express = require('express');
const app = express();
var cors = require('cors')
 
const port = 5000;

app.use(cors());
connectToMongoose();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello wold hi there");
});
app.use('/api/auth', require('./router/auth'));
app.use('/api/notes', require('./router/notes'));

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
})