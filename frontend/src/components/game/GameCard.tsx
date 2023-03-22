interface CardType {
  id?: number;
  content?: string;
  score?: number;
  flipped?: boolean;
  clicked?: any;
  mean: string;
}

const GameCard = ({ id, content, flipped, clicked, mean }: CardType) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={'card' + (flipped ? ' flipped' : '')}
    >
      <div className="back">{content}</div>
      <div className="front">{mean}</div>
    </div>
  );
};

export default GameCard;
