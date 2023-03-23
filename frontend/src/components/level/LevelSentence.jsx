import LevelCard from 'components/level/LevelCard';
import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

// Function
const LevelSentence = () => {
  const [Loaded, setLoaded] = useState(false); // 데이터 GET
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    console.log('useEffectSentence');
    async function fetchData() {
      await authApi
        .get(`member/test/problem`)
        .then(response => {
          const data = response.data.sentenceMeanList.map((item, index) => {
            return { ...item, flipped: false, id: index };
          });
          console.log(data);
          setCardList(data);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    setLoaded(true);
    fetchData();
  }, []);

  const handleClick = index => {
    let updateCards = cardList.map(card => {
      if (card.id === index) {
        card.flipped = !card.flipped;
      }
      return card;
    });
    setCardList(updateCards);
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: 100,
          margin: '75px 30px 30px 30px',
        }}
      >
        문장
        <div className="game-board">
          {cardList.map((card, index) => (
            <LevelCard
              key={index}
              id={index}
              content={card.content}
              mean={card.mean}
              score={card.score}
              flipped={card.flipped}
              clicked={handleClick}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default LevelSentence;
