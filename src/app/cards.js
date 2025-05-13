import {getProducts} from '../api/api.js';
import {templateCard} from './templateCard.js';

let currentPage = 1;
const productsPerPage = 9;
let allProducts = [];

export async function createCardList() {
	allProducts = await getProducts();
	displayProducts();
	createPaginationControls();
}

function displayProducts() {
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const productsToShow = allProducts.slice(startIndex, endIndex);

	// Clear the container before adding new cards
	const container = document.querySelector('#container-cards');
	container.innerHTML = '';

	productsToShow.forEach((p) => templateCard(p));
}

function createPaginationControls() {
	const totalPages = Math.ceil(allProducts.length / productsPerPage);

	let paginationContainer = document.querySelector('#pagination-controls');
	if (!paginationContainer) {
		paginationContainer = document.createElement('div');
		paginationContainer.id = 'pagination-controls';
		paginationContainer.className = 'd-flex justify-content-center mt-4 gap-2';
		document.querySelector('#container-cards').parentNode.appendChild(paginationContainer);
	}

	paginationContainer.innerHTML = '';

	// Previous button
	const prevButton = document.createElement('button');
	prevButton.className = 'btn btn-primary';
	prevButton.textContent = 'Anterior';
	prevButton.disabled = currentPage === 1;
	prevButton.onclick = () => {
		if (currentPage > 1) {
			currentPage--;
			displayProducts();
			createPaginationControls();
		}
	};

	// Page indicator
	const pageIndicator = document.createElement('span');
	pageIndicator.className = 'align-self-center';
	pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;

	// Next button
	const nextButton = document.createElement('button');
	nextButton.className = 'btn btn-primary';
	nextButton.textContent = 'Siguiente';
	nextButton.disabled = currentPage === totalPages;
	nextButton.onclick = () => {
		if (currentPage < totalPages) {
			currentPage++;
			displayProducts();
			createPaginationControls();
		}
	};

	paginationContainer.appendChild(prevButton);
	paginationContainer.appendChild(pageIndicator);
	paginationContainer.appendChild(nextButton);
}
