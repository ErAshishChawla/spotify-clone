import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  return (
    <main
      className="w-screen h-screen bg-black p-2
          grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-1 gap-x-2"
    >
      <aside className="hidden md:flex ">
        <Sidebar />
      </aside>

      <section className=" bg-neutral-900/90 rounded-md overflow-y-auto">
        <div className="text-white">
          <Header />
          <div>Playlists</div>
        </div>
      </section>
    </main>
  );
}
