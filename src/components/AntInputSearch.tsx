import { ChangeEvent } from 'react';
import { Input } from 'antd';

interface IAntInputSearch {
  handleSearch: (x: string) => void;
  placeholder: string;
}

function AntInputSearch({ handleSearch, placeholder }: IAntInputSearch) {
  return (
    <Input
      allowClear
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleSearch(e.target.value)
      }
    />
  );
}

export default AntInputSearch;
