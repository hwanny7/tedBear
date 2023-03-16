package com.ssafy.tedbear.global.util.data.service;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoCategory;
import com.ssafy.tedbear.domain.video.repository.VideoCategoryRepository;
import com.ssafy.tedbear.domain.video.repository.VideoRepository;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.repository.WordRepository;
import com.ssafy.tedbear.global.util.CalcScoreUtil;
import com.ssafy.tedbear.global.util.JSONParseUtil;
import com.ssafy.tedbear.global.util.TimeParseUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataServiceImpl implements DataService {
	private final VideoRepository videoRepository;
	private final SentenceRepository sentenceRepository;
	private final WordRepository wordRepository;
	private final VideoCategoryRepository videoCategoryRepository;

	@Override
	public void initWord() {
		try {
			List<LinkedHashMap> jsonList = JSONParseUtil.getListFromJson("/data/cefr_vocab_en.json");

			Map<Object, Integer> scoreMap = new HashMap<>();
			scoreMap.put("A1", 358);
			scoreMap.put("A2", 716);
			scoreMap.put("B1", 1074);
			scoreMap.put("B2", 1432);
			scoreMap.put("C1", 1790);
			scoreMap.put("C2", 2148);

			// wordRepository.deleteAll();
			List<Word> wordList = new ArrayList<>();
			for (LinkedHashMap element : jsonList) {
				Word word = Word.builder()
					.content((String)element.get("word"))
					.score(scoreMap.get(element.get("level")))
					.build();
				wordList.add(word);
				wordRepository.save(word);
			}
			// wordRepository.saveAll(wordList);

		} catch (Exception e) {
			e.printStackTrace();
		}
		// wordRepository.save(Word.builder().content("Sister").mean("누이").score(-1).build());
	}

	@Override
	public void initVideoSentence() {
		try {
			LinkedHashMap json = JSONParseUtil.getLinkedHashMapFromJson("/data/video_data.json");

			for (Object watchId : json.keySet()) {
				if (videoRepository.findByWatchId((String)watchId) != null) {
					System.out.println(watchId + "는 이미 DB에 존재합니다");
					continue;
				}
				LinkedHashMap element = (LinkedHashMap)json.get(watchId);
				VideoCategory videoCategory = videoCategoryRepository.findById(
					Long.valueOf((String)element.get("category_no"))).get();
				String title = (String)element.get("title");
				String date = (String)element.get("published_at");
				String thumbnailUrl = (String)element.get("thumbnail_url");
				String videoUrl = (String)element.get("video_url");

				Video video = Video.builder()
					.videoCategory(videoCategory)
					.watchId((String)watchId)
					.title(title)
					.publishedDate(TimeParseUtil.string2Time(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"))
					.thumbnailUrl(thumbnailUrl)
					.videoUrl(videoUrl)
					.build();
				videoRepository.save(video);
				List<Sentence> sentenceList = new ArrayList<>();
				for (LinkedHashMap script : (List<LinkedHashMap>)element.get("scripts")) {
					Sentence sentence = Sentence.builder().content((String)script.get("content"))
						.startTime(((BigDecimal)script.get("start_time")).intValue())
						.endTime(((BigDecimal)script.get("end_time")).intValue())
						.video(video)
						.build();
					sentenceList.add(sentence);
				}
				sentenceRepository.saveAll(sentenceList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void initCategory() {
		try {
			LinkedHashMap json = JSONParseUtil.getLinkedHashMapFromJson("/data/category_data.json");
			for (Object key : json.keySet()) {
				VideoCategory videoCategory = VideoCategory.builder()
					.name((String)json.get(key))
					.no(Long.valueOf((String)key))
					.build();
				videoCategoryRepository.save(videoCategory);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	@Transactional
	public void initSentenceScore() {
		List<Sentence> sentenceList = sentenceRepository.findAll();
		for (Sentence sentence : sentenceList) {

			String content = sentence.getContent();
			double gf = CalcScoreUtil.getGunningFog(content);
			double fr = CalcScoreUtil.getFleschReadingEase(content);
			double fk = CalcScoreUtil.getFleshKincaidGradeLevel(content);

			gf = CalcScoreUtil.processScore(gf, "gf");
			fr = CalcScoreUtil.processScore(fr, "fr");
			fk = CalcScoreUtil.processScore(fk, "fk");

			int score = 0;
			if (16 <= content.length() && content.length() <= 350)
				score = CalcScoreUtil.getScore(gf, fr, fk);

			sentence.setScores(gf, fr, fk, score);
		}
	}

}
