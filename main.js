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

let mood = 'create';
let tmp;

//get total to calculate  the price and ads , tax ,...
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
let dataPro;
if(localStorage.products != null){
    dataPro = JSON.parse(localStorage.products); // Parse To change the type of data & And then add the new data to  dataPro Array
}else{
 dataPro = [];

}

createButton.onclick = function () {
let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    ads:ads.value,
    taxes:taxes.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    categoryField:categoryField.value.toLowerCase()
}

if(title.value != '' && price.value != '' &&  count.value <1000 && categoryField.value != ''){
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0 ;i<newPro.count;i++){
                dataPro.push(newPro); // Save data into this array 
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        createButton.innerHTML = 'Create';
        count.style.display = 'block';
    }
}



localStorage.setItem("products" , JSON.stringify(dataPro)); // stringify To change the type of data 
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
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <th>${dataPro[i].discount}</th>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].categoryField}</td>
                        <td><button   onclick ="updateProduct(${i});"id="update" >update</button></td>
                        <td><button onclick ="deleteProduct(${i});" id="delete" >delete</button></td>
</tr>`;
}
document.getElementById('tbody').innerHTML = table;
let btnDeleteAll = document.getElementById('btnDeleteAll');
if(dataPro . length >0){
    btnDeleteAll.innerHTML = `<button onclick ="deleteAllProducts();" >Delete All Products (${dataPro.length})</button>`
}else{
btnDeleteAll.innerHTML = '';
}
getTotal();

}
showData ();


//delete function
function deleteProduct(i){
dataPro.splice(i,1); // there is a deleting here but only on array 
localStorage.products = JSON.stringify(dataPro);
showData ();

}

//delete all function

function deleteAllProducts() {
localStorage.clear();
dataPro.splice(0);
showData();
}


// updateProduct function
function updateProduct(i){
    title.value = dataPro[i].title ;
    price.value= dataPro[i].price ;
    ads.value= dataPro[i].ads ;
    taxes.value= dataPro[i].taxes ;
    discount.value= dataPro[i].discount ;
    total.innerHTML= dataPro[i].total ;
    categoryField.value= dataPro[i].categoryField ;
    getTotal();
    count.style.display = 'none';
    createButton.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
        top:0,
        behavior:'smooth'
    })
}



let searchMood = 'title';

function getSearchMood(id){

    if(id === 'searchTitleBtn'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }

    searchField.placeholder = 'Search By ' + searchMood;

    searchField.focus();
    searchField.value='';
    showData();
}

//search
function searchData(value){
    let table = '';
if(searchMood === 'title'){

for(let i =0 ; i<dataPro.length ; i++){
if(dataPro[i].title.includes(value.toLowerCase())){
    table +=   // +  => To keep all old products 
    `<tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <th>${dataPro[i].discount}</th>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].categoryField}</td>
                            <td><button   onclick ="updateProduct(${i});"id="update" >update</button></td>
                            <td><button onclick ="deleteProduct(${i});" id="delete" >delete</button></td>
    </tr>`;
    }
}
}else{
    for(let i =0 ; i<dataPro.length ; i++){
        if(dataPro[i].categoryField.includes(value.toLowerCase())){
            table +=   // +  => To keep all old products 
            `<tr>
                                    <td>${i+1}</td>
                                    <td>${dataPro[i].title}</td>
                                    <td>${dataPro[i].price}</td>
                                    <td>${dataPro[i].taxes}</td>
                                    <td>${dataPro[i].ads}</td>
                                    <th>${dataPro[i].discount}</th>
                                    <td>${dataPro[i].total}</td>
                                    <td>${dataPro[i].categoryField}</td>
                                    <td><button   onclick ="updateProduct(${i});"id="update" >update</button></td>
                                    <td><button onclick ="deleteProduct(${i});" id="delete" >delete</button></td>
            </tr>`;
            }
        }
}
document.getElementById('tbody').innerHTML = table;
}
