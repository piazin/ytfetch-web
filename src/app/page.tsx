"use client";
import React from "react";

import Footer from "@/components/interface/Footer";
import Header from "@/components/interface/Header";
import { UrlSection } from "@/components/UrlSection";
import { Confetti } from "@/components/interface/Confetti";
import { HelpSection } from "@/components/interface/HelpSection";
import { VideoDetails } from "@/components/interface/VideoDetails";
import { IVideoDetails } from "@/types/VideoDetails";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [videoDetails, setVideoDetails] = React.useState<IVideoDetails>();

  return (
    <>
      {showConfetti && <Confetti />}
      <Header />
      <main className="min-h-[80vh] bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[666px] h-[666px] flex flex-col justify-center items-center">
          <UrlSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onShowConfetti={() => setShowConfetti(true)}
            onHandleGetVideoDetails={(videoDetails) => {
              setVideoDetails(videoDetails);
            }}
          />

          {videoDetails ? (
            <VideoDetails videoDetails={videoDetails} isLoading={isLoading} />
          ) : (
            <HelpSection />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
