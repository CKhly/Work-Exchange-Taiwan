require('dotenv').config();
const express = require('express');
const app = express();
const { PORT, API_VERSION } = process.env;

app.get("/",(req,res)=>{
    res.send("Work Exchange Taiwan")
})

app.use('/api/' + API_VERSION, [
    require('./server/routes/host_route'),
    require('./server/routes/user_route')
]);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})