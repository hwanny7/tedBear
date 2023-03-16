package com.ssafy.tedbear.global.util;

import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.core.io.ClassPathResource;

public class JSONParseUtil {
	public static JSONParser getJSONParser(String path) throws Exception {
		ClassPathResource resource = new ClassPathResource(path);
		JSONParser jsonParser = new JSONParser(new InputStreamReader(resource.getInputStream()));
		return jsonParser;
	}

	public static LinkedHashMap getLinkedHashMapFromJson(String path) throws Exception {
		LinkedHashMap jsonMap = (LinkedHashMap)getJSONParser(path).parse();
		return jsonMap;
	}

	public static List<LinkedHashMap> getListFromJson(String path) throws Exception {
		List<LinkedHashMap> jsonList = (List<LinkedHashMap>)getJSONParser(path).parse();
		return jsonList;
	}
}

