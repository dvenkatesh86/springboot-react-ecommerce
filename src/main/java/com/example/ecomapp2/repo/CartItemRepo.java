package com.example.ecomapp2.repo;

import com.example.ecomapp2.Product.product;
import com.example.ecomapp2.model.Cart;
import com.example.ecomapp2.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepo extends JpaRepository<CartItem, Integer> {

    Optional<CartItem> findByCartAndProduct(Cart cart, product product);
}