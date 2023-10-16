import { apolloClient } from '@/boot';
import { GetArtistsWithAlbumAndTracksByNameContaining } from '@/graphql/queries';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import ImageNotFound from '../../../public/images/image-not-found.jpg';
import HeartIcon from '../../../public/icons/heart-icon.png';
import MoreIcon from '../../../public/icons/more-icon.png';
import { AlbumCard } from '@/components';

type ServerSideData = {
  data: Artist;
};

export const getServerSideProps: GetServerSideProps<ServerSideData> = async ({ params, query }) => {
  const { id } = params as { id: string };
  const { name } = query as { name: string };

  if (!name || name.trim() === '' || !id) {
    return {
      notFound: true,
    };
  }

  const res = await apolloClient.query({
    query: GetArtistsWithAlbumAndTracksByNameContaining,
    variables: { name },
  });

  const artist = res.data.queryArtists.find((artist) => artist.id === id);

  if (!artist) {
    return {
      notFound: true,
    };
  }

  return { props: { data: artist } };
};

const Artist = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className='flex w-full bg-zinc-800 px-4 py-3 space-x-8 rounded-xl'>
        <div className='my-auto relative aspect-square w-32 h-32 sm:h-auto sm:w-1/3'>
          <Image
            className='rounded-lg'
            src={data.image.trim() === '' ? ImageNotFound : data.image}
            alt={`${data.name} image`}
            fill
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0dbM9CQADEwGLOfL8TgAAAABJRU5ErkJggg=='
          />
        </div>
        <div className='flex flex-col w-full'>
          <h2 className='mt-auto'>Artist</h2>
          <h1 className='text-5xl font-medium mt-1'>{data.name}</h1>
          <div className='flex mb-auto mt-5 space-x-4'>
            <button className='flex h-10 w-10 bg-gradient-to-b from-emerald-400 to-emerald-700 rounded-full'>
              <Image
                className='rounded-lg h-7 w-7 mx-auto my-auto'
                src={HeartIcon}
                alt='favourite icon'
              />
            </button>
            <button className='my-auto w-6'>
              <Image className='w-full' src={MoreIcon} alt='more icon' />
            </button>
          </div>
        </div>
      </div>
      <h2 className='mr-auto text-2xl font-medium mt-5 mb-2'>Albums</h2>
      <div className='flex flex-col w-full space-y-4'>
        {data.albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </>
  );
};

export default Artist;
