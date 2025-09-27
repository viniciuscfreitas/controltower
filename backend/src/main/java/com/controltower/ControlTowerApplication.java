package com.controltower;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ControlTower - Feature Flags System
 * 
 * Main application for the feature flags system for startups.
 * Allows managing feature flags dynamically
 * without code deployment.
 * 
 * @author ControlTower Team
 * @version 1.0.0
 */
@SpringBootApplication
public class ControlTowerApplication {

  public static void main(String[] args) {
    SpringApplication.run(ControlTowerApplication.class, args);
  }
}
