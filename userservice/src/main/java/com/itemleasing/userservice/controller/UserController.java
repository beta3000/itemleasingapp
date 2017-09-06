package com.itemleasing.userservice.controller;

import com.itemleasing.userservice.model.User;
import com.itemleasing.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by z00382545 on 8/21/17.
 */

@RestController
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public User createUser (@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
}
