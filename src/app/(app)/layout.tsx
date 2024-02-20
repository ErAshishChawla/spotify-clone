import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/app-header/header";
import Player from "@/components/music-player/player";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-screen h-screen bg-black p-2
        grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-1 gap-x-2"
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
      {/* <Player /> */}
    </main>
  );
}
