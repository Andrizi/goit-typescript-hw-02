import css from "../ImageGallery/ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

type Image = {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
};

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (srcFull: string) => void;
};

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.ul}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            onImageClick={onImageClick}
            srcFull={image.urls.full}
            src={image.urls.small}
            alt={image.alt_description}
          />
        </li>
      ))}
    </ul>
  );
}
