let carrinho = document.getElementById("cart-modal");
let menu = document.getElementById("menu");
let cartBtn = document.getElementById("cart-btn");
let cartItemsContainer = document.getElementById("cart-items");
let cartCount = document.getElementById("cart-count");
let checkoutBtn = document.getElementById("checkout-btn");
let dateSpan = document.getElementById("date-span");
let addressInput = document.getElementById("address");
let addressWarn = document.getElementById("address-warn");
let cartTotal = document.getElementById("cart-total");
let closeModalBtn = document.getElementById("close-modal-btn");

let cart = [];



cartBtn.addEventListener('click', function(){
    updateCartModal();
    carrinho.style.display="flex";
});

carrinho.addEventListener('click',function(event){
    if(event.target === carrinho){
        carrinho.style.display="none";
    }
});

closeModalBtn.addEventListener('click', function(){
    carrinho.style.display="none";
});

menu.addEventListener('click', function(event){
    let parentButton = event.target.closest(".add-to-cart-btn");
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name,price);

    }
})

function addToCart(name, price){

    const existingItem = cart.find(item => item.name ==  name)
    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
        name,
        price,
        quantity: 1,
    })
    }

     Toastify({
  text: "Item adicionado ao carrinho",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right", 
  stopOnFocus: true, 
  style: {
    background: "#070",
  },

  onClick: function(){} 
}).showToast();

updateCartModal();

}

function updateCartModal(){
cartItemsContainer.innerHTML="";
let total = 0;

cart.forEach(item =>{
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cartItemElement.innerHTML= `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd:${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

                <button class="remove-from-btn" data-name="${item.name}">
                    Remover
                </button>

        </div>
    `

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)
});

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    
    cartCount.innerHTML = cart.length;

}

cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-from-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);

        Toastify({
  text: "Item retirado do carrinho!",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right", 
  stopOnFocus: true, 
  style: {
    background: "#444",
  },

  onClick: function(){} 
}).showToast();


}updateCartModal();

}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})



checkoutBtn.addEventListener('click', function(){

    const isOpen = checkRestauranteOpen();
    if(!isOpen){

       Toastify({
  text: "Ops, o restaurante está fechado no momento!",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right", 
  stopOnFocus: true, 
  style: {
    background: "#ef4444",
  },

  onClick: function(){} 
}).showToast();

        return;
    }


    if(cart.length === 0 ) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) => {
  return ` *${item.name}*\nQuantidade: ${item.quantity}\nPreço: R$ ${item.price.toFixed(2)}\n`;
}).join("\n");

const message = encodeURIComponent(
  `*Resumo do Pedido:*\n\n${cartItems}\n *Endereço:* ${addressInput.value}\n\n Pedido feito pelo site.`
);

const phone = "+5511957344940";

window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

cart = [];
updateCartModal();


})


function checkRestauranteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 7 && hora < 18;
}

const isOpen = checkRestauranteOpen();

if(isOpen){
    dateSpan.classList.remove("bg-red-500")
    dateSpan.classList.add("bg-green-500")
}else{
    dateSpan.classList.remove("bg-green-500")
    dateSpan.classList.add("bg-red-500")
}


