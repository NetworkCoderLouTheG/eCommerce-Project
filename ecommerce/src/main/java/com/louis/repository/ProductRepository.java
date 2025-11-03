package com.louis.repository;

import com.louis.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Optional: Add custom query methods if needed
}