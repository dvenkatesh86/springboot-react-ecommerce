package com.example.ecomapp2.repo;

import com.example.ecomapp2.Product.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface repo
        extends JpaRepository<product, Integer> {


    @Query("""
            SELECT p
            FROM product p
            WHERE
            LOWER(p.proName)
            LIKE LOWER(CONCAT('%', :keyword, '%'))

            OR LOWER(p.desc)
            LIKE LOWER(CONCAT('%', :keyword, '%'))

            OR LOWER(p.color)
            LIKE LOWER(CONCAT('%', :keyword, '%'))

            OR LOWER(p.brand)
            LIKE LOWER(CONCAT('%', :keyword, '%'))

            OR LOWER(p.category)
            LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)

    List<product> searchProduct(
            @Param("keyword")
            String keyword
    );

}