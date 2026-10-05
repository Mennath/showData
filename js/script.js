let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submitBtn = document.querySelector("#submitBtn");
let mode = "create";
let tmp; // temporary index for update

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.value = +result;
        // total.style.background = `#040 !important`;
    }else {
         total.value = "";
        // total.style.background = `#f00 !important`;
    }
}

//update total
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}
// let dataPro = [];
submitBtn.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        // total: total.value,
        total: total.innerHTML,
        category: category.value
    };
    if (mode === "create") {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    }else {
        dataPro[tmp] = newPro;
        mode = "create";
        submitBtn.innerHTML = "Create";
        count.style.display = "block";
    }

    // dataPro.push(newPro);
    localStorage.setItem("product", JSON.stringify(dataPro));
    // console.log(dataPro);
    clearData()
    showData()
}

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
}
function showData() {

    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <th><button id="UPDATE" onclick=" updateData(${i})"> UPDATE</button></th>
             <th><button id="DELETE" onclick=" deleteData(${i})" > DELETE</button></th>
        </tr>
        `;
    }
    document.querySelector("#tableBody").innerHTML = table;
}
 showData()
 function deleteData(i) {
     dataPro.splice(i, 1);
     localStorage.product = JSON.stringify(dataPro);
      showData()   
 }
 function deleteAll() {
        localStorage.clear();
        dataPro.splice(0);
        showData();
    }
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
     getTotal()
    category.value = dataPro[i].category;
    submitBtn.innerHTML = "Update";
    mode = "update";
    tmp = i;
    scroll({ top: 0 ,
    behavior: "smooth"
    })
}
// let searchMode = "title";

function setSearchMode(value) {
    let searchInput = document.querySelector("#search");
    searchMode = value;
    search.focus();
}
let searchMode = "title";
let table = "";
function searchData(value) {
    if (searchMode === "title") {
       for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.includes(value)) {
             table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <th><button id="UPDATE" onclick=" updateData(${i})"> UPDATE</button></th>
             <th><button id="DELETE" onclick=" deleteData(${i})" > DELETE</button></th>
        </tr>
        `;
        }
    }}}
           
    document.querySelector("#tableBody").innerHTML = table;



    
