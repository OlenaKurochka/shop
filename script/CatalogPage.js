
console.log(localStorage)

document.addEventListener("DOMContentLoaded", async function(){
    const requestURL = "../script/Gallery_1.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    let itemsCatalogArr = await response.json();
    let itemsCatalog = itemsCatalogArr.items;
    addItem(itemsCatalog, 0, 9)  

    /*---------------------Pagination---------------------*/
    function pagination(){
        let [...pageNumbersArr] = document.querySelectorAll(".page_numbers >button")
        // console.log(pageNumbersArr)
        pageNumbersArr.forEach(btn => {
            btn.addEventListener("click", function(){
                // console.log(btn.dataset.value)
                switch (this.dataset.value) {
                    case "1":
                        addItem(itemsCatalog, 0, 9);
                        // this.classList.add("active") 
                        return
                    case "2":
                        addItem(itemsCatalog, 10, 19);
                        // this.classList.add("active")
                        return
                    case "3":
                        addItem(itemsCatalog, 20, 29);
                        // this.classList.add("active")
                        return
                    case "4":
                        addItem(itemsCatalog, 30, 39);
                        // this.classList.add("active")
                        return
                    case "5":
                        addItem(itemsCatalog, 40, 49);
                        // this.classList.add("active")
                        return
                }
            }) 
        })
    }
    pagination()
    /*---------------------Pagination end---------------------*/

    /*---------------------filter by Size---------------------*/
    let [...size_checkbox] = document.querySelectorAll('input[name=size]')
    let score = []
    let sizeArr = ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46", 'M', 'L', 'XL'] 

    size_checkbox.forEach(e => {
    e.addEventListener("click", function(){
        let sortedArray = itemsCatalog;   
        // console.log(sortedArray) 
        if(e.checked === true){
            // console.log(e.id)
            score.push(e.id)
            // console.log(score) 
        }else if (e.checked === false){
            score.splice(score.indexOf(e.id), 1)
            console.log(score) 
        }
        console.log(score) 
        sizeArr.forEach((item) => {
            if (score.includes(item)) {
                sortedArray = sortedArray.filter(el => el.size.includes(item))
                console.log(sortedArray)
                let endSortedArray = sortedArray.length-1
                addItem(sortedArray, 0, endSortedArray)
            }
        });

    })    
});
/*---------------------filter by Size end---------------------*/
/*---------------------filter by Color---------------------*/

let colorArr = ['Black', 'Green', 'Blue', 'Gray', 'Brown', 'Sand', 'White', 'Dark_blue', 'Aqua', 'Coral']
let [...color_checkbox] = document.querySelectorAll('input[name=color]')
let scoreColor =[]
color_checkbox.forEach(e => {
    e.addEventListener("click", function(){
        let sortedArrayColor = itemsCatalog;
        if(e.checked === true){
            // console.log(e.id)
            scoreColor.push(e.id)
            // console.log(scoreColor) 
        }else if (e.checked === false){
            scoreColor.splice(scoreColor.indexOf(e.id), 1)
            console.log(scoreColor) 
        }
        console.log(scoreColor)
        
        colorArr.forEach((item) => {
            if (scoreColor.includes(item)) {
            console.log("+")
            sortedArrayColor = sortedArrayColor.filter(el => el.colorDescription.includes(item))
            console.log(sortedArrayColor)
            let endSortedArrayColor = sortedArrayColor.length-1
            addItem(sortedArrayColor, 0, endSortedArrayColor)
        }
    }); 
    })
})

 /*---------------------filter by Color end---------------------*/

})

function addItem(obj, start, end) {
    const div = document.querySelector('.gallery');
    // const items = obj.items;
    const items = obj;
    // console.log(items)
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }

    for (let k = start; k<=end; k++) {
        const divForItem = document.createElement('div');
        divForItem.classList.add("divForItem") 
        // console.log(k)
        const ID = items[k].id
        // console.log(ID)
        divForItem.id = `item${items[k].id}`
        // console.log(divForItem.id)

        const itemImg = document.createElement('img');
        itemImg.classList.add("itemImg")
        const itemTitle = document.createElement('h1');
        itemTitle.classList.add("itemTitle")
        const itemRating = document.createElement('img');
        itemRating.classList.add("itemRating")
        const itemPrice = document.createElement('h3');
        itemPrice.classList.add("itemPrice")

        const itemColors = document.createElement('div');
        itemColors.classList.add("itemColors")

        const buttonAddToCart = document.createElement('a');
        buttonAddToCart.classList.add("buttonAddToCart")

        itemImg.src = items[k].img;
        itemTitle.textContent = items[k].title;

        if (items[k].rating == 5){
            itemRating.src = "../image/5star.png"
        }else if(items[k].rating == 4){
            itemRating.src = "../image/4star.png"
        }else if(items[k].rating>4 && items[k].rating<5){
            itemRating.src = "../image/4_5star.png"
        }else if(items[k].rating == 3){
            itemRating.src = "../image/3star.png"
        }else if(items[k].rating == 2){
            itemRating.src = "../image/2star.png"
        }else if(items[k].rating == 1){
            itemRating.src = "../image/1star.png"
        }else{
            itemRating.src = "../image/0star.png"
        }

        itemPrice.textContent = `As low as $${items[k].price}`;

        buttonAddToCart.textContent = 'VIEW';
        buttonAddToCart.dataset.value = k
        // console.log(buttonAddToCart.dataset.value)
  
        divForItem.appendChild(itemImg);
        divForItem.appendChild(itemTitle);
        divForItem.appendChild(itemRating);
        divForItem.appendChild(itemPrice);
        divForItem.appendChild(itemColors);
        divForItem.appendChild(buttonAddToCart);

        const a_divForItem = document.createElement('a');
        a_divForItem.classList.add("a_divForItem") 
        a_divForItem.appendChild(divForItem)
        a_divForItem.href=`./ProductPage.html?idItem=${ID-1}`

        let arrItemColors = items[k].colors
        // console.log(arrItemColors)
        for(let i = 0; i<arrItemColors.length; i++){
            // console.log(arrItemColors[i].color)
            // console.log(arrItemColors[i].img)
            itemColors.innerHTML += `<img src="${arrItemColors[i].img}" alt="${arrItemColors[i].color}" class="imgColor">`
            // divForItem.classList.add(`${arrItemColors[i].color}`)
            a_divForItem.classList.add(`${arrItemColors[i].color}`)
        }

        let arrItemSize = items[k].size
        for(let j = 0; j<arrItemSize.length; j++){
            a_divForItem.classList.add(`${arrItemSize[j]}`) 
        }

        div.appendChild(a_divForItem)   

    }


}

document.getElementById("to_up").addEventListener("click", function(){
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
})





