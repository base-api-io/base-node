ci: spec format lint

lint:
	yarn eslint src/*.js src/**/*.js test/*.js test/**/*.js

format:
	yarn prettier src/*.js src/**/*.js test/*.js test/**/*.js --write

spec:
	yarn jest
