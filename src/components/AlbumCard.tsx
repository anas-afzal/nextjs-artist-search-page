import Image from 'next/image';
import ImageNotFound from '../../public/images/image-not-found.jpg';
import { TrackCard } from './TrackCard';

interface IProps {
  album: Album;
}

export const AlbumCard = ({ album }: IProps): JSX.Element => {
  return (
    <div className='flex bg-zinc-900 pr-3 pb-3 rounded-lg space-x-4 w-full'>
      <div className='flex flex-col w-28 md:w-1/6 space-y-2'>
        <div className='relative aspect-square'>
          <Image
            className=' rounded-ss-lg'
            src={album.image.trim() === '' ? ImageNotFound : album.image}
            alt={`${album.name} image`}
            fill
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0dbM9CQADEwGLOfL8TgAAAABJRU5ErkJggg=='
          />
        </div>
        <h3 className='text-lg font-medium text-center'>{album.name}</h3>
      </div>
      <div className='flex flex-col pt-3 w-full'>
        <h4 className='text-md'>Tracks</h4>
        {album.tracks.length > 0 ? (
          <div className='space-y-1'>
            {album.tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <p className='my-auto mx-auto text-sm'>no tracks found</p>
        )}
      </div>
    </div>
  );
};
