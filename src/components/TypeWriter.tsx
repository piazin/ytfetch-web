"use client";
import React from "react";
import TypewriterComponent from "typewriter-effect";

const TypeWriter = () => {
  return (
    <TypewriterComponent
      onInit={(typewriter) => {
        typewriter
          .typeString(
            "<h1 className='text-3xl'><span className='text-purple-700 font-bold'>YT</span> Fetch</h1>"
          )
          .start();
      }}
    />
  );
};

export default TypeWriter;
