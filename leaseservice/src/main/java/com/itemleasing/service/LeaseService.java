package com.itemleasing.service;

import com.itemleasing.model.Lease;

/**
 * Created by z00382545 on 9/3/17.
 */
public interface LeaseService {
    Lease newLeaseRequest(Lease lease, String username);
}
