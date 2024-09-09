"use client"; // This makes the component a Client Component

import React from 'react';

interface Card {
  id: number;
  url: string;
  title: string;
};

interface Props {
  data: Array<Card>;
};

const ExpandingCards = ({ data }: Props) => {
  const [activeId, setActiveId] = React.useState<number>(3);

  const onClick = (id: number) => setActiveId(id);

  return (
    <div className="flex">
      {
        data.map(card => (
          <div
            key={card.id}
            className={`panel ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})` }}>
            <h3>{card.title}</h3>
          </div>
        ))
      }
    </div>
  );
}

export default ExpandingCards;
