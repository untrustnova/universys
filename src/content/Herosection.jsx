export default function Herosection({ searchText, setSearchText }) {
  return <div className="relative w-full h-[420px] flex items-center">
    <img
      className="w-full h-full object-cover"
      src="./arisu-yuzu-wp.jpg"
    />
    <div className="absolute w-full h-full flex flex-col items-center justify-center bgimage-noise-medium backdrop-blur-[2.5px] bg-black/55 px-4">
      <div className="w-full max-w-2xs flex items-start">
        <img
          src="./arisu.webp"
          className="w-[75px] -mt-[55px] absolute"
        />
        <input
          name="search-q"
          id="search-q"
          className="w-full max-w-2xs px-3.5 py-2 text-center font-jetbrain font-semibold outline-none bg-neutral-800/50 text-white pixel-corners bgimage-noise-state"
          autoComplete="off"
          placeholder="Search command in here!"
          value={searchText}
          onChange={(e) => { setSearchText(String(e.target?.value||"")) }}
        />
      </div>
      <div className="w-full max-w-2xs pt-2.5">
        <p className="text-center text-white">Search any command in here sensei!</p>
      </div>
    </div>
  </div>
}