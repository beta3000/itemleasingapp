package com.itemleasing.repository;

import com.itemleasing.model.Item;
import com.itemleasing.model.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */

@Transactional
public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findByUser(User user);
}
