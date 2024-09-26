let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total"); 
let count = document.getElementById("count"); 
let categoryField = document.getElementById("categoryField"); 
let createButton = document.getElementById("submit"); 
let searchField = document.getElementById("search"); 
let searchTitleBtn = document.getElementById("searchTitleBtn"); 
let categoryBtn = document.getElementById("categoryBtn"); 


// console.log(title,price,taxes,ads,discount,total,count,categoryField,submitButton,submitButton,searchField,searchTitleBtn,categoryBtn)






//get total 
function getTotal () {
if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) -   +discount.value;
    total.innerHTML = result;
    total.style.background = '#040'
}else{
    total.style.background = '#a00d02'
    total.innerHTML = '';

}
}

// Create Products & Store Data using LocalStorage

if(localStorage.products != null){
    dataPro = JSON.parse(localStorage.products); // Parse To change the type of data & And then add the new data to  dataPro Array
}else{
    let dataPro = [];

}

createButton.onclick = function () {
let newPro = {
    title:title.value,
    price:price.value,
    ads:ads.value,
    taxes:taxes.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    categoryField:categoryField.value
}
dataPro.push(newPro); // Save data into this array 
localStorage.setItem("products" , JSON.stringify(dataPro)); // stringify To change the type of data 
console.log(dataPro);
clearData();
showData ();
}


//clear data after create
function clearData(){
    title.value = '';
    price.value= '';
    ads.value= '';
    taxes.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    categoryField.value= '';
};

// read products after create 
function showData (){
let table = ''
for(let i = 0 ; i < dataPro.length ; i++ ){
    table +=   // +  => To keep all old products 
`<tr>
                        <td>2${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <th>${dataPro[i].discount}</th>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].categoryField}</td>
                        <td><button id="update" >update</button></td>
                        <td><button onclick ="deleteProduct(${i});" id="delete" >delete</button></td>
</tr>`;
}
document.getElementById('tbody').innerHTML = table;
}
showData ();

//count 

//delete 
function deleteProduct(i){
dataPro.splice(i,1); // there is a deleting here but only on array 
localStorage.products = JSON.stringify(dataPro);
showData ();

}
// update
//search
// cleaning data for search 
