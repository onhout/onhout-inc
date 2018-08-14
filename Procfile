release: python manage.py migrate && python manage.py createsu && npm install
web: waitress-serve --port=$PORT onhout.wsgi:application