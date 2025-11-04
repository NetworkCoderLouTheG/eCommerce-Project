package com.louis.config;

import com.louis.entity.Category;
import com.louis.entity.Product;
import com.louis.repository.CategoryRepository;
import com.louis.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (categoryRepository.count() > 0) {
            System.out.println("Database already initialized. Skipping data initialization.");
            return;
        }

        System.out.println("Initializing database with sample data...");

        // Create Categories
        Category processors = createCategory("Processors", "CPUs and Processors from Intel and AMD");
        Category graphics = createCategory("Graphics Cards", "GPU cards for gaming and professional work");
        Category motherboards = createCategory("Motherboards", "Mainboards compatible with various processors");
        Category memory = createCategory("Memory (RAM)", "System memory modules");
        Category storage = createCategory("Storage", "SSDs, HDDs, and NVMe drives");
        Category powerSupplies = createCategory("Power Supplies", "PSUs for powering your system");
        Category cases = createCategory("Cases", "PC cases and chassis");
        Category cooling = createCategory("Cooling", "CPU coolers, case fans, and liquid cooling");

        // Create Products
        createProduct("Intel Core i9-13900K", "High-performance 24-core processor",
                new BigDecimal("589.99"), 25, processors, "Intel",
                "https://via.placeholder.com/300x300?text=i9-13900K",
                "{\"cores\": 24, \"threads\": 32, \"base_clock\": \"3.0 GHz\", \"boost_clock\": \"5.8 GHz\"}");

        createProduct("AMD Ryzen 9 7950X", "16-core flagship processor",
                new BigDecimal("699.99"), 20, processors, "AMD",
                "https://via.placeholder.com/300x300?text=Ryzen-9-7950X",
                "{\"cores\": 16, \"threads\": 32, \"base_clock\": \"4.5 GHz\", \"boost_clock\": \"5.7 GHz\"}");

        createProduct("NVIDIA RTX 4090", "Flagship graphics card",
                new BigDecimal("1599.99"), 15, graphics, "NVIDIA",
                "https://via.placeholder.com/300x300?text=RTX-4090",
                "{\"memory\": \"24GB GDDR6X\", \"cuda_cores\": 16384, \"boost_clock\": \"2.52 GHz\"}");

        createProduct("AMD Radeon RX 7900 XTX", "High-end gaming GPU",
                new BigDecimal("999.99"), 18, graphics, "AMD",
                "https://via.placeholder.com/300x300?text=RX-7900-XTX",
                "{\"memory\": \"24GB GDDR6\", \"compute_units\": 96, \"boost_clock\": \"2.5 GHz\"}");

        createProduct("ASUS ROG Strix Z790-E", "Premium Intel Z790 motherboard",
                new BigDecimal("449.99"), 30, motherboards, "ASUS",
                "https://via.placeholder.com/300x300?text=ROG-Z790",
                "{\"socket\": \"LGA1700\", \"chipset\": \"Z790\", \"memory_slots\": 4, \"max_memory\": \"128GB\"}");

        createProduct("Corsair Vengeance DDR5 32GB", "32GB DDR5 RAM Kit",
                new BigDecimal("149.99"), 50, memory, "Corsair",
                "https://via.placeholder.com/300x300?text=DDR5-32GB",
                "{\"capacity\": \"32GB\", \"type\": \"DDR5\", \"speed\": \"6000MHz\", \"cas_latency\": \"CL36\"}");

        createProduct("Samsung 990 Pro 2TB", "NVMe Gen4 SSD",
                new BigDecimal("199.99"), 40, storage, "Samsung",
                "https://via.placeholder.com/300x300?text=990-Pro-2TB",
                "{\"capacity\": \"2TB\", \"interface\": \"PCIe 4.0 x4\", \"read_speed\": \"7450 MB/s\", \"write_speed\": \"6900 MB/s\"}");

        createProduct("Corsair RM850x", "850W 80+ Gold PSU",
                new BigDecimal("139.99"), 35, powerSupplies, "Corsair",
                "https://via.placeholder.com/300x300?text=RM850x",
                "{\"wattage\": \"850W\", \"efficiency\": \"80+ Gold\", \"modular\": \"Fully Modular\"}");

        createProduct("NZXT H510 Elite", "Mid-tower PC case",
                new BigDecimal("149.99"), 25, cases, "NZXT",
                "https://via.placeholder.com/300x300?text=H510-Elite",
                "{\"form_factor\": \"Mid Tower\", \"color\": \"Black\", \"side_panel\": \"Tempered Glass\"}");

        createProduct("Noctua NH-D15", "Premium air CPU cooler",
                new BigDecimal("99.99"), 30, cooling, "Noctua",
                "https://via.placeholder.com/300x300?text=NH-D15",
                "{\"type\": \"Air Cooler\", \"fan_size\": \"140mm\", \"height\": \"165mm\"}");

        System.out.println("Database initialization completed successfully!");
    }

    private Category createCategory(String name, String description) {
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        return categoryRepository.save(category);
    }

    private Product createProduct(String name, String description, BigDecimal price,
                                  Integer stockQuantity, Category category, String brand,
                                  String imageUrl, String specifications) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
        product.setCategory(category);
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specifications);
        return productRepository.save(product);
    }
}