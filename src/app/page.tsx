"use client";
import React from "react";
import Image from "next/image";

import Footer from "@/components/interface/Footer";
import Header from "@/components/interface/Header";
import { UrlSection } from "@/components/UrlSection";
import { Confetti } from "@/components/interface/Confetti";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [videoDetails, setVideoDetails] = React.useState<any>();
  const [showConfetti, setShowConfetti] = React.useState(false);

  return (
    <>
      {showConfetti && <Confetti />}
      <Header />
      <main className="min-h-screen bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <UrlSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onShowConfetti={() => setShowConfetti(true)}
            onHandleGetVideoDetails={(videoDetails) => {
              setVideoDetails(videoDetails);
            }}
          />

          {videoDetails ? (
            <section className=" text-gray-50 my-12">
              <Image
                src={videoDetails.thumbnail.thumbnails[3].url}
                alt={videoDetails.title}
                width={336}
                height={188}
                className="rounded-md"
              />
              <p className="mt-3 max-w-[560px]">{videoDetails.title}</p>
            </section>
          ) : (
            <section className=" text-gray-50 my-12">
              <p>Como posso baixar um vídeo do youtube?</p>
              <ol className="list-decimal list-inside ml-3 mt-3">
                <li>Cole o link do vídeo</li>
                <li>Clique no botão Baixar.</li>
                <li>Selecione o formato de vídeo desejado.</li>
                <li>Clique no botão Download.</li>
              </ol>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
