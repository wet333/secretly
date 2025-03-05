package com.wetagustin.secretly_api.activity.managers;

import com.wetagustin.secretly_api.activity.Activity;
import com.wetagustin.secretly_api.activity.ActivityService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class SecretActivityManager {

    private final ActivityService activityService;

    SecretActivityManager(ActivityService activityService) {
        this.activityService = activityService;
    }

    public void saveSecretCreationActivity(String projectName, String secretName) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", projectName);
        activityInfo.put("secretName", secretName);
        activityInfo.put("message", "Added secret " + secretName + " to project " + projectName);

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.SECRET_ACTIVITY)
                .activityAction(Activity.ActivityAction.CREATE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

    public void saveSecretUpdateActivity(String projectName, String secretName) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", projectName);
        activityInfo.put("secretName", secretName);
        activityInfo.put("message", "Updated secret " + secretName + " in project " + projectName);

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.SECRET_ACTIVITY)
                .activityAction(Activity.ActivityAction.UPDATE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

    public void saveSecretDeleteActivity(String projectName, String secretName) {
        Map<String, String> activityInfo = new HashMap<>();
        activityInfo.put("projectName", projectName);
        activityInfo.put("secretName", secretName);
        activityInfo.put("message", "Deleted secret " + secretName + " from project " + projectName);

        activityService.saveActivity(Activity.builder()
                .activityType(Activity.ActivityType.SECRET_ACTIVITY)
                .activityAction(Activity.ActivityAction.DELETE)
                .activityInfo(activityInfo)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }
}
