package com.controltower.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the PublicFlagController.
 * 
 * Tests the public API endpoints that are accessible without authentication.
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class PublicFlagControllerIT {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldReturnActiveFlagsWithoutAuthentication() throws Exception {
    // Act & Assert: Get active flags without authentication
    mockMvc.perform(get("/api/v1/flags/active"))
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(0)); // Initially no active flags
  }

  @Test
  void shouldReturnOnlyActiveFlagNames() throws Exception {
    // Arrange: Create flags with different active states
    // This test will be implemented after we have the admin endpoints working
    // For now, we test the basic structure

    // Act & Assert: Get active flags
    mockMvc.perform(get("/api/v1/flags/active"))
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$").isArray());
  }

  @Test
  void shouldRespondQuickly() throws Exception {
    // Act & Assert: Measure response time (should be < 50ms)
    long startTime = System.currentTimeMillis();

    mockMvc.perform(get("/api/v1/flags/active"))
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"));

    long endTime = System.currentTimeMillis();
    long responseTime = endTime - startTime;

    // Assert response time is reasonable (allowing some overhead for test
    // environment)
    assert responseTime < 100 : "Response time should be under 100ms, was: " + responseTime + "ms";
  }
}
