# code-folder package

A custom code folder for Atom projects. Automatically folds all collapsable regions on a given level any time you open a file. Folding blocks can be created using `@fold` `@fold-children` and `@fold-deep` as comments inside your code. Folding sections are closed by replacing `@` with `!`.

`@fold` and `!fold`: Automatically folds all collapsable regions between the comments on the same tab level as the comment.

`@fold-children` and `!fold-children`: Automatically folds all collapsable regions on the same tab level and one level below.

`@fold-deep` and `!fold-deep`: Automatically folds all regions at any depth between the tags.

Example use (coffeescript):
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
