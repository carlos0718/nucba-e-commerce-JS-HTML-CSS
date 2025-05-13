import {sumQttyProd, updateCartCount} from '../utils/updateCart.js';
import {cartSection} from './cartSection.js';
import {notifications} from './notifications.js';

export function createModal(product) {
	let modalContainer = document.querySelector('#modal-container');

	window.agregarACarrito = (prod) => {
		// leyendo del localStorage, parseando y agregando el producto al array
		let dataLs = localStorage.getItem('carrito');
		dataLs = JSON.parse(dataLs);
		dataLs.push(prod);
		// guardando el array en el localStorage
		localStorage.setItem('carrito', JSON.stringify(dataLs));
	};
	let modalHtml = `<div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3 pb-3 rounded-2" style="background: black;">
                                <div class="col-md-4 mb-3" >
                                    <img src=${product.image} class="img-fluid rounded-start" alt='${product.title}'>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-white">$ ${product.price}</h5>
                                        <p class="card-text text-white">${product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary btn-modal" id="btn-${product.id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>`;
	//<button type="button" class="btn btn-primary" onclick='agregarACarrito(${JSON.stringify(product)})'>

	modalContainer.innerHTML = modalHtml;
	let btn = document.querySelector(`#btn-${product.id}`);
	btn.addEventListener('click', () => {
		sumQttyProd(product); //llama a la funcion sumQttyProd para agregar el producto al carrito
		notifications(product); //llama a la funcion notifications para mostrar la notificacion de que se agrego el producto al carrito
		cartSection(); //llama a la funcion cartSection para mostrar el carrito al cargar la pagina
		updateCartCount();
	});

	let modal = document.querySelector('.modal');
	const myModal = new bootstrap.Modal(modal);
	myModal.show();

	let closeModal = document.querySelector('.btn-close');
	closeModal.addEventListener('click', () => {
		modalContainer.innerHTML = '';
	});
}
