package com.itemleasing.service;


import com.itemleasing.model.User;

/**
 * Created by z00382545 on 8/25/17.
 */
public interface UserService {
    User findByUsername(String username);
}
