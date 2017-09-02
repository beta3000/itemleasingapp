package com.itemleasing.service.impl;

import com.itemleasing.model.Item;
import com.itemleasing.model.Listing;
import com.itemleasing.model.User;
import com.itemleasing.repository.ListingRepository;
import com.itemleasing.service.ItemService;
import com.itemleasing.service.ListingService;
import com.itemleasing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by z00382545 on 8/31/17.
 */

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ItemService itemService;

    @Override
    public Listing createListing(Listing listing, String username) {
        Date today = new Date();
        listing.setPostDate(today);

        User user = userService.findByUsername(username);
        listing.setUser(user);

        List<Long> idList = new ArrayList<>();
        List<Item> itemList = new ArrayList<>();

//        for (Item item : listing.getItemList()) {
//            idList.add(item.getId());
//        }
//
//        for (Long id : idList) {
//            itemList.add(itemService.getItemById(id));
//        }
//
//        listing.setItemList(itemList);

        return listingRepository.save(listing);
    }

    @Override
    public List<Listing> getAllListingsByUsername(String username) {
        User user = userService.findByUsername(username);

        return listingRepository.findByUser(user);
    }

    @Override
    public List<Listing> getAllListings() {
        return (List<Listing>) listingRepository.findAll();
    }

    @Override
    public Listing getListingById(Long id) {
        return listingRepository.findOne(id);
    }

    @Override
    public Listing updateListing (Listing listing) throws IOException {
        Listing localListing = getListingById(listing.getId());

        if(localListing == null) {
            throw new IOException("Listing was not found");
        } else {
            localListing.setDescription(listing.getDescription());
            localListing.setStatus(listing.getStatus());
            localListing.setDeposit(listing.getDeposit());
            localListing.setRate(listing.getRate());
            localListing.setTitle(listing.getTitle());
//            localListing.setItemList(listing.getItemList());

            return listingRepository.save(localListing);
        }
    }

    @Override
    public void deleteListingById(Long id) {
        listingRepository.delete(id);
    }

}
