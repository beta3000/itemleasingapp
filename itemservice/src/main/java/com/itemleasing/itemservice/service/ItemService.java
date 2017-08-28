package com.itemleasing.itemservice.service;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;

import java.io.IOException;
import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */
public interface ItemService {
    Item addItemByUser(Item item, String username);
    List<Item> getAllItems();
    List<Item> getItemsByUsername(String username);
    Item getItemById(Long id);
    Item updateItem(Item item) throws IOException;
    void deleteItemById(Long id);
}
