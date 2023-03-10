const viewQuick = document.querySelector('.view__quick');
const badge = document.querySelector('.badge');






let dataCart = localStorage.getItem('dataCart') ? JSON.parse(localStorage.getItem('dataCart')) : [];
let cardData = [];

const calcNumProduct = (data) => {
    const numProduct = data.reduce((pre, value) => pre + value.quanty, 0);
    return numProduct;
}
badge.innerHTML = calcNumProduct(dataCart);


// get params id 
const url = new URL(location.href);
const searchParams = url.searchParams;
const id = searchParams.get('id');

const fetchCardDateials = async() => {
    const response = await fetch(`./data.json?id=${id}`);
    const data = await response.json();
    showCardDetials(data);
}

fetchCardDateials();

const showCardDetials = (data, cart = dataCart) => {
    console.log(cart);

    let existingPoductInLocal = cart.filter(card => card.id === id);
    cardData = existingPoductInLocal.length === 0 ? data.filter(card => card.id === id) : existingPoductInLocal;
    console.log(existingPoductInLocal);
    viewQuick.innerHTML = `
                 <li class="list_item">
                       <img src='${cardData[0].image}'>
                       <h2> ${cardData[0].name} </h2>
                       <p>  ${cardData[0].price}$</p>
                       <p> Quantity:${cardData[0].quanty}</p>
                       <button type="button" onclick='addToCart(${id})'>addToCart</button>
                 </li>`
}


const addToCart = (id) => {

    const fiendCartIndex = dataCart.findIndex(cart => cart.id === cardData[0].id);
    const fiendEle = dataCart[fiendCartIndex];

    if (fiendEle) {
        fiendEle.quanty += 1;
        dataCart[fiendCartIndex] = fiendEle;
    } else {
        dataCart.push(...cardData);
    }


    localStorage.setItem('dataCart', JSON.stringify(dataCart));
    dataCart = JSON.parse(localStorage.getItem('dataCart'));
    showCardDetials(dataCart, dataCart);
    badge.innerHTML = calcNumProduct(dataCart);


}