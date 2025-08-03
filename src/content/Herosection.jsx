export default function Herosection({ searchText, setSearchText }) {
  return <div className="relative w-full h-[420px] flex items-center">
    <img
      className="w-full h-full object-cover"
      src="/universys/arisu-yuzu-wp.jpg"
    />
    <div className="absolute w-full h-full flex items-center justify-center bgimage-noise-medium backdrop-blur-[2.5px] bg-black/40 px-4">
      <div className="w-full max-w-2xs absolute flex justify-end mt-[-95px]">
        <img
          src="/universys/arisu.webp"
          className="w-[75px]"
        />
      </div>
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
  </div>
}