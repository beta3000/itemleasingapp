package com.itemleasing.itemservice.service.impl;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.repository.ItemRepository;
import com.itemleasing.itemservice.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by z00382545 on 8/22/17.
 */

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository itemRepository;

    public Item addItem(Item item) {
        Date today = new Date();
        item.setAddDate(today);
        return itemRepository.save(item);
    }
}
