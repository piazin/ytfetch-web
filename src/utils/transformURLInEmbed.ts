export const transformURLInEmbed = (youtubeUrl: string) => {
  return youtubeUrl.replace("watch", "embed/").replace("?v=", "/");
};
