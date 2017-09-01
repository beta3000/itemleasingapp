package com.itemleasing.repository;

import com.itemleasing.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 8/25/17.
 */
public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
}
