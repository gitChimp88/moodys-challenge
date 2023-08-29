import AntImage from '../AntImage';
import { Button } from 'antd';

export const generateTableColumns = (
  handleRemoveTitle: (id: number) => void
) => {
  return [
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
};
