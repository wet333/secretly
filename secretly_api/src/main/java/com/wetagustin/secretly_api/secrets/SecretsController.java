package com.wetagustin.secretly_api.secrets;

import com.wetagustin.secretly_api.activity.managers.SecretActivityManager;
import com.wetagustin.secretly_api.global.dtos.SimpleResponse;
import com.wetagustin.secretly_api.projects.Project;
import com.wetagustin.secretly_api.projects.ProjectDTO;
import com.wetagustin.secretly_api.projects.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/secrets")
public class SecretsController {

    private final SecretService secretService;
    private final SecretActivityManager secretActivityManager;

    public SecretsController(SecretService secretService,  SecretActivityManager secretActivityManager) {
        this.secretService = secretService;
        this.secretActivityManager = secretActivityManager;
    }

    @GetMapping("/{projectName}")
    ResponseEntity<SimpleResponse<List<SecretDTO>>> findAllByProject(@PathVariable String projectName) {
        SimpleResponse<List<SecretDTO>> response = new SimpleResponse<>();

        response.setData(secretService.findAllByProject(projectName));
        response.setMessage("Secret list for project " + projectName);

        return ResponseEntity.ok(response);
    }

    @Transactional
    @PostMapping("/{projectName}")
    ResponseEntity<SimpleResponse<ProjectDTO>> addSecretToProject(
            @PathVariable String projectName, @RequestBody SecretDTO secretDTO
    ) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();

        Project updatedProject = secretService.addSecretToProject(projectName, secretDTO);
        response.setMessage("Secret added successfully");
        response.setData(ProjectDTO.fromProject(updatedProject));

        secretActivityManager.saveSecretCreationActivity(projectName, secretDTO.getKeyName());
        return ResponseEntity.ok(response);
    }

    @Transactional
    @PutMapping("/{projectName}/{secretName}")
    ResponseEntity<SimpleResponse<ProjectDTO>> updateSecretToProject(
            @PathVariable String projectName,
            @PathVariable String secretName,
            @RequestBody SecretDTO secretDTO
    ) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();

        Project modProject = secretService.updateSecretFromProject(projectName, secretName, secretDTO);
        response.setMessage("Secret updated successfully");
        response.setData(ProjectDTO.fromProject(modProject));

        secretActivityManager.saveSecretUpdateActivity(projectName, secretName);
        return ResponseEntity.ok(response);
    }

    @Transactional
    @DeleteMapping("/{projectName}/{secretName}")
    ResponseEntity<SimpleResponse<ProjectDTO>> deleteSecretFromProject(
            @PathVariable String projectName,
            @PathVariable String secretName
    ) {
        SimpleResponse<ProjectDTO> response = new SimpleResponse<>();

        Project modProject = secretService.deleteSecretFromProject(projectName, secretName);
        response.setMessage("Secret deleted successfully");
        response.setData(ProjectDTO.fromProject(modProject));

        secretActivityManager.saveSecretDeleteActivity(projectName, secretName);
        return ResponseEntity.ok(response);
    }

}
