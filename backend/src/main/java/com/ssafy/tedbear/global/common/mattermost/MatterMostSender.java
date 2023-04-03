package com.ssafy.tedbear.global.common.mattermost;

import static com.ssafy.tedbear.global.common.mattermost.MatterMostMessageDto.*;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.ssafy.tedbear.global.common.FindMemberService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MatterMostSender {

	@Value("${notification.mattermost.enabled}")
	private boolean mmEnabled;
	@Value("${notification.mattermost.webhook-url}")
	private String webhookUrl;

	private final RestTemplate restTemplate;
	private final MatterMostProperties mmProperties;
	private final FindMemberService findMemberService;

	public void sendMessage(Exception excpetion, HttpServletRequest req, String params) {
		if (!mmEnabled)
			return;
		String[] colors = {"#000000", "#808080", "#FF0000", "#00FF00", "#0000FF", "#FF00FF"};
		Random random = new Random();
		try {
			Attachment attachment = Attachment.builder()
				// .color(mmProperties.getColor())
				.color(colors[random.nextInt(colors.length)])
				.pretext(mmProperties.getPretext())
				.title(mmProperties.getTitle())
				.text(mmProperties.getText())
				.footer(mmProperties.getFooter())
				.build();

			attachment.addExceptionInfo(excpetion, req);
			Attachments attachments = new Attachments(attachment);
			attachments.addProps(excpetion);
			String payload = new Gson().toJson(attachments);

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

			HttpEntity<String> entity = new HttpEntity<>(payload, headers);
			restTemplate.postForEntity(webhookUrl, entity, String.class);

		} catch (Exception e) {
		}

	}
}