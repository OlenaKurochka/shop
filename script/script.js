
let listCart = [0]
localStorage.setItem('listCart', JSON.stringify(listCart));

document.getElementById("to_up").addEventListener("click", function(){
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
})