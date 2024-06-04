"use client";

import { ServiceTitle } from "@/lib/initialize";

const Heading = () => {

  return (
    <div className="max-w-3xl space-y-4 py-2">
      <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans unified.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
        <span className="font-bold">{ServiceTitle()}</span> is the connected workspace
        where
        <br />
        better and faster work happens.
      </h3>
      
    </div>
  );
};

export default Heading;
