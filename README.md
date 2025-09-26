# ControlTower: Sistema Completo de Feature Flags

Um sistema completo de feature flags com backend robusto em Java/Spring Boot e frontend moderno em Next.js/React. Desenvolvido seguindo metodologias profissionais de desenvolvimento e arquitetura limpa.

## Core Concepts & Architecture

This project was built following a professional software engineering blueprint to ensure quality, maintainability, and testability.

* **Architecture:** A classic **Layered Architecture (N-Tier)** model (`Controller` -> `Service` -> `Repository`) to ensure a strong **Separation of Concerns (SoC)**.
* **Development Methodology:** A rigorous **Test-Driven Development (TDD)** workflow was used for every feature. The project has a comprehensive suite of **11 integration tests** that validate the entire application flow, from the API request to the database persistence.
* **API Design:** The API is designed to be RESTful and semantic, using **DTOs (Data Transfer Objects)** to create a stable contract and prevent leaking internal domain models.
* **Error Handling:** A **Global Exception Handler (`@ControllerAdvice`)** centralizes error management, providing consistent and clean error responses (`400`, `404`) for all defined business exceptions (e.g., `FlagNotFoundException`).
* **Data Integrity:** **Bean Validation** is used at the controller boundary to validate all incoming data before it reaches the business logic.
* **Performance:** The public endpoint (`/api/v1/flags/active`) is served by an optimized, non-blocking query that retrieves only the necessary data to meet its sub-50ms SLA.

## Tech Stack

### Backend
| Layer               | Technology / Concept                   |
| ------------------- | -------------------------------------- |
| **Backend**         | Java 17, Spring Boot 3.2.0             |
| **Database**        | PostgreSQL (Production), H2 (Testing)  |
| **Persistence**     | Spring Data JPA / Hibernate            |
| **Security**        | Spring Security (HTTP Basic Auth)      |
| **Testing**         | JUnit 5, MockMvc, Testcontainers       |
| **Build Tool**      | Maven                                  |

### Frontend
| Layer               | Technology / Concept                   |
| ------------------- | -------------------------------------- |
| **Framework**       | Next.js 15, React 19, TypeScript       |
| **UI Library**      | Material-UI (MUI)                      |
| **State Management**| React Query (TanStack Query)           |
| **HTTP Client**     | Axios                                  |
| **Testing**         | Jest, React Testing Library            |
| **Styling**         | Tailwind CSS + Material-UI             |

## API Endpoints

### Admin API (`/admin`) - Requires Authentication

| Method | Path                       | Description                      |
| :----- | :------------------------- | :------------------------------- |
| `POST` | `/flags`                   | Creates a new feature flag.      |
| `GET`  | `/flags`                   | Retrieves a list of all flags.   |
| `PATCH`| `/flags/{name}`            | Toggles the `isActive` state.    |
| `DELETE`| `/flags/{name}`           | Deletes a feature flag.          |

### Public API (`/api/v1`) - No Authentication

| Method | Path             | Description                                  |
| :----- | :--------------- | :------------------------------------------- |
| `GET`  | `/flags/active`  | Returns a list of active flag names.         |

## 🚀 Getting Started

### Prerequisites
* Java 17+
* Node.js 18+
* Maven 3.6+
* Docker (for Testcontainers)

### Running the Complete Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/viniciuscfreitas/controltower.git
    cd controltower
    ```

2.  **Setup the database (if not using tests):**
    The application is configured to use a local PostgreSQL instance by default. You can use the `schema.sql` script to initialize the table.

3.  **Run the Backend:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will be available at `http://localhost:8080`. Admin credentials are `admin` / `admin123`.

4.  **Run the Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

### 🎯 Frontend Features

- **Dashboard Principal**: Visualização de todas as feature flags em uma tabela responsiva
- **Criação/Edição**: Modal com formulário validado para gerenciar flags
- **Confirmação de Ações**: Modal de confirmação para ações críticas (toggle/delete)
- **Autenticação**: Sistema de login integrado com o backend
- **Interface Profissional**: Design moderno com Material-UI

### 🧪 Running Tests

**Backend Tests:**
```bash
mvn test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
controltower/
├── src/                    # Backend (Spring Boot)
│   ├── main/java/         # Código fonte Java
│   └── test/java/         # Testes do backend
├── frontend/              # Frontend (Next.js)
│   ├── src/
│   │   ├── app/          # Páginas (App Router)
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Hooks customizados
│   │   ├── services/     # Serviços de API
│   │   └── types/        # Definições TypeScript
│   └── package.json      # Dependências do frontend
├── pom.xml               # Configuração Maven
└── README.md            # Este arquivo
```

## 🎯 Project Roadmap (Future Enhancements)
* **V3.0 - Advanced Features:** Percentage-based rollouts and user segmentation.
* **V4.0 - Scalability:** Introduce a caching layer (e.g., Redis) for the public endpoint.
* **V5.0 - Analytics:** Dashboard with flag usage metrics and analytics.
* **V6.0 - Multi-tenant:** Support for multiple organizations and teams.

## 🤝 Contributing

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 License

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
