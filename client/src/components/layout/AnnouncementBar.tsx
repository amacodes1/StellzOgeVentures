import React, { useState } from 'react';
import { XIcon, Volume2 } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-secondary-500 text-white p-4 relative overflow-hidden">
      <Volume2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10" />
      <div className="absolute left-10 right-10 top-1/2 transform -translate-y-1/2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <p className="text-sm inline-block">
            Free shipping on orders over $100! Use code: FREESHIP • Limited time offer! • Shop now and save big! • 
          </p>
        </div>
      </div>
      <button
      title='announcement'
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-80 p-1 z-10"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;