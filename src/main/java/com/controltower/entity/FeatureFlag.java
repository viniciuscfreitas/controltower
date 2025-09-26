package com.controltower.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

/**
 * Entidade JPA que representa uma Feature Flag no sistema.
 * 
 * Uma feature flag é um mecanismo que permite habilitar/desabilitar
 * funcionalidades em tempo real sem necessidade de deploy.
 */
@Entity
@Table(name = "feature_flags")
public class FeatureFlag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Nome da flag é obrigatório")
  @Size(max = 100, message = "Nome da flag deve ter no máximo 100 caracteres")
  @Column(name = "name", nullable = false, unique = true, length = 100)
  private String name;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = false;

  @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
  @Column(name = "description", length = 255)
  private String description;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private OffsetDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private OffsetDateTime updatedAt;

  // Construtores
  public FeatureFlag() {
  }

  public FeatureFlag(String name, String description) {
    this.name = name;
    this.description = description;
    this.isActive = false;
  }

  public FeatureFlag(String name, String description, Boolean isActive) {
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }

  // Getters e Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public OffsetDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public String toString() {
    return "FeatureFlag{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", isActive=" + isActive +
        ", description='" + description + '\'' +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt +
        '}';
  }
}
