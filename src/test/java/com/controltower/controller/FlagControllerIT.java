package com.controltower.controller;

import com.controltower.repository.FeatureFlagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class FlagControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FeatureFlagRepository featureFlagRepository;

    @BeforeEach
    void setup() {
        featureFlagRepository.deleteAll();
    }

    @Test
    void shouldCreateFlagSuccessfullyWhenDataIsValid() throws Exception {
        // This is the RED step of our TDD cycle.
        // It will fail because the endpoint /admin/flags does not exist yet.

        String requestBody = """
            {
                "name": "new-feature-from-test",
                "description": "A feature created by the integration test"
            }
        """;

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
                .with(httpBasic("admin", "admin123"))) // Assuming default security credentials
            .andExpect(status().isCreated());
    }
}
