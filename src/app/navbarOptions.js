import {getCategories, getProductsByCateroryId} from '../api/api.js';
import {templateCard} from './templateCard.js';

export async function getNavbarCategoriesOptions() {
	let containerOptions = document.querySelector('#navbar-list-categories');
	let optionsHtml = '';
	let categories = await getCategories();

	categories.forEach((category) => {
		optionsHtml = `<li class="nav-item">
                            <span class="nav-link fw-medium" role="button" onclick='filterCategory(event,${category.id})'>${category.name}</span>
                        </li>`;
		containerOptions.innerHTML += optionsHtml;
	});

	window.filterCategory = async (e, categoryId) => {
		e.preventDefault();
		e.stopPropagation();

		// Remover la clase active de todas las categorías
		const allCategories = document.querySelectorAll('#navbar-list-categories .nav-link');
		allCategories.forEach((cat) => cat.classList.remove('active'));

		// Agregar la clase active a la categoría seleccionada
		e.target.classList.add('active');

		// Remover active de la opción Home
		const homeLink = document.querySelector('#section-1');
		if (homeLink) {
			homeLink.classList.remove('isActive');
		}

		let products = await getProductsByCateroryId(categoryId);
		let list = document.querySelector('#container-cards');
		list.innerHTML = '';
		products.forEach((product) => templateCard(product));
	};
}
