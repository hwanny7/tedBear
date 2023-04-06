import { authApi } from './customAxios';

export interface VideoDesc {
  no: number;
  title: string;
  videoUrl: string;
  scoreInfo: {
    score: number;
    totalSentenceCount: number;
    sentenceScoreInfo: number[];
  };
  sentenceInfoList: [
    {
      no: number;
      content: string;
      translation: string;
      startTime: number;
    },
  ];
  lastWatchingTime: number;
  bookMarked: boolean;
}

export interface SentenceBookmark {
  bookmarked: boolean;
}

export interface SearchedWord {
  wordInfo: {
    wordNo: number;
    bookMarked: boolean;
    content: string;
    mean: string;
    sentenceCount: number;
  };
  sentenceContentList: string[];
}

// 비디오 상세 정보
export const getVideoDesc = async (id: string) => {
  const { data } = await authApi<VideoDesc>({
    method: 'get',
    url: `/video/detail/${id}`,
  });

  return data;
};

// 비디오 북마크 저장
export const postVideoBookmark = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/video/bookmark`,
    data: data,
  });
};

// 비디오 북마크 삭제
export const deleteVideoBookmark = async (data: object) => {
  await authApi({
    method: 'delete',
    url: `/video/bookmark`,
    data: data,
  });
};

// 문장 북마크 여부 가져오기
export const getSentenceBookmarkState = async (id: number) => {
  const { data } = await authApi<SentenceBookmark>({
    method: 'get',
    url: `/sentence/bookmark/${id}`,
  });
  return data;
};

// 문장 북마크 저장
export const postSentenceBookmark = async (data: object) => {
  const reponse = await authApi({
    method: 'post',
    url: `/sentence/bookmark`,
    data: data,
  });
  console.log(reponse);
};

// 문장 북마크 삭제
export const deleteSentenceBookmark = async (data: object) => {
  const reponse = await authApi({
    method: 'delete',
    url: `/sentence/bookmark`,
    data: data,
  });
  console.log(reponse);
};

// 시청 시간 기록
export const postCurrentVideo = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/video/watching`,
    data: data,
  });
};

// 학습 완료
export const postCompletedVideo = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/video/complete`,
    data: data,
  });
};

// 단어 검색 API
export const getSearchWord = async (
  word: string,
  page: number,
  size: number,
) => {
  const { data } = await authApi<SearchedWord>({
    method: 'get',
    url: `/word/search?query=${word}&size=${size}&page=${page}`,
  });

  return data;
};

// 단어 북마크 등록
export const postWordBookmark = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/word/bookmark`,
    data: data,
  });
};

// 단어 북마크 해제
export const deleteWordBookmark = async (data: object) => {
  await authApi({
    method: 'delete',
    url: `/word/bookmark`,
    data: data,
  });
};

// 난이도 평가
export const feelDifficulty = async (data: object) => {
  await authApi({
    method: 'put',
    url: `/member/feel`,
    data: data,
  });
};

// 스피킹 결과
export const speakResult = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/sentence/speaking`,
    data: data,
  });
};
