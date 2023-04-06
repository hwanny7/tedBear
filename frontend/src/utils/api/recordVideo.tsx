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

export const getLearningVideo = async () => {
  const { data } = await authApi<LearningSet>({
    method: 'get',
    url: '/video/watching/list',
  });

  console.log(data);
};
