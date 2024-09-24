# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .
RUN mvn dependency:go-offline -B
# COPY src/main/java/com/du/yiit/examReady/ExamReadyApplication.java ./src/main/java/com/du/yiit/examReady/ExamReadyApplication.java
COPY src ./src
RUN mvn clean package -DskipTests

# Package the application (create the jar)

# Stage 2: Run the application using OpenJDK 17 (Alpine)
FROM openjdk:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the Maven build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (e.g., 8080 for Spring Boot)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
