import { FC } from "react";
import "./Nanofragment.css";
import { NanofragmentProps } from "./Nanofragment.types";

const Nanofragment: FC<NanofragmentProps> = ({ name, podlets }) => {
  console.log("Nanofragment -> name: ", name);
  console.log("Nanofragment -> podlets: ", podlets);
  const podlet = podlets.find((pod) => pod.name === name);
  console.log("Nanofragment -> podlet: ", podlet);
  return (
    <div
      // className="nanofragment"
      dangerouslySetInnerHTML={{
        __html: podlet?.html ?? `<span>Nanofragment ${name} not found</span>`,
      }}
    ></div>
  );
};

export default Nanofragment;
