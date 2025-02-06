import { useState, useEffect } from 'react';
import Image from "../../assets/image.jpg";
import Image1 from "../../assets/image1.jpg";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const images = [
    { src: Image, alt: "Our Team" },
    { src: Image1, alt: "John Doe" },
    { src: Image2, alt: "Jane Smith" },
    { src: Image3, alt: "Alex Johnson" }
  ];

  return (
    <div className="font-sans leading-normal tracking-normal text-gray-900 bg-gray-100 min-h-screen mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Who We Are Section */}
        <section className="mb-20">
          <h1 className={`text-4xl font-bold text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>About Us</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className={`md:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="rounded-lg shadow-lg w-full h-auto transition-transform duration-1000 transform hover:scale-105"
              />
            </div>
            <div className={`md:w-1/2 flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p className="text-gray-700 text-lg">
                We at E-commerce are passionate about bringing quality products right to your doorstep.
                Our journey began in 2024, driven by the vision to revolutionize online shopping with
                an unparalleled selection, exceptional service, and an easy, enjoyable experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>Our Mission</h2>
          <div className="bg-pattern p-6 rounded-lg shadow-lg transition-all duration-1000 transform hover:scale-105">
            <p className="text-xl text-center text-gray-800">
              To provide high-quality products at affordable prices while ensuring a sustainable and ethical shopping experience.
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.slice(1).map((image, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-4 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 transform hover:scale-105"
                />
                <h3 className="text-xl font-semibold mt-4">
                  {image.alt === "John Doe" ? "John Doe" :
                    image.alt === "Jane Smith" ? "Jane Smith" :
                      "Alex Johnson"}
                </h3>
                <p className="text-gray-600">
                  {image.alt === "John Doe" ? 'Founder & CEO' :
                    image.alt === "Jane Smith" ? 'Head of Design' :
                      'Customer Experience Manager'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values Section */}
        <section>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>Our Values</h2>
          <div className="max-w-2xl mx-auto text-center transition-all duration-1000 transform hover:scale-105">
            <p className="text-lg text-gray-700">
              Integrity, Innovation, Quality, Sustainability, and Customer Satisfaction are at the heart of everything we do.
            </p>
          </div>
        </section>
      </div>
      <style jsx>{`
        .bg-pattern {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect fill="%23f3f4f6" x="0" y="0" width="10" height="10"/><rect fill="%23e5e7eb" x="10" y="10" width="10" height="10"/><rect fill="%23e5e7eb" x="0" y="10" width="10" height="10"/><rect fill="%23f3f4f6" x="10" y="0" width="10" height="10"/></svg>');
          background-size: 100px 100px;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;

