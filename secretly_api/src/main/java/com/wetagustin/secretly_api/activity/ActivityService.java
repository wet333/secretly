package com.wetagustin.secretly_api.activity;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getLatestActivity() {
        PageRequest pageRequest = PageRequest.of(0, 6, Sort.by("createdAt").descending());
        return activityRepository.findAll(pageRequest).getContent();
    }

    public void saveActivity(Activity activity) {
        activityRepository.save(activity);
    }
}
