"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importing useParams to get the ID from the route

interface Card {
  id: number;
  url: string;
  title: string;
}

const ExpandingImages: React.FC = () => {
  const [cardsData, setCardsData] = useState<Card[]>([]); // Initialize as an empty array
  const [activeId, setActiveId] = useState<number>(3); // Default active image
  const { id } = useParams(); // Get the profile ID from the route

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await fetch(`/api/portfolio/read/${id}`); // Replace with your API endpoint
        const data = await response.json();
        setCardsData(data.profile.achievements || []); // Assuming achievements is the array you're fetching
      } catch (error) {
        console.error("Error fetching achievements data:", error);
      }
    };

    if (id) {
      fetchCardsData();
    }
  }, [id]);

  if (cardsData.length === 0) {
    return <div>Loading Images...</div>; 
  }

  const onClick = (id: number) => setActiveId(id);

  return (
    <div className="bg-[#1b1b1b] border-2 p-2 border-neutral-800 rounded-xl overflow-hidden">
      <div className="flex">
        {cardsData.map((card) => (
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
