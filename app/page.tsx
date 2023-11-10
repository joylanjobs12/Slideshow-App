'use client'
import Slides from './components/slides';
import React, { useState, useEffect } from 'react';

interface CatImage {
  url: string;
}
const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
export default function Home() {
  const [autoSlide, setAutoSlide] = useState(false);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(true);

  const fetchCatImages = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=live_B4RHKQu7pfqo6xXygIDmYx8bui78Wq4tM2m3XJo8EeTMcIjqFqlodElSO2rsj7Iu`);
      const data: CatImage[] = await response.json();
      console.log(data);
      setCatImages(data);
      setLoading(false); // Set loading to false after fetching images
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  useEffect(() => {
    fetchCatImages(); // Call the function immediately upon component mount
  }, [limit]);
  
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
  };
  const imageUrls = catImages.map((image) => image.url);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-2xl font-bold tracking-wide mb-4'>A Simple Slideshow App</h1>
      <div>
        <div className='flex items-center m-10 text-center justify-between gap-[100px]'>
        <div className='flex items-center text-right justify-end gap-2'>
        <label className="switch">
          <input type="checkbox" checked={autoSlide} onChange={() => setAutoSlide(!autoSlide)} />
          <span className="slider"></span>
        </label>
        Auto Slide

        </div>
        <div>
          <label htmlFor="limitInput"># Image Display:</label>
          <input
            type="number"
            id="limitInput"
            className='w-[50px]'
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
        </div>
        
      </div>
      <Slides slides={imageUrls} autoSlide={autoSlide} autoSlideInterval={3000} />
    </main>
  );
}
