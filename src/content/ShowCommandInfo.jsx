import { useState } from "react"

const labelShell = {
  powershell: "Windows PowerShell",
  command_prompt: "Command Prompt",
  bash: "Bash",
  zsh: "Zsh (Z Shell)"
}

function LinkCardRelate({ link }) {
  const gethost = String(new URL(link)?.host||"")
  return <a href={link} target="_blank" className="ml-2.5 text-blue-600 hover:underline">{gethost}</a>
}

function CodeShell({ shell, cmd, output, changeDir = "$HOME" }) {
  const defaultPath = {
    win: "C:\\Users\\tendouarisu",
    linux: "~"
  }
  const activeWorkerShell = {
    powershell: `PS C:\\Users\\tendouarisu>`,
    command_prompt: `C:\\Users\\tendouarisu>`,
    bash: <>
      <span className="text-emerald-400">tendouarisu@Millennium</span>
      <span>:</span>
      <span className="text-blue-500">~</span>
      <span>#</span>
    </>,
    zsh: <>
      <span className="text-blue-500"></span>
      <span className="text-emerald-400"> tendouarisu@millennium</span>
      <span className="text-yellow-500"> ~ </span>
      <span className="text-blue-500">#</span>
    </>,
  }
  const activeWorkerShellAfter = {
    powershell: `PS ${changeDir==="$HOME"?defaultPath.win:changeDir}>`,
    command_prompt: `${changeDir==="$HOME"?defaultPath.win:changeDir}>`,
    bash: <>
      <span className="text-emerald-400">tendouarisu@Millennium</span>
      <span>:</span>
      <span className="text-blue-500">{changeDir==="$HOME"?defaultPath.linux:changeDir}</span>
      <span>#</span>
    </>,
    zsh: <>
      <span className="text-blue-500"></span>
      <span className="text-emerald-400"> tendouarisu@millennium</span>
      <span className="text-yellow-500"> {changeDir==="$HOME"?defaultPath.linux:changeDir} </span>
      <span className="text-blue-500">#</span>
    </>,
  }
  return <div className="bg-black/80 text-white backdrop-blur-sm bgimage-noise-medium overflow-y-auto mt-2.5 py-2.5 pixel-corners font-jetbrain">
    <div className="w-full px-4">
      <span className="block text-sm text-nowrap whitespace-pre"><span>{activeWorkerShell[shell]}</span>{` ${cmd}`}</span>
      <span className="text-sm text-nowrap whitespace-pre">{output}</span>
      <span className="block text-sm text-nowrap whitespace-pre"><span>{activeWorkerShellAfter[shell]}</span></span>
    </div>
  </div>
}

export default function ShowCommandInfo({ data }) {
  const [selectShell, setSelectShell] = useState(Object.keys(data.shell)[0]||"unknowing")
  const dataSelect = data?.shell[selectShell]||[]
  return <div className="w-full px-3.5 py-5">
    <h1 className="text-2xl font-semibold"><span className="mr-2 text-blue-600">#</span>{data.title}</h1>
    <div className="w-auto mt-2 flex overflow-y-auto">
      <div className="flex">
        {Object.keys(data.shell).map((kes, i) => (
          <button
            onClick={() => { setSelectShell(kes) }}
            className={"p-1.5 px-3.5 mr-2.5 pixel-corners duration-100 text-nowrap cursor-pointer"+(selectShell === kes?" text-white bg-sky-700/70 font-semibold":" bg-neutral-100")}
            key={kes}
          >{labelShell[kes]}</button>
        ))}
      </div>
    </div>
    <div className="mt-3.5">
      {dataSelect.map((items, i) => (
        <div className="w-full" key={i}>
          <CodeShell shell={selectShell} cmd={items.cmd} changeDir={items.dir||"$HOME"} output={items.output}/>
          {items?.relate&&<div className="w-full flex items-center py-2.5 pb-0">
            <span>Relate:</span>
            {items?.relate?.map((links, i) => (
              <LinkCardRelate link={links} key={i}/>
            ))}
          </div>}
        </div>
      ))}
    </div>
    <p className="mt-2.5">{data.desc}</p>
  </div>
}