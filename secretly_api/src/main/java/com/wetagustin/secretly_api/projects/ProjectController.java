package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.global.dtos.SimpleResponse;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<SimpleResponse<List<Project>>>  getAllProjects() {
        SimpleResponse<List<Project>> response = new SimpleResponse<>();
        List<Project> projects = projectService.getAllProjects();

        response.setMessage("All projects retrieved successfully");
        response.setData(projects);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<SimpleResponse<Project>> createProject(@RequestBody ProjectRequest projectRequest) {
        SimpleResponse<Project> response = new SimpleResponse<>();

        try {
            Project createdProject = projectService.createProject(projectRequest);

            response.setMessage("Project created successfully");
            response.setData(createdProject);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<Project>> readProject(@PathVariable String projectName) {
        SimpleResponse<Project> response = new SimpleResponse<>();

        Project project = projectService.getProject(projectName);

        response.setMessage("Project information retrieved successfully");
        response.setData(project);

        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<Project>> updateProject(
            @PathVariable String projectName,
            @RequestBody ProjectRequest projectRequest
    ) {
        SimpleResponse<Project> response = new SimpleResponse<>();

        if (projectName == null || projectRequest == null) {
            return ResponseEntity.badRequest().build();
        }
        Project updatedProject = projectService.updateProject(projectName, projectRequest);

        response.setMessage("Project information updated successfully");
        response.setData(updatedProject);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{projectName}")
    public ResponseEntity<SimpleResponse<Void>> deleteProject(@PathVariable String projectName) {
        SimpleResponse<Void> response = new SimpleResponse<>();
        projectService.deleteProject(projectName);

        response.setMessage("Project deleted successfully");
        response.setData(null);

        return ResponseEntity.ok(response);
    }
}
