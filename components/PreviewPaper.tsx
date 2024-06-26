import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-tailwind/react";
import { useVanillaTilt } from "@/hooks/useVanillaTilt";

interface PreviewPaperProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: any;
}

export const PreviewPaper: React.FC<PreviewPaperProps> = ({
  register,
  watch,
  errors,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = watch("coverImage"); //note!
  const paperRef = useVanillaTilt();

  useEffect(() => {
    if (imageRef && imageRef.length > 0) {
      const fileURL = URL.createObjectURL(imageRef[0]);
      setImageUrl(fileURL);

      return () => {
        URL.revokeObjectURL(fileURL);
      };
    } else {
      setImageUrl(null);
    }
  }, [imageRef]);

  return (
    <Paper
      ref={paperRef}
      className={`bg-white bg-opacity-10 aspect-square flex justify-center p-5`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="max-w-full max-h-full" />
      ) : (
        <label className="w-full h-full flex justify-center items-center cursor-pointer">
          <Typography variant="h1" className="text-center">
            Click to upload file
          </Typography>
          <input type="file" {...register("coverImage")} hidden />
        </label>
      )}
      {errors.coverImage && (
        <Typography color="red" variant="small">
          {errors.coverImage.message}
        </Typography>
      )}
    </Paper>
  );
};
