import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

interface Props {
  data: any;
}

// const SlickArrowLeft = ({ currentSlide:, slideCount, ...props }: SlickProps) => {
//   return <button {...props}>왼쪽</button>;
// };

// const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
//   return <button {...props}>오른쪽</button>;
// };

const Carousel = ({ data }: Props) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEventHandler<HTMLDivElement>): void => {
    navigate('/learning', { state: e });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // prevArrow: <SlickArrowLeft />,
    // nextArrow: <SlickArrowRight />,
  };
  return (
    <div
      className="card__container"
      style={{ width: '70vw', height: '50vh', marginTop: '2%' }}
    >
      <Slider {...settings} className="card__container--inner">
        {data.map((item: any, index: any) => {
          return (
            <div
              className="card__container--inner--card"
              key={index}
              onClick={() => handleClick(item.id)}
            >
              <img
                src={item.url}
                alt="hero_img"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
