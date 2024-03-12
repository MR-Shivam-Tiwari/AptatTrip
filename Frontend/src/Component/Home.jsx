import React from "react";

function Home() {
  return (
    <div className="xl:px-14">
      <section className="w-full">
        <div className="container px-4">
          <div className="grid items-center justify-center gap-6 ">
            <section className="py-12">
              <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Create a Trip
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Share your travel experiences with friends and family. Let
                    them see the world through your eyes.
                  </p>
                </div>
                <div className="space-y-4">
                  <a
                    className="inline-flex items-center text-white p-2 px-4 rounded-lg space-x-2 text-base font-medium"
                    href="/add-new-trip"
                    style={{ background: "black" }}
                  >
                    Create a Trip
                  </a>
                </div>
              </div>
            </section>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter lg:text-6xl/none xl:text-7xl/none">
                Plan your next adventure
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create your dream trip and let the world be inspired by your
                adventure.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1529171696861-bac785a44828?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="BigImage"
              width="1200"
              height="800"
              className="aspect-[3/2] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4">
          <div className="grid items-center justify-center gap-6 lg:grid-cols-[1fr_600px]">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter lg:text-5xl/none xl:text-6xl/none">
                Trending Trips
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the most popular trips created by our community.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:gap-4 xl:gap-6">
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold tracking-tighter">
                    Weekend Getaway
                  </h3>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://plus.unsplash.com/premium_photo-1664478083744-affd1f117efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold tracking-tighter">
                    Island Paradise
                  </h3>
                  <p className="text-sm text-gray-500">Bora Bora</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://plus.unsplash.com/premium_photo-1661898344980-74d101ff156f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold ">Adventure</h3>
                  <p className="text-sm text-gray-500">Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4">
          <div className="grid items-center justify-center gap-6 lg:grid-cols-[1fr_600px]">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter lg:text-5xl/none xl:text-6xl/none">
                Explore Trips
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover amazing trips created by the community. Where will your
                next adventure take you?
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:gap-4 xl:gap-6">
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://images.unsplash.com/photo-1699716803812-5a9e5085d189?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold tracking-tighter">
                    Weekend Getaway
                  </h3>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://images.unsplash.com/photo-1568719744804-1777287cff27?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold tracking-tighter">
                    Island Paradise
                  </h3>
                  <p className="text-sm text-gray-500">Bora Bora</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg overflow-hidden">
                <img
                  alt="Cover"
                  className="aspect-[16/9] object-cover object-center"
                  height="225"
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="400"
                />
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-xl font-semibold tracking-tighter">
                    Adventure
                  </h3>
                  <p className="text-sm text-gray-500">Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
