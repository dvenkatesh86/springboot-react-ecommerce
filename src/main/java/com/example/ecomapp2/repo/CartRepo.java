package com.example.ecomapp2.repo;

import com.example.ecomapp2.model.Cart;
import com.example.ecomapp2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart, Integer> {

    Optional<Cart> findByUser(User user);
}