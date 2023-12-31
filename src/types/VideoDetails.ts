export interface IVideoDetails {
  title: string;
  thumbnails: [
    {
      url: string;
      width: number;
      height: number;
    }
  ];
  video_url: string;
  videoId: string;
  formats: IFormat[];
}

export interface IFormat {
  width: number;
  height: number;
  container: string;
  mimeType: string;
  qualityLabel: string;
  approxDurationMs: string;
}
