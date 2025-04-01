package com.wetagustin.secretly_api.activity.managers;

import com.wetagustin.secretly_api.activity.Activity;
import com.wetagustin.secretly_api.activity.ActivityService;
import com.wetagustin.secretly_api.activity.ActivityUtils;
import com.wetagustin.secretly_api.global.Utils;
import com.wetagustin.secretly_api.projects.Project;
import org.springframework.stereotype.Component;

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
        activityInfo.put("message", "Project " + ActivityUtils.placeholderForKey("projectName") + " has been created");

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.CREATE)
                .activityInfo(activityInfo)
                .createdAt(Utils.now())
                .build()
        );
    }

    public void saveProjectDeletionActivity(String projectName) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", projectName);
        activityInfo.put("message", "Project " + ActivityUtils.placeholderForKey("projectName") + " has been deleted");

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.DELETE)
                .activityInfo(activityInfo)
                .createdAt(Utils.now())
                .build()
        );
    }

    public void saveProjectModificationActivity(Project originalProject, Project modifiedProject) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("oldProjectNAme", originalProject.getName());
        activityInfo.put("newProjectName", modifiedProject.getName());
        activityInfo.put("message",
                "Project " + ActivityUtils.placeholderForKey("oldProjectName") + " renamed to " +
                ActivityUtils.placeholderForKey("newProjectName")
        );

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.PROJECT_ACTIVITY)
                .activityAction(Activity.ActivityAction.UPDATE)
                .activityInfo(activityInfo)
                .createdAt(Utils.now())
                .build()
        );
    }

}
