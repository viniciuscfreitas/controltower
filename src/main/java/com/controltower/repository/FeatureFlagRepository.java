package com.controltower.repository;

import com.controltower.entity.FeatureFlag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository para operações de persistência da entidade FeatureFlag.
 * 
 * Fornece métodos para CRUD básico e consultas específicas
 * para o sistema de feature flags.
 */
@Repository
public interface FeatureFlagRepository extends JpaRepository<FeatureFlag, Long> {

  /**
   * Busca uma feature flag pelo nome.
   * 
   * @param name Nome da flag
   * @return Optional contendo a flag se encontrada
   */
  Optional<FeatureFlag> findByName(String name);

  /**
   * Verifica se existe uma flag com o nome especificado.
   * 
   * @param name Nome da flag
   * @return true se existe, false caso contrário
   */
  boolean existsByName(String name);

  /**
   * Busca todas as flags ativas.
   * Otimizado para o endpoint público /api/v1/flags/active
   * que deve responder em menos de 50ms.
   * 
   * @return Lista com os nomes das flags ativas
   */
  @Query("SELECT f.name FROM FeatureFlag f WHERE f.isActive = true")
  List<String> findActiveFlagNames();

  /**
   * Busca todas as flags ativas (entidade completa).
   * 
   * @return Lista de flags ativas
   */
  List<FeatureFlag> findByIsActiveTrue();

  /**
   * Busca todas as flags inativas.
   * 
   * @return Lista de flags inativas
   */
  List<FeatureFlag> findByIsActiveFalse();
}
