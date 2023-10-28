"use client";
import React from "react";

import { IVideoDetails } from "@/types/VideoDetails";

import Header from "@/components/interface/Header";
import Footer from "@/components/interface/Footer";
import { Confetti } from "@/components/interface/Confetti";
import { UrlSection } from "@/components/interface/UrlSection";
import { HelpSection } from "@/components/interface/HelpSection";
import { VideoDetails } from "@/components/interface/VideoDetails";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [videoDetails, setVideoDetails] = React.useState<IVideoDetails>();

  return (
    <div className="dark:bg-zinc-900 min-h-screen text-black">
      {showConfetti && <Confetti />}
      <Header />
      <main className="min-h-[80vh] dark:bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[666px] h-[666px] flex flex-col justify-center items-center">
          <UrlSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onHandleGetVideoDetails={(videoDetails) => {
              setVideoDetails(videoDetails);
            }}
          />

          {videoDetails ? (
            <VideoDetails
              videoDetails={videoDetails}
              isLoading={isLoading}
              onShowConfetti={(state) => setShowConfetti(state)}
            />
          ) : (
            <HelpSection />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
