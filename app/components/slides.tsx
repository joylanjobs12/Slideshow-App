"use client";
import { useState , useEffect  } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
interface SlidesProps {
  slides: string[];
  autoSlide: boolean;
  autoSlideInterval: number;
}

const Slides: React.FC<SlidesProps> = ({ slides, autoSlide , autoSlideInterval }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  const goToSlide = (i: number) => {
    setCurr(i);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (autoSlide) {
      intervalId = setInterval(() => {
        next();
      }, autoSlideInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoSlide, autoSlideInterval]);
  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-transform ease-out duration-500">
        <div
          style={{
            width: "600px",
            height: "600px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={slides[curr]}
            alt={`Slide ${curr + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slides;
