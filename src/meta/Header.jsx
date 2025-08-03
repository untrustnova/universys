import { Github } from "@nsmr/pixelart-react"

export default function Header({ scrollTop }) {
  return <>
    <div className="fixed top-0 left-0 w-full h-[150px] select-none pointer-events-none bg-black/10 masking-gradation z-40"></div>
    <header className={"w-full h-[60px] fixed top-0 left-0 duration-100 z-50"+(scrollTop > 400? " bg-white/80 backdrop-blur-sm bgimage-noise-medium":" bg-white/0")}>
      <div className="w-full h-[60px] max-w-[1000px] m-auto flex justify-between items-center px-2.5">
        <div style={{ color: scrollTop > 400? "black":"white" }} className="w-[170px] flex items-center">
          <img src="/universys/gamegirl-arisu.webp" loading="eager" className="h-[45px]"/>
          <b className="ml-2.5 text-xl font-pixelify">Universys</b>
        </div>
        <div className="w-[50px] flex justify-end items-center group">
          <div className="absolute bg-white pixel-corners shadow-md px-3 py-0.5 z-10 pointer-events-none mr-[36px] duration-300 opacity-0 group-hover:opacity-100 group-hover:mr-[50px]">
            <span className="text-sm text-black">Make a contribution here!</span>
          </div>
          <a style={{ color: scrollTop > 400? "black":"white" }} href="https://github.com/untrustnova/universys" target="_blank" className="w-[50px] h-[50px] flex justify-center items-center">
            <Github />
          </a>
        </div>
      </div>
    </header>
  </>
}