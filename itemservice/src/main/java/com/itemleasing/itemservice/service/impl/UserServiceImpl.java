package com.itemleasing.itemservice.service.impl;

import com.itemleasing.itemservice.model.User;
import com.itemleasing.itemservice.repository.UserRepository;
import com.itemleasing.itemservice.service.UserService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by z00382545 on 8/25/17.
 */

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
