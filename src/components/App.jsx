import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesByQuery } from '../services/api';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './Globalstyle';
import { Container } from './Container';
import { GallerySection } from './Section';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoaing] = useState(false);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const lastPage = Math.ceil(totalHits / images.length);

  // Записуємо дані з форми в стейт по сабміту та ресетимо стейт перед новим запитом на сервер
  const handleSumbit = value => {
    setQuery(`${Date.now()}/${value}`);
    setImages([]);
    setPage(1);
  };

  // Отримуємо дані з сервера при зміні query або page
  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoaing(true);
        setError(false);
        const { hits, totalHits } = await fetchImagesByQuery(
          query.slice(14),
          page
        );
        if (!hits.length) {
          toast.error(
            'No images found matching your search query, please change your request and try again',
            {
              duration: 5000,
            }
          );

          return;
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoaing(false);
      }
    };

    fetchImages();
  }, [page, query]);

  // Реалізуємо пагінацію
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSumbit} />
      <GallerySection>
        <Container>
          {isLoading && <Loader />}
          {error &&
            !isLoading &&
            toast.error('Something went wrong, please try reloading the page', {
              duration: 5000,
            })}
          {images.length > 0 && <ImageGallery images={images} />}
          {images.length > 0 && lastPage > 1 && !isLoading && (
            <Button onLoadMore={handleLoadMore} />
          )}
        </Container>
      </GallerySection>
      <GlobalStyle />
      <Toaster position="top-right" />
    </>
  );
};
