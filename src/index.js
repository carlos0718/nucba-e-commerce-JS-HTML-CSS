import {createCardList} from './app/cards.js';
import {cartSection} from './app/cartSection.js';
import {navbarContainer} from './app/navbarContainer.js';
import {getNavbarCategoriesOptions} from './app/navbarOptions.js';
import {optionsSectionPages} from './app/optionPages.js';
import {filterSearch} from './utils/filterSearch.js';
import {searchSubmit2} from './utils/searchSubmit.js';
import {updateCartCount} from './utils/updateCart.js';

if (!localStorage.getItem('carrito')) {
	localStorage.setItem('carrito', JSON.stringify([]));
}

navbarContainer(); //llama a la funcion navbarContainer para mostrar el navbar al cargar la pagina
createCardList();
cartSection(); //llama a la funcion cartSection para mostrar el carrito al cargar la pagina
filterSearch();
//searchSubmit2();
getNavbarCategoriesOptions(); //llama a la funcion getNavbarCategoriesOptions para mostrar las opciones del navbar al cargar la pagina
optionsSectionPages(); //llama a la funcion optionsSectionPages para mostrar las opciones del navbar al cargar la pagina
//si no existe la key "carrito" en el localstorage, la crea
updateCartCount();
let home = document.querySelector('#home');
home.onclick = () => {
	let list = document.querySelector('#container-cards');
	list.innerHTML = '';
	createCardList();
};
