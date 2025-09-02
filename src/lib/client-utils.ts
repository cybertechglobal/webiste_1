export function getBgImage(segment: string) {
  const bgMap = {
    home: "/home-page/hero.webp",
    about: "/about-page/hero.webp",
  };

  return bgMap[segment as keyof typeof bgMap] || null;
}
