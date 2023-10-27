import React from "react";
import { Download, Loader2 } from "lucide-react";

import config from "@/config";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/interface/Button";

interface UrlSectionProps {
  onShowConfetti: () => void;
  onHandleGetVideoDetails: (videoDetails: any) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UrlSection = ({
  isLoading,
  setIsLoading,
  onShowConfetti,
  onHandleGetVideoDetails,
}: UrlSectionProps) => {
  const [youtubeUrl, setYoutubeUrl] = React.useState("");
  const [invalidUrl, setInvalidUrl] = React.useState(false);

  const handleSearchVideoDetailsDownload = async () => {
    if (!handleUrlValidation(youtubeUrl)) return;

    resetStates();
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/video?videoUrl=${youtubeUrl}`,
      { method: "GET" }
    );
    const data = await response.json();

    if (response.status === 200) {
      onHandleGetVideoDetails(data);
      onShowConfetti();
      resetStates();
      return;
    }

    window.alert("falha ao buscar video");
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
      <section className="flex items-center gap-4 min-w-full mb-2">
        <Input
          type="url"
          placeholder="Cole url do seu vídeo aqui"
          className={`outline-none border-2 border-purple-700 min-w-80 ${
            invalidUrl && "border-red-600"
          }`}
          value={youtubeUrl}
          onChange={handleUrlChange}
        />

        <Button.Root>
          <Button.Content
            disabled={invalidUrl || isLoading}
            onClick={handleSearchVideoDetailsDownload}
          >
            <Button.Icon
              icon={isLoading ? <Loader2 className="animate-spin" /> : Download}
            />
            {isLoading ? "Baixando" : "Baixar"}
          </Button.Content>
        </Button.Root>
      </section>
      <Label className="text-red-600">
        {invalidUrl ? "Url invalida" : " "}
      </Label>
    </>
  );
};
