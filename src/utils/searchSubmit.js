import {getProductById, getProducts} from '../api/api.js';
import {templateCard} from '../app/templateCard.js';

export function searchSubmit2() {
	const inputSearch = document.querySelector('#form-search');
	inputSearch.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		//console.log(Object.fromEntries(formData));

		let text = formData.get('searchText');
		console.log({text});

		let data = await getProducts();

		let listCards = document.querySelector('#container-cards');
		listCards.innerHTML = '';

		if (text.trim()) {
			if (!isNaN(text)) {
				// Si el texto es un número, filtra por id
				let product = await getProductById(text);
				console.log('Producto encontrado:', product);
				templateCard(product); // Renderiza el producto encontrado
			} else {
				// Filtra los productos según el texto ingresado
				let newList = data.filter((p) => {
					return p.title.toLowerCase().includes(text.toLowerCase());
				});
				// Renderiza las tarjetas filtradas
				newList.forEach((product) => templateCard(product));
			}
			// Si el campo de búsqueda está vacío, renderiza todas las tarjetas
		} else data.forEach((product) => templateCard(product));
	});

	const searchInput = document.querySelector('input[name="searchText"]'); // Selecciona el input del formulario
	// Evento para capturar el clic en la "X" del input
	searchInput.addEventListener('input', () => {
		if (searchInput.value === '') {
			// Si el campo está vacío, dispara el evento submit
			inputSearch.dispatchEvent(new Event('submit'));
		}
	});
}
