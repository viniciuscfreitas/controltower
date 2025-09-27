package com.controltower.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO for creating a new feature flag.
 * 
 * This DTO represents the request payload for the POST /admin/flags endpoint.
 * It contains the necessary data to create a new feature flag in the system.
 */
public class CreateFlagRequest {

    @NotBlank(message = "Flag name is required")
    @Size(max = 100, message = "Flag name must have at most 100 characters")
    private String name;

    @Size(max = 255, message = "Description must have at most 255 characters")
    private String description;

    // Default constructor for JSON deserialization
    public CreateFlagRequest() {
    }

    public CreateFlagRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "CreateFlagRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
