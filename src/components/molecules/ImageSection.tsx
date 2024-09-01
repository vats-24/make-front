import React from 'react';

interface ImageSectionProps {
  src: string
}

const ImageSection: React.FC<ImageSectionProps> = ({src}) => {
  return (
    <div className="flex md:w-1/2 justify-center items-center">
      <div className="md:block hidden">
        <img src={src} alt="lets" className="md:block hidden" />
      </div>
    </div>
  );
};

export default ImageSection;
