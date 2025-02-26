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

        project5.addSecret("password", "micontraseña123");

        projectRepository.save(project1);
        projectRepository.save(project2);
        projectRepository.save(project3);
        projectRepository.save(project4);
        projectRepository.save(project5);
    }
}
