package com.itemleasing.itemservice.service;

import com.itemleasing.itemservice.model.Item;

import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */
public interface ItemService {
    Item addItem(Item user);
    List<Item> getAllItems();
}
