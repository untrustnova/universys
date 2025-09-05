import calculatePercentageOrPosition from "../lib/calcuate-range-post"
import { ChevronUp } from "@nsmr/pixelart-react"

export default function StickyBottomSearch({ scrollTop = 0, searchText, setSearchText }) {
  return <>
    <div
      className="w-full sticky left-0 duration-100 flex justify-center items-center px-3.5 py-5"
      style={{
        bottom: calculatePercentageOrPosition(scrollTop, 90, 210, -60, 0)+"px",
        scale: calculatePercentageOrPosition(scrollTop, 90, 210, 0.9, 1),
      }}
    >
      <input
        name="search-q"
        id="search-q"
        className="w-full max-w-2xs px-3.5 py-1.5 text-sm text-center font-jetbrain outline-none bg-neutral-600/80 text-white pixel-corners bgimage-noise-state"
        autoComplete="off"
        placeholder="Search command in here!"
        value={searchText}
        onChange={(e) => { setSearchText(String(e.target?.value||"")) }}
      />
      <button className="bg-neutral-500 w-[32px] min-w-[32px] h-[32px] ml-1.5 pixel-corners cursor-pointer flex items-center justify-center" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}>
        <ChevronUp className="pointer-events-none text-white"/>
      </button>
    </div>
  </>
}