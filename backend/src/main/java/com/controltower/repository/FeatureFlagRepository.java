package com.controltower.repository;

import com.controltower.entity.FeatureFlag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for FeatureFlag entity persistence operations.
 * 
 * Provides methods for basic CRUD and specific queries
 * for the feature flags system.
 */
@Repository
public interface FeatureFlagRepository extends JpaRepository<FeatureFlag, Long> {

  /**
   * Finds a feature flag by name.
   * 
   * @param name Flag name
   * @return Optional containing the flag if found
   */
  Optional<FeatureFlag> findByName(String name);

  /**
   * Checks if a flag with the specified name exists.
   * 
   * @param name Flag name
   * @return true if exists, false otherwise
   */
  boolean existsByName(String name);

  /**
   * Checks if a flag with the specified name exists, excluding a specific ID.
   * Used for update operations to prevent name conflicts.
   * 
   * @param name Flag name
   * @param id ID to exclude from the search
   * @return true if exists, false otherwise
   */
  boolean existsByNameAndIdNot(String name, Long id);

  /**
   * Finds all active flags.
   * Optimized for the public endpoint /api/v1/flags/active
   * which should respond in less than 50ms.
   * 
   * @return List with active flag names
   */
  @Query("SELECT f.name FROM FeatureFlag f WHERE f.isActive = true")
  List<String> findActiveFlagNames();

  /**
   * Finds all active flags (complete entity).
   * 
   * @return List of active flags
   */
  List<FeatureFlag> findByIsActiveTrue();

  /**
   * Finds all inactive flags.
   * 
   * @return List of inactive flags
   */
  List<FeatureFlag> findByIsActiveFalse();
}
