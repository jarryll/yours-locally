const express= require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}


const allModels = require('./db');
const setRoutesFunction = require('./routes');
setRoutesFunction(app, allModels);



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const server = app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`)
})


let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);