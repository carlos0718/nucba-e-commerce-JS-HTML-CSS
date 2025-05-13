import {createModal} from './modal.js';

let list = document.querySelector('#container-cards');
list.innerHTML = ''; // Clear the list before adding new cards
export function templateCard(p) {
	let templateCard = `<div class="col">
                        <div class="card" style="height: 550px; background-color: #000">
                            <img src='${p.image}' class="card-img-top p-4 img-fluid" style="height: 450px; object-fit: contain;" alt="${p.title}"/>
                            <div class="card-body">
                                <h5 class="card-title text-truncate text-white">${p.title}</h5>
                              <div>
                              <button type="button" class="btn btn-primary" onclick='showProductDetails(${JSON.stringify(p)})' id="prod-${p.id}">
                                Mas detalles
                                </button>
                              </div>
                            </div>
                        </div>
                    </div>`;

	list.innerHTML += templateCard;

	window.showProductDetails = (product) => {
		createModal(product);
	};
}
