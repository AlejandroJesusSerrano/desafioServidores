const { Console } = require('console');
const fs = require('fs');

const file = './files/products.json';

class Container {
    constructor (productsList, fileJson = file) {
        this.productsList = productsList;
        this.fileJson = fileJson;
    }

    save(product) {
        fs.readFile('./files/products.json', (error) => {
            if (error){
                this.productsList = {products:[]}; 
                let {products} = this.productsList;

                product.id = 1;
                products.push(product)

                async function saveProduct (){
                    try {
                        await fs.promises.writeFile ('./files/products.json', JSON.stringify({products}));
                    } catch (err) {
                        console.log(err);
                    };
                };                
                saveProduct();
                console.log(this.productsList)
            
            }else{
                
                const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
                let productsList = JSON.parse(fileContent);
                
                let {products} = productsList; 

                product.id = products[products.length-1].id+1;
                products.push (product);

                console.log(products)

                async function saveProduct (){
                    try {
                        await fs.promises.writeFile('./files/products.json', JSON.stringify({products}));
                    }catch (err){
                        console.log(err);
                    };
                };
                
                saveProduct();
                
                console.log(productsList);
            }
        });
    };
    
    getById (id) {
        fs.readFile('./files/products.json', (error) => {
            if (error){
                console.log (`Lo sentimos ha habido un error!!!.
                El archivo a sido renombrado, o no Existe`)
            } else {
                const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
                const productsList = JSON.parse(fileContent);

                let {products} = productsList

                const finded = products.find(figure=>figure.id === id);

                console.log(finded);
            };
        });
    };

    getAll(){
        fs.readFile('./files/products.json', (error) => {
            if (error){
                console.log (`Lo sentimos ha habido un error!!!.
                El archivo a sido renombrado, o no Existe`)
            } else {
                const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
                const productsList = JSON.parse(fileContent);

                let {products} = productsList

                console.log(products);
                return products
            };
        });
    };

    deleteById (id) {
        fs.readFile('./files/products.json', (error) => {
            if (error){
                console.log (`Lo sentimos ha habido un error!!!.
                El archivo a sido renombrado, o no Existe`)
            } else {
                const fileContent = fs.readFileSync('./files/products.json', 'utf-8');
                const productsList = JSON.parse(fileContent);

                let {products} = productsList

                const newProducts = products.filter((figure) => figure.id !== id);

                products = newProducts;

                async function saveProduct (){
                    try {
                        await fs.promises.writeFile('./files/products.json', JSON.stringify({products}));
                    }catch (err){
                        console.log(err);
                    };
                };
                
                saveProduct();

                console.log(productsList)
            };
        });
    };

    deleteAll () {
        fs.unlink('./files/products.json', error => {
            if (error) {
                console.log (`Lo sentimos ha habido un error!!!.
                El archivo a sido renombrado, o no Existe`)
            } else {
                console.log (`Se ha eliminado todo el contenido`)
            };
        });

    };
};



let af = new Container([], './files/products.josn');

af.save({
    title: 'Black Panther',
    price: 130000,
    thumbnail: 'https://i.pinimg.com/564x/51/94/69/519469af5de77effdc6dce583dab6cad.jpg'
});


// af.getById (3)

//af.getAll()

//af.deleteById(4)

//af.deleteAll()


/*
{
    title: 'Spider Man',
    price: 127000,
    thumbnail: 'http://www.hottoys.com.hk/photos/aUQy/PNdR9g8bjptL3JuZWC90UznY14yErCB23z05.jpg?1656947449233'
};

{
    title: 'Batman', 
    price: 127000,
    thumbnail: 'https://i.pinimg.com/564x/60/c6/ae/60c6aed75f5b94fb26feff6bc764970c.jpg'
};

{
    title:'Iron Man',
    price: 129000,
    thumbnail: 'https://i.pinimg.com/564x/49/ba/6e/49ba6e71cfe66941d1936a8abb4beaad.jpg'
};

{
    title:'Super man',
    price: 130000,
    thumbnail: 'https://i0.wp.com/www.supermanhomepage.com/clickandbuilds/SupermanHomepage/wp-content/uploads/2021/03/knightmare-batman-and-superman_dc-comics_gallery_605385b18c193.jpg?fit=692%2C1000&ssl=1'
}

{
    title: 'Black Panther',
    price: 130000,
    thumbnail: 'https://i.pinimg.com/564x/51/94/69/519469af5de77effdc6dce583dab6cad.jpg'
}
*/




