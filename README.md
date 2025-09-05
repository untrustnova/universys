# Universys

> [!TIP]
> This repository is indeed used as documentation, so everyone including outside this community can contribute to adding their documents here 💖

<img src="./public/gamegirl-arisu.webp" width="110" align="right"/>

Universys or universal system command is a documentation site for all existing commands on operating systems such as Linux, Windows, MacOS and Android (Termux) with categorization, which functions as an easy search for the desired command even though different operating systems.

## 🐈 How can I contribute?

Please open the /docs section to view the documentation, create a new file, make sure all file names are lowercase and use "-" to replace spaces, the format must also be yml.

Then fill in this structure:

```yml
title: Title documentation (required)
desc: Description (not mandatory, but please fill it in)
shell:
  command_prompt:
    - cmd: "" # command
      relate: #Output command
  powershell:
     - cmd: "" # command
      relate: #Output command
  bash:
     - cmd: "" # command
      relate: #Output command
  zsh:
     - cmd: "" # command
      relate: #Output command
```

Save, then commit and pull request!

### Can run on docker?

Of course, you can run it with a build first using

```bash
docker build -t universys-web .
```

Then run it
 
```bash
docker run --name universys-web -p 80:80 -d universys-web
docker ps | grep "universys-web"
```

_[Theme reference (GDD / Game Development Department)](https://bluearchive.fandom.com/wiki/Game_Development_Department) • [Make a contribution here!](https://github.com/untrustnova/universys/tree/main/docs)_