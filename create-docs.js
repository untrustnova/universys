import fs from "fs"
import path from "path"
import * as cheerio from "cheerio"
import yamlConvert from "js-yaml"
import { fileURLToPath } from "url"
import htmlMinify from "html-minifier"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const disableMinify = process.argv.includes("--nominify")
const htmlIndexBuild = path.join(__dirname, "./dist/index.html")
const saveOtherChuck = path.join(__dirname, "./dist/_docsjson/")
const documentFolder = path.join(__dirname, "./docs")
const chuckRendered = 10
const chuckFirstRender = 3


function InsertDocument() {
  console.log("[Insert Document Chuck]: Build → ", htmlIndexBuild)
  console.log("[Insert Document Chuck]: Docs  → ", documentFolder)

  let insertData = []
  const listdir = fs.readdirSync(documentFolder)
  for(let file of listdir) {
    const pathfile = path.join(documentFolder, file)
    const readfile = fs.readFileSync(pathfile, "utf-8")
    const jsonfile = yamlConvert.load(readfile)
    insertData.push(jsonfile)
  }
  const endChuckRender = chuckFirstRender*chuckRendered
  const splitingChuck = endChuckRender < insertData.length? parseInt((insertData.length-endChuckRender)/chuckRendered):0
  const createChuckfirst = insertData.slice(0, endChuckRender)
  // First
  const readIndex = fs.readFileSync(htmlIndexBuild, "utf-8")
  const $ = cheerio.load(readIndex)
  $('[data-content="render-chuck"]').attr("data-chuck", String(splitingChuck))
  $('[data-content="render-chuck"]').text(JSON.stringify(createChuckfirst))
  let htmlRender = $.html().replace(/\n\n/g, "")
  if(!disableMinify) {
    htmlRender = htmlMinify.minify(htmlRender, {
      collapseWhitespace: true,
      removeComments: true,
      collapseBooleanAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      minifyJS: true,
      minifyCSS: true
    })
  }
  fs.writeFileSync(htmlIndexBuild, htmlRender)
  // Spliting Chuck
  if(splitingChuck > 0) {
    console.log("[Insert Document Chuck]: Create external chuck...")
    for(let i in Array.from({ length: splitingChuck })) {
      const indexFirst = parseInt(i)
      const startChuck = (indexFirst*chuckRendered)+createChuckfirst.length
      const endChuck = (startChuck+chuckRendered)
      const fileName = `chuck-${i}.json`
      if(!fs.existsSync(saveOtherChuck) || !fs.lstatSync(saveOtherChuck).isDirectory()) {
        fs.mkdirSync(saveOtherChuck, { recursive: true })
      }
      const pathSave = path.join(saveOtherChuck, fileName)
      fs.writeFileSync(pathSave, JSON.stringify(
        insertData.slice(startChuck, endChuck)
      ), "utf-8")
      console.log("[Insert Document Chuck]: Create other chuck:", pathSave)
    }
  }
}
InsertDocument()