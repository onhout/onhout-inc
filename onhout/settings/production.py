from __future__ import absolute_import, unicode_literals

from .base import *

DEBUG = False

SECRET_KEY = 'qqrcvy-ly4k&$2fnu@@qo_ppsj%n1f98u3br+oh3&0^&yrle%4'


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

try:
    from .local import *
except ImportError:
    pass
