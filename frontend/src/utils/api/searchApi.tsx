import { authApi } from './customAxios';

export interface SearchedVideo {
  score: number;
  thumbnailUrl: string;
  bookmarked: boolean;
  title: string;
  watchId: string;
}

interface VideoSet {
  videoInfoList: SearchedVideo[];
}

export const searchVideoData = async (query: string, page: number) => {
  const params = {
    query,
    size: 8,
    sort: 'publishedDate,desc',
    page,
  };
  const { data } = await authApi<VideoSet>({
    method: 'get',
    url: 'video/search',
    params: params,
  });

  return data.videoInfoList;
};

export const searchSenData = async (query: string) => {
  const params = {
    query,
  };
  const { data } = await authApi({
    method: 'get',
    url: 'sentence/search',
    params: params,
  });

  return data.sentenceList;
};

export const learningVideo = async (page: number) => {
  const params = {
    page,
    size: 8,
  };
  const { data } = await authApi<VideoSet>({
    method: 'get',
    url: 'video/watching/list',
    params: params,
  });

  return data.videoInfoList;
};
