const express = require("express");
const app = express();
const fs = require ('fs')

const files = './files/products.json'

app.get('/', (req, res) =>{
    res.send({msj:"aprendiendo Express"})
});

app.get('/products', (req, res) =>{
    
    fs.readFile('./files/products.json', (error) => {
        if (error){
            console.log (`Lo sentimos ha habido un error!!!.
            El archivo a sido renombrado, o no Existe`)
        } else {
            const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
            const productsList = JSON.parse(fileContent);

            let {products} = productsList;           
            
            res.send(products)
        };
    });
});

app.get('/productRandom', (req, res) => {
    
    fs.readFile('./files/products.json', (error) => {
        if (error){
            console.log (`Lo sentimos ha habido un error!!!.
            El archivo a sido renombrado, o no Existe`)
        } else {
            const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
            const productsList = JSON.parse(fileContent);

            let {products} = productsList;

            let randomObject = products[Math.floor(Math.random() * products.length)];

            res.send(randomObject)
        };
    });
});

const PORT = 8080;
const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
