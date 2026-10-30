package com.example.ecomapp2.controller;

import com.example.ecomapp2.model.User;
import com.example.ecomapp2.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }
}