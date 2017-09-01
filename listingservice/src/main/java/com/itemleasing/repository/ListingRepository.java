package com.itemleasing.repository;

import com.itemleasing.model.Listing;
import com.itemleasing.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by z00382545 on 8/31/17.
 */
public interface ListingRepository extends CrudRepository<Listing, Long> {
    List<Listing> findByUser(User user);
}
