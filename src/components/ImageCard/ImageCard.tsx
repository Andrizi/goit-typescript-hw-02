import css from "../ImageCard/ImageCard.module.css";

type ImageCardProps = {
  src: string;
  alt: string;
  srcFull: string;
  onImageClick: (srcFull: string) => void;
};

export default function ImageCard({
  src,
  alt,
  srcFull,
  onImageClick,
}: ImageCardProps) {
  return (
    <div className={css.imgcontainer}>
      <img
        className={css.img}
        src={src}
        alt={alt}
        onClick={() => onImageClick(srcFull)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
