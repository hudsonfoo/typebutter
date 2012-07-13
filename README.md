# TypeButter
==================

_Optical kerning for the web_

__About__

TypeButter allows you to set optical kerning for any font on your website. If you’re longing for beautifully laid out text that today’s browsers just don’t provide, this is the plugin for you! Also, don’t forget to check out delicious curved text using jQuery Bacon.

__Why does TypeButter create its own kern element?__

Because if it used a standard element like a span, your site’s CSS might adversely effect TypeButter. Remember: There is no “rule” against creating your own element. Really old browsers that don’t understand the new element will just ignore it.

__Does TypeButter work with screen readers?__

It works with some screen readers but not all. I’m working on this and it’s really close to being functional. Stay tuned!

__Will TypeButter slow my site down?__

That depends. If you have 200,000 words on your page and TypeButter is manipulating every letter… uhh yeah. If you have a normal site or blog, you should barely notice the difference.

__Hasn’t this already been done with optimizeLegibility?__

Nope. The optimizeLegibility declaration has limited support even among modern browsers. It also has plenty of other problems.