"use strict";

//#region local-session
// sessionStorage.setItem("name","Rafiq");
// sessionStorage.setItem("surname", "Mammadli");


// sessionStorage.removeItem("name");

// sessionStorage.clear();

// console.log(sessionStorage.getItem("name"));

// localStorage.setItem("name", "Rafiq");


// let inputKey = document.querySelector(".input-key");

// let inputValue = document.querySelector(".input-value");

// let addBtn = document.querySelector(".add");


// addBtn.addEventListener("click", function() {

//     let key = inputKey.value; 
//     let value = inputValue.value;

//     localStorage.setItem(key, value);

//     console.log(key + " " + value)

//     inputKey.value = "";
//     inputValue.value = "";

// })


// let datas = ["Nisa", "Rafig", "Rufana"]

// localStorage.setItem("datas", datas);

// let jsonData = {
//     name: "Nisa",
//     surname: "Narimanova",
//     phones: [6666231, 55555],
//     group: [ {
//         groupName: "P418",
//         capacity: 40,
//         teachers: [
//             "Cavid", "Hamid"
//         ]

//     }]
// }


// console.log(jsonData.group[0].capacity);

// for (const teacher of jsonData.group[0].teachers) {

//     console.log(teacher)
    
// }


// let datas = ["Nisa", "Rafig", "Rufana"];

// localStorage.setItem("datas", JSON.stringify(datas));

// console.log(JSON.parse(localStorage.getItem("datas")));

//#endregion

let basket = [];

if(JSON.parse(localStorage.getItem("basket")) == null){
    localStorage.setItem("basket", JSON.stringify(basket));
}else{
   basket =  JSON.parse(localStorage.getItem("basket"));
}

getBasketCount(basket);


function getBasketCount(arr){

    let basketCount = 0;
    let totalPrice = 0;

    if(arr.length != 0){
        for (const item of arr) {
            basketCount += item.count;  
            let subTotal = item.count * item.price; 
            totalPrice += subTotal;

        }
    }

    document.querySelector(".navigation .basket-count").innerText = basketCount;
    document.querySelector(".navigation .total-price").innerText = totalPrice;
}


let addBtns = document.querySelectorAll(".products .add-btn");

addBtns.forEach(btn => {

    btn.addEventListener("click", function(e){

        e.preventDefault();
        
        let productId = this.parentNode.getAttribute("data-id");
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.parentNode.lastElementChild.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productPrice = this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText;

        let existProduct = basket.find(m=>m.id == productId);
        if(existProduct != undefined){
            existProduct.count++;
        }else{
            basket.push({
                name: productName,
                id: productId,
                description: productDesc,
                image: productImage,
                count: 1,
                price: productPrice
            })
        }

        getBasketCount(basket);

        localStorage.setItem("basket", JSON.stringify(basket));

    })
});