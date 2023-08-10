const {session} = require("./src/client");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
  const client = session();
  res.send();
});

app.listen(PORT,()=>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
