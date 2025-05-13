export function notifications(prod, color = 'primary', msg = 'agregado al carrito') {
	let notification = document.querySelector('.toast-container');

	// Crear un nuevo elemento div para el toast en lugar de usar innerHTML
	const toastElement = document.createElement('div');
	toastElement.className = 'toast';
	toastElement.classList.add('text-bg-' + color); // Agregar la clase de color
	toastElement.setAttribute('role', 'alert');
	toastElement.setAttribute('aria-live', 'assertive');
	toastElement.setAttribute('aria-atomic', 'true');
	toastElement.id = `toast-${prod.id}-${Date.now()}`; // ID único usando timestamp

	toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                "${prod.title}" ${msg}. 
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

	// Agregar el nuevo toast al contenedor
	notification.appendChild(toastElement);

	// Inicializar el toast con Bootstrap
	const bsToast = new bootstrap.Toast(toastElement, {
		autohide: true,
		delay: 5000,
		animation: true
	});

	bsToast.show();

	// Eliminar el toast del DOM después de que se oculte
	toastElement.addEventListener('hidden.bs.toast', () => {
		notification.removeChild(toastElement);
	});
}
