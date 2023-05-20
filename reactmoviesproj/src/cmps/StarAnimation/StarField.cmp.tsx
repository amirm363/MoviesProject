import React, { useEffect, useState } from 'react';
import './StarField.css';

interface StarProps {
  delay: number;
  top: number;
  right: number;
}

const Star: React.FC<StarProps> = ({ delay, top, right }) => {
  return (
    <div
      className="shooting-star"
      style={{ animationDelay: `${delay}s`, top, right }}
    >
      <div className="star"></div>
    </div>
  );
};

const StarField: React.FC = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const starCount = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 or 2 stars
      const newStars: StarProps[] = [];

      for (let i = 0; i < starCount; i++) {
        const delay = Math.random() * 3; // Random delay for each star
        const top = (Math.random() * window.innerHeight - 50) - 100; // Random top position (subtracting 50 for star size)
        const right = -50; // Starting position outside the screen on the left side
        newStars.push({ delay, top, right });
      }

      setStars(newStars);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="star-field">
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </div>
  );
};

export default StarField;