package com.louis.repository;

import com.louis.entity.ProductData;
import org.springframework.data.repository.CrudRepository;

public interface ProductDataRepository extends CrudRepository<ProductData, Integer> {
}
