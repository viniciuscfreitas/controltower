# ControlTower: A Lightweight, Self-Hosted Feature Flag System

A pragmatic, high-performance Feature Flag API built with Java 17, Spring Boot 3, and a Test-Driven Development (TDD) approach. This project serves as a professional showcase of a robust, well-architected backend system.

## Core Concepts & Architecture

This project was built following a professional software engineering blueprint to ensure quality, maintainability, and testability.

* **Architecture:** A classic **Layered Architecture (N-Tier)** model (`Controller` -> `Service` -> `Repository`) to ensure a strong **Separation of Concerns (SoC)**.
* **Development Methodology:** A rigorous **Test-Driven Development (TDD)** workflow was used for every feature. The project has a comprehensive suite of **11 integration tests** that validate the entire application flow, from the API request to the database persistence.
* **API Design:** The API is designed to be RESTful and semantic, using **DTOs (Data Transfer Objects)** to create a stable contract and prevent leaking internal domain models.
* **Error Handling:** A **Global Exception Handler (`@ControllerAdvice`)** centralizes error management, providing consistent and clean error responses (`400`, `404`) for all defined business exceptions (e.g., `FlagNotFoundException`).
* **Data Integrity:** **Bean Validation** is used at the controller boundary to validate all incoming data before it reaches the business logic.
* **Performance:** The public endpoint (`/api/v1/flags/active`) is served by an optimized, non-blocking query that retrieves only the necessary data to meet its sub-50ms SLA.

## Tech Stack

| Layer               | Technology / Concept                   |
| ------------------- | -------------------------------------- |
| **Backend**         | Java 17, Spring Boot 3.2.0             |
| **Database**        | PostgreSQL (Production), H2 (Testing)  |
| **Persistence**     | Spring Data JPA / Hibernate            |
| **Security**        | Spring Security (HTTP Basic Auth)      |
| **Testing**         | JUnit 5, MockMvc, Testcontainers       |
| **Build Tool**      | Maven                                  |

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

## Getting Started

### Prerequisites
* Java 17+
* Maven 3.6+
* Docker (for Testcontainers)

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/viniciuscfreitas/controltower.git](https://github.com/viniciuscfreitas/controltower.git)
    cd controltower
    ```

2.  **Setup the database (if not using tests):**
    The application is configured to use a local PostgreSQL instance by default. You can use the `schema.sql` script to initialize the table.

3.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The application will be available at `http://localhost:8080`. Admin credentials are `admin` / `admin123`.

### Running Tests

This project uses a TDD approach, and all functionality is covered by integration tests. To run the complete test suite:
```bash
mvn test
```

## Project Roadmap (Future Enhancements)
* **V2.0 - Web UI:** A React/Next.js admin panel.
* **V3.0 - Advanced Features:** Percentage-based rollouts and user segmentation.
* **V4.0 - Scalability:** Introduce a caching layer (e.g., Redis) for the public endpoint.
