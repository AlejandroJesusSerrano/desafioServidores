const express = require("express");
const app = express();
const fs = require ('fs')

const file = './files/products.json'

class Container {
    constructor (fileJson) {
        
        this.fileJson = fileJson;
    }      
    

    getAll = async() => {
          try{
            
                return await fs.promises.readFile(file, 'utf-8');

            } catch (err) {
                
                console.log ('lo setimos a habido un error', err);
            
            };
        };
        

    getRandom = async() =>{
         try{
            const data  = await fs.promises.readFile(file, 'utf-8')
            console.log(data)
            const products = JSON.parse(data)
            console.log(products)
            const random = await (Math.floor(Math.random() * (products.length)+1)) //  let product = fs.readFile(file, 'utf-8');
            if (random <= products.length) {
                const foundProduct = products.filter((prod) => prod.id === random)
                console.log (random)
                console.log(foundProduct)
                return foundProduct
                
            };
        } catch (error) {
            console.log ('Lo sentimos ha habido un error', error)
        };
    };
};

app.get('/', (req, res) =>{
    res.send({msj:"aprendiendo Express"})
});

app.get('/products', (req, res) =>{
    const data = new Container ("./files/products.json")
    data.getAll().then((product) => res.send(JSON.parse(product)))
});

app.get('/productRandom', (req, res) =>{
    const data = new Container ("./files/products.json")
    data.getRandom().then((products) => res.send(products))//.then((products) => res.send(JSON.parse(product)))
});
// app.get('/productRandom', (req, res) => {
    
//     fs.readFile('./files/products.json', (error) => {


const PORT = 8080;
const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
