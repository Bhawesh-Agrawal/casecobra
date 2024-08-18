"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rendereddimesnion, setRenderdDimesnion] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderdDimesnion({ width, height });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  let casebackgroundColor = "bg-zinc-900";
  if (color === "blue") casebackgroundColor = "bg-blue-950";
  if (color === "rose") casebackgroundColor = "bg-rose-950";
  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            rendereddimesnion.width / 2 -
            rendereddimesnion.width / (1216 / 121),
          top: rendereddimesnion.height / 6.22,
        }}
      >
        <img
          width={rendereddimesnion.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            casebackgroundColor
          )}
          src={croppedImageUrl}
          alt="userImage"
        />
      </div>
      <div className="relative h-full w-full z-40">
        <img
          src="/clearphone.png"
          alt="Phone"
          className="pointer-events-none
        h-full w-full antialised rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
