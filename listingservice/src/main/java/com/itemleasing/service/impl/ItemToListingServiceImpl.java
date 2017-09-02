package com.itemleasing.service.impl;

import com.itemleasing.model.ItemToListing;
import com.itemleasing.repository.ItemToListingRepository;
import com.itemleasing.service.ItemToListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by z00382545 on 9/2/17.
 */

@Service
public class ItemToListingServiceImpl implements ItemToListingService {

    @Autowired
    private ItemToListingRepository itemToListingRepository;

    @Override
    public ItemToListing createItemToListing(ItemToListing itemToListing) {
        return itemToListingRepository.save(itemToListing);
    }
}
