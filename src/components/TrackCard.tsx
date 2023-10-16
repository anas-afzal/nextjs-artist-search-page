import Image from 'next/image';
import MusicIcon from '../../public/icons/music-icon.png';
import PlayIcon from '../../public/icons/play-icon.png';

interface IProps {
  track: Track;
}

export const TrackCard = ({ track }: IProps): JSX.Element => {
  return (
    <div key={track.id} className='flex w-full px-2 py-2 rounded-md  hover:bg-zinc-600'>
      <Image className='w-6 h-full my-auto' src={MusicIcon} alt='music icon' />
      <div className='my-auto mx-4'>
        <p className='text-sm'>{track.name}</p>
        <p className='text-xs text-gray-400'>
          {track.artists.map((artist, i) => `${i === 1 ? ', ' : ''}${artist.name}`)}
        </p>
      </div>
      <Image
        className='w-6 h-full my-auto ml-auto cursor-pointer'
        src={PlayIcon}
        alt='music icon'
      />
    </div>
  );
};
