package com.wetagustin.secretly_api.projects;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class LoadProjectsToDB implements CommandLineRunner {

    private final ProjectRepository projectRepository;

    LoadProjectsToDB(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Project project1 = new Project("Project Alpha");
        Project project2 = new Project("Project Beta");
        Project project3 = new Project("Spring Project");
        Project project4 = new Project("Besto Projecto");
        Project project5 = new Project("My Project");


        project1.addSecret("apiKey", "api_9f72b51e8c3a4d6");
        project1.addSecret("dbPassword", "db_secure_pwd123");
        project1.addSecret("jwtToken", "jwt_eyJhbGciOiJIUzI1NiJ9");

        project2.addSecret("apiKey", "api_beta_7a8b9c0d1e2f");
        project2.addSecret("dbPassword", "beta_mysql_passwd");
        project2.addSecret("jwtToken", "beta_jwt_token_xyz");
        project2.addSecret("s3BucketKey", "s3_beta_access_key");

        project3.addSecret("apiKey", "spring_api_3e4f5g6h7i");
        project3.addSecret("dbPassword", "spring_db_password!");
        project3.addSecret("jwtToken", "spring_jwt_auth_token");
        project3.addSecret("oauthSecret", "spring_oauth_client_secret");
        project3.addSecret("springSecurityKey", "SPRING_SECURITY_PASSWORD");

        project4.addSecret("apiKey", "besto_api_key_123456");
        project4.addSecret("dbPassword", "besto_database_password");
        project4.addSecret("jwtToken", "besto_jwt_token_abcdef");
        project4.addSecret("encryptionKey", "besto_aes256_key");
        project4.addSecret("paymentGatewaySecret", "besto_stripe_secret_key");
        project4.addSecret("adminConsolePassword", "besto_admin_console123");

        project5.addSecret("password", "micontraseña123"); // Original secret
        project5.addSecret("apiKey", "my_project_api_key");
        project5.addSecret("clientId", "my_project_client_id");
        project5.addSecret("serviceAccountKey", "my_project_service_account");

        projectRepository.save(project1);
        projectRepository.save(project2);
        projectRepository.save(project3);
        projectRepository.save(project4);
        projectRepository.save(project5);
    }
}
