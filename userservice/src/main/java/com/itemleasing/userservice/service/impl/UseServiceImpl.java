package com.itemleasing.userservice.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itemleasing.userservice.event.SimpleSourceBean;
import com.itemleasing.userservice.model.User;
import com.itemleasing.userservice.model.security.Role;
import com.itemleasing.userservice.model.security.UserRole;
import com.itemleasing.userservice.repository.RoleRepository;
import com.itemleasing.userservice.repository.UserRepository;
import com.itemleasing.userservice.service.UserService;
import com.itemleasing.userservice.utils.SecurityUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by z00382545 on 8/21/17.
 */

@Service
public class UseServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SimpleSourceBean simpleSourceBean;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public User createUser(User user) {
        User localUser = userRepository.findByUsername(user.getUsername());

        if(localUser != null) {
            LOG.info("User with username {} already exist. Nothing will be done. ", user.getUsername());
        } else {

            Set<UserRole> userRoles = new HashSet<>();
            Role localRole = new Role();
            localRole.setRoleId(1);
            userRoles.add(new UserRole(user, localRole));
            user.getUserRoles().addAll(userRoles);

            Date today = new Date();
            user.setJoinDate(today);

            String encryptedPassword = SecurityUtility.passwordEncoder().encode(user.getPassword());
            user.setPassword(encryptedPassword);
            localUser = userRepository.save(user);

            simpleSourceBean.publishUserChange("CREATE", localUser.getUsername());

//            createS3UserFolder(user);


        }

        return localUser;
    }

    private void createS3UserFolder(User user) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0);

        // create empty content
        InputStream emptyContent = new ByteArrayInputStream(new byte[0]);

        // create a PutObjectRequest passing the folder name suffixed by /
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket,
                user.getUsername()+"_"+user.getId()+"/init_0", emptyContent, metadata);

        // send request to S3 to create folder
        amazonS3.putObject(putObjectRequest);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
