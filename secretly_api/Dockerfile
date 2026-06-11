# ------------------------------------------------
# Stage 1: Build the Spring Boot JAR with Maven
# ------------------------------------------------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies: re-downloaded only when pom.xml changes
COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests -B

# ------------------------------------------------
# Stage 2: Run the JAR on a minimal JRE image
# ------------------------------------------------
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/target/secretly_api-*.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
