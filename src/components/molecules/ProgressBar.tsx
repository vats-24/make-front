import React from 'react';

interface ProgressBarProps {
  step: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex justify-between items-center w-full gap-2">
      <div className={`w-full h-2 rounded ${step >= 0 ? 'bg-purple-600 ease-in' : 'bg-gray-200'}`}/>
      <div className={`w-full h-2 rounded ${step >= 1 ? 'bg-purple-600 ease-in' : 'bg-gray-200'}`}/>
      <div className={`w-full h-2 rounded ${step >= 2 ? 'bg-purple-600 ease-in' : 'bg-gray-200'}`}/>
    </div>
  );
};

export default ProgressBar;
