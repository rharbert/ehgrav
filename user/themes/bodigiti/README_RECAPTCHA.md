# Google Invisible reCaptcha Setup
## Sign up for google recaptcha at https://www.google.com/recaptcha/admin#list
## Google instructions https://developers.google.com/recaptcha/docs/invisible

## Steps taken in this theme using google instructions

1) head.html.twig
Include google script
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

2) site.js
Add JS function to site.js file which is included at the bottom of the site
  <script>
    function onSubmit(token) {
      document.getElementById("contact").submit();
    }
  </script>

3) form.html.twig
Add to form "submit" button css selector class, data-sitekey, and data-callback
  class... g-recaptcha
  data-sitekey="get this from your google account"
  data-callback='onSubmit'
