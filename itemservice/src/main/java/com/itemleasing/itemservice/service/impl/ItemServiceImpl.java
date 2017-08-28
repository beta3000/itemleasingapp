package com.itemleasing.itemservice.service.impl;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;
import com.itemleasing.itemservice.repository.ItemRepository;
import com.itemleasing.itemservice.service.ItemService;
import com.itemleasing.itemservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOError;
import java.io.IOException;
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

    @Override
    public Item addItemByUser(Item item, String username) {
        Date today = new Date();
        item.setAddDate(today);
        item.setUser(userService.findByUsername(username));
        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems() {
        return (List<Item>) itemRepository.findAll();
    }

    @Override
    public List<Item> getItemsByUsername(String username) {
        User user = userService.findByUsername(username);

        return (List<Item>) itemRepository.findByUser(user);
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findOne(id);
    }

    @Override
    public Item updateItem(Item item) throws IOException {
        Item localItem = getItemById(item.getId());

        if(localItem == null) {
            throw new IOException("Item was not found.");
        } else {
            return itemRepository.save(item);
        }
    }

    @Override
    public void deleteItemById(Long id) {
        itemRepository.delete(id);
    }
}
