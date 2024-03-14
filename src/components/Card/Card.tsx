import "./Card.scss";

type CardProps = {
  children: React.ReactNode;
  cardClass: string;
};
//children: JSX.Element | JSX.Element[];
const Card = ({ children, cardClass }: CardProps) => {
  return <div className={`card ${cardClass}`}>{children}</div>;
};

export default Card;
