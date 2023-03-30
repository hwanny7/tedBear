import { authApi } from './customAxios';

// export interface HomeRecomm {
//   thumbnailUrl: string;
//   title: string;
//   watchId: string;
//   score: number;
//   bookMarked: boolean;
//   no: number;
// }

// interface HomeRecommList {
//   videoInfoList: HomeRecomm[];
// }

export const getCrossWord = async () => {
  const { data } = await authApi({
    method: 'get',
    url: '/game/crossword/easy',
  });
  return data;
};
