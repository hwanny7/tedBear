import { authApi } from './customAxios';

export interface VideoDesc {
  title: string;
  videoUrl: string;
  score: number;
  sentenceInfoList: [
    {
      content: string;
      translation: string;
      startTime: number;
    },
  ];
  bookMarked: boolean;
}

export const getVideoDesc = async (id: string) => {
  const { data } = await authApi<VideoDesc>({
    method: 'get',
    url: `/video/detail/${id}`,
  });

  return data;
};
