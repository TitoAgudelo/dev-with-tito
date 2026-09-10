import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dev With Tito",
    short_name: "Dev With Tito",
    description: "Software engineering work, expertise, and technical case studies by Tito Agudelo.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
  };
}
