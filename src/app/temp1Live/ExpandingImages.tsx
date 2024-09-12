"use client"; // This makes the component a Client Component

import React, { useState } from "react";

interface Card {
  id: number;
  url: string;
  title: string;
}

interface ExpandingImagesProps {
  achievementsData: Card[]; // Receive achievements data as props
}

const ExpandingImages: React.FC<ExpandingImagesProps> = ({ achievementsData }) => {
  const [activeId, setActiveId] = useState<number>(3); // Default active image

  if (achievementsData.length === 0) {
    return <div>No Achievements Available</div>; 
  }

  const onClick = (id: number) => setActiveId(id);

  return (
    <div className="bg-[#1b1b1b] border-2 p-2 border-neutral-800 rounded-xl overflow-hidden">
      <div className="flex">
        {achievementsData.map((card) => (
          <div
            key={card.id}
            className={`panel ${activeId === card.id ? "active" : ""}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandingImages;
