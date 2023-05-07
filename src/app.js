import express from 'express';
import ProductManager from './ProductManager.js';


// Creamos la aplicación
const app = express();
const productManager = new ProductManager(".");

app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Definimos el metodo Get para la ruta /pro
app.get('/products', async (req, res) => {
	
	try {
		let allProduct = await productManager.getProductsFromFile();
		const limit = parseInt(req.query.limit, 10) || allProduct.length; 
		const limitedProducts = allProduct.slice(0, limit);
		res.json(limitedProducts);
	} catch (err) {
		res.json(err);
	}
});

// Definimos el metodo Get para la ruta /user/:id
app.get('/product/:id', async (req, res) => {
	// Buscamos el usuario por id
	const productId = parseInt(req.params.id, 10);
	let product = await productManager.getProductsById(productId);
	// Enviamos la respuesta
	if (product) {
		res.json(product);
	  } else {
		res.status(404).json({ message: 'Producto no encontrado' });
	  }
	
});


// Escuchamos el puerto 8080
app.listen(8080, () => {
	console.log('Estoy escuchando el 8080');
});
