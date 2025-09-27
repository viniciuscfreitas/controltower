package com.controltower.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global configuration for Cross-Origin Resource Sharing (CORS).
 *
 * This configuration allows the frontend application running on Vercel
 * to communicate with the backend API.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // Aplica a política de CORS para todos os endpoints da API ("/**")
        .allowedOrigins(
            "https://controltower.vercel.app", // URL do seu frontend em produção
            "http://localhost:3001" // URL do seu frontend em desenvolvimento local
        )
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Métodos HTTP permitidos
        .allowedHeaders("*") // Permite todos os cabeçalhos na requisição
        .allowCredentials(true); // Permite o envio de credenciais (como cookies ou auth headers)
  }
}
