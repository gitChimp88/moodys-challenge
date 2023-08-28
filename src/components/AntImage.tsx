import { Image } from 'antd';

interface IAntImage {
  width: number;
  height: number;
  src: string;
}

function AntImage({ width, height, src }: IAntImage) {
  return <Image width={width} height={height} src={src ?? 'error'} />;
}

export default AntImage;
