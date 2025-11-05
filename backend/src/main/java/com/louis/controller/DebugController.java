package com.louis.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.louis.repository.ProductRepository;
import com.louis.entity.Product;
import javax.sql.DataSource;

@RestController
public class DebugController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DataSource dataSource;

    @GetMapping("/debug-db")
    public String debugDb() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("Connected DB: ")
          .append(dataSource.getConnection().getCatalog())
          .append("\\n");
        for (Product p : productRepository.findAll()) {
            sb.append(p.getName())
              .append(": ")
              .append(p.getStockQuantity())
              .append("\\n");
        }
        return sb.toString();
    }
}
