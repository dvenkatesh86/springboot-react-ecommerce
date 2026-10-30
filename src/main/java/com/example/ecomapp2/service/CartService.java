package com.example.ecomapp2.service;

import com.example.ecomapp2.Product.product;
import com.example.ecomapp2.model.Cart;
import com.example.ecomapp2.model.CartItem;
import com.example.ecomapp2.model.User;
import com.example.ecomapp2.repo.CartItemRepo;
import com.example.ecomapp2.repo.CartRepo;
import com.example.ecomapp2.repo.UserRepo;
import com.example.ecomapp2.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartItemRepo cartItemRepo;

    @Autowired
    private repo productRepo;

    @Autowired
    private UserRepo userRepo;

    public Cart createCart(int userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);

        return cartRepo.save(cart);
    }

    public CartItem addToCart(int userId, int productId, int quantity) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepo.save(newCart);
                });

        CartItem item = cartItemRepo.findByCartAndProduct(cart, product)
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
        }

        return cartItemRepo.save(item);
    }

    public List<CartItem> getCartItems(int userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return cartItemRepo.findAll()
                .stream()
                .filter(item -> item.getCart().getId() == cart.getId())
                .toList();
    }

    public void removeFromCart(int itemId) {
        cartItemRepo.deleteById(itemId);
    }
}