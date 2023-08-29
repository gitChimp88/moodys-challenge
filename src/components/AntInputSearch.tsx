import { ChangeEvent, CSSProperties } from 'react';
import { Input } from 'antd';

interface IAntInputSearch {
  handleSearch: (x: string) => void;
  placeholder: string;
  styles: CSSProperties;
}

function AntInputSearch({
  handleSearch,
  placeholder,
  styles,
}: IAntInputSearch) {
  return (
    <Input
      allowClear
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleSearch(e.target.value)
      }
      style={styles}
    />
  );
}

export default AntInputSearch;
