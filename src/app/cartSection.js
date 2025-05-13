import {deleteProdCart, restQttyProd, sumQttyProd, updateCartCount} from '../utils/updateCart.js';
import {notifications} from './notifications.js';

export function cartSection() {
	let canvaBody = document.querySelector('#offcanvas-body');
	canvaBody.innerHTML = '';
	//leer datos del local storage
	let getData = JSON.parse(localStorage.getItem('carrito'));

	// Definir las funciones fuera del bucle para evitar sobrescritura
	window.deleteProd = (product) => {
		deleteProdCart(product);
		notifications(product, 'danger', 'eliminado del carrito.');
		updateCartCount();
	};

	window.sumProd = (product) => {
		let qty = sumQttyProd(product);
		let spanQty = document.querySelector(`#qty-${product.id}`);
		let totalPrice = document.querySelector(`#total-${product.id}`);

		if (spanQty && totalPrice) {
			spanQty.innerHTML = qty;
			let total = product.price * qty;
			totalPrice.innerHTML = `Precio total: $ ${total.toFixed(2)}`;
		}
		updateCartCount();
	};

	window.restProd = (product) => {
		let qty = restQttyProd(product);
		let spanQty = document.querySelector(`#qty-${product.id}`);
		let totalPrice = document.querySelector(`#total-${product.id}`);

		if (spanQty && totalPrice) {
			spanQty.innerHTML = qty;
			let total = product.price * qty;
			totalPrice.innerHTML = `Precio total: $ ${total.toFixed(2)}`;
		}
		updateCartCount();
	};

	getData.forEach((p) => {
		let offcanvasBody = `
			<div class="card mb-3 bg-black" style="max-width: 540px;">
				<div class="row g-0 align-items-center">
					<div class="col-4 text-center">
						<img src='${p.image}' class="img-fluid rounded-start p-2" alt="${p.title}" style="max-height: 10rem; object-fit: contain;">
					</div>
					<div class="col-8">
						<div class="card-body m-2">
							<h6 class="card-title text-truncate text-white">${p.title}</h6>
							<div class="d-flex justify-content-center align-items-center mt-2">
								<span class="text-white fw-bold" id="total-${p.id}">Precio total: $ ${(p.price * p.quantity).toFixed(2)}</span>
							</div>
							<div class="d-flex justify-content-around align-items-center px-5 mt-1">
								<button class="btn btn-sm btn-rest rounded-1" onclick='restProd(${JSON.stringify(p)})'>
									<i class="bi bi-dash"></i>
								</button>
								<div class="rounded-1">
									<span class="text-white mx-2" id="qty-${p.id}">${p.quantity}</span>
								</div>
								<button class="btn btn-sum btn-sm rounded-1" onclick='sumProd(${JSON.stringify(p)})'>
									<i class="bi bi-plus"></i>
								</button>
							</div>
							<div class="d-flex justify-content-center align-items-center mt-2">
								<button class="btn btn-outline-danger btn-sm rounded-1" onclick='deleteProd(${JSON.stringify(p)})'>
									Eliminar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		canvaBody.innerHTML += offcanvasBody;
	});
}
