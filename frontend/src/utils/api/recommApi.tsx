import { authApi } from './customAxios';

export interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
  no: number;
}

interface HomeRecommList {
  videoInfoList: HomeRecomm[];
}

export interface Shorts {
  no?: number;
  startTime: number;
  endTime: number;
  content?: string;
  bookmarked?: boolean;
  watchId: string;
  score?: number;
}

interface ShortsRecomm {
  sentenceList: Shorts[];
}

export const getVideoRecomm = async (difficulty: string) => {
  const { data } = await authApi<HomeRecommList>({
    method: 'get',
    url: `/video/recommend/list/${difficulty}`,
  });
  console.log(data);
  return data.videoInfoList;
};

export const getShortsRecomm = async (difficulty: string) => {
  const { data } = await authApi<ShortsRecomm>({
    method: 'get',
    url: `/sentence/recommend/list/${difficulty}`,
  });
  return data.sentenceList;
};
