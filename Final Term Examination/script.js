function changeContent(contentId) {
    var content = document.getElementById(contentId).innerHTML;
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = content;
    
    // Call the function to set up event listeners for the buttons again
    setupAddToCartButtons();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    // Event delegation: attach event listener to a parent element
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.btn-container');
        const removeButton = event.target.closest('.remove-button');
        
        if (button) {
            console.log('Button clicked!');
            const product = button.parentElement;
            console.log('Product:', product);
            const productName = product.querySelector('p:nth-of-type(1)').textContent.trim();
            console.log('Product Name:', productName);
            const productPriceText = product.querySelector('p:nth-of-type(2)').textContent.trim();
            console.log('Product Price Text:', productPriceText);
            const productPrice = parseFloat(productPriceText.split('Php ')[1]);
            console.log('Product Price:', productPrice);

            addToCart(productName, productPrice);
        } else if (removeButton) {
            const itemName = removeButton.dataset.name;
            removeFromCart(itemName);
        }
    });

    function addToCart(name, price) {
        const existingItemIndex = cart.findIndex(item => item.name === name);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        renderCart();
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }

        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x ${item.quantity} - Php ${(item.price * item.quantity).toFixed(2)}`;

            // Create a remove button for each item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.dataset.name = item.name;
            removeButton.classList.add('remove-button');
            listItem.appendChild(removeButton);

            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});
