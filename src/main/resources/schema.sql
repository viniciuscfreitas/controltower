-- Script de criação da tabela para o serviço ControlTower
-- Usando padrão PostgreSQL

CREATE TABLE feature_flags (
    id          BIGSERIAL PRIMARY KEY,  -- BIGSERIAL é um BIGINT auto-incrementável, ideal para chaves primárias.
    name        VARCHAR(100) NOT NULL UNIQUE, -- O nome da chave da flag, deve ser único. Ex: "novo-checkout-beta".
    is_active   BOOLEAN NOT NULL DEFAULT FALSE, -- O estado da flag, default para desligada (mais seguro).
    description VARCHAR(255), -- Uma descrição opcional para explicar o que a flag controla.
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Timestamp com timezone da criação do registro.
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- Timestamp com timezone da última atualização.
);

-- Opcional, mas boa prática: criar uma função para atualizar 'updated_at' automaticamente.
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON feature_flags
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
