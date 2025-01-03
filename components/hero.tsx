"use client";

import Link from "next/link";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "./ui/typewriter-effect";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const sentences = [
  [
    { text: "Your", className: "" },
    { text: "Name!", className: "text-blue-500 dark:text-blue-500" },
  ],
  [
    { text: "Create", className: "" },
    { text: "Timed", className: "" },
    { text: "Links!", className: "text-blue-500 dark:text-blue-500" },
  ],
  [
    { text: "Protect", className: "" },
    { text: "Your", className: "" },
    { text: "Links!", className: "text-blue-500 dark:text-blue-500" },
  ],
];

const images = [
  "/images/dashboard.png",
  "/images/create.png",
  "/images/edit.png",
];

export default function Header() {
  const [currentWords, setCurrentWords] = useState(sentences[0]);
  const [currentImages, setCurrentImages] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sentences.length;
        setCurrentWords(sentences[nextIndex]);
        setCurrentImages(images[nextIndex]);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mx-auto">
        <h1 className="pb-8 font-bold text-2xl lg:text-4xl">
          Create and Manage Your Links
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <p className="block text-lg">
            The best and shortest link shortener for
          </p>

          <TypewriterEffectSmooth words={currentWords} className="text-xs" />
        </div>
      </div>
      <div className="flex flex-col justify-start space-y-4 dark:border-white p-8 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
        <div className="flex md:flex-row flex-col w-full">
          <div className="md:w-1/2">
            <h1 className="pb-8 font-bold text-2xl lg:text-4xl">
              Simple, fast, and easy to remember
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <p className="block text-lg">
                Experience ultimate convenience with our URL shortening service,
                designed to encapsulate the essence of{" "}
                <span className="border-b-2 border-blue-500">
                  simplicity, speed, and memorability.
                </span>
              </p>
            </div>
          </div>
          <div className="p-8 md:p-4 md:w-1/2">
            <img src={currentImages} alt="Image" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto">
        <h1 className="pb-8 font-bold text-xl lg:text-2xl">
          So, what are you waiting for
        </h1>
        <Link href={"/dashboard"} className="mx-auto">
          <Button variant={"comic"}>Go to Dashboard</Button>
        </Link>
      </div>
    </>
  );
}
