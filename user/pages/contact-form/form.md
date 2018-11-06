---
title: 'Form: Contact Form'
published: false
form:
    action: /thank-you
    name: contact
    classes: forms
    fields:
        -
            name: name
            label: Name
            placeholder: 'Your name*'
            autocomplete: 'on'
            type: text
            classes: 'form-text form-item'
            validate:
                required: true
        -
            name: email
            label: Email
            placeholder: 'Your email address*'
            type: email
            classes: 'form-email form-item'
            validate:
                required: true
        -
            name: message
            label: Message
            placeholder: 'Your message*'
            type: textarea
            classes: form-textarea
            validate:
                required: true
        -
            name: address
            type: honeypot
    buttons:
        -
            type: submit
            classes: form-submit
            value: Submit
    process:
        -
            email:
                reply-to: '{{ form.value.email }}'
                subject: '[Site Contact Form] {{ form.value.name|e }}'
                body: '{% include ''forms/data.html.twig'' %}'
        -
            save:
                fileprefix: contact-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            reset: true
        -
            display: /thank-you
---

