// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
    showCartNotification(product.name);
    
    // Add animation to the button
    const button = event.currentTarget;
    button.classList.add('added-to-cart');
    setTimeout(() => {
        button.classList.remove('added-to-cart');
    }, 500);
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '<h1>CART</h1>'; // Reset with heading
    
    if (cart.length === 0) {
        const emptyCart = document.createElement('h3');
        emptyCart.textContent = 'Your cart is empty';
        cartContainer.appendChild(emptyCart);
        return;
    }
    
    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        
        const itemPrice = document.createElement('span');
        itemPrice.textContent = '₹' + item.price.toFixed(2);
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&times;';
        removeBtn.className = 'remove-item';
        removeBtn.onclick = function() { removeFromCart(index); };
        
        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(removeBtn);
        cartContainer.appendChild(itemElement);
    });
    
    // Calculate and display the total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<span>Total:</span> <span>₹${total.toFixed(2)}</span>`;
    cartContainer.appendChild(totalElement);
    
    // Add checkout button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = 'Checkout';
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.onclick = function() { checkout(); };
    cartContainer.appendChild(checkoutBtn);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Function to checkout
function checkout() {
    alert('Thank you for your order! Total: ₹' + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
    cart = [];
    updateCartDisplay();
}

// Function to show a notification when item is added to cart
function showCartNotification(productName) {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Select all product option buttons
const productOptions = document.querySelectorAll('.product-option');

// Add click event listener to each button
productOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all options in this product
        const productContainer = this.closest('.product');
        productContainer.querySelectorAll('.product-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get the description and image from the data attributes
        const description = this.getAttribute('data-description');
        const image = this.getAttribute('data-image');
        
        // Find the corresponding product description and image element
        const productDescription = productContainer.querySelector('.product-description');
        const productImage = productContainer.querySelector('.product-image');
        
        // Update the product description text and image source with animation
        productDescription.style.opacity = '0';
        productImage.style.opacity = '0';
        
        setTimeout(() => {
            productDescription.textContent = description;
            productImage.src = image;
            
            productDescription.style.opacity = '1';
            productImage.style.opacity = '1';
        }, 300);
    });
});

// Event listeners for adding products to the cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        // Parse the price correctly by removing the currency symbol
        const product = {
            name: this.dataset.name,
            price: parseFloat(this.dataset.price.replace('₹', '').trim()) // Remove ₹ and parse as float
        };
        addToCart(product);
    });
});

// Scroll effects for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Auto-click the first option in each product to display its details
    document.querySelectorAll('.product').forEach(product => {
        const firstOption = product.querySelector('.product-option');
        if (firstOption) {
            firstOption.click();
        }
    });
    
    // Initialize cart display
    updateCartDisplay();
    
    // Add CSS class to body when page is loaded
    document.body.classList.add('loaded');
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
        }
    });
});