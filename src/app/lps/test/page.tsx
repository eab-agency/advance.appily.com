// @ts-ignore
// @ts-ignore
// @ts-ignore

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master’s Degrees in Business",
  description:
    "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
  openGraph: {
    title: "Master’s Degrees in Business",
    description:
      "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/business`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/mba-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "A group of business professionals discussing a project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master’s Degrees in Business",
    description:
      "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/mba-hero.jpg`],
  },
};

export default function Page() {
  return <h2>Test</h2>;
}
