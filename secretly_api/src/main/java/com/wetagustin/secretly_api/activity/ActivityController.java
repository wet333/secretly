package com.wetagustin.secretly_api.activity;

import com.wetagustin.secretly_api.global.dtos.SimpleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;

    ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<SimpleResponse<List<Activity>>> getActivities() {
        SimpleResponse<List<Activity>> response = new SimpleResponse<>();
        response.setMessage("Latest activities");
        response.setData(activityService.getLatestActivity());
        return ResponseEntity.ok(response);
    }
}
