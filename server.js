const express = require("express");
const app = express();
const fs = require ('fs')

const file = './files/products.json'

class Container {
    constructor (productsList, fileJson = file) {
        this.productsList = productsList;
        this.fileJson = fileJson;
    }

    getAll(productsArray){
        async function read(){
          try{
            const fileContent = await fs.promises.readFile('./files/products.json', 'utf-8');
            
            const productsList = JSON.parse(fileContent);
            let {products} = productsList;
            
            console.log (products);
          
        } catch (err) {
            console.log ('lo setimos a habido un error', err);
          };
        };
        
        read();
    };
};

app.get('/', (req, res) =>{
    res.send({msj:"aprendiendo Express"})
});

app.get('/products', (req, res) =>{
    const data = new Container ("./files/products.json")
    res.send(data.getAll())
});

app.get('/productRandom', (req, res) => {
    
    fs.readFile(productsFile, (error) => {
        if (error){
            console.log (`Lo sentimos ha habido un error!!!.
            El archivo a sido renombrado, o no Existe`)
        } else {
            const fileContent = fs.readFileSync(productsFile, 'utf-8');
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
