import requests
from django.core.mail import send_mail
from django.shortcuts import redirect


# Create your views here.
def send_message(request):
    recaptcha = request.POST.get('g-recaptcha-response')
    r = requests.post('https://www.google.com/recaptcha/api/siteverify', {
        "response": recaptcha,
        "secret": "6LdNvyQUAAAAABfFwGtPN65NreuFln8NtiTxpl9Q"
    })
    if request.method == "POST" and request.POST.get('email') and r.json()['success'] is True:
        person = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = "(%s:%s) sent you the following message: \"%s\"" % (person, email, request.POST.get('message'))
        send_mail(
            subject,
            message,
            'noreply@onhout.com',
            ['onhout@gmail.com'],
            fail_silently=False, )
    return redirect('/')
