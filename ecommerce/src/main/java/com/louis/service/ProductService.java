package com.louis.service;

import com.louis.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    // Add category filter, search, etc. methods as needed
}
