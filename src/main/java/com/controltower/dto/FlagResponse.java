package com.controltower.dto;

import java.time.OffsetDateTime;

/**
 * DTO for feature flag responses.
 * 
 * This DTO represents the response payload for feature flag operations.
 * It contains all the information about a feature flag that should be
 * exposed to API consumers.
 */
public class FlagResponse {

    private Long id;
    private String name;
    private Boolean isActive;
    private String description;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    // Default constructor for JSON serialization
    public FlagResponse() {
    }

    public FlagResponse(Long id, String name, Boolean isActive, String description, 
                       OffsetDateTime createdAt, OffsetDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "FlagResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isActive=" + isActive +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
