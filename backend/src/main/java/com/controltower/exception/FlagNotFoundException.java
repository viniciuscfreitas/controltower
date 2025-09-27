package com.controltower.exception;

/**
 * Exception thrown when a feature flag with the specified name is not found.
 * 
 * This exception represents a business rule violation where a flag
 * with the given name does not exist in the system.
 */
public class FlagNotFoundException extends RuntimeException {

    public FlagNotFoundException(String message) {
        super(message);
    }

    public FlagNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
