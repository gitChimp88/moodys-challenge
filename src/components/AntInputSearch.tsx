import { Input } from 'antd';

interface IAntInputSearch {
  handleSearch: (x: any) => void;
  placeholder: string;
}

function AntInputSearch({ handleSearch, placeholder }: IAntInputSearch) {
  return (
    <Input
      allowClear
      placeholder={placeholder}
      onChange={(e: any) => handleSearch(e.target.value)}
    />
  );
}

export default AntInputSearch;
