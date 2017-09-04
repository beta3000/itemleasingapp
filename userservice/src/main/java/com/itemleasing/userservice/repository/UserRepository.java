package com.itemleasing.userservice.repository;

import com.itemleasing.userservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by z00382545 on 8/21/17.
 */

@Transactional
public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
}
