import { useDebounce } from "use-debounce"
import { toast, Toaster } from "sonner"
import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"
import Header from "./meta/Header"
import Herosection from "./content/Herosection"
import StickyBottomSearch from "./content/StickyBottomSearch"
import Footer from "./meta/Footer"
import ShowCommandInfo from "./content/ShowCommandInfo"

export default function App() {
  const [scrollTop, setScrollTop] = useState(0)
  const [searchText, setSearchText] = useState("")
  const [valueSearch] = useDebounce(searchText, 300)
  const [showData, setShowData] = useState([])
  const [loadData, setLoadData] = useState([])

  async function UpdateScroll() {
    const scrollIt = document.body.scrollTop || document.documentElement.scrollTop
    setScrollTop(scrollIt)
  }
  async function LoadChuck(dataIndex, urlRequest) {
    try {
      const data = await fetch(urlRequest.replace("{{RENDER}}", dataIndex))
      const json = await data.json()
      if(Array.isArray(json)) {
        setLoadData([
          ...loadData,
          ...json
        ])
      }
    } catch(e) {
      toast.error(`Load chuck error: ${e.message}`, {
        description: e.stack
      })
    }
  }
  function SearchDocs() {
    const valueSafety = String(valueSearch).trim().replace(/[^A-Za-z :.,"'*//]/g, '').toLowerCase()
    const filterMatch = loadData.filter(a => String(JSON.stringify(a)).toLowerCase().match(valueSafety))
    // console.log("Search:", valueSafety)
    // console.log("Match:", filterMatch)
    // console.log("Load:", loadData)
    if(!filterMatch[0]) {
      setShowData("notfound")
    } else {
      setShowData(filterMatch)
    }
  }
  async function LoadFirst() {
    const dataDom = document.querySelector('script[data-content="render-chuck"]')
    const totalChuck = parseInt(dataDom.getAttribute("data-chuck")||"0")
    const urlChuck = String(dataDom.getAttribute("data-src")||"").trim()
    const dataJson = JSON.parse(dataDom.innerText)
    setLoadData(dataJson)
    if(totalChuck > 0) {
      // console.log("[Docs Chuck]: Load...")
      for(let i in Array.isArray({ length: totalChuck })) {
        await LoadChuck(parseInt(i), urlChuck)
      }
    }
  }

  useEffect(() => {
    SearchDocs()
  }, [valueSearch, loadData])
  useEffect(() => {
    LoadFirst()
    window.addEventListener("scroll", UpdateScroll)
    return () => {
      window.removeEventListener("scroll", UpdateScroll)
    }
  }, [])

  return <>
    <ReactLenis root/>
    <Toaster theme="light"/>
    <Header
      scrollTop={scrollTop}
    />
    <Herosection
      searchText={searchText}
      setSearchText={setSearchText}
    />
    <div className="min-h-screen max-w-[1000px] m-auto py-2.5">
      {showData === "notfound"&&<div className="w-full h-[450px] flex justify-center items-center">
        <p>Upss..., Result not found!</p>  
      </div>}
      {Array.isArray(showData) && showData?.map((i, k) => (
        <ShowCommandInfo data={i} key={k}/>
      ))}
    </div>
    <StickyBottomSearch
      searchText={searchText}
      setSearchText={setSearchText}
      scrollTop={scrollTop}
    />
    <Footer />
  </>
}