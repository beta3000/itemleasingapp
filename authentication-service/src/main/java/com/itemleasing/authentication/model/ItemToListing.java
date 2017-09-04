package com.itemleasing.authentication.model;

import javax.persistence.*;

/**
 * Created by z00382545 on 9/1/17.
 */

@Entity
public class ItemToListing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    private Listing listing;

    public ItemToListing(){}

    public ItemToListing(Item item, Listing listing) {
        this.item = item;
        this.listing = listing;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }
}
