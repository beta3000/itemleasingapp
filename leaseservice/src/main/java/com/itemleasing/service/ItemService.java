package com.itemleasing.service;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.itemleasing.model.Item;
import org.springframework.web.multipart.MultipartFile;

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
    List<PutObjectResult> uploadItemImage(MultipartFile[] multipartFiles, Long id);
}
