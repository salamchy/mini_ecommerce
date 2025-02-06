import { useFetchCarouselImagesQuery, useDeleteCarouselImageMutation } from "../../features/api/carouselApi";
import { toast } from "react-toastify";

const CarouselList = () => {
  const { data: images, error, isLoading, refetch } = useFetchCarouselImagesQuery();
  const [deleteCarouselImage] = useDeleteCarouselImageMutation();

  // Handle image deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteCarouselImage(id);
      toast.success("✅ Image deleted successfully!",);
      refetch(); // Refresh the image list
    } catch (err) {
      toast.error("❌ Failed to delete image!",);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Carousel Images</h2>

      {images && images.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {images.map((image) => (
            <div key={image._id} className="flex items-center bg-gray-100 rounded-lg shadow-md p-3">
              <img
                src={image.imageUrl}
                alt="carousel"
                className="w-40 h-40 object-cover rounded-md"
              />
              <button
                onClick={() => handleDelete(image._id)}
                className="ml-auto cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-xl text-gray-500">No images found</div>
      )}
    </div>
  );
};

export default CarouselList;
