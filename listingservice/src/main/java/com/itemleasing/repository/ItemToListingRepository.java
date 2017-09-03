package com.itemleasing.repository;

import com.itemleasing.model.ItemToListing;
import com.itemleasing.model.Listing;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by z00382545 on 9/2/17.
 */
@Transactional
public interface ItemToListingRepository extends CrudRepository<ItemToListing, Long> {

    List<ItemToListing> findByListing(Listing listing);

    void deleteByListing(Listing listing);
}
