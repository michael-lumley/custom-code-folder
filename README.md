# code-folder package

A custom code folder for Atom coffeescript projects. Folding blocks can be created using `@fold` `@fold-children` and `@fold-deep` as comments inside your code. Folding sections are closed by replacing `@` with `!`.

Example use:
```
test = {
	#@fold
	level1:
		level2:
			level3: "stuff"
			level3:
				level4: "stuff"
				level4: "stuff"
		level2: "stuff"
	level1: "stuff"
	#!fold
} #Folds level1 only

test = {
	#@fold-children
	level1:
		level2:
			level3: "stuff"
			level3:
				level4: "stuff"
				level4: "stuff"
		level2: "stuff"
	level1: "stuff"
	#!fold-children
} #Folds level1 and level2

test = {
	#@fold-deep
	level1:
		level2:
			level3: "stuff"
			level3:
				level4: "stuff"
				level4: "stuff"
		level2: "stuff"
	level1: "stuff"
	#!fold-deep
} #Folds EVERYTHING below level1


```


![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
