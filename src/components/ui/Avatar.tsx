type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type Props = { 
  image?: string | null;
  size?: AvatarSize;
  hightlight?: boolean;
}

export default function Avatar({ 
  image, 
  size='large', 
  hightlight= false 
}: Props) {
  return <div className={getContainerStyle(size, hightlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(size).image}`}
        src={image ?? undefined}
        alt='user profile'
        referrerPolicy='no-referrer'
      />
    </div>
}

function getContainerStyle(size: AvatarSize, hightlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const hightlightStyle = hightlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${hightlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch(size) {
    case 'small': 
      return {
        container: 'w-9 h-9',
        image: 'w-[34px] h-[34px] p-[0.1rem]'
      }
    case 'medium':
      return {
        container: 'w-11 h-11',
        image: 'w-[42px] h-[42px] p-[0.1rem]'
      };
    case 'large': 
      return {
        container: 'w-[68px] h-[68px]',
        image: 'w-16 h-16 p-[0.2rem]'
      }
    case 'xlarge': 
      return {
        container: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]'
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
