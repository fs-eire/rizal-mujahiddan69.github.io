import Image from "next/image";

function Desktop_Temp({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Desktop_Temp>Teh</Desktop_Temp>
    </main>
  );
}
