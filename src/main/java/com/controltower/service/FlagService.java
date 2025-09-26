package com.controltower.service;

import com.controltower.dto.CreateFlagRequest;
import com.controltower.dto.FlagResponse;
import com.controltower.entity.FeatureFlag;
import com.controltower.repository.FeatureFlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for feature flag business logic.
 * 
 * This service handles all business operations related to feature flags,
 * including creation, validation, and data transformation.
 */
@Service
@Transactional
public class FlagService {

    private final FeatureFlagRepository featureFlagRepository;

    @Autowired
    public FlagService(FeatureFlagRepository featureFlagRepository) {
        this.featureFlagRepository = featureFlagRepository;
    }

    /**
     * Creates a new feature flag.
     * 
     * @param request The flag creation request
     * @return The created flag response
     * @throws IllegalArgumentException if a flag with the same name already exists
     */
    public FlagResponse createFlag(CreateFlagRequest request) {
        // Check if flag with the same name already exists
        if (featureFlagRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("A flag with the name already exists: " + request.getName());
        }

        // Create new feature flag entity
        FeatureFlag featureFlag = new FeatureFlag(request.getName(), request.getDescription());
        
        // Save to database
        FeatureFlag savedFlag = featureFlagRepository.save(featureFlag);
        
        // Convert to response DTO
        return convertToResponse(savedFlag);
    }

    /**
     * Converts a FeatureFlag entity to a FlagResponse DTO.
     * 
     * @param featureFlag The entity to convert
     * @return The response DTO
     */
    private FlagResponse convertToResponse(FeatureFlag featureFlag) {
        return new FlagResponse(
            featureFlag.getId(),
            featureFlag.getName(),
            featureFlag.getIsActive(),
            featureFlag.getDescription(),
            featureFlag.getCreatedAt(),
            featureFlag.getUpdatedAt()
        );
    }
}
