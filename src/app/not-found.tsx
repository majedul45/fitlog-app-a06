import Link from "next/link";
const NotFound = () => (
  <main className="container-fit flex min-h-[70vh] items-center justify-center text-center">
    <div>
      <p className="lime text-sm font-black tracking-[.3em]">404</p>
      <h1 className="font-display mt-3 text-6xl">NOT FOUND</h1>
      <p className="mt-4 text-zinc-500">
        The workout or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="btn-lime mt-8 inline-block rounded-md px-7 py-4 text-sm font-black"
      >
        BACK TO WORKOUTS
      </Link>
    </div>
  </main>
);
export default NotFound;
