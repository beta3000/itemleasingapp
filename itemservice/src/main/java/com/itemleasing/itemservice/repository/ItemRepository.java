package com.itemleasing.itemservice.repository;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */
public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findByUser(User user);
}
