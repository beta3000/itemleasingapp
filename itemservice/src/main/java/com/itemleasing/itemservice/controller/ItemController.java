package com.itemleasing.itemservice.controller;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.itemleasing.itemservice.config.ServiceConfig;
import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.service.ItemService;
import com.itemleasing.itemservice.service.S3Service;
import com.itemleasing.itemservice.utils.tokenParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */

@RestController
@RequestMapping("/v1/item")
public class ItemController {

    @Autowired
    private ServiceConfig serviceConfig;

    @Autowired
    private ItemService itemService;

    @Autowired
    private S3Service s3Service;

    @RequestMapping(method = RequestMethod.POST)
    public Item addItem(@RequestBody Item item, @RequestHeader("Authorization") String bearerToken) {
        String username = "";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            username = tokenParser.getUsername(accessToken, serviceConfig.getJwtSigningKey());
        }

        return itemService.addItemByUser(item, username);
    }

    @RequestMapping("/itemsByUser")
    public List<Item> getAllItemsByUser(@RequestHeader("Authorization") String bearerToken) {
        String username="";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            username = tokenParser.getUsername(accessToken, serviceConfig.getJwtSigningKey());
        }

        return itemService.getItemsByUsername(username);
    }

    @RequestMapping("/all")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @RequestMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Item updateItem(@PathVariable Long id, @RequestBody Item item) throws IOException{
        item.setId(id);
        return itemService.updateItem(item);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteItemById(@PathVariable Long id) throws IOException{
        itemService.deleteItemById(id);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public List<PutObjectResult> upload(@RequestParam("file") MultipartFile[] multipartFiles) {
        return s3Service.upload(multipartFiles);
    }
}
