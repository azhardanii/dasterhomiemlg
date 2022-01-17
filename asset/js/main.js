// Show Menu
const showMenu = (toggleID, navID) => {
    const toggle = document.getElementById(toggleID),
    nav = document.getElementById(navID)

    // Validate
    if (toggle && nav) {
        toggle.addEventListener('click', ()=>{
            // Add class show-menu
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

// Remove Menu Mobile
const navLink = document.querySelectorAll('.nav-link')
function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When click menu on mobile remove class show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Auto Scroll to Menu
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// Add Shadow Header
function scrollHeader() {
    const nav = document.getElementById('header')
    // If scroll > 200 viewport height
    if(this.scrollY >= 200) {
        nav.classList.add('scroll-header')
    } else {
        nav.classList.remove('scroll-header')
    }
}
window.addEventListener('scroll', scrollHeader)

// Add Scroll to Top Icon
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top')
    // If scroll > 600 viewport height
    if(this.scrollY >= 600) {
        scrollTop.classList.add('show-scroll')
    } else {
        scrollTop.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollTop)

// Dark Light Theme
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.body.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

if(selectedTheme) {
    document.body.classList[selectedTheme == 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon == 'bx-toggle-left' ? 'add' : 'remove'](iconTheme) 
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Slide Show
let slideIndex = 1
showSlides(slideIndex)

// Next & Prev Function
function plusSlides(n) {
    showSlides(slideIndex += n)
}

// Control Tumbnail
function currentSlide(n) {
    showSlides(slideIndex = n)
}

function showSlides(n) {
    let i
    let slides = document.getElementsByClassName('my-slides')
    let dots = document.getElementsByClassName('dot')

    if(n > slides.length) {slideIndex = 1}
    if(n < 1) {slideIndex = slides.length}
    for(i=0; i<slides.length; i++) {
        slides[i].style.display = 'none'
    }
    for(i=0; i<dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active','')
    }
    slides[slideIndex-1].style.display = 'block'
    dots[slideIndex-1].className += ' active'
}

// Scroll Reveal
const sr = ScrollReveal({
    origin: top,
    distance: '30px',
    duration: 2000,
    reset: true
})

sr.reveal(`.home, .about-data, .about-img, .service-content, .product, .size-data, .size-img, .contact-data, .contact-button, .footer-content, .detail-img, .detail-data`, {
    interval: 200
})

// Show Cart 
function myCart() {
    let cart = document.getElementById('cart-list')

    if (cart.style.display === "block") {
        cart.style.display = "none";
    } else {
        cart.style.display = "block";
    }
}


// Shoping Cart 
let tbProduct = [
    {
        idprod: 1,
        nama: 'Daster Anak',
        img: 'product1.jpg',
        harga: 25000
    },
    {
        idprod: 2,
        nama: 'Daster Kerut',
        img: 'product2.jpg',
        harga: 55000
    },
    {
        idprod: 3,
        nama: 'Daster Panjang',
        img: 'product3.jpg',
        harga: 55000
    },
    {
        idprod: 4,
        nama: 'Daster Kera',
        img: 'product4.jpg',
        harga: 55000
}]

let showCart = tbProduct.map(function(column){
    return `<div class="product-content">
        <img src="asset/img/${column.img}" alt="Homie ${column.nama}">
        <h3 class="product-name">${column.nama}</h3>
        <span class="product-price">Rp. ${column.harga},-</span><br>
        <a href="https://wa.me/6282231861644?text=Haloo%20admin%20Daster%20Homie%2C%0A%0AAku%20mau%20beli%20produk%20ini%20tolong%20segera%20diproses%20yaa..%0A%0ARincian%20produk%20%3A%0A-%3E%20Nama%20%3A%20${column.nama}%0A-%3E%20Harga%20%3A%20${column.harga}" class="button product-button-detail" target="_blank">Langsung Beli</a>
        <a class="button product-button addcart" data-idprod=${column.idprod}><i class="bx bx-cart-alt" ></i></a>
    </div>`
})

let homieProd = document.querySelector('.product-container')
homieProd.innerHTML = showCart

let addCart = document.querySelectorAll('.product-content > .addcart')
let cart = []
for(let i=0; i<addCart.length; i++) {
    addCart[i].onclick = function () {
        tbProduct.filter(function(a) {
            if(a.idprod == addCart[i].dataset['idprod']) {
                cart.push(a)
                console.log(cart)
            }
        })
    }
}