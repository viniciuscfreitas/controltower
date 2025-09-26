package com.controltower.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for the ControlTower application.
 * 
 * This class centralizes error handling and provides consistent
 * error responses across all REST endpoints.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation errors from @Valid annotations.
     * 
     * @param ex The validation exception
     * @return ResponseEntity with validation error details
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        response.put("error", "Validation failed");
        response.put("message", "Request validation failed");
        response.put("details", errors);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Handles business rule violations when a flag already exists.
     * 
     * @param ex The flag already exists exception
     * @return ResponseEntity with conflict error details
     */
    @ExceptionHandler(FlagAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleFlagAlreadyExistsException(FlagAlreadyExistsException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Flag already exists");
        response.put("message", ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    /**
     * Handles general runtime exceptions.
     * 
     * @param ex The runtime exception
     * @return ResponseEntity with internal server error details
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Internal server error");
        response.put("message", "An unexpected error occurred");
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
