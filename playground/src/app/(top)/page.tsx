import { ItemCard } from "@/components/item-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>

        <h1 className="text-4xl font-bold text-center">
          Welcome to the tktr Playground
        </h1>

        <p className="text-lg text-center mt-4">
          This is a playground for tktr packages.
        </p>

        <ItemCard/> 
      </section>
    </main>
  );
}
