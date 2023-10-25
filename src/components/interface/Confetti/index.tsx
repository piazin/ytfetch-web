"use client";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { IConfettiOptions } from "react-confetti/dist/types/Confetti";

export const Confetti = ({
  width = 0,
  height = 0,
  recycle = false,
  numberOfPieces = 500,
  tweenDuration = 15000,
  gravity = 0.15,
  ...props
}: Partial<IConfettiOptions>) => {
  const [confettiWidth, setConfettiWidth] = useState(width);
  const [confettiHeight, setConfettiHeight] = useState(height);

  useEffect(() => {
    function handleResize() {
      setConfettiWidth(document.body.clientWidth);
      setConfettiHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ReactConfetti
      width={confettiWidth}
      height={confettiHeight}
      numberOfPieces={numberOfPieces}
      recycle={recycle}
      gravity={gravity}
      tweenDuration={tweenDuration}
      {...props}
    />
  );
};
