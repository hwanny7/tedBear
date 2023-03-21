package com.ssafy.tedbear.domain.video.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
class VideoControllerTest {

	@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
	@Autowired
	final MockMvc mvc;

	VideoControllerTest(MockMvc mvc) {
		this.mvc = mvc;
	}

	@Test
	@DisplayName("추천 테스트")
	void recommendTest() throws Exception {
		mvc.perform(
			MockMvcRequestBuilders.get("video/recommend/list"))
			.andDo(print())
		;
	}
}