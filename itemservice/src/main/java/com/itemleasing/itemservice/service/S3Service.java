package com.itemleasing.itemservice.service;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.itemleasing.itemservice.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

/**
 * Created by z00382545 on 8/29/17.
 */
public interface S3Service {

    PutObjectResult upload(InputStream inputStream, String uploadKey);

    List<PutObjectResult> upload(MultipartFile[] multipartFiles, Item item);
}
