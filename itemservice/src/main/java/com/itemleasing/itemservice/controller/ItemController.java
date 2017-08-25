package com.itemleasing.itemservice.controller;

import com.itemleasing.itemservice.config.ServiceConfig;
import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.service.ItemService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(method = RequestMethod.POST)
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @RequestMapping("/itemsByUser")
    public List<Item> getAllItemsByUser(@RequestHeader("Authorization") String bearerToken) {
        String username="";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(serviceConfig.getJwtSigningKey().getBytes("UTF-8"))
                        .parseClaimsJws(accessToken).getBody();

                username = (String) claims.get("user_name");

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return itemService.getItemsByUsername(username);
    }

    @RequestMapping("/all")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
}
