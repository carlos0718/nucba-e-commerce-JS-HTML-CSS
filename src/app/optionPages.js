let arrSections = [
	{
		id: 1,
		name: 'Home',
		href: '/'
	},
	{
		id: 2,
		name: 'Contact us',
		href: '../pages/contact-us.html'
	},
	{
		id: 3,
		name: 'About us',
		href: '../pages/about-us.html'
	}
];

export function optionsSectionPages() {
	let containerOptions = document.querySelector('#navbar-list-pages');
	containerOptions.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas opciones
	let currentPath = window.location.pathname;

	arrSections.forEach((section) => {
		// Ajustar la ruta según la ubicación actual
		let adjustedHref = section.href;
		if (currentPath.includes('pages/')) {
			// Si estamos en una subpágina
			if (section.href === '/') {
				// Para volver al home
				adjustedHref = '../';
			}
		}
		// Determinar si esta sección está activa
		const isActive =
			currentPath.endsWith(adjustedHref) ||
			(currentPath === '/' && section.href === '/') ||
			(adjustedHref !== '/' && currentPath.includes(adjustedHref));

		let optionsHtml = `<li class="nav-item">
							<a class="nav-link fw-medium ${isActive ? 'isActive' : ''}" style="color: white" href="${adjustedHref}" role="button" id="section-${section.id}">${
			section.name
		}</a>
						</li>`;
		containerOptions.innerHTML += optionsHtml;
	});
	// Agregar evento click al enlace Home
	const homeLink = document.querySelector('#section-1');
	if (homeLink) {
		homeLink.addEventListener('click', () => {
			// Remover active de todas las categorías
			const allCategories = document.querySelectorAll('#navbar-list-categories .nav-link');
			allCategories.forEach((cat) => cat.classList.remove('active'));
		});
	}
}
