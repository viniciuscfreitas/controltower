package com.controltower.service;

import com.controltower.dto.CreateFlagRequest;
import com.controltower.dto.FlagResponse;
import com.controltower.entity.FeatureFlag;
import com.controltower.exception.FlagAlreadyExistsException;
import com.controltower.exception.FlagNotFoundException;
import com.controltower.repository.FeatureFlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
     * @throws FlagAlreadyExistsException if a flag with the same name already exists
     */
    public FlagResponse createFlag(CreateFlagRequest request) {
        // Check if flag with the same name already exists
        if (featureFlagRepository.existsByName(request.getName())) {
            throw new FlagAlreadyExistsException("A flag with the name already exists: " + request.getName());
        }

        // Create new feature flag entity
        FeatureFlag featureFlag = new FeatureFlag(request.getName(), request.getDescription());
        
        // Save to database
        FeatureFlag savedFlag = featureFlagRepository.save(featureFlag);
        
        // Convert to response DTO
        return convertToResponse(savedFlag);
    }

    /**
     * Retrieves all feature flags.
     * 
     * @return List of all flags as response DTOs
     */
    @Transactional(readOnly = true)
    public List<FlagResponse> getAllFlags() {
        List<FeatureFlag> flags = featureFlagRepository.findAll();
        return flags.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Toggles the active state of a feature flag.
     * 
     * @param name The name of the flag to toggle
     * @return The updated flag response
     * @throws FlagNotFoundException if the flag with the given name does not exist
     */
    public FlagResponse toggleFlag(String name) {
        // Find the flag by name
        FeatureFlag flag = featureFlagRepository.findByName(name)
                .orElseThrow(() -> new FlagNotFoundException("Flag not found with name: " + name));

        // Toggle the active state
        flag.setIsActive(!flag.getIsActive());

        // Save the updated flag
        FeatureFlag updatedFlag = featureFlagRepository.save(flag);

        // Convert to response DTO
        return convertToResponse(updatedFlag);
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
