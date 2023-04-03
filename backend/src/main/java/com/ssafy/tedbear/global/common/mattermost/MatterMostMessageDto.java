package com.ssafy.tedbear.global.common.mattermost;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class MatterMostMessageDto {

    @Getter
    public static class Attachments {
        private Props props;
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

        public void addProps(Exception e) {
            props = new Props(e);
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
            String uri = req.getRequestURI();
            String method = req.getMethod();
            StringBuilder paramsBuilder = new StringBuilder();
            Enumeration<String> keys = req.getParameterNames();
            while (keys.hasMoreElements()) {
                String key = keys.nextElement();
                paramsBuilder.append("* ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
            }
            String params = paramsBuilder.toString();


            StringBuilder sb = new StringBuilder();

            sb.append("# :no_entry_sign: ").append(e.getClass().getSimpleName()).append(" :no_entry_sign:").append("\n");
            sb.append("### **Reqeust URL**")
                    .append(' ')
                    .append('(')
                    .append(method)
                    .append(')').append('\n').append('\n').append("- " + uri).append('\n').append('\n');
            sb.append("### **Error Message**").append('\n').append('\n').append("```").append(e.getMessage()).append("```")
                    .append('\n').append('\n');
            sb.append("### **Parameters**").append('\n').append('\n').append(params).append('\n').append('\n');
            this.text = sb.toString();
            return this;
        }

    }

    @Getter
    @NoArgsConstructor
    public static class Props {
        private String card;

        public Props(Exception e) {
            StringBuilder text = new StringBuilder();

            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            text.append("**Stack Trace**").append("\n").append('\n').append("```");
            text.append(sw.toString().substring(0,
                    Math.min(5500, sw.toString().length())) + "\n...").append('\n').append('\n');

            this.card = text.toString();
        }
    }

}