dev:
	npm run dev

build:
	npm run build

start:
	npm run start

deploy:
	npm run build && npx gh-pages -d out

format:
	npx eslint . --fix

.PHONY: dev build start deploy format
