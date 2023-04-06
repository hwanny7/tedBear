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

export const getCrossWord = async (size: number) => {
  let endPoint;
  if (size === 8) {
    endPoint = 'easy';
  } else if (size === 12) {
    endPoint = 'normal';
  } else if (size === 16) {
    endPoint = 'hard';
  }
  const { data } = await authApi({
    method: 'get',
    url: `/game/crossword/${endPoint}`,
  });
  return data;
};
