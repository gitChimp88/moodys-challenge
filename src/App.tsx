import './App.css';
import { useEffect, useState } from 'react';
import AntTable from './components/AntTable';
import AntImage from './components/AntImage';
import AntInputSearch from './components/AntInputSearch';
import { Button } from 'antd';
import { IPhoto } from './types';

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>();
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>();

  // TODO: put columns in their own config file
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (url: string) => <AntImage width={100} height={100} src={url} />,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: (url: string) => <AntImage width={100} height={100} src={url} />,
    },
    {
      title: 'Remove Title',
      dataIndex: 'id',
      key: 'remove',
      render: (_: any, { id }: { id: number }) => (
        <Button onClick={() => handleRemoveTitle(id)}>Remove Title</Button>
      ),
    },
  ];

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

        setPhotos(data);
        setFilteredPhotos(data);
      } catch (error) {
        // TODO: handle error with message to the user
        console.error('Error fetching photos -', error);
      }
    }

    fetchData();
  }, []);

  const handleFilter = (searchInput: string) => {
    if (!searchInput) {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos?.filter((photo) =>
        photo.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredPhotos(filtered);
    }
  };

  const handleRemoveTitle = (id: number) => {
    const updatedAllPhotos = photos?.map((photo) => {
      if (photo.id === id) {
        return { ...photo, title: '' };
      }
      return photo;
    });
    setPhotos(updatedAllPhotos);
    setFilteredPhotos(updatedAllPhotos);
  };

  return (
    <div className="App">
      <AntInputSearch
        handleSearch={handleFilter}
        placeholder="Search items here"
      />
      <AntTable data={filteredPhotos} columns={columns} />
    </div>
  );
}

export default App;
