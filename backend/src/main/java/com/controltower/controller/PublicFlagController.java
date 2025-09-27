package com.controltower.controller;

import com.controltower.service.FlagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for public feature flag API endpoints.
 * 
 * This controller provides public access to feature flags without authentication.
 * It is optimized for performance and should respond in less than 50ms.
 */
@RestController
@RequestMapping("/api/v1")
public class PublicFlagController {

    private final FlagService flagService;

    @Autowired
    public PublicFlagController(FlagService flagService) {
        this.flagService = flagService;
    }

    /**
     * Gets all active feature flag names.
     * 
     * This endpoint is optimized for performance and should respond in less than 50ms.
     * It returns only the names of active flags, not the complete flag objects.
     * 
     * @return ResponseEntity containing a list of active flag names
     */
    @GetMapping("/flags/active")
    public ResponseEntity<List<String>> getActiveFlags() {
        List<String> activeFlagNames = flagService.getActiveFlagNames();
        return ResponseEntity.ok(activeFlagNames);
    }
}
