package com.ssafy.tedbear.global.common.mattermost;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class NotificationManager {

	private final MatterMostSender mmSender;

	public void sendNotification(Exception e, HttpServletRequest req, String params) {
		mmSender.sendMessage(e, req, params);
	}

}
