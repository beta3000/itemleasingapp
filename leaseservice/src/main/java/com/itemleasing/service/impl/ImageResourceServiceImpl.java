package com.itemleasing.service.impl;

import com.itemleasing.model.ImageResource;
import com.itemleasing.model.Item;
import com.itemleasing.repository.ImageResourceRepository;
import com.itemleasing.service.ImageResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by z00382545 on 8/30/17.
 */

@Service
public class ImageResourceServiceImpl implements ImageResourceService {

    @Autowired
    private ImageResourceRepository imageResourceRepository;

    @Override
    public void saveImageResource(Item item, String imageUrl) {
        ImageResource imageResource = new ImageResource(item, imageUrl);
        imageResourceRepository.save(imageResource);
    }
}
