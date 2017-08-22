package com.itemleasing.itemservice.controller;

import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */

@RestController
@RequestMapping("/v1/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @RequestMapping(method = RequestMethod.POST)
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @RequestMapping("/all")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
}
