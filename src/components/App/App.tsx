import { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

Modal.setAppElement("#root");

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
};

type UnsplashApiResponse = {
  total: number;
  total_pages: number;
  results: Image[];
};

export default function App() {
  const API_KEY = "GnU2hs9ReYiuMdWEXRcnqk-Mt_I8PDyzyRE8gPgO-8I";

  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage("");
  };

  const handleSearchSubmit = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
    setErrorMessage(false);
  };

  const handleLoadMore = () => {
    setPage((prevPages) => prevPages + 1);
  };

  useEffect(() => {
    if (page > 1 && images.length > 0) {
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [page, images]);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get<UnsplashApiResponse>(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              client_id: API_KEY,
              per_page: 16,
              page,
            },
          }
        );

        if (response.data.results.length === 0) {
          setLoadMore(false);
          toast.error("No images found.");
        } else {
          setImages((prev) => [...prev, ...response.data.results]);
          setLoadMore(page < response.data.total_pages);
        }
      } catch (error) {
        setErrorMessage(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery onImageClick={openModal} images={images} />
      {loading && <Loader loading={loading} />}
      <LoadMoreBtn handleLoadMore={handleLoadMore} loadMore={loadMore} />
      <ErrorMessage errorMessage={errorMessage} />
      <ImageModal
        isOpen={selectedImage !== ""}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
      <Toaster position="top-right" />
    </div>
  );
}
