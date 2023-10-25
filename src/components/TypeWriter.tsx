"use client";
import React from "react";
import TypewriterComponent from "typewriter-effect";

const TypeWriter = ({ text }: { text: string }) => {
  return (
    <TypewriterComponent
      options={{
        delay: 100,
      }}
      onInit={(typewriter) => {
        typewriter.typeString(text).start();
      }}
    />
  );
};

export default TypeWriter;
