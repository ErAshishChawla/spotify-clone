import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/app-header/header";
import Player from "@/components/music-player/player";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-screen h-screen p-2 bg-black">
      <div
        className="
        grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-1 gap-x-2 overflow-auto flex-1"
      >
        <aside className="hidden md:flex">
          <Sidebar />
        </aside>

        <section className=" flex flex-col bg-neutral-900/90 rounded-md overflow-y-auto">
          <div className="text-white flex-1 flex flex-col">
            <Header />
            {children}
          </div>
        </section>
      </div>
      <Player />
    </main>
  );
}
