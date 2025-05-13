// This file contains the API calls to the web API https://web-api-products.runasp.net/swagger/index.html
const API_URL = 'https://web-api-products.runasp.net/api/';
const API_URL_PRODUCTS = `${API_URL}Products`;
const API_URL_CATEGORIES = `${API_URL}Categories`;

export async function getProducts() {
	let result = fetch(API_URL_PRODUCTS)
		.then((res) => res.json())
		.then((data) => data);

	return result;
}

export function getCategories() {
	let result = fetch(API_URL_CATEGORIES)
		.then((res) => res.json())
		.then((data) => data);

	return result;
}

export async function getProductById(id) {
	let result = fetch(`${API_URL_PRODUCTS}/${id}`)
		.then((res) => res.json())
		.then((data) => data);

	return result;
}

export async function getProductsByCateroryId(id) {
	console.log(id);
	let result = fetch(`${API_URL_PRODUCTS}/category/${id}`)
		.then((res) => res.json())
		.then((data) => data);

	return result;
}
