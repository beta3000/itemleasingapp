package com.itemleasing.itemservice.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.model.User;
import com.itemleasing.itemservice.service.ImageResourceService;
import com.itemleasing.itemservice.service.S3Service;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Created by z00382545 on 8/29/17.
 */

@Service
public class S3ServiceImpl implements S3Service{

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private ImageResourceService imageResourceService;

    @Override
    public PutObjectResult upload(InputStream inputStream, String uploadKey) {
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, uploadKey, inputStream, new ObjectMetadata());

        putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);

        PutObjectResult putObjectResult = amazonS3.putObject(putObjectRequest);

        IOUtils.closeQuietly(inputStream);

        return putObjectResult;
    }

    @Override
    public List<PutObjectResult> upload(MultipartFile[] multipartFiles, Item item) {
        List<PutObjectResult> putObjectResults = new ArrayList<>();

        User user = item.getUser();

        Arrays.stream(multipartFiles)
                .filter(multipartFile -> !StringUtils.isEmpty(multipartFile.getOriginalFilename()))
                .forEach(multipartFile -> {
                    try {
                        String uniqueID = UUID.randomUUID().toString();
                        String fileName = uniqueID+".png";
                        String filePath = user.getUsername()+"_"+user.getId()+"/"+
                                item.getName()+"_"+item.getId()+"/" + fileName;

                        putObjectResults.add(upload(multipartFile.getInputStream(), filePath));
                        imageResourceService.saveImageResource(item, "https://s3.amazonaws.com/ldeng-test/"+filePath);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });

        return putObjectResults;
    }

    public void createS3ItemFolder(User user, Item item) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0);

        // create empty content
        InputStream emptyContent = new ByteArrayInputStream(new byte[0]);

        // create a PutObjectRequest passing the folder name suffixed by /
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, user.getUsername()+"_"+user.getId()+"/"+
                item.getName()+"_"+item.getId()+"/init_0", emptyContent, metadata);

        // send request to S3 to create folder
        amazonS3.putObject(putObjectRequest);
    }
}
