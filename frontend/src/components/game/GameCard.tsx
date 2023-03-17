interface CardType {
  id?: number;
  name?: string;
  flipped?: boolean;
  clicked?: any;
  mean: string;
}

const GameCard = ({ id, name, flipped, clicked, mean }: CardType) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={'card' + (flipped ? ' flipped' : '')}
    >
      <div className="back">{name}</div>
      <div className="front">{mean}</div>
    </div>
  );
};

export default GameCard;
