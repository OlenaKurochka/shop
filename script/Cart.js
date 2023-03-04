
let listCart = JSON.parse(localStorage.getItem('listCart'))
console.log(localStorage)
console.log(listCart); 
console.log(typeof listCart); 

let idItem;
let colorItem;
let sizeItem;
let objItem;
let total = [];
let sum_total = document.getElementById("sum_total")
let shipping = document.getElementById("shipping")
let grand_total = document.getElementById("grand_total")
let main_table = document.querySelector('.main_table');

document.addEventListener("DOMContentLoaded", async function(){ 
    let requestURL = '../script/Gallery_1.json';
    let request = new Request(requestURL);
    let response = await fetch(request);
    let itemsCatalog = await response.json();     

    let urlParams = new URLSearchParams(window.location.search);
    idItem = urlParams.get('idItem');
    // console.log(idItem); 
    colorItem = urlParams.get('colorItem');
    // console.log(colorItem); 
    sizeItem = urlParams.get('sizeItem');
    // console.log(sizeItem); 
    objItem = {
        idItem: idItem,
        colorItem: colorItem,
        sizeItem: sizeItem
    }
    
    listCart.push(objItem)
    localStorage.setItem('listCart', JSON.stringify(listCart));
    console.log(localStorage)

    
    for (let i = 0; i<listCart.length; i++){
        if(listCart[i] != 0){
            // console.log(listCart[i])

            idItem = listCart[i].idItem
            colorItem = listCart[i].colorItem
            sizeItem = listCart[i].sizeItem
            // console.log(idItem)
            // console.log(colorItem)
            // console.log(sizeItem)
            addItem(itemsCatalog);

        }
    }


    let result = 0
//TOTAL_SUM
function totalSum(){
    let onePrice =[...document.getElementsByClassName("price_item")] 
    // console.log(onePrice)
    onePrice.forEach(element => {
        // console.log(Number(element.textContent))
        result = result + Number(element.textContent)
        // console.log(result)
        return result
    });
    sum_total.textContent = result    
}
totalSum()


//SHIPPING and GRAND TOTAL 
    function shippingF(){
        if (result>200){
            shipping.textContent = "FREE SHIPPING"
            grand_total.textContent = result
        }else if(result==0){
            shipping.textContent = 0
            grand_total.textContent = 0
        }
        else if(result<=200){
            shipping.textContent = 20
            grand_total.textContent = (Number(shipping.textContent)+result).toFixed(2)
        }
    }
    shippingF()

//CART EMPTY
    function cartEmpty(){
        if (main_table.hasChildNodes()) {
            document.getElementById("cart_empty").classList.add("none")
        } else {
            document.getElementById("cart_empty").classList.remove("none")
        }
    }
    cartEmpty()


})
    
function addItem(obj) {
      
    const items = obj.items;
    // console.log(items[idItem])

    let divForItem = document.createElement('div');
    divForItem.classList.add("divForItem");
    divForItem.id = idItem
    // console.log(divForItem.id)

    const itemImg = document.createElement('img');
    itemImg.classList.add("itemImg");

    const divForDescription = document.createElement('div');
    divForDescription.classList.add("divForDescription");    
    const itemTitle = document.createElement('h1');
    itemTitle.classList.add("itemTitle");
    const itemColor = document.createElement('p');
    itemColor.classList.add("itemColor");
    const itemSize = document.createElement('p');
    itemSize.classList.add("itemSize");

    const itemPrice = document.createElement('p');
    itemPrice.classList.add("itemPrice");


    itemImg.src = items[idItem].img;
    itemTitle.textContent = items[idItem].title;
    itemColor.textContent = `Color: ${colorItem}`;
    itemSize.textContent = `Size: ${sizeItem}`;
    itemPrice.innerHTML = `$<span class="price_item">${items[idItem].price}</span>`


    divForDescription.appendChild(itemTitle)
    divForDescription.appendChild(itemColor)
    divForDescription.appendChild(itemSize)

    divForItem.appendChild(itemImg)
    divForItem.appendChild(divForDescription)
    divForItem.appendChild(itemPrice)

    main_table.appendChild(divForItem)


    total[idItem] = (Number(items[idItem].price))
}

