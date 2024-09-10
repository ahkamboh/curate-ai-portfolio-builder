import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Card {
  id: number;
  url: string;
  title: string;
}

interface ExpandingImagesProps {
  onAchievementsDataChange: (achievements: Array<Card>) => void;
}

const initialCardsData = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: 'Explore The World',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: 'Wild Forest',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
    title: 'Sunny Beach',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    title: 'City on Winter',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: 'Mountains - Clouds',
  },
];

// Function to convert a Blob URL to base64 string
const blobToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // This is the base64 string
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ExpandingImages: React.FC<ExpandingImagesProps> = ({ onAchievementsDataChange }) => {
  const [cardsData, setCardsData] = useState<Array<Card>>(initialCardsData);
  const [activeId, setActiveId] = useState<number>(3);
  const [crop, setCrop] = useState<Crop & { aspect?: number }>({ unit: '%', width: 30, aspect: 16 / 9, x: 0, y: 0, height: 0 });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [showCropPopup, setShowCropPopup] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDoubleClick = () => {
    setIsVisible(!isVisible);
  };

  const onClick = (id: number) => setActiveId(id);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, cardId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        setSelectedCardId(cardId);
        setCrop({ unit: '%', width: 30, aspect: 16 / 9, x: 0, y: 0, height: 0 });
        setShowCropPopup(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    if (selectedCardId === null) {
      setSelectedFile(null);
    }
  }, [selectedCardId]);

  const handleCropComplete = useCallback((crop: Crop) => {
    setCrop(crop);
  }, []);

  const handleUpload = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
      if (croppedImageUrl && selectedCardId !== null) {
        // Convert the cropped image blob URL to base64
        const base64Image = await blobToBase64(croppedImageUrl);

        // Pass the base64 string to the parent or upload it directly to the backend
        // For demonstration, we are updating the card data with base64 string (you can upload it to Cloudinary)
        const newCardsData = cardsData.map((card) =>
          card.id === selectedCardId ? { ...card, url: base64Image } : card
        );
        setCardsData(newCardsData);
        setShowCropPopup(false);
        setSelectedFile(null);
        setSelectedCardId(null);

        // Pass achievements (cardsData) to parent component
        onAchievementsDataChange(newCardsData);
      }
    }
    setIsVisible(!isVisible);
  };

  const handleCancel = () => {
    setShowCropPopup(false);
    setSelectedFile(null);
    setSelectedCardId(null);
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(URL.createObjectURL(blob));
        },
        'image/png',
        1
      );
    });
  };

  return (
    <div className="bg-[#1b1b1b] border-2 p-2 border-neutral-800 rounded-xl overflow-hidden relative">
      <div className="flex">
        {cardsData.map((card) => (
          <div
            onDoubleClick={handleDoubleClick}
            key={card.id}
            className={`panel ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h3 contentEditable className="achievementName">{card.title}</h3>
            <label className={`absolute ${isVisible ? "block" : "hidden"} inset-0 flex justify-center items-center bg-black/50 rounded-lg cursor-pointer`}>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageSelect(e, card.id)}
                accept="image/*"
              />
            </label>
          </div>
        ))}
      </div>
      {showCropPopup && selectedFile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-[#1b1b1b] border-2 border-neutral-800 p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleCropComplete}
              aspect={16 / 9}
            >
              <img
                ref={imgRef}
                src={selectedFile}
                alt="Crop me"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            </ReactCrop>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
              <button onClick={handleUpload} className="px-4 py-2 bg-[#e63e21] text-white rounded">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandingImages;
