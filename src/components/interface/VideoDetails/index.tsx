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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [convertToMp3, setConvertToMp3] = useState<boolean>(false);
  const [progressDowload, setProgressDowload] = useState<number>(0);
  const [downloadedInMB, setDownloadedInMB] = useState<string>("0MB");

  const resetAllStates = () => {
    setJobId("");
    setIsProcessing(false);
    setDownloadedInMB("0MB");
    setProgressDowload(0);
    setEstimatedTime(0);
  };

  const handleCheckedChange = (checked: boolean) => {
    setFormat(checked ? "1080p-mp3" : "");
    setConvertToMp3(checked);
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

      const [_, extension] = videoId.split(".");
      const mimeType = extension === "mp4" ? "video/mp4" : "audio/mp3";

      const response = await fetch(
        `${config.API_BASE_URL}/video/${videoId}/download`
      );

      const reader = response.body?.getReader();
      const chunks = [];

      for await (const chunk of await readChunks(reader)) {
        chunks.push(chunk);
      }

      const videoBlob = new Blob(chunks, { type: mimeType });
      createLinkDownload(videoBlob, `${videoDetails.title}.${extension}`);
      emitEventToDeleteVideo(videoId);
      setIsProcessing(false);
      onShowConfetti(true);
      resetAllStates();
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

  const createLinkDownload = (videoBlob: Blob, videoTitle: string) => {
    const videoUrl = URL.createObjectURL(videoBlob);

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = videoTitle;
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
          <div className="flex flex-col  justify-center items-center gap-8 sm:flex-row">
            <iframe
              src={transformURLInEmbed(videoDetails.video_url)}
              width={336}
              height={188}
              className="rounded-md max-w-[80vw]"
            ></iframe>
            <p className="mt-3 max-w-[366px] text-zinc-900 dark:text-zinc-50 text-center">
              {videoDetails.title} -{" "}
              {getVideoDuration(videoDetails.formats[0]?.approxDurationMs)}{" "}
            </p>
          </div>
          <div className="flex self-start items-center gap-2">
            <Switch
              id="convertMp3"
              onCheckedChange={handleCheckedChange}
              checked={convertToMp3}
            />
            <Label
              htmlFor="convertMp3"
              className="text-zinc-900 dark:text-zinc-50"
            >
              Converter esse vídeo em audio (.mp3)?
            </Label>
          </div>
          {!convertToMp3 && (
            <SelectFormat
              formats={videoDetails.formats}
              onValueChange={(value) => setFormat(value)}
              value={format}
            />
          )}
          <Button.Root>
            <Button.Content
              className="w-full dark:text-white"
              onClick={handleProcessDownloadVideo}
              disabled={isProcessing}
            >
              Baixar {convertToMp3 ? "audio" : "video"}
            </Button.Content>
          </Button.Root>

          {isProcessing && (
            <>
              <div className="w-full flex gap-4 items-center">
                <span className="text-zinc-900 dark:text-zinc-50">
                  {downloadedInMB}
                </span>
                <Progress value={progressDowload} className="w-full " />
              </div>
              <span className="text-zinc-900 dark:text-zinc-50">
                tempo estimado {estimatedTime.toFixed(2)} m/s
              </span>
            </>
          )}
        </div>
      )}
    </section>
  );
};
