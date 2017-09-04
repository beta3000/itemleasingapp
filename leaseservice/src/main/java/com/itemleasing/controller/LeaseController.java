package com.itemleasing.controller;

import com.itemleasing.config.ServiceConfig;
import com.itemleasing.model.Lease;
import com.itemleasing.service.LeaseService;
import com.itemleasing.utils.tokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by z00382545 on 9/3/17.
 */

@RestController
@RequestMapping("/v1/lease")
public class LeaseController {

    @Autowired
    private LeaseService leaseService;

    @Autowired
    private ServiceConfig serviceConfig;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Lease newLeaseRequest(@RequestBody Lease lease, @RequestHeader("Authorization") String bearerToken) {
        String username = "";

        if(bearerToken != null) {
            String accessToken = bearerToken.replace("Bearer ", "");

            username = tokenParser.getUsername(accessToken, serviceConfig.getJwtSigningKey());
        }

        Lease newLease = leaseService.newLeaseRequest(lease, username);

        return newLease;
    }
}
