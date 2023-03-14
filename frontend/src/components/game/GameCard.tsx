interface CardType {
  id?: number;
  name?: string;
  flipped?: boolean;
  clicked?: any;
}

const GameCard = ({ id, name, flipped, clicked }: CardType) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={'card' + (flipped ? ' flipped' : '')}
    >
      <div className="back">?</div>
      <div className="front">
        <img alt={name} src={'images/' + name + '.png'} />
      </div>
    </div>
  );
};

export default GameCard;
