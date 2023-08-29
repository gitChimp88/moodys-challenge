import { useEffect, useState, useCallback, useMemo } from 'react';
import AntTable from '../AntTable';
import AntInputSearch from '../AntInputSearch';
import { Spin } from 'antd';
import { IPhoto } from '../../types';
import { filterByMatchingText } from '../../utils';
import { fetchData } from '../../utils/api';
import { generateTableColumns } from './generateTableColumns';

function PhotoTable() {
  const [photos, setPhotos] = useState<IPhoto[]>();
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>();

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const data: IPhoto[] = await fetchData(
          'https://jsonplaceholder.typicode.com/photos'
        );

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

    fetchPhotos();
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

  const handleRemoveTitle = useCallback(
    (id: number) => {
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
    },
    [filteredPhotos, photos]
  );

  const memoizedColumns = useMemo(
    () => generateTableColumns(handleRemoveTitle),
    [handleRemoveTitle]
  );

  if (!filteredPhotos) {
    return (
      <div className="App" data-testid="app-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="App">
      <AntInputSearch
        handleSearch={handleFilter}
        placeholder="Search items here"
        styles={{ marginBottom: 16 }}
      />
      <AntTable
        data={filteredPhotos}
        columns={memoizedColumns}
        rowKey={'id'}
        data-testid="ant-table"
      />
    </div>
  );
}

export default PhotoTable;
