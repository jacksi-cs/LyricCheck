#!/usr/bin/env bash
python3 app.py &
service nginx start
uwsgi --ini uwsgi.ini
