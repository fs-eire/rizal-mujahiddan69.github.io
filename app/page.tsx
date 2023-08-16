import Image from "next/image";

function Desktop_Temp({
  childnavbar,
  children,
}: {
  childnavbar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="bg-sky-500 h-12">{childnavbar}</div>
      <div className="h-full">{children}</div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex flex-row h-full">
      <a className="flex justify-center items-center basis-1/6 bg-orange-400" href="/">
        Home
      </a>
      <a className="flex justify-center items-center basis-1/6" href="/project">
        Project
      </a>
      <a className="flex justify-center items-center basis-1/6" href="/about">
        About
      </a>
    </div>
  );
}

function BioAbout({ children, hexcolor }: { children: React.ReactNode; hexcolor: string }) {
  let warnain: string = `flex flex-row h-3/5 bg-[${hexcolor}]`;
  return (
    <div className={warnain}>
      <div className="basis-2/3 h-full bg-[#FA8072] rounded-3xl px-4 py-8 mx-4">
        <h3 className="mb-4">Rizal Mujahiddan</h3>
        <div>
          Data science is not a sprint, but a marathon. It requires perseverance, hard work, and
          passion to solve complex problems and create value. I share these qualities and I’m eager
          to learn from the best in the field.
        </div>
      </div>
      <div className="basis-1/3 h-full bg-[#FA8072] rounded-3xl px-4 py-8 mx-4 flex items-center justify-center">
        <div className="my-auto bg-[#4B382A] rounded-full w-5/6 h-5/6"></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Desktop_Temp childnavbar={Navbar()}>
      <BioAbout hexcolor="#32CD32">Makanan</BioAbout>
    </Desktop_Temp>
  );
}
