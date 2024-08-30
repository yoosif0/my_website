## Setup env
* Fill env variables in ".envrc.example" and then rename it to ".envrc"
* Ensure .envrc is sourced (either manually or via direnv)
* Fill env variables in ".env.example" and then rename it to ".env"
* Ensure your content folder have the following folders 
  * md
  * images
  * gifs
* `make gen` to generate html files
* `make cp` to copy gifs and images


## Deploy
* `cd site`
* `vercel --prod`


## Build log
* arm64, Darwin Kernel Version 23.1.0, 