package com.example.ecomapp2.Product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proId;

    private String proName;

    private String desc;

    private Date date;

    private String color;

    private String brand;

    private String category;

    private double price;

    private String imageName;

    private String imageType;

    @Lob
    private byte[] imageData;
}