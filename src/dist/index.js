require('./styles.scss');

var Flickity = require('flickity');
require('flickity-imagesloaded');

var $carousels = new Array();

// Modals

var rootEl = document.documentElement;
var $modals = getAll('.modal');
var $modalTriggers = getAll('.modal-trigger');
var $modalCloses = getAll('.modal-card-head .delete, .modal-card-foot .button');
console.log("modalTrigger.length = " + $modalTriggers.length);
if ($modalTriggers.length > 0) {
    $modalTriggers.forEach(function ($el) {
        $el.addEventListener('click', function () {
            var target = $el.dataset.target;
            console.log("before open modal");
            openModal(target);
        });
    });
}

if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
        $el.addEventListener('click', function () {
            console.log("before close modal");
            closeModals();
        });
    });
}

function openModal(target) {
    console.log("Entering openModal");
    var navbar = document.getElementById("navbar-menu");
    console.log("got navbar: " + navbar);
    navbar.classList.add("navbar-hidden");
    navbar.hide();
    document.getElementById("navbar-menu").style.visibility = "hidden";


    var $target = document.getElementById(target);
    rootEl.classList.add('is-clipped');
    $target.classList.add('is-active');
    var carouselId = target + '-carousel';

    if (document.querySelector('#' + carouselId)) {
        // Initialize each carousel one time only
        if ($carousels.length === 0) {
            $carousels.push(initCarousel(carouselId));
        }
        else {
            var index = $carousels.findIndex(c => c.element.id == carouselId);
            if (index === -1) {
                $carousels.push(initCarousel(carouselId));
            }
        }
    }
}

function closeModals() {
    rootEl.classList.remove('is-clipped');
    $modals.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
    var navbar = document.getElementById("navbar-menu");
    navbar.classList.remove("navbar-hidden");
    navbar.show();
    document.getElementById("navbar-menu").style.visibility = "visible";
}

// Functions

function initCarousel(id) {
    return new Flickity('#' + id, {
        imagesLoaded: true,
        adaptiveHeight: true // https://github.com/metafizzy/flickity/issues/11
    });
}

function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}