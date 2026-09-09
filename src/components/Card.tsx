import { Link } from 'react-router-dom';

export default function Card({
  image,
  title,
  subtitle,
  to,
}: {
  image?: string;
  title: string;
  subtitle: string;
  to: string;
}) {
  // ...rest unchanged {
  return (
    <Link to={to} className="card">
      <img src={image} alt={title} />
      <p className="card-title">{title}</p>
      <p className="card-subtitle">{subtitle}</p>
    </Link>
  );
}
