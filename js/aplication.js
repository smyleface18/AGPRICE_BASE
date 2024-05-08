 //variables de fetch

 const options = {
     method: "GET",
     mode: "cors",
     headers:{
         "Content-Type": "application/json",
         "Accept": "application/json"
     }
 }
 
 
 
     //funcionalidad de alert cuando el usuario vuelva a entrar
     const value_desired = document.querySelector("#value_desired");
     const button = document.querySelector("#button_desired");
     const PRODUCT = document.querySelector("#producto"); 
     
 
 
     localStorage.setItem("alert_reload", false)
 
     if(localStorage.getItem("alert_reload")){
         window.addEventListener("load", () =>{
             let index_product = localStorage.getItem("index_product");
             let value = localStorage.getItem("value_desired");
             let myJson = localStorage.getItem("myJson");
             console.log("funcionando reload alter")
             if(index_product != undefined){
                  if(myJson[index_product].price *1000 >= value ){
                      console.log("entro")
                      alert("price")
                      value_desired.value = "";
 
                  }
                  else {
                      value_desired.value = value;
                  }
             }
          });
 
     }
 
 
     // llamada a la api
 
     var myJson
      await fetch("http://127.0.0.1:8000/price",options)
         .then(res => res.json())
         .then(data =>{
              myJson = data;})
         .catch(error => console.error("Error al obtener los datos:", error));
         
 
 
 
     //funcionalidad de alert
 
 
 
 
     PRODUCT.addEventListener("click",function(e)  {
         localStorage.setItem("index_product", e.target.selectedIndex)
         console.log(localStorage.getItem("index_product"))
     });
 
 
 
         button.addEventListener("click",()=>{
             let index_product = localStorage.getItem("index_product");
             localStorage.setItem("value_desired", value_desired.value);
             console.log(value_desired.value)
             console.log(myJson[index_product].price)
             if(myJson[index_product].price *1000 >= value_desired.value ){
                
                 alert("price")
                 value_desired.value = "";
             }
             else{
                 localStorage.setItem("alert_reload",true);
                 console.log("entro")
             }
         });
 
 //      Funcionalidad para mostrar los precios
 
             const nameCards = [...document.querySelectorAll('#name')];
                 for (let index = 0; index < nameCards.length; index++) {
                     const element = nameCards[index];
                     element.innerHTML= myJson[index].name
                 }
 
             const priceCards = [...document.querySelectorAll('#price')];
                 for (let index = 0; index < priceCards.length; index++) {
                     const element = priceCards[index];
                     element.innerHTML= "$"+myJson[index].price*1000+" X Kilo"
                 }
 
             const locationCards = [...document.querySelectorAll('#ciudad')];
                 for (let index = 0; index < locationCards.length; index++) {
                     const element = locationCards[index];
                     element.innerHTML= myJson[index].location
                 }
 
                 localStorage.setItem("myJson", JSON.stringify(myJson));                        
 
 
//hacemos otro get a la api 

var historical_prices
await fetch("http://127.0.0.1:8000/historical/prices",options)
.then(res => res.json())
.then(data =>{
    historical_prices = data;})
.catch(error => console.error("Error al obtener los datos:", error));
 

//graficas historical_prices 

const grafica = document.querySelector(".grafica").getContext("2d");
const button_grafica = [...document.querySelectorAll(".product_grafica")]

var index_data = 0;
var title = historical_prices[0][index_data].name;

var mychart = new Chart(grafica, {

    type: "line",
    data:{
        labels:historical_prices.map(row => row[index_data].date),
        datasets:[
            {
                label:title,
                data: historical_prices.map( product => product[index_data].price)
            }
        ]
    },
    scales:{
        y:{
            min:10,
            max:200,
        }
    }
});

    for (let index = 0; index < button_grafica.length; index++) {
        const element = button_grafica[index];
        element.addEventListener("click", () => {
            index_data = element.value;
            console.log(index_data)
            console.log(historical_prices[0][index_data])
            mychart.destroy();
            title = historical_prices[0][index_data].name;
            mychart = new Chart(grafica, {

                type: "line",
                data:{
                    labels:historical_prices.map(row => row[index_data].date),
                    datasets:[
                        {
                            label:title,
                            data: historical_prices.map( product => product[index_data].price)
                        }
                    ]
                },
                scales: {
                    y: {
                        min:0,
                        max:10,
                    }
                }
            });
        });
    }






