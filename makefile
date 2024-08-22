.PHONY: gen cp serve

# generate html from markdow
gen:
	node src/gen.mjs 

# copy images and gifs to site folder
cp:
	node src/cp.mjs	

serve:
	python3 -m http.server --directory site