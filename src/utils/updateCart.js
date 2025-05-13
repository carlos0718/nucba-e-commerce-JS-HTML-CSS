import {cartSection} from '../app/cartSection.js';

export function sumQttyProd(product) {
	let dataLs = localStorage.getItem('carrito');
	dataLs = JSON.parse(dataLs);

	let index = dataLs.findIndex((p) => p.id === product.id);
	if (index !== -1) {
		//actualizando el producto en el array
		dataLs[index].quantity++;
	}
	//si no existe, agregar el producto al carrito
	else {
		product.quantity = 1; //agregando la propiedad quantity al producto
		dataLs.push(product);
	}
	// guardando el array en el localStorage
	localStorage.setItem('carrito', JSON.stringify(dataLs));
	if (index !== -1) {
		return dataLs[index].quantity;
	}
}

export function restQttyProd(product) {
	let dataLs = localStorage.getItem('carrito');
	dataLs = JSON.parse(dataLs);
	//validar si producto existe en el carrito
	let index = dataLs.findIndex((p) => p.id === product.id);
	if (index !== -1 && dataLs[index].quantity > 1) {
		//actualizando el producto en el array
		dataLs[index].quantity--;

		//actualizando el localStorage
		localStorage.setItem('carrito', JSON.stringify(dataLs));
		return dataLs[index].quantity;
	}
	return 1;
}

export function deleteProdCart(product) {
	console.log('entraa delete');
	let dataLs = localStorage.getItem('carrito');
	dataLs = JSON.parse(dataLs);
	//validar si producto existe en el carrito
	let index = dataLs.findIndex((p) => p.id === product.id);
	if (index !== -1) {
		//eliminando el producto del array
		dataLs.splice(index, 1);
		console.log(dataLs);
		//actualizando el localStorage
		localStorage.setItem('carrito', JSON.stringify(dataLs));
	}

	cartSection(); //llama a la funcion cartSection para mostrar el carrito al cargar la pagina
}

export function updateCartCount() {
	let cartCount = 0;
	let cartCountElement = document.querySelector('#btn-cart');
	let totalQtty = localStorage.getItem('carrito');
	totalQtty = JSON.parse(totalQtty);
	totalQtty.forEach((item) => {
		cartCount += item.quantity;
	});
	if (cartCountElement) {
		cartCountElement.innerHTML += ` <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
                                        ${cartCount}
                                    </span>`;
	}
}
