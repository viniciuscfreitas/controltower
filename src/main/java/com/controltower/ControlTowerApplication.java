package com.controltower;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ControlTower - Sistema de Feature Flags
 * 
 * Aplicação principal do sistema de feature flags para startups.
 * Permite gerenciar flags de funcionalidades de forma dinâmica
 * sem necessidade de deploy de código.
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
