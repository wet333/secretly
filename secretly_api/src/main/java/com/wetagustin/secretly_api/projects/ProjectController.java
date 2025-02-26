package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.global.dtos.SimpleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<SimpleResponse<List<ProjectDTO>>>  getAllProjects() {
        SimpleResponse<List<ProjectDTO>> response = new SimpleResponse<>();
        List<Project> projects = projectService.getAllProjects();
        List<ProjectDTO> projectDTOs = projects.stream().map(ProjectDTO::fromProject).toList();

        response.setMessage("All projects retrieved successfully");
        response.setData(projectDTOs);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<SimpleResponse<ProjectDTO>> createProject(@RequestBody ProjectDTO projectRequest) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();
        Project createdProject = projectService.createProject(projectRequest);

        response.setMessage("Project created successfully");
        response.setData(ProjectDTO.fromProject(createdProject));

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<ProjectDTO>> readProject(@PathVariable String projectName) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();

        Project project = projectService.getProject(projectName);

        response.setMessage("Project information retrieved successfully");
        response.setData(ProjectDTO.fromProject(project));

        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<ProjectDTO>> updateProject(
            @PathVariable String projectName,
            @RequestBody ProjectDTO projectRequest
    ) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();

        if (projectName == null || projectRequest == null) {
            return ResponseEntity.badRequest().build();
        }
        Project updatedProject = projectService.updateProject(projectName, projectRequest);

        response.setMessage("Project information updated successfully");
        response.setData(ProjectDTO.fromProject(updatedProject));

        return ResponseEntity.ok(response);
    }

    @Transactional
    @DeleteMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<String>> deleteProject(@PathVariable String projectName) {
        SimpleResponse<String> response = new SimpleResponse<>();
        projectService.deleteProject(projectName);

        response.setMessage("Project deleted successfully");
        response.setData(projectName);

        return ResponseEntity.ok(response);
    }
}
