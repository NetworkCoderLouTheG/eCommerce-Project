package com.louis.model;
import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String imageUrl;
    private String specs;
    private Long categoryId;
}
