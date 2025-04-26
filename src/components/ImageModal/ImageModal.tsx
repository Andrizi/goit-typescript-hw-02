import css from "../ImageModal/ImageModal.module.css";
import Modal from "react-modal";
import { useEffect } from "react";

type ImageModalProps = {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
};

export default function ImageModal({
  isOpen,
  imageUrl,
  onClose,
}: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content} onClick={onClose}>
        {imageUrl && (
          <img
            onClick={(e) => e.stopPropagation()}
            src={imageUrl}
            alt="Full image"
            className={css.image}
          />
        )}
      </div>
    </Modal>
  );
}
