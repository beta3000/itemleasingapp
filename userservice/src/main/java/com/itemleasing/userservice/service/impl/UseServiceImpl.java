package com.itemleasing.userservice.service.impl;

import com.itemleasing.userservice.model.User;
import com.itemleasing.userservice.repository.UserRepository;
import com.itemleasing.userservice.service.UserService;
import com.itemleasing.userservice.utils.SecurityUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by z00382545 on 8/21/17.
 */

@Service
public class UseServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        Date today = new Date();
        user.setJoinDate(today);

        String encryptedPassword = SecurityUtility.passwordEncoder().encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }
}
