# ---- Estágio de Build ----
# Usa uma imagem Maven com a JDK 17 para compilar o projeto.
# 'as builder' nomeia este estágio para que possamos nos referir a ele mais tarde.
FROM maven:3.9-eclipse-temurin-17 AS builder

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia o pom.xml primeiro para aproveitar o cache de layers do Docker.
# Se as dependências não mudarem, o Docker não vai baixá-las de novo.
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o resto do código-fonte.
COPY src ./src

# Executa o build do Maven para gerar o arquivo .jar.
# -DskipTests pula a execução dos testes durante o build do Docker.
RUN mvn package -DskipTests


# ---- Estágio de Produção ----
# Usa uma imagem JRE (Java Runtime Environment) mínima e segura, baseada no Ubuntu.
# É muito menor que a imagem de build, resultando em uma imagem final mais leve.
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copia apenas o .jar compilado do estágio de build para a imagem final.
# O nome do arquivo .jar deve corresponder ao que está definido no seu pom.xml.
COPY --from=builder /app/target/controltower-1.0.0.jar app.jar

# Expõe a porta 8080, que é a porta padrão do Spring Boot.
EXPOSE 8080

# Comando para executar a aplicação quando o container iniciar.
ENTRYPOINT ["java", "-jar", "app.jar"]
