
/***********************************************
Minify-HTML Plugin !
***********************************************/
Minify-HTML breaks Taxonomy page views when grav cache is enabled if minify-html
settings are too aggressing.
  -do not enable minify-html cache... Minify HTML Cache = Disabled
  -Compression mode should be set to "fastest" so it only minifies html and not
  js or css
  -see plugin readme file for details

  PRODUCTION SETTINGS should be:
    enabled: true
    cache: false
    mode: fastest

  https://github.com/jimblue/grav-plugin-minify-html/blob/master/README.md

/***********************************************
IGNORED FILES THAT ARE LISTED IN .GITIGNORE
***********************************************/
This comment is NOT about the .gitignore file itself; but rather, it's about the FILES
listed in the .gitignore file.

All the files listed in the .gitignore file are IGNORED.  Therefore, if you make a change to a file
listed in the .gitignore file, your team should be updated.
