import { Table } from 'antd';

interface IColumnItem {
  title: string;
  dataIndex: string;
  key: string;
}

interface IDataItem {
  [property: string]: any;
}

interface IAntTable {
  data?: IDataItem[];
  columns: IColumnItem[];
}

function AntTable({ data, columns }: IAntTable) {
  return <Table dataSource={data} columns={columns} />;
}

export default AntTable;
