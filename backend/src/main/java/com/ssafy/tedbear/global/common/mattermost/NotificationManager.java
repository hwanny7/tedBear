package com.ssafy.tedbear.global.common.mattermost;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationManager {

	private final MatterMostSender mmSender;

	public void sendNotification(Exception e, String uri, String params) {
		mmSender.sendMessage(e, uri, params);
	}

}
