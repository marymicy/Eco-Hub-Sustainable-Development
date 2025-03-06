document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const notification = document.getElementById('notification');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.getAttribute('data-name');
            const productPrice = productCard.getAttribute('data-price');

            const product = {
                name: productName,
                price: productPrice
            };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification(`You have participated in ${productName}!`);
        });
    });

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});