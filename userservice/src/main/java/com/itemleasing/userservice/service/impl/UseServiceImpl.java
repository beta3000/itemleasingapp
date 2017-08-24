package com.itemleasing.userservice.service.impl;

import com.itemleasing.userservice.model.User;
import com.itemleasing.userservice.model.security.Role;
import com.itemleasing.userservice.model.security.UserRole;
import com.itemleasing.userservice.repository.RoleRepository;
import com.itemleasing.userservice.repository.UserRepository;
import com.itemleasing.userservice.service.UserService;
import com.itemleasing.userservice.utils.SecurityUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by z00382545 on 8/21/17.
 */

@Service
public class UseServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User createUser(User user) {
        User localUser = userRepository.findByUsername(user.getUsername());

        if(localUser != null) {
            LOG.info("User with username {} already exist. Nothing will be done. ", user.getUsername());
        } else {

            Set<UserRole> userRoles = new HashSet<>();
            Role localRole = new Role();
            localRole.setRoleId(1);
            userRoles.add(new UserRole(user, localRole));
            user.getUserRoles().addAll(userRoles);

            Date today = new Date();
            user.setJoinDate(today);

            String encryptedPassword = SecurityUtility.passwordEncoder().encode(user.getPassword());
            user.setPassword(encryptedPassword);
            localUser = userRepository.save(user);
        }

        return localUser;
    }
}
