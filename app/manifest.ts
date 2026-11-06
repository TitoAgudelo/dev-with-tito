import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tito Agudelo",
    short_name: "Tito Agudelo",
    description: "Tito Agudelo, Senior Software Engineer: React Native, AI products, and solutions architecture.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
  };
}
