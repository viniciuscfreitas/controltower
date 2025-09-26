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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @Test
    void shouldReturnConflictWhenFlagNameAlreadyExists() throws Exception {
        // First, create a flag
        String requestBody = """
            {
                "name": "duplicate-flag",
                "description": "First flag with this name"
            }
        """;

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isCreated());

        // Then try to create another flag with the same name
        String duplicateRequestBody = """
            {
                "name": "duplicate-flag",
                "description": "Second flag with same name"
            }
        """;

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateRequestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$.error").value("Flag already exists"))
            .andExpect(jsonPath("$.message").value("A flag with the name already exists: duplicate-flag"));
    }

    @Test
    void shouldReturnAllFlagsWhenRequestingList() throws Exception {
        // Arrange: Create test flags in the database
        String flag1RequestBody = """
            {
                "name": "test-flag-1",
                "description": "First test flag"
            }
        """;

        String flag2RequestBody = """
            {
                "name": "test-flag-2", 
                "description": "Second test flag"
            }
        """;

        String flag3RequestBody = """
            {
                "name": "test-flag-3",
                "description": "Third test flag"
            }
        """;

        // Create the flags
        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(flag1RequestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isCreated());

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(flag2RequestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isCreated());

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(flag3RequestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isCreated());

        // Act & Assert: Request all flags and validate response
        mockMvc.perform(get("/admin/flags")
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(3))
            .andExpect(jsonPath("$[0].name").value("test-flag-1"))
            .andExpect(jsonPath("$[0].description").value("First test flag"))
            .andExpect(jsonPath("$[0].isActive").value(false))
            .andExpect(jsonPath("$[1].name").value("test-flag-2"))
            .andExpect(jsonPath("$[1].description").value("Second test flag"))
            .andExpect(jsonPath("$[1].isActive").value(false))
            .andExpect(jsonPath("$[2].name").value("test-flag-3"))
            .andExpect(jsonPath("$[2].description").value("Third test flag"))
            .andExpect(jsonPath("$[2].isActive").value(false));
    }

    @Test
    void shouldToggleFlagFromInactiveToActive() throws Exception {
        // Arrange: Create a flag that is initially inactive
        String createRequestBody = """
            {
                "name": "toggle-test-flag",
                "description": "Flag for toggle testing"
            }
        """;

        mockMvc.perform(post("/admin/flags")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createRequestBody)
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isCreated());

        // Act: Toggle the flag
        mockMvc.perform(patch("/admin/flags/toggle-test-flag")
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("toggle-test-flag"))
            .andExpect(jsonPath("$.isActive").value(true))
            .andExpect(jsonPath("$.description").value("Flag for toggle testing"));
    }

    @Test
    void shouldReturn404WhenTogglingNonExistentFlag() throws Exception {
        // Act & Assert: Try to toggle a flag that doesn't exist
        mockMvc.perform(patch("/admin/flags/non-existent-flag")
                .with(httpBasic("admin", "admin123")))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.error").value("Flag not found"))
            .andExpect(jsonPath("$.message").value("Flag not found with name: non-existent-flag"));
    }
}
