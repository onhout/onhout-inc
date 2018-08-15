release: python manage.py migrate && python manage.py createsu
web: waitress-serve --port=$PORT onhout.wsgi:application