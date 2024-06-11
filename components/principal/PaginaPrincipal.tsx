import React from 'react';
import { Video } from './Video';

export const PaginaPrincipal = () => {
  return (
    <div className="h-screen w-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center">
      <Video />
    </div>
  );
}
