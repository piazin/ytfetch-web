import config from "@/config";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

import { VideoDetailsSkeleton } from "./Skeleton";
import { IVideoDetails } from "@/types/VideoDetails";
import { Button } from "@/components/interface/Button";
import { SelectFormat } from "@/components/interface/SelectFormat";

import { transformURLInEmbed } from "@/utils/transformURLInEmbed";
import { getVideoDuration } from "@/utils/convertMillisecondsInMinutes";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface VideoDetailsProps {
  videoDetails: IVideoDetails;
  isLoading: boolean;
  onShowConfetti: (state: boolean) => void;
}

export const VideoDetails = ({
  isLoading,
  videoDetails,
  onShowConfetti,
}: VideoDetailsProps) => {
  const { toast } = useToast();

  const [jobId, setJobId] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressDowload, setProgressDowload] = useState<number>(0);
  const [downloadedInMB, setDownloadedInMB] = useState<string>("0MB");

  const resetAllStates = () => {
    setJobId("");
    setIsProcessing(false);
    setDownloadedInMB("0MB");
    setProgressDowload(0);
    setEstimatedTime(0);
  };

  const handleProcessDownloadVideo = async () => {
    if (format === "") return;

    onShowConfetti(false);
    setIsProcessing(true);
    const [qualityLabel, type] = format.split("-");

    const body = {
      youtubeVideoUrl: videoDetails.video_url,
      qualityLabel,
      type,
    };

    const response = await fetch(`${config.API_BASE_URL}/video`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 201) {
      setJobId(data.jobId);
    } else {
      showToastError();
    }
  };

  const handleDownloadVideo = async (videoId: string) => {
    try {
      if (videoId === "") {
        await handleProcessDownloadVideo();
        return;
      }

      const response = await fetch(
        `${config.API_BASE_URL}/video/${videoId}/download`
      );

      const reader = response.body?.getReader();
      const chunks = [];

      for await (const chunk of await readChunks(reader)) {
        chunks.push(chunk);
      }

      const videoBlob = new Blob(chunks, { type: "video/mp4" });
      createLinkDownload(videoBlob);
      resetAllStates();
      emitEventToDeleteVideo(videoId);
      setIsProcessing(false);
      onShowConfetti(true);
      toast({
        title: "Seu download foi concluido com sucesso",
        description: "Obrigado por usar o YTFetch",
        className: "bg-purple-700 text-white",
      });
    } catch (error) {
      showToastError();
    }
  };

  const readChunks = async (
    reader: ReadableStreamDefaultReader<Uint8Array> | undefined
  ) => {
    return {
      async *[Symbol.asyncIterator]() {
        let readResult = await reader!.read();
        while (!readResult.done) {
          yield readResult.value;
          readResult = await reader!.read();
        }
      },
    };
  };

  const createLinkDownload = (videoBlob: Blob) => {
    const videoUrl = URL.createObjectURL(videoBlob);

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = videoDetails.title.includes(".mp4")
      ? videoDetails.title
      : `${videoDetails.title}.mp4`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(videoUrl);
  };

  const emitEventToDeleteVideo = (videoId: string) => {
    socket.emit("delete_video", { videoId });
  };

  const showToastError = () => {
    toast({
      title: "Ah, ah! Algo deu errado",
      description: "Ocorreu um erro ao baixar o video",
      action: (
        <ToastAction altText="Tente novamente">Tente novamente</ToastAction>
      ),
    });
  };

  useEffect(() => {
    function onConnect() {
      console.info("connected");
    }

    function onDisconnect() {
      console.info("disconnected");
    }

    function onProgress(value: any) {
      if (value.jobId != jobId) return;

      setProgressDowload((prev) =>
        prev === value.percentage ? prev : value.percentage
      );
      setDownloadedInMB(value.downloadedMb);
      setEstimatedTime((prev) =>
        prev === value.estimatedDownloadTime
          ? prev
          : value.estimatedDownloadTime
      );
    }

    async function onCompleted(value: any) {
      if (value.jobId != jobId) return;

      setProgressDowload(0);
      setDownloadedInMB("0MB");
      await handleDownloadVideo(value.videoId);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("video_download_progress", onProgress);
    socket.on("finished_video_download", onCompleted);

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
            <Button.Content
              className="w-full dark:text-white"
              onClick={handleProcessDownloadVideo}
              disabled={isProcessing}
            >
              Baixar video
            </Button.Content>
          </Button.Root>

          {isProcessing && (
            <>
              <div className="w-full flex gap-4 items-center">
                <span>{downloadedInMB}</span>
                <Progress value={progressDowload} className="w-full " />
              </div>
              <span>tempo estimado {estimatedTime.toFixed(2)} m/s</span>
            </>
          )}
        </div>
      )}
    </section>
  );
};
