// Composite 
// Định nghĩa 1 sản phẩm cơ bản
class ProductBase{
    constructor({img, type, name, price, unit, id}){
        this.name = name;
        this.type = type;
        this.price = price;
        this.unit = unit;
        this.img = img;
        this.id = id;
    }

    getPriceValue(){
        return this.price.split(" ")[0]
    }

    getPriceUnit(){
        return this.price.split(" ")[1]
    }

}

// Định nghĩa sản phẩm mới theo sản phẩm cơ bản
class HotProduct extends ProductBase{
    getView(){
        return `
        <div class="banner-item">
            <a href="#">
                <div class="img">
                    <img src="${this.img}" alt="prodcut">
                    <button class="view">xem nhanh</button>
                </div>
                <div class="text">
                    <div class="type">${this.type}</div>
                    <div class="name">${this.name}</div>
                    <div class="price">${this.price} <span class="unit">/${this.unit}</span></div>
                </div>
                <div class="button-active">
                    <button class="btn-add" onclick='return addCart(${JSON.stringify(this)})'>Thêm vào giỏ</button>
                    <button class="buy">Mua ngay</button>
                </div>
            </a>
        </div>
        `
    }
}

// Định nghĩa sản phẩm hot theo sản phẩm cơ bản
class NewProduct extends ProductBase{
    getView(){
        return `
        <div class="banner-item">
            <a href="#">
                <div class="img">
                    <img src="${this.img}" alt="prodcut">
                    <button class="view">xem nhanh</button>
                </div>
                <div class="text">
                    <div class="type">${this.type}</div>
                    <div class="name">${this.name}</div>
                    <div class="price">${this.price} <span class="unit">/${this.unit}</span></div>
                </div>
                <div class="button-active">
                    <button class="btn-add" onclick='return addCart(${JSON.stringify(this)})'>Thêm vào giỏ</button>
                    <button class="buy">Mua ngay</button>
                </div>
            </a>
        </div>
        `
    }
}

// Định nghĩa sản phẩm trong giỏ hàng
class CartProduct extends ProductBase{
    constructor({id, name, unit, img, price}){
        super({id, name, unit, img, price});
        this.count = 1;
        this.price = {
            value: this.getPriceValue(),
            unit: this.getPriceUnit()
        }
    }

    increaseCount() {
        this.count += 1;
    }
}

// Proxy
class Cart {
    constructor(){
        this.products = []; // danh sách sản phẩm trong giỏ hàng
        this.cache = [] // những thông tin sản phẩm được cache

        // Lấy dữ liệu đã lưu trong storage
        const storage = JSON.parse(localStorage.getItem("cart"))

        // console.log(storage)
        if (storage){
            this.products = storage.products;
            this.cache = storage.cache;    
        }

        
        this.onChange()

    }

    onChange(){
        document.getElementById("cart-list").innerHTML = this.getView()
        document.getElementById("count-item").innerHTML = this.getNumberTotal();
        document.getElementById("total-cost").innerHTML = this.getTotalCost()
       

        // Lưu vào local storage
        localStorage.setItem("cart", JSON.stringify(this))
    }

    addProduct(product){
        // Kiểm tra product này đã cache chưa
        let check = !!this.cache.filter(p => p.id == product.id)[0]?true:false;

        if (check){
            this.products = this.products.map(p=>{
                if (p.id == product.id){
                    p.increaseCount()
                }

                return p
            })
        }
        else{
            const cartProduct = new CartProduct(product)
            this.products.push(cartProduct)
            this.cache.push(cartProduct)
        }
    }

    removeProduct(id){
        this.products = this.products.filter(p => p.id != id)
        this.cache = this.cache.filter(p => p.id != id)
    }

    getNumberTotal(){
        let s = 0;
        this.products.forEach(p => {
            s+= p.count
        })

        return s
    }

    getView(){
        let viewHtml = ''
        
        if (this.products.length == 0){
            return ' <p style="text-align: center">Không có sản phẩm</p> '
        }


        this.products.forEach(p => {  
            viewHtml += `
            <li class="item">
                <span class="img">
                    <img src="${p.img}" alt="product">
                </span>
                <span class="text">
                    <a href="#" class="title">
                        ${p.name}
                    </a>
                    <div class="number">${p.count} x ${p.price.value} ${p.price.unit}</div>
                </span>
                <span onclick='return remoteCart(${p.id})' class="icon-close">
                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                </span>
            </li>
            `
        })

        return viewHtml
    }

    getTotalCost(){
        let s = 0;
        this.products.forEach(p => {
            s+= parseInt(p.price.value.replaceAll(",", ""))*p.count
        })

        let t = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(s).replace("₫", "").replaceAll(".", ",")

        return `
            <span>Tổng tiền : ${t}VNĐ</span>
        `
    }
}