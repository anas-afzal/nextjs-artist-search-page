import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import { useLazyQuery } from '@apollo/client';
import { GetArtistsByNameContaining } from '@/graphql/queries';
import { ArtistCard } from '@/components';
import Head from 'next/head';

const searchArtistFormSchema = object({
  artistName: string({ required_error: 'artist name is required' }).min(
    1,
    'artist name is required',
  ),
});

type SearchArtistFormSchema = TypeOf<typeof searchArtistFormSchema>;

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SearchArtistFormSchema>({
    resolver: zodResolver(searchArtistFormSchema),
  });
  const [getArtist, { data, loading, error }] = useLazyQuery(GetArtistsByNameContaining);

  const searchArtist = async (data: SearchArtistFormSchema) => {
    getArtist({ variables: { name: data.artistName } });
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <form onSubmit={handleSubmit(searchArtist)} className='flex justify-center w-full space-x-4'>
        <div className='w-full max-w-lg'>
          <input
            type='text'
            placeholder='artist name'
            {...register('artistName', { required: true })}
            className='w-full h-12 rounded-3xl px-5 text-black'
          />
          {formErrors.artistName?.message && (
            <p className='mt-2 text-red-800'>{formErrors.artistName?.message}</p>
          )}
        </div>
        <button
          type='submit'
          className='px-6 h-12 rounded-3xl bg-gradient-to-b from-emerald-400 to-emerald-700'
        >
          Search
        </button>
      </form>
      {loading && (
        <div className=' mt-8 border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-emerald-600' />
      )}
      {!loading && error && <p className='mt-8 text-red-800'>oops! something went wrong</p>}
      <div className='w-full grid mt-8 gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 '>
        {!loading &&
          !error &&
          data &&
          data.queryArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
      </div>
    </>
  );
};

export default Home;
