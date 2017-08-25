package com.itemleasing.itemservice.repository;

import com.itemleasing.itemservice.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 8/25/17.
 */
public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
}
