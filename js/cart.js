// count-item
const cart = new Cart();

function addCart(product) {
    cart.addProduct(product)
    cart.onChange()
    return false
}

function remoteCart(id){
    cart.removeProduct(id);
    cart.onChange()
    return false
}