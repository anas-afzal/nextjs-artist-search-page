import Image from 'next/image';
import Link from 'next/link';
import ImageNotFound from '../../public/images/image-not-found.jpg';
import ArrowIcon from '../../public/icons/right-arrow-icon.png';

interface IProps {
  artist: ArtistBasicInfo;
}

export const ArtistCard = ({ artist }: IProps): JSX.Element => {
  return (
    <div className='w-full bg-zinc-800 shadow-md shadow-zinc-800/70 hover:bg-zinc-600 hover:-translate-y-1 flex flex-col px-2 pt-2 pb-4 rounded-xl transition ease-in-out duration-300'>
      <div className='relative aspect-square w-full'>
        <Image
          className='rounded-t-lg'
          src={artist.image.trim() === '' ? ImageNotFound : artist.image}
          alt={`${artist.name} image`}
          fill
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0dbM9CQADEwGLOfL8TgAAAABJRU5ErkJggg=='
        />
      </div>
      <h2 className='text-xl my-5 font-semibold' key={artist.id}>
        {artist.name}
      </h2>
      <Link
        className='flex text-sm mt-auto rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-700 py-1 pl-4 pr-2 space-x-2 max-w-max'
        href={`/artist/${artist.id}?name=${artist.name}`}
      >
        <p className='my-auto'>Explore</p>
        <Image className='my-auto w-6 ml-auto' src={ArrowIcon} alt='arrow icon' />
      </Link>
    </div>
  );
};
