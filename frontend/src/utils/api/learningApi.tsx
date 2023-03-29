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
  console.log('문장 북마크 : ', data);
  return data;
};

// 문장 북마크 저장
export const postSentenceBookmark = async (data: object) => {
  await authApi({
    method: 'post',
    url: `/sentence/bookmark`,
    data: data,
  });
};

// 문장 북마크 삭제
export const deleteSentenceBookmark = async (data: object) => {
  await authApi({
    method: 'delete',
    url: `/sentence/bookmark`,
    data: data,
  });
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
  console.log(data);
  await authApi({
    method: 'post',
    url: `/video/complete`,
    data: data,
  });
};
