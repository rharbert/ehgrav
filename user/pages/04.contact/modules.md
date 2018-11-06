---
title: Contact
module:
    -
        module__admin_title: Content
        module_list:
            -
                module_type: module__text_image
                text_image__textarea: 'How can we help you? We do our best to reply within **24 hours**.'
                module_styles__select_child:
                    - margin-left-right__xs-plus
                    - contain-inner__sm
        module_styles__select:
            - margin-left-right__xs-plus
            - contain-inner__sm
        module_isotope: '0'
        module_published: '1'
    -
        module__admin_title: Form
        module_list:
            -
                module_type: module__form_inject
                text_image__textarea: ''
                form_inject__url: /contact-form
                module_styles__text_child: col-12
                module_styles__select_child:
                    - margin-left-right__xs-plus
                    - padding-left-right__xs-plus
                    - margin-top-bottom__none
                    - padding-top__sm
                    - contain-inner
            -
                module__admin_title_child: 'Privacy Policy statement'
                module_type: module__text_image
                text_image__textarea: 'Learn about our privacy policy on the [**Shipping & Returns**](http://alicedraws.art/shipping-and-returns) page.'
                module_styles__select_child:
                    - padding-left-right__xs-plus
        module_styles__select:
            - margin-bottom__md
            - contain-inner__sm
            - background__gray2
            - paragraphs-width__50
        module_isotope: '0'
        module_published: '1'
published: true
process:
    markdown: true
    twig: true
cache_enable: false
visible: true
override_default_title: Contact
override_default_desc: 'Let us know how we can help you by using our online contact form. We do our best to reply within 24 hours.'
---

