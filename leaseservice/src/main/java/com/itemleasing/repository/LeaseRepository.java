package com.itemleasing.repository;

import com.itemleasing.model.Lease;
import com.itemleasing.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by z00382545 on 9/3/17.
 */
public interface LeaseRepository extends CrudRepository<Lease, Long> {
    List<Lease> findByLessor(User lessor);

    List<Lease> findByLessee(User lessee);
}
