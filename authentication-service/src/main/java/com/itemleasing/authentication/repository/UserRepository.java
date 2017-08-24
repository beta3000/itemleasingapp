package com.itemleasing.authentication.repository;

import com.itemleasing.authentication.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 8/23/17.
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
