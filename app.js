const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());

const mainRouter = require('./router/mainRouter')
app.use('/', mainRouter)

app.listen(3000,function (req,res) {
    console.log("서버가 실행되고 있다!");
})