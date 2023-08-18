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
    <div className=" flex flex-row h-full">
      <a
        className="flex justify-center items-center basis-1/6 bg-orange-400"
        href="/"
      >
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

function BioAbout() {
  const warnain: string = `flex flex-row h-3/5 bg-[#32CD32]`;
  return (
    <div className={warnain}>
      <div className="basis-2/3 bg-[#FA8072] rounded-3xl px-4 py-8 mx-4 my-6 ">
        <h3 className="mb-4">Rizal Mujahiddan</h3>
        <div>
          Data science is not a sprint, but a marathon. It requires
          perseverance, hard work, and passion to solve complex problems and
          create value. I share these qualities and I’m eager to learn from the
          best in the field.
        </div>
      </div>
      <div className="basis-1/3 my-auto rounded-full w-52 h-52 flex items-center justify-center">
        <div className="rounded-full overflow-hidden w-52 h-52">
          <Image
            src="/traveler.jpg"
            width={208}
            height={208}
            alt="Picture of the author"
            className="object-cover rounded-full w-52 h-52"
          />
        </div>
      </div>
    </div>
  );
}

function Project() {
  return (
    <div className="flex flex-col h-2/5 bg-sky-500 ">
      <div className="text-center mt-4">About Myself</div>
      <div className="basis-full m-4 p-8 bg-amber-400 flex flex-row justify-between">
        <div className="basis-1/4 bg-teal-500 text-center flex justify-center items-center">
          Education
        </div>
        <div className="basis-1/4 bg-teal-500 text-center flex justify-center items-center">
          Organization
        </div>
        <div className="basis-1/4 bg-teal-500 text-center flex justify-center items-center">
          Competition
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Desktop_Temp childnavbar={Navbar()}>
      <BioAbout />
      <Project />
    </Desktop_Temp>
  );
}
