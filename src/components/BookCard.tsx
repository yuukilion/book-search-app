import { Card, Image } from 'antd'
import NoImage from '../assets/image/Noimage.jpg'
const { Meta } = Card;

type Props = {
  img?: string,
  title: string,
  description :string
}

export const BookCard = (props: Props) => {
  const { img = NoImage, title, description }= props;
  return (
      <Card
        style={{width: '400px'}}
        cover={
          <Image src={img} alt={title} fallback={NoImage}/>
        }
      >
        <Meta
          title={title}
          description={description}
        />
      </Card>
  );
};