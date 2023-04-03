package com.ssafy.tedbear.global.common.mattermost;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class MatterMostMessageDto {

	@Getter
	public static class Attachments {
		private List<Attachment> attachments;

		public Attachments() {
			attachments = new ArrayList<>();
		}

		public Attachments(List<Attachment> attachments) {
			this.attachments = attachments;
		}

		public Attachments(Attachment attachment) {
			this();
			this.attachments.add(attachment);
		}

	}

	@Getter
	@AllArgsConstructor
	@Builder
	@ToString
	public static class Attachment {
		private String channel;

		private String pretext;

		private String color;

		@SerializedName("author_name")
		private String authorName;

		@SerializedName("author_icon")
		private String authorIcon;

		private String title;

		private String text;

		private String footer;

		public Attachment addExceptionInfo(Exception e, HttpServletRequest req) {
			StringBuilder sb = new StringBuilder();

			Enumeration<String> keys = req.getParameterNames();
			while (keys.hasMoreElements()) {
				String key = keys.nextElement();
				sb.append("* ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
			}
			String params = sb.toString();

			sb = new StringBuilder();

			// Error Class Name
			sb.append("# :no_entry_sign: ")
				.append(e.getClass().getSimpleName())
				.append(" :no_entry_sign:")
				.append("\n");

			// Request URL, Method
			String uri = req.getRequestURI();
			String method = req.getMethod();
			sb.append("### **Reqeust Info**")
				.append(' ')
				.append('(')
				.append(method)
				.append(')').append('\n').append('\n').append("- " + uri).append('\n').append('\n');

			// Error Message
			sb.append("### **Error Message**")
				.append('\n')
				.append('\n')
				.append("```")
				.append(e.getMessage())
				.append("```")
				.append('\n')
				.append('\n');

			// Paramaters
			sb.append("### **Parameters**").append('\n').append('\n').append(params).append('\n').append('\n');

			this.text = sb.toString();
			return this;
		}

	}

}