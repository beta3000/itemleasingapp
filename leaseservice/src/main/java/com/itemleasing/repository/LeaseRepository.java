package com.itemleasing.repository;

import com.itemleasing.model.Lease;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by z00382545 on 9/3/17.
 */
public interface LeaseRepository extends CrudRepository<Lease, Long> {
}
