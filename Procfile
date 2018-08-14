release: python manage.py migrate && python manage.py createsu && npm install && npm run-script build
web: waitress-serve --port=$PORT onhout.wsgi:application