-- Seed categories first
INSERT INTO categories (id, name, description) VALUES
(1, 'Processors', 'CPUs and Processors from Intel and AMD'),
(2, 'Graphics Cards', 'GPU cards for gaming and professional work'),
(3, 'Motherboards', 'Mainboards compatible with various processors'),
(4, 'Memory (RAM)', 'System memory modules'),
(5, 'Storage', 'SSDs, HDDs, and NVMe drives'),
(6, 'Power Supplies', 'PSUs for powering your system'),
(7, 'Cases', 'PC cases and chassis'),
(8, 'Cooling', 'CPU coolers, case fans, and liquid cooling');

-- Empty the products table first to avoid duplicates when reseeding
DELETE FROM products;

-- Seed products table
INSERT INTO products (id, name, description, price, stock_quantity, category_id, brand, image_url, specifications, created_at, updated_at) VALUES
(1, 'Intel Core i9-13900K', 'High-performance 24-core processor', 589.99, 25, 1, 'Intel', 'https://via.placeholder.com/300x300?text=i9-13900K', '{"cores": 24, "threads": 32, "base_clock": "3.0 GHz", "boost_clock": "5.8 GHz"}', '2025-11-05 07:13:59', '2025-11-05 07:13:59'),
(2, 'AMD Ryzen 9 7950X', '16-core flagship processor', 699.99, 20, 1, 'AMD', 'https://via.placeholder.com/300x300?text=Ryzen-9-7950X', '{"cores": 16, "threads": 32, "base_clock": "4.5 GHz", "boost_clock": "5.7 GHz"}', '2025-11-05 07:13:59', '2025-11-05 07:13:59'),
(3, 'NVIDIA RTX 4090', 'Flagship graphics card', 1599.99, 15, 2, 'NVIDIA', 'https://via.placeholder.com/300x300?text=RTX-4090', '{"memory": "24GB GDDR6X", "cuda_cores": 16384, "boost_clock": "2.52 GHz"}', '2025-11-05 07:13:59', '2025-11-05 07:13:59'),
(4, 'AMD Radeon RX 7900 XTX', 'High-end gaming GPU', 999.99, 18, 2, 'AMD', 'https://via.placeholder.com/300x300?text=RX-7900-XTX', '{"memory": "24GB GDDR6", "compute_units": 96, "boost_clock": "2.5 GHz"}', '2025-11-05 07:13:59', '2025-11-05 07:13:59'),
(5, 'ASUS ROG Strix Z790-E', 'Premium Intel Z790 motherboard', 449.99, 30, 3, 'ASUS', 'https://via.placeholder.com/300x300?text=ROG-Z790', '{"socket": "LGA1700", "chipset": "Z790", "max_memory": "128GB", "memory_slots": 4}', '2025-11-05 07:13:59', '2025-11-05 07:13:59'),
(6, 'Corsair Vengeance DDR5 32GB', '32GB DDR5 RAM Kit', 149.99, 40, 4, 'Corsair', 'https://via.placeholder.com/300x300?text=DDR5-32GB', '{"type": "DDR5", "speed": "6000MHz", "capacity": "32GB", "cas_latency": "CL36"}', '2025-11-05 07:13:59', '2025-11-05 11:39:16'),
(7, 'Samsung 990 Pro 2TB', 'NVMe Gen4 SSD', 199.99, 50, 5, 'Samsung', 'https://via.placeholder.com/300x300?text=990-Pro-2TB', '{"capacity": "2TB", "interface": "PCIe 4.0 x4", "read_speed": "7450 MB/s", "write_speed": "6900 MB/s"}', '2025-11-05 07:13:59', '2025-11-05 11:39:16'),
(8, 'Corsair RM850x', '850W 80+ Gold PSU', 139.99, 6, 6, 'Corsair', 'https://via.placeholder.com/300x300?text=RM850x', '{"wattage": "850W", "efficiency": "80+ Gold", "modular": "Fully Modular"}', '2025-11-05 07:13:59', '2025-11-05 11:39:16'),
(9, 'NZXT H510 Elite', 'Mid-tower PC case', 149.99, 7, 7, 'NZXT', 'https://via.placeholder.com/300x300?text=H510-Elite', '{"color": "Black", "side_panel": "Tempered Glass", "form_factor": "Mid Tower"}', '2025-11-05 07:13:59', '2025-11-05 11:39:16'),
(10, 'Noctua NH-D15', 'Premium air CPU cooler', 99.99, 8, 8, 'Noctua', 'https://via.placeholder.com/300x300?text=NH-D15', '{"type": "Air Cooler", "fan_size": "140mm", "height": "165mm"}', '2025-11-05 07:13:59', '2025-11-05 11:39:16');
