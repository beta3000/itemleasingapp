package com.itemleasing.userservice.repository;

import com.itemleasing.userservice.model.security.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 8/24/17.
 */
public interface RoleRepository extends CrudRepository<Role, Long> {
}
