import './App.css';
import { useEffect, useState } from 'react';
import AntTable from './components/AntTable';
import AntImage from './components/AntImage';
import { IPhoto } from './types';

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
];

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>();

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
      } catch (error) {
        // TODO: handle error with message to the user
        console.error('Error fetching photos -', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <AntTable data={photos} columns={columns} />
    </div>
  );
}

export default App;
