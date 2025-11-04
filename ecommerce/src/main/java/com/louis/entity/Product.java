package com.louis.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int stock;
    private String imageUrl;
    private String specs; // Example: PC part specs

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Constructors
    public Product() {}

    // (Optional) Constructor for easier instantiation in tests/seeding
    public Product(String name, String description, double price, int stock,
                   String imageUrl, String specs, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.specs = specs;
        this.category = category;
    }

    // Getters and Setters

}
