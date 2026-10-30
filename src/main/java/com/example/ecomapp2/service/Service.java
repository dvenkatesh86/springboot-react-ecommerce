package com.example.ecomapp2.service;

import com.example.ecomapp2.Product.product;
import com.example.ecomapp2.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@org.springframework.stereotype.Service
public class Service{

    @Autowired
    private repo repo;

    public List<product> getAllProducts() {
        return repo.findAll();
    }


    public product getById(int proId) {
        return repo.findById(proId).orElse(null);
    }


    public product addProduct(product product, MultipartFile imageFile) throws IOException {

        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());

        return repo.save(product);

    }


    public product updateProduct(int id, product product, MultipartFile imageFile) throws IOException {


        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());


        return repo.save(product);
    }

    public void deleteProduct(int id){
        repo.deleteById(id);
    }


    public List<product> searchProduct(String keyword) {
        return repo.searchProduct(keyword);
    }
}