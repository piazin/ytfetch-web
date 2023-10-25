import { Button } from "@/components/interface/Button";
import { transformURLInEmbed } from "@/utils/transformURLInEmbed";
import { getVideoDuration } from "@/utils/convertMillisecondsInMinutes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IVideoDetails } from "@/types/VideoDetails";
import { VideoDetailsSkeleton } from "./videoDetailsSkeleton";

interface VideoDetailsProps {
  videoDetails: IVideoDetails;
  isLoading: boolean;
}

export const VideoDetails = ({
  isLoading,
  videoDetails,
}: VideoDetailsProps) => {
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

          <Select>
            <SelectTrigger className="text-zinc-800  border-purple-700 w-full">
              <SelectValue placeholder="Selecionar qualidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-black">Qualidade</SelectLabel>
                {videoDetails.formats.map((format) => (
                  <SelectItem value={format.qualityLabel} key={format.width}>
                    {format.qualityLabel} - {format.container}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button.Root>
            <Button.Content className="w-full">Baixar video</Button.Content>
          </Button.Root>
        </div>
      )}
    </section>
  );
};
