import { Image, Skeleton } from 'antd';

interface IAntImage {
  width: number;
  height: number;
  src: string;
}

function AntImage({ width, height, src }: IAntImage) {
  return (
    <Image
      width={width}
      height={height}
      src={src ?? 'error'}
      placeholder={<Skeleton.Image active={true} />}
    />
  );
}

export default AntImage;
