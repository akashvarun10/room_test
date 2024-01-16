import React, { useState } from 'react';

const GroceryCategory = ({ title, products, addToCart }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <h2>
        {title}{' '}
        {products.length > 3 && (
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </h2>
      <div className={`productsContainer ${showAll ? 'horizontalScroll' : ''}`}>
        {showAll
          ? products.map((product, index) => (
              <div key={index} className="product">
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>Price: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          : products.slice(0, 3).map((product, index) => (
              <div key={index} className="product">
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>Price: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
      </div>
    </div>
  );
};

const ShoppingCart = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((cartItem, index) => (
          <li key={index}>
            {cartItem.product && (
              <>
                {cartItem.product.name} - ${cartItem.product.price} (Quantity: {cartItem.quantity}){' '}
                <button onClick={() => removeFromCart(cartItem.product)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [vegetables] = useState([
    { id: 1, name: 'Carrots', price: 1.5 },
    { id: 2, name: 'Broccoli', price: 2.0 },
    { id: 3, name: 'Tomatoes', price: 1.8 },
    { id: 4, name: 'Bell Peppers', price: 2.5 },
    { id: 5, name: 'Spinach', price: 1.7 },
    { id: 6, name: 'Cucumbers', price: 1.6 },
    { id: 7, name: 'Onions', price: 1.9 },
  ]);

  const [fruits] = useState([
    { id: 8, name: 'Apples', price: 2.0 },
    { id: 9, name: 'Bananas', price: 1.5 },
    { id: 10, name: 'Oranges', price: 1.7 },
    { id: 11, name: 'Grapes', price: 3.0 },
    { id: 12, name: 'Strawberries', price: 2.8 },
    { id: 13, name: 'Pineapple', price: 2.3 },
    { id: 14, name: 'Mangoes', price: 2.6 },
  ]);

  const [recommendations] = useState([
    { id: 15, name: 'Milk', price: 3.0 },
    { id: 16, name: 'Bread', price: 2.5 },
    { id: 17, name: 'Eggs', price: 2.2 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingCartItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingCartItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity -= 1;

      if (updatedCart[existingCartItemIndex].quantity === 0) {
        updatedCart.splice(existingCartItemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  return (
    <div>
      <header>
        <h1>Grocery Store</h1>
        <div className="cartIcon" onClick={() => console.log('Open Cart')}>
          🛒
        </div>
      </header>

      <main>
        <GroceryCategory title="Vegetables" products={vegetables} addToCart={addToCart} />
        <GroceryCategory title="Fruits" products={fruits} addToCart={addToCart} />
        <GroceryCategory title="Your Recommendations" products={recommendations} addToCart={addToCart} />

        <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
      </main>
    </div>
  );
};

export default App;













