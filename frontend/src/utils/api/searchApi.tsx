import { authApi } from './customAxios';

export interface LearningVideo {
  score: number;
  thumbnailUrl: number;
  bookmarked: boolean;
  title: string;
  watchId: string;
}

interface LearningSet {
  videoInfoList: LearningVideo[];
}

// http://localhost:8080/video/search?query=and&size=10&sort=publishedDate,desc&page=0

export const searchVideoData = async () => {
  const params = {
    query: 'motivation',
    size: 8,
    sort: 'publishedDate,desc',
    page: 0,
  };
  const { data } = await authApi({
    method: 'get',
    url: 'video/search',
    params: params,
  });

  return data.videoInfoList;
};

export const searchSenData = async () => {
  const params = {
    query: 'happy',
  };
  const { data } = await authApi({
    method: 'get',
    url: 'sentence/search',
    params: params,
  });

  return data.sentenceList;
};
