package com.itemleasing.itemservice.service.impl;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;
import com.itemleasing.itemservice.repository.ItemRepository;
import com.itemleasing.itemservice.service.ItemService;
import com.itemleasing.itemservice.service.S3Service;
import com.itemleasing.itemservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private S3Service s3Service;

    @Override
    public Item addItemByUser(Item item, String username) {
        Date today = new Date();
        item.setAddDate(today);

        User user = userService.findByUsername(username);
        item.setUser(user);
        Item newItem = itemRepository.save(item);

        s3Service.createS3ItemFolder(user, item);

        return newItem;
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
            localItem.setName(item.getName());
            localItem.setItemCondition(item.getItemCondition());
            localItem.setStatus(item.getStatus());
            localItem.setDescription(item.getDescription());
            localItem.setImageList(item.getImageList());

            return itemRepository.save(localItem);
        }
    }

    @Override
    public void deleteItemById(Long id) {
        itemRepository.delete(id);
    }


    @Override
    public List<PutObjectResult> uploadItemImage(MultipartFile[] multipartFiles, Long itemId) {

        Item item = getItemById(itemId);
        List<PutObjectResult> putObjectResultList = s3Service.upload(multipartFiles, item);

        return putObjectResultList;
    }


}
