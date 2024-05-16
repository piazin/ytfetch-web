import React from "react";
import { Download, Loader2 } from "lucide-react";

import config from "@/config";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/interface/Button";
import { useToast } from "@/components/ui/use-toast";

interface UrlSectionProps {
  onHandleGetVideoDetails: (videoDetails: any) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UrlSection = ({
  isLoading,
  setIsLoading,
  onHandleGetVideoDetails,
}: UrlSectionProps) => {
  const { toast } = useToast();

  const [youtubeUrl, setYoutubeUrl] = React.useState("");
  const [invalidUrl, setInvalidUrl] = React.useState(false);

  const handleSearchVideoDetailsDownload = async () => {
    if (!handleUrlValidation(youtubeUrl)) return;
    resetStates();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video?videoUrl=${youtubeUrl}`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.status === 200) {
        onHandleGetVideoDetails(data);
        resetStates();
        return;
      }
    } catch (error) {
      toast({
        title: "Erro ao baixar vídeo",
        description: "Tente novamente mais tarde",
        className: "bg-red-600",
      });
    } finally {
      resetStates();
    }
  };

  const resetStates = () => {
    setYoutubeUrl("");
    setIsLoading(false);
  };

  const handleUrlChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    handleUrlValidation(value);
    setYoutubeUrl(value);
  };

  const handleUrlValidation = (url: string) => {
    const reggexValidUrl = new RegExp(
      "^(https?://)?(www.youtube.com|youtu.?be)/.+$"
    );
    const isUrlValid = reggexValidUrl.test(url);

    if (!isUrlValid) {
      setInvalidUrl(true);
    } else {
      setInvalidUrl(false);
    }

    return isUrlValid;
  };

  return (
    <>
      <section className="flex items-center gap-4 min-w-full mb-2 flex-col sm:flex-row">
        <Input
          type="url"
          placeholder="Cole url do seu vídeo aqui"
          className={`outline-none  bg-white placeholder:text-slate-800 min-w-80 ${
            invalidUrl && "border-red-600"
          }`}
          value={youtubeUrl}
          onChange={handleUrlChange}
        />

        <Button.Root>
          <Button.Content
            disabled={invalidUrl || isLoading}
            onClick={handleSearchVideoDetailsDownload}
            className="dark:text-zinc-100 w-full sm:w-auto"
          >
            <Button.Icon
              className="mr-2"
              icon={
                isLoading ? <Loader2 className="animate-spin mr-2" /> : Download
              }
            />
            {isLoading ? "Baixando" : "Baixar"}
          </Button.Content>
        </Button.Root>
      </section>
      <Label className="text-red-600 self-start ml-1 mt-1">
        {invalidUrl ? "Url Inválida" : " "}
      </Label>
    </>
  );
};
