import Headphone from "../assets/headphone.png";

const DisBanner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mt-10">
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
        <img
          src={Headphone}
          alt="Headphone"
          className="object-cover w-auto h-full mx-4 md:mx-8 lg:mx-16 rounded-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default DisBanner;