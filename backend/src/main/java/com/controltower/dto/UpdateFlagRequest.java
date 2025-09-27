package com.controltower.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object for updating a feature flag.
 * 
 * This DTO represents the request body for updating an existing feature flag.
 * It contains the fields that can be modified via PUT operations.
 */
public class UpdateFlagRequest {

  @NotBlank(message = "Flag name is required")
  @Size(min = 1, max = 100, message = "Flag name must be between 1 and 100 characters")
  private String name;

  @Size(max = 500, message = "Description must not exceed 500 characters")
  private String description;

  /**
   * Default constructor.
   */
  public UpdateFlagRequest() {
  }

  /**
   * Constructor with parameters.
   * 
   * @param name        The name of the flag
   * @param description The description of the flag
   */
  public UpdateFlagRequest(String name, String description) {
    this.name = name;
    this.description = description;
  }

  /**
   * Gets the flag name.
   * 
   * @return The flag name
   */
  public String getName() {
    return name;
  }

  /**
   * Sets the flag name.
   * 
   * @param name The flag name
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets the flag description.
   * 
   * @return The flag description
   */
  public String getDescription() {
    return description;
  }

  /**
   * Sets the flag description.
   * 
   * @param description The flag description
   */
  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return "UpdateFlagRequest{" +
        "name='" + name + '\'' +
        ", description='" + description + '\'' +
        '}';
  }
}
