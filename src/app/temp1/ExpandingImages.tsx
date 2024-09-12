import { ImageUp } from 'lucide-react';
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
    url: '/achievement.jpeg',
    title: 'Headstarter Event',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134504/cropped-image_exrm4u.webp',
    title: 'Headstarter Event',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134201/cropped-image_mgqde7.webp',
    title: 'Headstarter Event',
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134313/cropped-image_cidjfl.webp',
    title: 'Headstarter Event',
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134432/cropped-image_fw5o7y.webp',
    title: 'Headstarter Event',
  },
];

const ExpandingImages: React.FC<ExpandingImagesProps> = ({ onAchievementsDataChange }) => {
  const [cardsData, setCardsData] = useState<Array<Card>>(initialCardsData);
  const [activeId, setActiveId] = useState<number>(3);
  const [crop, setCrop] = useState<Crop & { aspect?: number }>({ unit: '%', width: 30, aspect: 16 / 9, x: 0, y: 0, height: 0 });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [showCropPopup, setShowCropPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the upload button
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
      setIsLoading(true); // Start loader
      try {
        const croppedImageBlob = await getCroppedImgBlob(imgRef.current, crop);
        if (croppedImageBlob && selectedCardId !== null) {
          const formData = new FormData();
          formData.append('file', croppedImageBlob, 'cropped-image.webp');
          formData.append('upload_preset', 'curate-ai-images');

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dhwd1xki6/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            const imageUrl = data.secure_url;

            const newCardsData = cardsData.map((card) =>
              card.id === selectedCardId ? { ...card, url: imageUrl } : card
            );
            setCardsData(newCardsData);
            setShowCropPopup(false);
            setSelectedFile(null);
            setSelectedCardId(null);

            onAchievementsDataChange(newCardsData);
          } else {
            const errorData = await response.json();
            console.error('Cloudinary upload failed:', errorData);
            alert(`Image upload failed: ${errorData.error?.message || 'Unknown error'}`);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image. Please try again.');
      } finally {
        setIsLoading(false); // Stop loader
      }
    }
    setIsVisible(false);
  };

  const handleCancel = () => {
    setShowCropPopup(false);
    setSelectedFile(null);
    setSelectedCardId(null);
  };

  const getCroppedImgBlob = (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
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
          resolve(blob);
        },
        'image/webp',
        1
      );
    });
  };

  // Handle title change
  const handleTitleChange = (id: number, newTitle: string) => {
    const updatedCards = cardsData.map((card) =>
      card.id === id ? { ...card, title: newTitle } : card
    );
    setCardsData(updatedCards);
    onAchievementsDataChange(updatedCards); 
  };

  return (
    <div className="bg-[#1b1b1b] border-2 p-2 border-neutral-800 rounded-xl overflow-hidden relative">
      <div className="flex">
        {cardsData.map((card) => (
          <div
         
            key={card.id}
            className={`panel ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Editable Title */}
            <h3
              className="achievementName outline outline-1 outline-slate-400 z-20"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTitleChange(card.id, e.currentTarget.textContent || '')} // Update title on blur
            >
              {card.title}
            </h3>
            <label className={`absolute group inset-0 flex justify-center items-center bg-black/50 rounded-lg cursor-pointer`}>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageSelect(e, card.id)}
                accept="image/*"
              />
               <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                   <ImageUp />
                </div>
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
              <button onClick={handleUpload} className="px-4 py-2 bg-[#e63e21] text-white rounded" disabled={isLoading}>
                {isLoading ? (
                  <div className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin"></div>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandingImages;
