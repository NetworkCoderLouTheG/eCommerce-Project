package com.louis.serviceimpl;

import com.louis.entity.Product;
import com.louis.repository.ProductRepository;
import com.louis.util.Transform;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    Transform<Product, com.louis.model.Product> transformProductData = new Transform<>(com.louis.model.Product.class);

    Transform<com.louis.model.Product, Product> transformProduct = new Transform<>(Product.class);


    public List<com.louis.model.Product> getAllProducts() {
        List<Product> productRecords = new ArrayList<>();
        List<com.louis.model.Product> products =  new ArrayList<>();

        productRepository.findAll().forEach(productRecords::add);
        Iterator<Product> it = productRecords.iterator();

        while(it.hasNext()) {
            com.louis.model.Product product = new com.louis.model.Product();
            Product productData = it.next();
            product = transformProductData.transform(productData);
            products.add(product);
        }
        return products;
    }
    @Override
    public List<ProductCategory> listProductCategories()
    {
        Map<String,List<com.louis.model.Product>> mappedProduct = getCategoryMappedProducts();
        List<ProductCategory> productCategories = new ArrayList<>();
        for(String categoryName: mappedProduct.keySet()){
            ProductCategory productCategory =  new ProductCategory();
            productCategory.setCategoryName(categoryName);
            productCategory.setProducts(mappedProduct.get(categoryName));
            productCategories.add(productCategory);
        }
        return productCategories;
    }
    @Override
    public Map<String,List<com.louis.model.Product>> getCategoryMappedProducts()
    {
        Map<String,List<com.louis.model.Product>> mapProducts = new HashMap<String,List<com.louis.model.Product>>();

        List<Product> productRecords = new ArrayList<>();
        List<com.louis.model.Product> products;

        productRepository.findAll().forEach(productRecords::add);
        Iterator<Product> it = productRecords.iterator();

        while(it.hasNext()) {
            com.louis.model.Product product = new com.louis.model.Product();
            Product productData = it.next();

            if(mapProducts.containsKey(productData.getCategoryName())){
                products = mapProducts.get(productData.getCategoryName());
            }
            else {
                products = new ArrayList<com.louis.model.Product>();
                mapProducts.put(productData.getCategoryName(), products);
            }
            product = transformProductData.transform(productData);
            products.add(product);
        }
        return mapProducts;
    }

    @Override
    public com.louis.model.Product[] getAll() {
            List<Product> productsData = new ArrayList<>();
            List<com.louis.model.Product> products = new ArrayList<>();
            productRepository.findAll().forEach(productsData::add);
            Iterator<Product> it = productsData.iterator();
            while(it.hasNext()) {
                Product productData = it.next();
                com.louis.model.Product product =  transformProductData.transform(productData);
                products.add(product);
            }
            com.louis.model.Product[] array = new com.louis.model.Product[products.size()];
            for  (int i=0; i<products.size(); i++){
                array[i] = products.get(i);
            }
            return array;
        }
    @Override
    public com.louis.model.Product get(Integer id) {
        log.info(" Input id >> "+  Integer.toString(id) );
        com.louis.model.Product product = null;
        Optional<Product> optional = productRepository.findById(id);
        if(optional.isPresent()) {
            log.info(" Is present >> ");
            product = new com.louis.model.Product();
            product.setId(optional.get().getId());
            product.setName(optional.get().getName());
        }
        else {
            log.info(" Failed >> unable to locate id: " +  Integer.toString(id)  );
        }
        return product;
    }
        @Override
        public com.louis.model.Product create(com.louis.model.Product product) {
            log.info(" add:Input " + product.toString());
            Product productData = transformProduct.transform(product);
            Product updatedProduct = productRepository.save(productData);
            log.info(" add:Input {}", productData.toString());
            return  transformProductData.transform(updatedProduct);
        }

        @Override
        public com.louis.model.Product update(com.louis.model.Product product) {
            Optional<Product> optional  = productRepository.findById(product.getId());
            if(optional.isPresent()){
                Product productData = transformProduct.transform(product);
                Product updaatedProduct = productRepository.save( productData);
                return transformProductData.transform(updaatedProduct);
            }
            else {
                log.error("Product record with id: {} do not exist",product.getId());
            }
            return null;
        }
    @Override
    public void delete(Integer id) {
        log.info(" Input >> {}",id);
        Optional<Product> optional = productRepository.findById(id);
        if( optional.isPresent()) {
            Product productDatum = optional.get();
            productRepository.delete(optional.get());
            log.info(" Successfully deleted Product record with id: {}",id);
        }
        else {
            log.error(" Unable to locate product with id: {}", id);
        }
    }
}
