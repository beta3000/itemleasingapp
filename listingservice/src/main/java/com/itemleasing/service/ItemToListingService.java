package com.itemleasing.service;

import com.itemleasing.model.ItemToListing;
import com.itemleasing.model.Listing;

import java.util.List;

/**
 * Created by z00382545 on 9/2/17.
 */
public interface ItemToListingService {
    ItemToListing createItemToListing(ItemToListing itemToListing);

    List<ItemToListing> findItemToListingByListing(Listing listing);

    void removeItemToListingByListing(Listing listing);
}
