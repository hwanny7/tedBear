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
}

interface ShortsRecomm {
  sentenceList: Shorts[];
}

export const getVideoRecomm = async () => {
  const { data } = await authApi<HomeRecomm>({
    method: 'get',
    url: '/video/recommend/list',
  });

  return data.videoInfoList;
};

export const getShortsRecomm = async () => {
  const { data } = await authApi<ShortsRecomm>({
    method: 'get',
    url: '/sentence/recommend/list',
  });

  return data.sentenceList;
};
