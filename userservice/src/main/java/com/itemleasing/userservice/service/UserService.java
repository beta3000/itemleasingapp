package com.itemleasing.userservice.service;

import com.itemleasing.userservice.model.User;
import org.springframework.stereotype.Service;

/**
 * Created by z00382545 on 8/21/17.
 */

public interface UserService {
    User createUser(User user);
}
