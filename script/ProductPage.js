console.log(localStorage)
let idItem 

let objToCart = {
    idItem: "",
    colorItem: "",
    sizeItem: ""
}

document.addEventListener("DOMContentLoaded", async function(){
    const urlParams = new URLSearchParams(window.location.search);
    idItem = urlParams.get('idItem');
    // console.log(idItem); 
    // document.write(idItem)

    const requestURL = "../script/Gallery_1.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const itemsCatalog = await response.json();
 
    addItem(itemsCatalog);

    document.getElementById("buttonAddToCart").addEventListener("click", function(){
       console.log(document.querySelector('input[name=size]:checked').dataset.value) ;
       console.log(document.querySelector('input[name=color]:checked').dataset.value) ;
    //    console.log(idItem)

       objToCart.idItem = idItem;
       objToCart.colorItem = document.querySelector('input[name=color]:checked').dataset.value;
       objToCart.sizeItem = document.querySelector('input[name=size]:checked').dataset.value;
    //    console.log(objToCart)

       document.getElementById("buttonAddToCart").href = `./Cart.html?idItem=${idItem}&colorItem=${objToCart.colorItem}&sizeItem=${objToCart.sizeItem}`  
                 
        })   
})

function addItem(obj) {
    const div_description = document.querySelector('.description');
    const items = obj.items;
    // console.log(idItem)
    // console.log(items[idItem])
    
    const divForImg = document.createElement('div');
    divForImg.classList.add("divForImg")
    const divForDescription = document.createElement('div');
    divForDescription.classList.add("divForDescription")

    const Title = document.createElement('div');
    Title.classList.add("Title")
    const Rating = document.createElement('div');
    Rating.classList.add("Rating")
    const Price = document.createElement('div');
    Price.classList.add("Price")
    const Color = document.createElement('div');
    Color.classList.add("Color")
    const Size = document.createElement('div');
    Size.classList.add("Size")
    const Buttons = document.createElement('div');
    Buttons.classList.add("Buttons")
    const Media = document.createElement('div');
    Media.classList.add("Media")
    const Shopping = document.createElement('div');
    Shopping.classList.add("Shopping")


    const itemImg = document.createElement('img');
    itemImg.classList.add("itemImg")
    const itemTitle = document.createElement('h1');
    itemTitle.classList.add("itemTitle")
    const itemTitle_way = document.createElement('h1');
    itemTitle.classList.add("itemTitle_way")
    const itemID = document.createElement('p');
    itemID.classList.add("itemID")
    const itemRating = document.createElement('img');
    itemRating.classList.add("itemRating")
    const itemReviews = document.createElement('p');
    itemReviews.classList.add("itemReviews")
    const itemPrice = document.createElement('h3');
    itemPrice.classList.add("itemPrice")
    const itemColors = document.createElement('div');
    itemColors.classList.add("itemColors")
    const itemSize = document.createElement('div');
    itemSize.classList.add("itemSize")
    const buttonAddToCart = document.createElement('a');
    buttonAddToCart.classList.add("buttonAddToCart")
    buttonAddToCart.id = "buttonAddToCart"
    const buttonAddToWishlist = document.createElement('a');
    buttonAddToWishlist.classList.add("buttonAddToWishlist")


    itemImg.src = items[idItem].img
    itemTitle.textContent = items[idItem].title
    itemTitle_way.textContent = items[idItem].title
    itemID.textContent = `ITEM #${items[idItem].id}`
    
    if (items[idItem].rating == 5){
        itemRating.src = "../image/5star.png"
    }else if(items[idItem].rating == 4){
        itemRating.src = "../image/4star.png"
    }else if(items[idItem].rating>4 && items[idItem].rating<5){
        itemRating.src = "../image/4_5star.png"
    }else if(items[idItem].rating == 3){
        itemRating.src = "../image/3star.png"
    }else if(items[idItem].rating == 2){
        itemRating.src = "../image/2star.png"
    }else if(items[idItem].rating == 1){
        itemRating.src = "../image/1star.png"
    }else{
        itemRating.src = "../image/0star.png"
    }

    itemReviews.textContent = `${items[idItem].count} REVIEWS`
    itemPrice.textContent = `$${items[idItem].price}`

    let arrItemColors = items[idItem].colors
    for(let i = 0; i<arrItemColors.length; i++){
        itemColors.innerHTML += `<input class="radio" type="radio" name="color" data-value="${arrItemColors[i].color}" id="${itemID}color${arrItemColors[i].color}"><label for="${itemID}color${arrItemColors[i].color}"><img src="${arrItemColors[i].img}" alt="${arrItemColors[i].color}" class="imgColor"></label>`
    }

    let arrItemSize = items[idItem].size
    // console.log(arrItemSize)
    arrItemSize.forEach(size => {
        itemSize.innerHTML += `<input class="radio" type="radio" name="size" id="${itemID}size${size}" data-value="${size}"><label for="${itemID}size${size}">${size}</label>`
        // console.log(itemSize)
    });



    buttonAddToCart.textContent = 'ADD TO CART';
    buttonAddToWishlist.textContent = "ADD TO WISHLIST"

    divForImg.appendChild(itemImg)

    Title.appendChild(itemTitle)
    Title.appendChild(itemID)
    Rating.appendChild(itemRating)
    Rating.appendChild(itemReviews)
    Price.innerHTML = "<p>As low as</p>"
    Price.appendChild(itemPrice)
    Color.innerHTML = "<p>COLOR:</p><span>(Required)</span>"
    Color.appendChild(itemColors)
    Size.innerHTML = "<p>SIZE:</p><span>(Required)</span>"
    Size.appendChild(itemSize)
    Buttons.appendChild(buttonAddToCart)
    Buttons.appendChild(buttonAddToWishlist)
    Media.innerHTML = '<a href="https://www.facebook.com/"><img src="../image/facebook 1.png" alt="facebook"></a><a href="https://twitter.com/"><img src="../image/twitter 1.png" alt="twitter"></a><a href="https://www.pinterest.com/"><img src="../image/pinterest 1.png" alt="pinterest"></a><a href="#"><img src="../image/link 1.png" alt="link"></a>'
    Shopping.innerHTML = '    <div id="shoppingTitle"><p>- Worry Free Shopping -</p></div><div id="shoppingDelivery"><div><img src="../image/free-delivery 1.png" alt="free-delivery"><p>FREE PRIORITY SHIPPING ON ORDERS $99+*</p></div><div><img src="../image/exchange 1.png" alt="exchange"><p>FREE RETURNS & EXCHANGES*</p></div></div>'

    divForDescriotion.appendChild(Title)
    divForDescriotion.appendChild(Rating)
    divForDescriotion.appendChild(Price)
    divForDescriotion.appendChild(Color)
    divForDescriotion.appendChild(Size)
    divForDescriotion.appendChild(Buttons)
    divForDescriotion.appendChild(Media)
    divForDescriotion.appendChild(Shopping)

    div_description.appendChild(divForImg)
    div_description.appendChild(divForDescriotion)

    let wayTitle = document.getElementById("wayTitle")
    wayTitle.appendChild(itemTitle_way)
}


document.getElementById("to_up").addEventListener("click", function(){
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
})

