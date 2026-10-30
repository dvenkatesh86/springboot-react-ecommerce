package com.example.ecomapp2.repo;

import com.example.ecomapp2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}