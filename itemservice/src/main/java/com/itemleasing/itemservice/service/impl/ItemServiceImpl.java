package com.itemleasing.itemservice.service.impl;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;
import com.itemleasing.itemservice.repository.ItemRepository;
import com.itemleasing.itemservice.service.ItemService;
import com.itemleasing.itemservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserService userService;

    public Item addItem(Item item) {
        Date today = new Date();
        item.setAddDate(today);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return (List<Item>) itemRepository.findAll();
    }

    public List<Item> getItemsByUsername(String username) {
        User user = userService.findByUsername(username);

        return (List<Item>) itemRepository.findByUser(user);
    }
}
