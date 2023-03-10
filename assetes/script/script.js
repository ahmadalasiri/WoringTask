const backdrop = document.getElementById('backdrop');
const navBar = document.getElementById('nav_bar');
const products = document.querySelector('.Products');
const modal = document.querySelector('.modal');
const badge = document.querySelector('.badge');
const closeBtn = document.querySelector('.close');



let error, loading = null;
let dataCart = localStorage.getItem('dataCart') ? JSON.parse(localStorage.getItem('dataCart')) : [];

// calcuate the num of items
// console.log(calcNumProduct(dataCart));
const calcNumProduct = (data) => {
    const numProduct = data.reduce((pre, value) => pre + value.quanty, 0);
    return numProduct;
}

badge.innerHTML = calcNumProduct(dataCart);

// fetch data => jsonFile
const fetchData = async() => {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) throw new Error('somthing went wrong')
        const data = await res.json();
        showData(data)
    } catch (e) {
        error = (e.message);
    }
}
fetchData();



const add_to_cart = (data) => {

    const fiendCartIndex = dataCart.findIndex(cart => cart.id === data.id);
    const fiendEle = dataCart[fiendCartIndex];

    if (fiendEle) {
        fiendEle.quanty += 1;
        dataCart[fiendCartIndex] = fiendEle;
    } else {
        dataCart.push(data);
    }

    localStorage.setItem('dataCart', JSON.stringify(dataCart));
    badge.innerHTML = calcNumProduct(dataCart);
}

const remove_from_cart = (id) => {

    const fiendCartIndex = dataCart.findIndex(cart => +cart.id === id);
    const fiendEle = dataCart[fiendCartIndex];

    if (fiendEle.quanty === 1) {
        dataCart = dataCart.filter(data => +data.id !== id);
    } else {
        fiendEle.quanty -= 1;
        dataCart[fiendCartIndex] = fiendEle;
    }

    localStorage.setItem('dataCart', JSON.stringify(dataCart));
    dataCart = JSON.parse(localStorage.getItem('dataCart'));
    badge.innerHTML = calcNumProduct(dataCart);;
    showCartItem(dataCart);
}

/// hompage show data    // href='./assetes/router/${product.id}.html'

const showData = (data) => {

    const ul = products.querySelector('ul');

    data.forEach((product) => {
        ul.innerHTML += `

      <li class = 'list_item' >

        <div class="view__quick" onclick="showViewQuick(${product.id})">
           <a > view quick <i class='bx bxs-chevrons-right'></i></a>
        </div>
     
        <img src='${product.image}'>
        <h4> ${product.name} </h4> 
        <p> ${product.price}</p> 
        <button
          onclick ='add_to_cart({
            id: "${product.id}",
            name: "${product.name}",
            price: "${product.price}",
            image: "${product.image}",
            quanty: ${product.quanty},
            addToCart: ${true}
        }) '>
               Add to cart
         </button>    
       </li>`
    });
}


// show && hide navbar dropDown

const showModal = (className, className2) => {

    backdrop.classList.add(className);
    modal.classList.add(className);
    backdrop.classList.remove(className2);
    modal.classList.remove(className2);
}


// show cart item

const showCartItem = (data) => {
    const ul = modal.querySelector('ul');
    ul.innerHTML = '';
    data.forEach(data => {

        ul.innerHTML += `

         <li class='list_item'>
            <img src='${data.image}'>
            <h4>>${data.name}</h4>
            <p>${data.price}$</p>
            <p>quantity:${data.quanty}</p>
            <button 
              onclick='remove_from_cart(${data.id})'>
                  remove from cart
            </button>   
         </li> `
    })

    ul.innerHTML += `
        <div class="actions">
           <button class="close" onclick="showModal('inactive', 'active')">close</button>
           <button class="order" style="display:none">order</button>
        </div>`
}

// handle modal item in cart
navBar.addEventListener('click', () => {

    showModal('active', 'inactive');
    showCartItem(dataCart);

})


//sectiion view quick
const showViewQuick = (card_id) => {
    window.location.href = `cardDateials.html?id=${card_id}`;
}

// export { remove_from_cart };



// showData(dataPro)