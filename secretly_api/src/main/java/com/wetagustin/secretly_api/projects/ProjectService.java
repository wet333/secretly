package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.global.exceptions.types.ServiceException;
import jakarta.annotation.security.RolesAllowed;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return projectRepository.findAll();
    }

    @RolesAllowed({ADMIN_ROLE})
    public Project createProject(ProjectRequest projectData) {
        Project project = new Project();
        project.setName(projectData.getName());
        project.setSecrets(List.of());  // New projects has no secrets at creation
        return projectRepository.save(project);
    }

    @RolesAllowed({ADMIN_ROLE, USER_ROLE})
    public Project getProject(String projectName) {
        return projectRepository.findByName(projectName);
    }

    @RolesAllowed({ADMIN_ROLE})
    public Project updateProject(String projectName, ProjectRequest projectData) {
        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }
        project.setName(projectData.getName());
        return projectRepository.save(project);
    }

    @Transactional
    @RolesAllowed({ADMIN_ROLE})
    public void deleteProject(String projectName) {
        if (projectRepository.existsByName(projectName)) {
            projectRepository.deleteByName(projectName);
        }
        throw new ServiceException(this.getClass(), "Project not found with name: " + projectName);
    }
}
