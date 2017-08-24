package com.itemleasing.userservice.service;

import com.itemleasing.userservice.model.User;
import com.itemleasing.userservice.model.security.UserRole;

import java.util.Set;

/**
 * Created by z00382545 on 8/21/17.
 */

public interface UserService {
    User createUser(User user);
}
