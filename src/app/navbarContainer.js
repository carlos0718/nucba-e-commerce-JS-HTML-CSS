import {updateCartCount} from '../utils/updateCart.js';

export function navbarContainer() {
	let navbarContent = `<nav class="navbar navbar-expand-lg bg-navbar">
                            <div class="container-fluid">
                                <a class="navbar-brand fw-bolder txt-gradient" href="/" id="home">CHARLY'S STORE</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbar-list-pages">
                                        <!-- secciones generadas desde js -->
                                    </ul>
                                </div>
                                <button type="button" class="btn btn-primary position-relative" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="btn-cart">
                                    <i class="bi bi-basket"></i>
                                   
                                </button>
                            </div>
                        </nav>`;
	updateCartCount();
	document.querySelector('#container-navbar').innerHTML = navbarContent;
}

/*  <form class="d-flex me-lg-5" role="search" id="form-search">
                     <input class="form-control me-2" style="width:400px;" type="search"
                            placeholder="Bucar productos..." aria-label="Search" name="searchText">
                     <button class="btn btn-outline-success" type="submit">Search</button>
                 </form> */
