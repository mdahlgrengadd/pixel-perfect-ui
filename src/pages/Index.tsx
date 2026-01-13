import { useEffect } from "react";
import { initFluent } from "@/lib/fluentInit";
import { PhotoshopUI } from "@/components/photoshop/PhotoshopUI";

const Index = () => {
  useEffect(() => {
    initFluent();
  }, []);

  return <PhotoshopUI />;
};

export default Index;
