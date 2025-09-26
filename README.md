# ControlTower: A Lightweight, Self-Hosted Feature Flag System

A pragmatic, high-performance Feature Flag API built with Java 17, Spring Boot 3, and a Test-Driven Development (TDD) approach. This project serves as a professional showcase of a robust, well-architected full-stack system with both backend API and frontend admin panel.

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
| **Frontend**        | Next.js 15, TypeScript, Material-UI    |
| **Database**        | PostgreSQL (Production), H2 (Testing)  |
| **Persistence**     | Spring Data JPA / Hibernate            |
| **Security**        | Spring Security (HTTP Basic Auth)      |
| **State Management**| React Query (TanStack Query)           |
| **Testing**         | JUnit 5, MockMvc, Testcontainers, Jest, React Testing Library |
| **Build Tool**      | Maven, npm                             |

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
* Node.js 18+
* Docker (for Testcontainers)

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/viniciuscfreitas/controltower.git
    cd controltower
    ```

2.  **Setup the database (if not using tests):**
    The application is configured to use a local PostgreSQL instance by default. You can use the `schema.sql` script to initialize the table.

3.  **Run the backend:**
    ```bash
    mvn spring-boot:run
    ```
    The backend API will be available at `http://localhost:8080`. Admin credentials are `admin` / `admin123`.

4.  **Run the frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend admin panel will be available at `http://localhost:3000`.

### Running Tests

This project uses a TDD approach, and all functionality is covered by integration tests. To run the complete test suite:

**Backend tests:**
```bash
mvn test
```

**Frontend tests:**
```bash
cd frontend
npm test
```

## Frontend Admin Panel

The frontend is a modern Single-Page Application (SPA) built with Next.js 15 and TypeScript, featuring:

* **Dashboard:** Comprehensive table view of all feature flags with real-time status updates
* **CRUD Operations:** Create, edit, and delete feature flags through intuitive modals
* **Authentication:** Secure login system with HTTP Basic Auth integration
* **State Management:** Efficient data fetching and caching with React Query
* **Responsive Design:** Professional UI built with Material-UI components
* **Type Safety:** Full TypeScript implementation for robust development

### Frontend Architecture

* **Component-Based:** Modular React components with clear separation of concerns
* **Custom Hooks:** Reusable logic for API interactions and state management
* **Context API:** Centralized authentication state management
* **Error Handling:** Comprehensive error boundaries and user feedback
* **Testing:** Unit tests with Jest and React Testing Library

## Project Roadmap (Future Enhancements)
* **V3.0 - Advanced Features:** Percentage-based rollouts and user segmentation.
* **V4.0 - Scalability:** Introduce a caching layer (e.g., Redis) for the public endpoint.
* **V5.0 - Analytics:** Usage metrics and flag performance tracking.
