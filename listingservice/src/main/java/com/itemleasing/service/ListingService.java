package com.itemleasing.service;

import com.itemleasing.model.Listing;

import java.io.IOException;
import java.util.List;

/**
 * Created by z00382545 on 8/31/17.
 */
public interface ListingService {

    Listing createListing(Listing listing, String username);

    List<Listing> getAllListingsByUsername(String username);

    List<Listing> getAllListings();

    Listing getListingById(Long id);

    Listing updateListing(Listing listing) throws IOException;

    void deleteListingById(Long id);
}
