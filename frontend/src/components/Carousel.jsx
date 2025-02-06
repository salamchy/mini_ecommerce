import { useFetchCarouselImagesQuery } from '../features/api/carouselApi';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = () => {
  const { data: images, error, isLoading } = useFetchCarouselImagesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="carousel-container mx-auto mt-28 max-w-7xl">
      {images && images.length > 0 ? (
        <ResponsiveCarousel
          autoPlay
          infiniteLoop
          interval={3000}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          emulateTouch
          className="rounded-lg shadow-lg"
        >
          {images.map((image) => (
            <div key={image._id} className="relative">
              <img
                src={image.imageUrl}
                alt="carousel"
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          ))}
        </ResponsiveCarousel>
      ) : (
        <div className="text-center py-10 text-xl text-gray-500">No images found</div>
      )}
    </div>
  );
};

export default Carousel;
