.DEFAULT_GOAL := run
SHELL         := bash

build-frontend:
	cd frontend; \
	npm i;		 \
	npm run build

start:
	cd frontend; \
	npm i;		 \
	npm start

jest:
	cd frontend; \
    npm install; \
    npm run test

# auto format the Python code
format-py:
	black ./backend/*.py
	black ./frontend/*.py
	black ./frontend/guitests/*.py
	# black ./backend/flask_api/*.py

# auto format the JavaScript code
format-js:
	npx eslint ./frontend/src/*.js
	npx eslint ./frontend/src/__tests__/*.js
	npx eslint ./frontend/src/components/*.js
	npx eslint ./frontend/src/components/ranking-pages/*.js

selenium_test:
	cd ./frontend/guitests/ && chmod +x chromedriver_linux && chmod +x chromedriver_mac
	cd ./frontend/ && python3 guitests.py

