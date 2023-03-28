import React, { useEffect } from 'react';
import { useCookies, Cookies } from 'react-cookie';

const picture = [
  {
    title:
      'How to Calm Your Anxiety, From a Neuroscientist | The Way We Work, a TED series',
    id: '6Af6b_wyiwI',
  },
  {
    title: 'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
    id: 'RLESBHduKBs',
  },
  {
    title: 'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
    id: 'wL8X31XWZW8',
  },
  {
    title:
      'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
    id: 'BEBKC7Hqfr0',
  },
  {
    title:
      'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
    id: 'LDVyOnf0t9M',
  },
  {
    title:
      'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
    id: 'JH_Pa1hOEVc',
  },
  {
    title:
      'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
    id: '9XGm_uHit5g',
  },
];

const SeungPage = () => {
  const [cookies, setCookie] = useCookies(['access-token']);

  useEffect(() => {
    console.log(document.cookie);
    console.log(cookies);
  }, []);

  return (
    <div
      style={{
        background: 'red',
        width: '50vw',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'black',
          width: '50%',
          height: '50%',
          marginTop: '5%',
          marginBottom: '5%',
          border: '1px solid white',
        }}
      ></div>
      <div
        style={{
          background: 'black',
          width: '50%',
          height: '50%',
          border: '1px solid white',
          marginBottom: '5%',
        }}
      ></div>
    </div>
  );
};

export default SeungPage;

{
  /* <img
style={{ width: '250px', height: '200px' }}
src={
  'https://i.ytimg.com/vi/' + pic.id + '/maxresdefault.jpg'
}
></img> */
}
