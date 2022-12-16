const express = require('express');
const app = express();

app.get('/' , (req,res)=>{
    res.send("server started")
});

app.listen(3003)