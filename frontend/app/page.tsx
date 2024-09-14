import Image from "next/image";
import HeroComponent from "./ui/dashboard/homepage/hero";
import FeaturesComponent from "./ui/dashboard/homepage/features";

export default function Home() {
  return (
    <>
      <HeroComponent /> 
      <FeaturesComponent />
    </>
  );
}
