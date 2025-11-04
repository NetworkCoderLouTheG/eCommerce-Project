package com.louis.config;

import com.louis.entity.Product;
import com.louis.entity.Category;
import com.louis.repository.ProductRepository;
import com.louis.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initData(ProductRepository productRepo, CategoryRepository categoryRepo) {
        return args -> {
            // Ensure categories exist
            Category cpu = categoryRepo.findByName("CPU").orElseGet(() -> categoryRepo.save(new Category(null, "CPU")));
            Category ram = categoryRepo.findByName("RAM").orElseGet(() -> categoryRepo.save(new Category(null, "RAM")));
            Category gpu = categoryRepo.findByName("GPU").orElseGet(() -> categoryRepo.save(new Category(null, "GPU")));
            Category psu = categoryRepo.findByName("PSU").orElseGet(() -> categoryRepo.save(new Category(null, "PSU")));

            // Add one demo product to CPU category if no products
            if (productRepo.count() == 0) {
                productRepo.save(new Product(null,
                        "Demo CPU Product",
                        "Demo CPU description",
                        199.99,
                        25,
                        "/images/image.jpg",
                        "Intel i7, 12th Gen",
                        cpu
                ));
            }
        };
    }
}
