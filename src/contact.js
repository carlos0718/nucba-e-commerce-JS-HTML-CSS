import {navbarContainer} from './app/navbarContainer.js';
import {optionsSectionPages} from './app/optionPages.js';

const PUBLIC_KEY = 'Wh2p73G7zgVsHkeGC';
const SERVICE_ID = 'service_w4rvfxa';
const TEMPLATE_ID = 'template_5brajda';
// Cargar EmailJS desde CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
script.onload = function () {
	// Inicializar EmailJS con tu Public Key
	emailjs.init(PUBLIC_KEY); // Reemplaza "TU_PUBLIC_KEY" con tu clave real
};
document.head.appendChild(script);

navbarContainer();
optionsSectionPages();

let formContact = document.querySelector('#form-contact');

formContact.addEventListener('submit', (e) => {
	e.preventDefault();
	e.stopPropagation();

	let newFormContact = new FormData(e.target);
	const formDataObject = Object.fromEntries(newFormContact.entries());
	console.log(formDataObject);
	// Configuración específica para el envío
	let message = `${formDataObject.email}: \n ${formDataObject.description}`;
	const templateParams = {
		message: message,
		time: new Date().toLocaleString(),
		name: formDataObject.name + ' ' + formDataObject.lastname,
		message: message,
		title: 'Consulta de contacto',
		email: formDataObject.email,
		to_name: 'Carlos Jesus'
	};

	// Enviar email usando EmailJS
	emailjs
		.send(SERVICE_ID, TEMPLATE_ID, templateParams)
		.then(function (response) {
			let alert = `<div class="alert alert-primary alert-dismissible fade show position-fixed top-1 start-50 translate-middle-x mt-3" role="alert" style="z-index: 9999;">
							¡Mensaje enviado correctamente!
							<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>`;
			document.body.insertAdjacentHTML('afterbegin', alert);
			formContact.reset(); // Limpiar el formulario después del envío exitoso

			// Remover el alert después de 3 segundos
			setTimeout(() => {
				const alertElement = document.querySelector('.alert');
				if (alertElement) {
					alertElement.remove();
				}
			}, 3000);
		})
		.catch(function (error) {
			let alert = `<div class="alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style="z-index: 9999;">
							Error al enviar el mensaje. Por favor, inténtalo de nuevo.
							<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>`;
			document.body.insertAdjacentHTML('afterbegin', alert);

			// Remover el alert después de 3 segundos
			setTimeout(() => {
				const alertElement = document.querySelector('.alert');
				if (alertElement) {
					alertElement.remove();
				}
			}, 3000);
		});
});

function inputColorValidError(input, attr_id, msg) {
	input.style.border = '1px solid red';
	input.style.boxShadow = '0 0 10px red';
	document.querySelector(`#${attr_id}`).textContent = msg;
	return false;
}

function inputValuesInitial(input, attr_id) {
	input.style.border = '';
	input.style.boxShadow = '';
	document.querySelector(`#${attr_id}`).textContent = '';
	return true;
}

// Función para validar nombre
const validateName = (nameRegex, input) => {
	if (!nameRegex.test(input.value)) inputColorValidError(input, 'name-error', 'El nombre debe contener como mínimo 3 letras');
	else inputValuesInitial(input, 'name-error');
};

// Función para validar apellido
const validateLastname = (lastnameRegex, input) => {
	if (!lastnameRegex.test(input.value)) inputColorValidError(input, 'lastname-error', 'El apellido debe contener como mínimo 3 letras');
	else inputValuesInitial(input, 'lastname-error');
};

// Función para validar email
const validateEmail = (emailRegex, input) => {
	if (!emailRegex.test(input.value)) inputColorValidError(input, 'email-error', 'El campo email esta vacio o no es valido');
	else inputValuesInitial(input, 'email-error');
};

function eventFocusAndFocusOut(input, attr_id, callback) {
	input.addEventListener('focus', () => {
		document.querySelector(`#${attr_id}`).textContent = '';
	});
	input.addEventListener('focusout', callback);
}
validateFormContact();
function validateFormContact() {
	const name = document.querySelector('#name');
	const lastname = document.querySelector('#lastname');
	const email = document.querySelector('#email');
	const description = document.querySelector('#description');

	//usar regex para validar el formulario
	const nameRegex = /^[a-zA-Z]{3,}$/; //validar que el nombre solo contenga letras, que no este vacio y que el minimo sea 3 caracteres
	const lastnameRegex = /^[a-zA-Z]{3,}$/; //validar que el apellido solo contenga letras, que no este vacio y que el minimo sea 3 caracteres
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //validar que el email sea valido

	eventFocusAndFocusOut(name, 'name-error', () => validateName(nameRegex, name));
	eventFocusAndFocusOut(lastname, 'lastname-error', () => validateLastname(lastnameRegex, lastname));
	eventFocusAndFocusOut(email, 'email-error', () => validateEmail(emailRegex, email));

	let isInputValid = false;

	// Función para validar todos los campos
	const validateAllInputs = () => {
		const isNameValid = nameRegex.test(name.value);
		const isLastnameValid = lastnameRegex.test(lastname.value);
		const isEmailValid = emailRegex.test(email.value);

		isInputValid = isNameValid && isLastnameValid && isEmailValid;

		if (isInputValid) {
			document.querySelector('#btn-submit').removeAttribute('disabled');
		} else {
			document.querySelector('#btn-submit').setAttribute('disabled', 'disabled');
		}
	};

	// Agregar evento input a cada campo
	name.addEventListener('input', validateAllInputs);
	lastname.addEventListener('input', validateAllInputs);
	email.addEventListener('input', validateAllInputs);

	// Disparar el evento input inicialmente para validar el estado inicial
	name.dispatchEvent(new Event('input'));
	lastname.dispatchEvent(new Event('input'));
	email.dispatchEvent(new Event('input'));
}
