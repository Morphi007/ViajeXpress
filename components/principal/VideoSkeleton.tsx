import React from 'react';

export function VideoSkeleton() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
      <p>Loading video...</p>
    </div>
  );
}
