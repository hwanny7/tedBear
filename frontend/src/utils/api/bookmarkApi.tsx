import { authApi } from './customAxios';

// 영상 북마크
interface IBookmarkVideo {
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
export const getVideoBookmark = async () => {
  const { data } = await authApi<IBookmarkVideo>({
    method: 'get',
    url: '/video/bookmark/list',
  });
  return data.videoInfoList;
};

// 문장 북마크
interface IBookmarkSentence {
  sentenceList: [
    {
      no: number;
      content: string;
      translation: string;
      bookMarked: boolean;
      score: number;
      watchId: string;
      startTime: number;
      endTime: number;
    },
  ];
}
export const getSentenceBookmark = async () => {
  const { data } = await authApi<IBookmarkSentence>({
    method: 'get',
    url: '/sentence/bookmark/list',
  });
  return data.sentenceList;
};

// 단어 북마크
// interface IBookmarkWord {
//   videoInfoList: [
//     {
//       thumbnailUrl: string;
//       title: string;
//       watchId: string;
//       score: number;
//       bookMarked: boolean;
//     },
//   ];
// }
// export const getWordBookmark = async () => {
//   const { data } = await authApi<IBookmarkWord>({
//     method: 'get',
//     url: '/word/bookmark/list',
//   });
//   return data.wordInfoList;
// };
