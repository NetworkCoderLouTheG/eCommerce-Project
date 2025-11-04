package com.louis.util;

import com.louis.entity.Category;
import com.louis.entity.Product;
import com.louis.repository.CategoryRepository;
import com.louis.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataLoader(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Idempotent seeding: create missing categories and products if they don't exist

        // helper to get or create category
        java.util.function.Function<String, Category> getOrCreate = name -> {
            return categoryRepository.findByName(name)
                    .orElseGet(() -> categoryRepository.save(new Category(name)));
        };

        Category gpu = getOrCreate.apply("GPU");
        Category cpu = getOrCreate.apply("CPU");
        Category mb = getOrCreate.apply("Motherboard");
        Category ram = getOrCreate.apply("RAM");
        Category storage = getOrCreate.apply("Storage");
        Category psu = getOrCreate.apply("PSU");
        Category pcCase = getOrCreate.apply("Case");
        Category cooler = getOrCreate.apply("CPU Cooler");

        // helper to create product only if missing
        java.util.function.BiConsumer<Product, String> createIfMissing = (product, name) -> {
            if (productRepository.findByName(name).isEmpty()) {
                productRepository.save(product);
            }
        };

        // GPUs
        createIfMissing.accept(new Product("NVIDIA RTX 4090", "Top-tier enthusiast GPU with immense ray-tracing performance.", 1599.0, 5, "", "", gpu), "NVIDIA RTX 4090");
        createIfMissing.accept(new Product("NVIDIA RTX 4080", "High-end GPU for creators and gamers.", 1199.0, 8, "", "", gpu), "NVIDIA RTX 4080");
        createIfMissing.accept(new Product("NVIDIA RTX 4070", "Powerful mid-high range GPU", 499.0, 20, "", "", gpu), "NVIDIA RTX 4070");
        createIfMissing.accept(new Product("AMD Radeon RX 7900 XTX", "AMD flagship GPU for high-refresh 4K gaming.", 999.0, 7, "", "", gpu), "AMD Radeon RX 7900 XTX");

        // CPUs
        createIfMissing.accept(new Product("Intel Core i9-13900K", "14th gen flagship CPU for heavy workloads and gaming.", 589.0, 12, "", "", cpu), "Intel Core i9-13900K");
        createIfMissing.accept(new Product("AMD Ryzen 9 7950X", "High-core-count CPU for content creators and multitasking.", 699.0, 9, "", "", cpu), "AMD Ryzen 9 7950X");
        createIfMissing.accept(new Product("AMD Ryzen 7 7800X3D", "High-performance CPU for gaming", 429.0, 15, "", "", cpu), "AMD Ryzen 7 7800X3D");

        // Motherboards
        createIfMissing.accept(new Product("ASUS Prime X570", "Reliable AM4 motherboard", 199.0, 10, "", "", mb), "ASUS Prime X570");
        createIfMissing.accept(new Product("MSI B550 Tomahawk", "Popular AM4 board with strong VRM and features.", 159.0, 14, "", "", mb), "MSI B550 Tomahawk");

        // RAM
        createIfMissing.accept(new Product("Corsair Vengeance RGB Pro 32GB (2x16)", "DDR4 3600MHz CL18 — great for gaming and productivity.", 129.0, 30, "", "", ram), "Corsair Vengeance RGB Pro 32GB (2x16)");

        // Storage
        createIfMissing.accept(new Product("Samsung 980 PRO 1TB", "High-performance NVMe SSD for OS and games.", 149.0, 25, "", "", storage), "Samsung 980 PRO 1TB");
        createIfMissing.accept(new Product("WD Blue 2TB HDD", "Reliable bulk storage for media and backups.", 59.0, 40, "", "", storage), "WD Blue 2TB HDD");

        // PSU
        createIfMissing.accept(new Product("Corsair RM750x", "750W modular 80+ Gold power supply.", 119.0, 18, "", "", psu), "Corsair RM750x");

        // Case
        createIfMissing.accept(new Product("NZXT H510", "Sleek mid-tower case with tempered glass.", 79.0, 22, "", "", pcCase), "NZXT H510");

        // Cooler
        createIfMissing.accept(new Product("Cooler Master Hyper 212", "Affordable and effective air cooler for CPUs.", 39.0, 50, "", "", cooler), "Cooler Master Hyper 212");
    }
}
