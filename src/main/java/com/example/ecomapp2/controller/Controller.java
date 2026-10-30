package com.example.ecomapp2.controller;

import com.example.ecomapp2.Product.product;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.ecomapp2.service.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
   private Service ser;

    @GetMapping("/product")
    public ResponseEntity<List<product>> getAllProducts(){
        return new ResponseEntity<>(ser.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/product/{proId}")
public ResponseEntity<product> getById(@PathVariable int proId){
        product pro = ser.getById(proId);
        if(pro != null)
            return new ResponseEntity<>(ser.getById(proId),HttpStatus.OK);

        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
@PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart product product,@RequestPart MultipartFile imageFile){

        try {
            product product1 = ser.addProduct(product,imageFile);
            return new ResponseEntity<>(product1, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/product/{proId}/image")
    public ResponseEntity<byte[]> getImageById(@PathVariable int proId){
        product product = ser.getById(proId);
        byte[] imageFile = product.getImageData();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImageType()))
                .body(imageFile);
    }


    @PutMapping("product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id,@RequestPart product product,@RequestPart MultipartFile imageFile){

        product product1 = null;
        try{
            product1 = ser.updateProduct(id,product,imageFile);
        }
        catch(Exception e){
            throw new RuntimeException();
        }

        if(product1 != null)
            return new ResponseEntity<String>("updated",HttpStatus.OK);

        else
            return new ResponseEntity<>("not updated",HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        product product = ser.getById(id);

        if (product != null){
            ser.deleteProduct(id);

        return new ResponseEntity<>("deleted", HttpStatus.OK);

    }
        else
            return new ResponseEntity<>("not deleted",HttpStatus.NOT_FOUND);

    }

@GetMapping("/product/search")
public ResponseEntity<List<product>> searchProduct(@RequestParam String keyword){
        List<product> product = ser.searchProduct(keyword);
        return new ResponseEntity<>(product,HttpStatus.OK);
}

    }


