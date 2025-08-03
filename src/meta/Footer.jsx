import { ExternalLinkIcon } from "lucide-react"

const listLink = [
  { label: "Make a contribution here!", link: "https://github.com/untrustnova/universys" },
  { label: "Theme reference (GDD / Game Development Department)", link: "https://bluearchive.fandom.com/wiki/Game_Development_Department" }
]

export default function Footer() {
  return <div className="w-full bg-neutral-100">
    <div className="w-full max-w-[1000px] m-auto flex flex-wrap">
      <div className="w-full md:w-[calc(100%-300px)] px-4 py-3.5">
        <h1 className="text-2xl font-semibold font-pixelify">Universys</h1>
        <p className="mt-2 text-sm">Universys or universal system command is a documentation site for all existing commands on operating systems such as Linux, Windows, MacOS and Android (Termux) with categorization, which functions as an easy search for the desired command even though different operating systems.</p>
      </div>
      <div className="w-full md:w-[300px] px-4 py-3.5">
        <h2 className="text-2xl font-semibold">More</h2>
        <ul className="mt-1 text-sm">
          {listLink.map((items, key) => (
            <li key={key}>
              <a href={items.link} target="_blank" className="text-blue-800 hover:underline flex flex-nowrap items-center group py-1">
                <span className="w-[0] duration-300 group-hover:w-[26px] overflow-hidden">
                  <ExternalLinkIcon size={17}/>
                </span>
                <span className="w-full duration-300 group-hover:w-[calc(100%-26px)]">{items.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
}