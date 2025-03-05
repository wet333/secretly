package com.wetagustin.secretly_api.activity.managers;

import com.wetagustin.secretly_api.activity.Activity;
import com.wetagustin.secretly_api.activity.ActivityService;
import com.wetagustin.secretly_api.projects.Project;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class ProjectActivityManager {

    private final ActivityService activityService;

    public ProjectActivityManager(ActivityService activityService) {
        this.activityService = activityService;
    }

    public void saveProjectCreationActivity(Project createdProject) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", createdProject.getName());
        activityInfo.put("message", "Project " + createdProject.getName()  + " has been created");

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.CREATE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

    public void saveProjectDeletionActivity(String projectName) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", projectName);
        activityInfo.put("message", "Project " + projectName + " has been deleted.");

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.DELETE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

    public void saveProjectModificationActivity(Project originalProject, Project modifiedProject) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", modifiedProject.getName());
        activityInfo.put("message", "Project renamed to " + modifiedProject.getName() + " from " + originalProject.getName());

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.UPDATE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

}
