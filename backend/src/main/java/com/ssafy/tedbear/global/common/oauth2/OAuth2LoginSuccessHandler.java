package com.ssafy.tedbear.global.common.oauth2;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;
import com.ssafy.tedbear.domain.member.entity.MemberScore;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final MemberRepository memberRepository;
	private final MemberLevelRepository memberLevelRepository;
	private final MemberScoreRepository memberScoreRepository;
	private final JwtProvider jwtProvider;
	private static boolean join;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		String accessToken = jwtProvider.createAccessToken(authentication);
		String refreshToken = jwtProvider.createRefreshToken();

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		saveOrUpdateUser(refreshToken, oAuth2User);

		clearAuthenticationAttributes(request, response);

		getRedirectStrategy().sendRedirect(request, response,
			"https://localhost:3000/seung?accessToken=" + accessToken + "&refreshToken=" + refreshToken
				+ "&join="
				+ join); // 난이도 측정 페이지로 이동(프론트에서 분기)

	}

	private void saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {
		MemberLevel memberLevel = MemberLevel.builder().levelExp(1).createdDate(LocalDateTime.now()).build();
		MemberScore memberScore = MemberScore.builder().score(50000).createdDate(LocalDateTime.now()).build();

		Optional<Member> oMember = memberRepository.findByUid(oAuth2User.getUid());
		if (oMember.isEmpty()) {
			memberLevelRepository.save(memberLevel);
			memberScoreRepository.save(memberScore);
			join = true;
		}
		Member member = oMember.map(
				entity -> entity.updateNicknameAndRefreshToken(oAuth2User.getNickname(), refreshToken))
			.orElse(oAuth2User.toEntity(
				oAuth2User.getNickname(),
				memberLevel,
				memberScore,
				null));

		memberRepository.save(member);

	}

	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request); // WebAttributes.AUTHENTICATION_EXCEPTION 변수에 정의된 세션 값 지우기
	}
}
