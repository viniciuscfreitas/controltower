package com.controltower.exception;

/**
 * Exception thrown when attempting to create a feature flag with a name that already exists.
 * 
 * This exception represents a business rule violation where a flag name
 * must be unique within the system.
 */
public class FlagAlreadyExistsException extends RuntimeException {

    public FlagAlreadyExistsException(String message) {
        super(message);
    }

    public FlagAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
