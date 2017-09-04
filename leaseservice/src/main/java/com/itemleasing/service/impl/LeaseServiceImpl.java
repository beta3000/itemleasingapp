package com.itemleasing.service.impl;

import com.itemleasing.model.Lease;
import com.itemleasing.model.User;
import com.itemleasing.repository.LeaseRepository;
import com.itemleasing.service.LeaseService;
import com.itemleasing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by z00382545 on 9/3/17.
 */

@Service
public class LeaseServiceImpl implements LeaseService{

    @Autowired
    private LeaseRepository leaseRepository;

    @Autowired
    private UserService userService;

    @Override
    public Lease newLeaseRequest(Lease lease, String username) {
        lease.setStatus("requested");

        User user = userService.findByUsername(username);

        lease.setLessee(user);

        Lease newLease = leaseRepository.save(lease);

        return newLease;
    }
}
