import { authApi } from './customAxios';

interface HomeRecomm {
  videoInfoList: [
    {
      thumbnailUrl: string;
      title: string;
      watchId: string;
      score: number;
      bookMarked: boolean;
    },
  ];
}

export interface Shorts {
  no: number;
  startTime: number;
  endTime: number;
  content: string;
  bookmarked: boolean;
  watchId: string;
  score: number;
}

interface ShortsRecomm {
  sentenceList: Shorts[];
}

export const getVideoRecomm = async (difficulty: string) => {
  const { data } = await authApi<HomeRecomm>({
    method: 'get',
    url: `/video/recommend/list/${difficulty}`,
  });
  return data.videoInfoList;
};

export const getShortsRecomm = async (difficulty: string) => {
  const { data } = await authApi<ShortsRecomm>({
    method: 'get',
    url: `/sentence/recommend/list/${difficulty}`,
  });
  return data.sentenceList;
};
