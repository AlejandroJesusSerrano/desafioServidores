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
        // const productsList = JSON.parse(fileContent);
        // let {products} = productsList;
        // console.log(products)
        // return products

    getRandom = async() =>{
         try{
            await fs.promises.readFile(file, 'utf-8')
            //  let product = fs.readFile(file, 'utf-8');
            .then (product => {
                let randomObject = JSON.parse(product)//[Math.floor(Math.random() * product.length)];
                let random = Math.floor(Math.random()*randomObject.length);
                console.log(randomObject[random]) //esto si muestra por consola
                return randomObject[random] // no lo puedo ver en el navegador
            })
        } catch (error) { 
            console.log (`Lo sentimas a habido un error`, error)
        }
    };
// else {
//             const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
//             const productsList = JSON.parse(fileContent);

//             let {products} = productsList;

//             

//             res.send(randomObject)
//         };
//     });
// });
}

app.get('/', (req, res) =>{
    res.send({msj:"aprendiendo Express"})
});

app.get('/products', (req, res) =>{
    const data = new Container ("./files/products.json")
    data.getAll().then((product) => res.send(JSON.parse(product)))
});

app.get('/productRandom', (req, res) =>{
    const data = new Container ("./files/products.json")
    res.send(data.getRandom())//.then((products) => res.send(JSON.parse(product)))
});
// app.get('/productRandom', (req, res) => {
    
//     fs.readFile('./files/products.json', (error) => {


const PORT = 8080;
const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
