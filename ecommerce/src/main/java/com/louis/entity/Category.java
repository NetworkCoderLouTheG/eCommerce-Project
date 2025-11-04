package com.louis.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    // Optional: One-to-many relationship
    @OneToMany(mappedBy = "category")
    private List<Product> products;

    // Getters and Setters
}
