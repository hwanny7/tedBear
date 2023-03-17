import { useLocation } from 'react-router-dom';

const LearningPage = () => {
  const { state } = useLocation();
  const scripts = [
    "So I'd like to ask you all a question that I've pondered for these past few years.",
    'Why is it that for-profit organizations and nonprofits, or those that work in the development space, are quite different with the type of impact that they have?',
    'In the development space, where I spend the bulk of my time these days, the culture appears quite different.',
    "We don't seem to operate with the same sense of urgency.",
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20vh',
      }}
    >
      <div>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${state}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div
          style={{
            height: '100',
            width: '853',
            backgroundColor: '#FFF6EC',
            boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
            border: '1px solid green',
          }}
        >
          In the development space, where I spend the bulk of my time these
          days, the culture appears quite different.
        </div>
      </div>
      <div
        style={{
          width: '400px',
          height: '507px',
          backgroundColor: '#FFF6EC',
          boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
          border: '1px solid green',
        }}
      >
        {scripts.map((sentence, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              marginTop: '30px',
              marginLeft: '20px',
              marginRight: '20px',
              backgroundColor: index === 0 ? '#FED1A1' : 'none',
            }}
          >
            {sentence}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
