package com.itemleasing.service;

import com.itemleasing.model.Lease;
import com.itemleasing.model.User;

import java.util.List;

/**
 * Created by z00382545 on 9/3/17.
 */
public interface LeaseService {
    Lease newLeaseRequest(Lease lease, String username);

    List<Lease> findLeasesByLessor(User lessor);

    List<Lease> findLeasesByLessee(User lessee);
}
