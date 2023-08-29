import { useEffect, useState, useCallback } from 'react';
import AntTable from '../AntTable';
import AntInputSearch from '../AntInputSearch';
import { Spin } from 'antd';
import { IPhoto } from '../../types';
import { filterByMatchingText } from '../../utils';
import { generateTableColumns } from './generateTableColumns';

function PhotoTable() {
  const [photos, setPhotos] = useState<IPhoto[]>();
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>();

  useEffect(() => {
    async function fetchData() {
      // TODO: make a generic fetch call function
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos'
        );

        if (!response) {
          throw new Error('Error with network');
        }

        const data = await response.json();

        // create fake projects here to test limits
        // const fakeData: any = [];

        // for (let i = 0; i < 10; i++) {
        //   data.forEach((x: any) => {
        //     fakeData.push({
        //       ...x,
        //       id: x.id + `${i}`,
        //     });
        //   });
        // }

        setPhotos(data);
        setFilteredPhotos(data);
      } catch (error) {
        // TODO: handle error with message to the user
        console.error('Error fetching photos -', error);
      }
    }

    fetchData();
  }, []);

  const handleFilter = useCallback(
    (searchInput: string) => {
      // TODO: On larger data sets here we can use debouncing technique
      // to call server to filter items
      const startTime = performance.now();
      if (!searchInput) {
        setFilteredPhotos(photos);
      } else {
        if (photos) {
          const filtered = filterByMatchingText(photos, searchInput, 'title');
          setFilteredPhotos(filtered);
          const endTime = performance.now();
          const executionTime = endTime - startTime;
          console.log(
            `handleFilter execution time: ${executionTime} milliseconds`
          );
        }
      }
    },
    [photos]
  );

  const handleRemoveTitle = (id: number) => {
    // remove title from source data
    const updatedAllPhotos = photos?.map((photo) => {
      if (photo.id === id) {
        return { ...photo, title: '' };
      }
      return photo;
    });

    // update filtered seperately so if user removes title whilst filtering it keeps current order
    const updatedFiltered = filteredPhotos?.map((photo) => {
      if (photo.id === id) {
        return { ...photo, title: '' };
      }
      return photo;
    });

    setPhotos(updatedAllPhotos);
    setFilteredPhotos(updatedFiltered);
  };

  if (!filteredPhotos) {
    return (
      <div className="App">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="App">
      <AntInputSearch
        handleSearch={handleFilter}
        placeholder="Search items here"
      />
      <AntTable
        data={filteredPhotos}
        columns={generateTableColumns(handleRemoveTitle)}
      />
    </div>
  );
}

export default PhotoTable;
