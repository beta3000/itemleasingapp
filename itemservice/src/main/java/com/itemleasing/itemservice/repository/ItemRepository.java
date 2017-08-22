package com.itemleasing.itemservice.repository;

import com.itemleasing.itemservice.model.Item;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 8/22/17.
 */
public interface ItemRepository extends CrudRepository<Item, Long> {
}
