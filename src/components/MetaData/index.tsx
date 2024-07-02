import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

type MetaDataType = {
  title?: string;
  description?: string;
  image?: string;
  auth?: string;
};

export default function MetaData({
  title = "",
  description = "",
  image = "",
  auth = "Meng-Che Wu 吳孟哲 (Will)",
}: MetaDataType) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <link rel="canonical" href={url} />
      <title>Will's Intro {title && `- ${title}`}</title>
      <meta name="description" content={description} />
      <meta name="author" content={auth} />

      {/* Open Graph tags (OG) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />

      {/* OG image tags */}
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={`Image of Will's Intro site`} />

      {/* Twitter tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={auth} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
}
