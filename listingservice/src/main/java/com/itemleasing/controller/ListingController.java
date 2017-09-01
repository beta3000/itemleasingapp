package com.itemleasing.controller;

import com.itemleasing.config.ServiceConfig;
import com.itemleasing.model.Listing;
import com.itemleasing.service.ListingService;
import com.itemleasing.utils.tokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * Created by z00382545 on 8/22/17.
 */

@RestController
@RequestMapping("/v1/listing")
public class ListingController {

    @Autowired
    private ServiceConfig serviceConfig;

    @Autowired
    private ListingService listingService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Listing newListing(@RequestBody Listing listing, @RequestHeader("Authorization") String bearerToken) {
        String username = "";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            username = tokenParser.getUsername(accessToken, serviceConfig.getJwtSigningKey());
        }

        Listing newListing = listingService.createListing(listing, username);

        return newListing;
    }

    @RequestMapping("/listingsByUser")
    public List<Listing> getAllListingsByUser(@RequestHeader("Authorization") String bearerToken) {
        String username="";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            username = tokenParser.getUsername(accessToken, serviceConfig.getJwtSigningKey());
        }

        return listingService.getAllListingsByUsername(username);
    }

    @RequestMapping("/all")
    public List<Listing> getAllListings() {
        return listingService.getAllListings();
    }

    @RequestMapping("/{id}")
    public Listing getListingById(@PathVariable Long id) {
        return listingService.getListingById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Listing updateListing(@PathVariable Long id, @RequestBody Listing listing) throws IOException {
        listing.setId(id);
        return listingService.updateListing(listing);
    }

    @RequestMapping(value = "/{id}", method=RequestMethod.DELETE)
    public void deleteListingById(@PathVariable Long id) throws IOException {
        listingService.deleteListingById(id);
    }

}
