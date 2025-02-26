package com.wetagustin.secretly_api.projects;

import jakarta.annotation.security.RolesAllowed;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.wetagustin.secretly_api.global.SecurityConfiguration.ADMIN_ROLE;
import static com.wetagustin.secretly_api.global.SecurityConfiguration.USER_ROLE;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @RolesAllowed({ADMIN_ROLE})
    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.isEmpty() ? Collections.emptyList() : projects;
    }

    @RolesAllowed({ADMIN_ROLE})
    public Project createProject(ProjectDTO projectData) {
        if (projectData == null) {
            throw new IllegalArgumentException("Project data cannot be null");
        }
        if (projectData.getName() == null || projectData.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be null or empty");
        }

        // Check if project with same name already exists
        Project existingProject = projectRepository.findByName(projectData.getName());
        if (existingProject != null) {
            throw new IllegalStateException("Project with name '" + projectData.getName() + "' already exists");
        }

        Project project = new Project();
        project.setName(projectData.getName());
        project.setSecrets(new ArrayList<>());

        return projectRepository.save(project);
    }

    @RolesAllowed({ADMIN_ROLE, USER_ROLE})
    public Project getProject(String projectName) {
        if (projectName == null || projectName.trim().isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be null or empty");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }

        return project;
    }

    @RolesAllowed({ADMIN_ROLE})
    public Project updateProject(String projectName, ProjectDTO projectData) {
        if (projectName == null || projectName.trim().isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be null or empty");
        }
        if (projectData == null) {
            throw new IllegalArgumentException("Project data cannot be null");
        }
        if (projectData.getName() == null || projectData.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("New project name cannot be null or empty");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }

        // Check if the new name conflicts with an existing project (if name is being changed)
        if (!projectName.equals(projectData.getName())) {
            Project existingProject = projectRepository.findByName(projectData.getName());
            if (existingProject != null) {
                throw new IllegalStateException("Cannot update: A project with name '" +
                        projectData.getName() + "' already exists");
            }
        }
        project.setName(projectData.getName());

        return projectRepository.save(project);
    }

    @RolesAllowed({ADMIN_ROLE})
    public void deleteProject(String projectName) {
        if (projectName == null || projectName.trim().isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be null or empty");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }
        projectRepository.delete(project);
    }
}
