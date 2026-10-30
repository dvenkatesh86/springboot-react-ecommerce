package com.example.ecomapp2.controller;

import com.example.ecomapp2.model.CartItem;
import com.example.ecomapp2.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable int userId,
            @RequestParam int productId,
            @RequestParam int quantity) {

        return ResponseEntity.ok(
                cartService.addToCart(userId, productId, quantity)
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(
            @PathVariable int userId) {

        return ResponseEntity.ok(
                cartService.getCartItems(userId)
        );
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable int itemId) {

        cartService.removeFromCart(itemId);

        return ResponseEntity.ok("Item removed from cart");
    }
}