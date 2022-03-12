$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Banner
$(document).ready(function () {
    $('.owl-carousel-banner').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    })
});

// Products
$(document).ready(function () {
    $('.owl-carousel-products').owlCarousel({
        loop: true,
        margin: 50,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    })
});
$(document).ready(function () {
    $('.owl-carousel-new-products').owlCarousel({
        loop: true,
        margin: 50,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    })
});



// News
$(document).ready(function () {
    $('.owl-carousel-hot-news').owlCarousel({
        loop: true,
        margin: 50,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    })
});

// Handle data
var viewHotProducts, viewProducts;


// hot prodcut
viewHotProducts = document.getElementById("hot_products");
viewProducts = "";
hot_products.forEach((value) => {
    let product = new HotProduct(value);
    // console.log(product);

    viewProducts += product.getView()
})
viewHotProducts.innerHTML = viewProducts;




// new products
viewHotProducts = document.getElementById("new_products"); // sửa ở đây
viewProducts = "";
new_products.forEach((value) => { // sửa ở đây theo biên dữ liệu
    let product = new NewProduct(value);
    // console.log(product);

    viewProducts += product.getView()
})
viewHotProducts.innerHTML = viewProducts;



const btnLogin = document.getElementById('btn-login')
let auth = window.localStorage.getItem('auth')
let user = window.localStorage.getItem('user')
user = JSON.parse(user)
if (auth == 'true'){
    btnLogin.innerHTML = `<a href="#">${user.fullname}</a>`
}
else{
    btnLogin.innerHTML = `<a href="/login.html">Đăng nhập</a>`
}

