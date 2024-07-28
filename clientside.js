


const express = require('express'); 
const database = require('./dentalhaven.db');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.post('./submit', (req, res)=> {
    const {name, email, phone, date, time, message} = req.body;

    database.insertUser(name, email, phone, date, time, message, () => {
        res.send('FROM SUBMITTED SUCESSFULLY');
    });
});

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:${8080}')
})