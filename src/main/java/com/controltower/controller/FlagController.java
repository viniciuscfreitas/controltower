package com.controltower.controller;

import com.controltower.dto.CreateFlagRequest;
import com.controltower.dto.FlagResponse;
import com.controltower.service.FlagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for feature flag management.
 * 
 * This controller handles all HTTP requests related to feature flags,
 * providing endpoints for CRUD operations and flag state management.
 */
@RestController
@RequestMapping("/admin")
public class FlagController {

    private final FlagService flagService;

    @Autowired
    public FlagController(FlagService flagService) {
        this.flagService = flagService;
    }

    /**
     * Creates a new feature flag.
     * 
     * @param request The flag creation request containing name and description
     * @return ResponseEntity containing the created flag response
     */
    @PostMapping("/flags")
    public ResponseEntity<FlagResponse> createFlag(@Valid @RequestBody CreateFlagRequest request) {
        FlagResponse response = flagService.createFlag(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Retrieves all feature flags.
     * 
     * @return ResponseEntity containing a list of all flags
     */
    @GetMapping("/flags")
    public ResponseEntity<List<FlagResponse>> getAllFlags() {
        List<FlagResponse> flags = flagService.getAllFlags();
        return ResponseEntity.ok(flags);
    }

    /**
     * Toggles the active state of a feature flag.
     * 
     * @param id The ID of the flag to toggle
     * @return ResponseEntity containing the updated flag response
     */
    @PatchMapping("/flags/{id}")
    public ResponseEntity<FlagResponse> toggleFlag(@PathVariable Long id) {
        FlagResponse response = flagService.toggleFlag(id);
        return ResponseEntity.ok(response);
    }
}
