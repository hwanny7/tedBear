import { authApi } from './customAxios';

interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

export const getVideoRecomm = async () => {
  const { data } = await authApi<HomeRecomm[]>({
    method: 'get',
    url: '/video/recommend/list',
  });
  return data;
};
