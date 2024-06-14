# Task Manager Project 🚀

## Description 📝

The Task Manager Project is a web application designed to help users manage their tasks efficiently.

🔴 **Currently working on this project**

### The task we were given in school:

*To develop a web service using Docker Compose that has a frontend and a backend with two phases - build and production. The web service must have authentication and authorization to the OpenID provider, which is in the same infrastructure. Also, must store user data in a DBMS cluster through a load balancer.*

## Technologies Used 🛠️

### Frontend
- **Next.js**: A React framework for production that includes features like server-side rendering and static site generation.

### Backend
- **Flask**: A lightweight WSGI web application framework in Python.

### Database
- **MariaDB Galera Cluster**: A synchronous multi-master cluster for MariaDB.

### Authentication
- **Keycloak**: An open-source identity and access management solution.

### Load Balancing
- **MaxScale**: A database proxy for MariaDB that provides load balancing and query routing.

### Containerization
- **Docker**: Used for creating, deploying, and running applications in containers.
- **Docker Compose**: Used for defining and running multi-container Docker applications.

## Functionality 💡

- **Task Management**: Users can create, edit, and delete tasks. Tasks can be categorized, prioritized, and tracked for completion.
- **User Authentication**: Secure login and registration using Keycloak.
- **Database Management**: High availability and fault tolerance using a MariaDB Galera cluster.
- **Load Balancing**: Efficient load distribution across database servers using MaxScale.

## Setup ⚙️

The application is containerized using Docker, allowing for easy setup and deployment. The project includes the necessary Docker configuration files to orchestrate the services.

## Running the Application ▶️

1. **Frontend**: The Next.js application provides the user interface.
2. **Backend**: The Flask application handles the business logic.
3. **Database**: The MariaDB Galera cluster ensures data consistency and high availability.
4. **Authentication**: Keycloak manages user authentication and authorization.
5. **Load Balancing**: MaxScale handles load balancing and query routing for the database cluster.

## Deployment 🚢

The project can be easily deployed using Docker Compose, which sets up all necessary services in their respective containers, ensuring they can communicate with each other seamlessly.
