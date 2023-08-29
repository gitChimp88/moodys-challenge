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
  rowKey: string;
}

function AntTable({ data, columns, rowKey }: IAntTable) {
  return <Table dataSource={data} columns={columns} rowKey={rowKey} />;
}

export default AntTable;
