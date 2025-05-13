import {getProducts} from '../api/api.js';
import {templateCard} from '../app/templateCard.js';

export async function filterSearch() {
	const inputSearch = document.querySelector('#filter-search');
	let data = await getProducts();
	inputSearch.addEventListener('input', (e) => {
		console.log('input', e.target.value);
		let text = e.target.value;
		let list = document.querySelector('#container-cards');
		list.innerHTML = '';
		let newList;
		if (text === '') {
			newList = data;
		} else {
			// Filtra los productos según el texto ingresado
			newList = data.filter((p) => {
				return p.title.toLowerCase().includes(text.toLowerCase());
			});
		}
		newList.forEach((product) => templateCard(product));
	});
}
