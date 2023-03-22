import React, { useEffect, useState } from 'react';

interface LearnVideo {
  url: string;
  id: string;
}

const StillLearningPage = () => {
  const [video, setVideo] = useState<LearnVideo[]>([]);
  useEffect(() => {
    setVideo([
      {
        url: 'https://i.ytimg.com/vi/7tSP1M052Sg/hq1.jpg',
        id: '6Af6b_wyiwI',
      },
      {
        url: 'https://i.ytimg.com/vi/tB5J9qgM2zI/hq1.jpg',
        id: 'RLESBHduKBs',
      },
      {
        url: 'https://i.ytimg.com/vi/oITW0XsZd3o/hq1.jpg',
        id: 'wL8X31XWZW8',
      },
      {
        url: 'https://i.ytimg.com/vi/YY6LCOJbve8/hq1.jpg',
        id: 'BEBKC7Hqfr0',
      },
      {
        url: 'https://i.ytimg.com/vi/-k0p-DYYZKU/hq1.jpg',
        id: 'LDVyOnf0t9M',
      },
      {
        url: 'https://i.ytimg.com/vi/IStsehNAOL8/maxresdefault.jpg',
        id: 'JH_Pa1hOEVc',
      },
      {
        url: 'https://i.ytimg.com/vi/UGdLvGbpehQ/maxresdefault.jpg',
        id: '9XGm_uHit5g',
      },
    ]);
  });

  return <div>StillLearningPage</div>;
};

export default StillLearningPage;
