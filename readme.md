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


## todo
* list item should be like bing search results and show to what domain the user would go

