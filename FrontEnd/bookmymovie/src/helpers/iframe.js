export const getTrailerUrl = (trailer) => {
  if (!trailer) return null;
  if (typeof trailer === "string") return trailer;
  if (Array.isArray(trailer)) {
    return trailer.map(getTrailerUrl).find(Boolean) || null;
  }
  if (typeof trailer === "object") {
    return (
      trailer.url ||
      trailer.videoUrl ||
      trailer.embedUrl ||
      trailer.link ||
      trailer.href ||
      null
    );
  }
  return null;
};

const getYoutubeEmbedUrl = (trailer) => {
  const url = getTrailerUrl(trailer);
  if (!url) return null;
  try {
    const urlObject = new URL(url);
    if (
      urlObject.hostname === "www.youtube.com" ||
      urlObject.hostname === "youtube.com"
    ) {
      const videoId = urlObject.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (urlObject.hostname === "youtu.be") {
      const videoId = urlObject.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (urlObject.pathname.startsWith("/embed/")) {
      return url;
    }
  } catch {
    return null;
  }
  return null;
};  

export default getYoutubeEmbedUrl;
