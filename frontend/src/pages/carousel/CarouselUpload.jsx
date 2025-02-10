import { useState } from "react";
import { useUploadCarouselImageMutation, useFetchCarouselImagesQuery } from "../../features/api/carouselApi";
import { toast, ToastContainer } from "react-toastify";

const CarouselUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadCarouselImage, { isLoading }] = useUploadCarouselImageMutation();
  const { refetch } = useFetchCarouselImagesQuery();

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      toast.warn("⚠️ Please select an image!", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await uploadCarouselImage(formData).unwrap();
      setImage(null);
      setPreview(null);
      document.getElementById("fileInput").value = ""; // Clear file input
      toast.success("✅ Image uploaded successfully!", { position: "top-right" });
      refetch(); // Refresh image list after upload
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("❌ You can upload 4 image!", { position: "top-right" });
    }
  };

  return (
    <div className="max-w-3xl mt-20 mx-auto bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Carousel Image</h2>

      {/* Image Preview */}
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded-md" />
        </div>
      )}

      {/* File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2 rounded-md mb-4"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`w-full cursor-pointer py-2 rounded-md text-white font-medium ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default CarouselUpload;
