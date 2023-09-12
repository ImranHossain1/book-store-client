import image from '../assets/images/book1.jpg';

const Banner = () => {
  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8 md:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg font-sans  font-bold tracking-tight text-gray-500 sm:text-3xl sm:leading-none">
              Once you learn to read, you will be forever free.
            </h2>{' '}
            <cite>-Frederick Douglass</cite>
            <p className="text-base text-gray-500 md:text-lg text-justify">
              "A story can always break into pieces while it sits inside a book
              on a shelf; and, decades after we have read it even twenty times,
              it can open us up, by cut or caress, to a new truth."
            </p>
          </div>
          <div className="mt-6">
            <button className="btn btn-active bg-blue-800 hover:bg-blue-600 text-white">
              Explore our books
            </button>
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
