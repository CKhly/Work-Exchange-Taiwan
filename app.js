require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { PORT, API_VERSION } = process.env;
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.set('json spaces', 2);

app.get("/",(req,res)=>{
    res.send("Work Exchange Taiwan")
})

app.use('/api/' + API_VERSION, [
    require('./server/routes/admin_route'),
    require('./server/routes/host_route'),
    require('./server/routes/user_route')
]);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})