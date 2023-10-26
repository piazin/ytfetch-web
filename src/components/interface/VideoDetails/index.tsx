import { useEffect, useState } from "react";
import { VideoDetailsSkeleton } from "./Skeleton";
import { IVideoDetails } from "@/types/VideoDetails";
import { Button } from "@/components/interface/Button";
import { SelectFormat } from "@/components/interface/SelectFormat";

import { transformURLInEmbed } from "@/utils/transformURLInEmbed";
import { getVideoDuration } from "@/utils/convertMillisecondsInMinutes";

import { io } from "socket.io-client";
import { Progress } from "@/components/ui/progress";
interface VideoDetailsProps {
  videoDetails: IVideoDetails;
  isLoading: boolean;
}

export const VideoDetails = ({
  isLoading,
  videoDetails,
}: VideoDetailsProps) => {
  const [format, setFormat] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [progressDowload, setProgressDowload] = useState<number>(0);

  const handleDownloadVideo = async () => {
    setJobId("");
    setProgressDowload(0);
    const [qualityLabel, type] = format.split("-");

    const body = {
      youtubeVideoUrl: videoDetails.video_url,
      qualityLabel,
      type,
    };

    const response = await fetch("http://localhost:3000/api/v1/video", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 201) {
      setJobId(data.jobId);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
      setTimeout(() => {
        socket.connect();
      }, 3000);
    }

    function onProgress(value: any) {
      if (value.jobId != jobId) return;

      setProgressDowload((prev) =>
        prev === value.percentage ? prev : value.percentage
      );
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("video_download_progress", onProgress);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onProgress);
    };
  }, [jobId]);

  return (
    <section className=" text-gray-50 my-12 flex items-center w-full">
      {isLoading ? (
        <VideoDetailsSkeleton />
      ) : (
        <div className="flex items-center flex-col  gap-6 w-full">
          <div className="flex justify-center items-center gap-8">
            <iframe
              src={transformURLInEmbed(videoDetails.video_url)}
              width={336}
              height={188}
              className="rounded-md"
            ></iframe>
            <p className="mt-3 max-w-[366px]">
              {videoDetails.title} -{" "}
              {getVideoDuration(videoDetails.formats[0]?.approxDurationMs)}{" "}
            </p>
          </div>
          <SelectFormat
            formats={videoDetails.formats}
            onValueChange={(value) => setFormat(value)}
            value={format}
          />
          <Button.Root>
            <Button.Content className="w-full" onClick={handleDownloadVideo}>
              Baixar video
            </Button.Content>
          </Button.Root>

          <Progress value={progressDowload} className="w-full " />
          {connected ? "Conectado" : "Deconectado"}
        </div>
      )}
    </section>
  );
};
