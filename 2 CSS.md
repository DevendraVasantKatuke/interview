##### External Stylesheet
```
<link rel="stylesheet" type="text/css" href="style.css">
```
##### CSS @import rule (one of CSS at-rule)
```
<style>
    @import url('/css/styles.css');
    @import 'https://fonts.googleapis.com/css?family=Lato';
    @import '/print-styles.css' print;
    @import url('landscape.css') screen and (orientation:landscape);
</style>
```
##### Changing CSS with JavaScript
```
var el = document.getElementById("element");
el.style.opacity = 0.5;
el.style.fontFamily = 'sans-serif';
```
##### liststyle
```
li {
    list-style-type: square; // disc, circle, ...
    list-style-image: url(images/bullet.png);
    list-style-position: inside;
}
```
##### Property Lists
```
span {
    text-shadow:
        yellow 0 0 3px,
        green 4px 4px 10px;
}
```
##### Multiple Selectors
```
p, .blue, #first, div span { 
    color : blue 
}
```
##### Basic selectors
- `*`
- `div` Tag selector
- `.blue` Class selector
- `.blue.red` All elements with class blue and red (a type of Compound selector)
- `#headline` ID selector
- `:pseudo-class` All elements with pseudo-class
- `::pseudo-element` Element that matches pseudo-element
- `:lang(en)` ie `<span lang="en">`
- `div > p` child selector

##### Attribute Selectors
|Selector(1)|Matched element|Selects elements...|
|-|-|-|
|[attr]|`<div attr>`|With attribute `attr`|
|[attr='val']|`<div attr="val">`|Where attribute `attr` has value val|
|[attr~='val']|`<div attr="val val2 val3">`|Where val appears in the whitespace-separated list of attr|
|[attr^='val']|`<div attr="val1 val2">`|Where attr's value begins with val|
|[attr$='val']|`<div attr="sth aval">`|Where the attr's value ends with val|
|[attr*='val']|`<div attr="somevalhere">`|Where attr contains val anywhere
|[attr\|='val']|`<div attr="val-sth etc">`|Where attr's value is exactly val, or starts with val and immediately followed by - (U+002D)|
|[attr='val' i]|`<div attr="val">`|Where attr has value val, ignoring val's letter casing.|

##### [attribute]
```
div[data-color] {
    color: red;
}

<div data-color="red">This will be red</div>
<div data-color="green">This will be red</div>
<div data-background="red">This will NOT be red</div>
```
##### [attribute="value"]
```
div[data-color="red"] {
color: red;
}
<div data-color="red">This will be red</div>
<div data-color="green">This will NOT be red</div>
<div data-color="blue">This will NOT be red</div>
```
##### [attribute*="value"]
```
[class*="foo"] {
    color: red;
}
<div class="foo-123">This will be red</div>
<div class="foo123">This will be red</div>
<div class="bar123foo">This will be red</div>
<div class="barfooo123">This will be red</div>
<div class="barfo0">This will NOT be red</div>
```
##### [attribute~="value"]
```
[class~="color-red"] {
    color: red;
}
<div class="color-red foo-bar the-div">This will be red</div>
<div class="color-blue foo-bar the-div">This will NOT be red</div>
```
##### [attribute^="value"]
```
[class^="foo-"] {
    color: red;
}
<div class="foo-123">This will be red</div>
<div class="foo-234">This will be red</div>
<div class="bar-123">This will NOT be red</div>
```
##### [attribute$="value"]
```
[class$="file"] {
    color: red;
}
<div class="foobar-file">This will be red</div>
<div class="foobar-file">This will be red</div>
<div class="foobar-input">This will NOT be red</div>
```
##### [attribute|="value"]
```
[lang|="EN"] {
    color: red;
}
<div lang="EN-us">This will be red</div>
<div lang="EN-gb">This will be red</div>
<div lang="PT-pt">This will NOT be red</div>
```
##### [attribute="value" i]
```
[lang="EN" i] {
    color: red;
}
<div lang="EN">This will be red</div>
<div lang="en">This will be red</div>
<div lang="PT">This will NOT be red</div>
```
##### Speciﬁcity of attribute selectors
Same as class selector and pseudoclass.
```
*[type=checkbox] // 0-1-0
```
Note that this means an attribute selector can be used to select an element by its ID at a lower level of speciﬁcity than if it was selected with an ID selector: [id="my-ID"] targets the same element as #my-ID but with lower speciﬁcity.

##### Combinators
- `div span` Descendant selector (all `<span>`s that are descendants of a `<div>`)
- `div > span` Child selector (all `<span>`s that are a direct child of a `<div>`)
- `a ~ span` General Sibling selector (all `<span>`s that are siblings after an `<a>`)
- `a + span` Adjacent Sibling selector (all `<span>`s that are immediately after an `<a>`)

##### Descendant Combinator: selector selector
```
div p {
    color:red;
}
<div>
    <p>My text is red</p>
    <section>
        <p>My text is red</p>
    </section>
</div>
<p>My text is not red</p>
```
##### Child Combinator: selector > selector
```
div > p {
    color:red;
}
<div>
    <p>My text is red</p>
    <section>
        <p>My text is not red</p>
    </section>
</div>
```
##### Adjacent Sibling Combinator: selector + selector
```
p + p {
    color:red;
}
<p>My text is not red</p>
<p>My text is red</p>
<p>My text is red</p>
<hr>
<p>My text is not red</p>
```
##### General Sibling Combinator: selector ~ selector
```
p ~ p {
    color:red;
}
<p>My text is not red</p>
<p>My text is 
<hr>
<h1>And now a title</h1>
<p>My text is red</p>
```
##### Pseudo-classes
Pseudo-classes are keywords which allow selection based on information that lies outside of the document tree or that cannot be expressed by other selectors or combinators.
- `:active` Applies to any element being activated (i.e. clicked) by the user.
- `:any` Allows you to build sets of related selectors by creating groups that the included items will match. This is an alternative to repeating an entire selector.
- `:target` Selects the current active #news element (clicked on a URL containing that anchor name)
- `:checked` Applies to radio, checkbox, or option elements that are checked or toggled into an "on" state.
- `:default` Represents any user interface element that is the default among a group of
similar elements.
- `:disabled` Applies to any UI element which is in a disabled state.
- `:empty` Applies to any element which has no children.
- `:enabled` Applies to any UI element which is in an enabled state.
- `:first` Used in conjunction with the @page rule, this selects the ﬁrst page in a
printed document.
- `:first-child` Represents any element that is the ﬁrst child element of its parent.
- `:first-of-type` Applies when an element is the ﬁrst of the selected element type inside its parent. This may or may not be the ﬁrst-child.
- `:focus` Applies to any element which has the user's focus. This can be given by the
user's keyboard, mouse events, or other forms of input.
- `:focus-within` Can be used to highlight a whole section when one element inside it is focused. It matches any element that the :focus pseudo-class matches or that has a descendant focused.
- `:full-screen` Applies to any element displayed in full-screen mode. It selects the whole stack
of elements and not just the top level element.
- `:hover` Applies to any element being hovered by the user's pointing device, but
not activated.
- `:indeterminate` Applies radio or checkbox UI elements which are neither checked nor
unchecked, but are in an indeterminate state. This can be due to an element's attribute or DOM manipulation.
- `:in-range` The :in-range CSS pseudo-class matches when an element has its value attribute inside the speciﬁed range limitations for this element. It allows the page to give a feedback that the value currently deﬁned using the element is inside the range limits.
- `:invalid` Applies to <input> elements whose values are invalid according to the type speciﬁed in the type= attribute.
- `:lang` Applies to any element who's wrapping <body> element has a properly designated lang= attribute. For the pseudo-class to be valid, it must contain a valid two or three letter language code.
- `:last-child` Represents any element that is the last child element of its parent.
- `:last-of-type` Applies when an element is the last of the selected element type inside
its parent. This may or may not be the last-child.
- `:left` Used in conjunction with the @page rule, this selects all the left pages in a printed document.
- `:link` Applies to any links which haven't been visited by the user.
- `:not()` Applies to all elements which do not match the value passed to (:not(p) or :not(.class-name) for example. It must have a value to be valid and it can only contain one selector. However, you can chain multiple :not selectors together.
- `:nth-child` Applies when an element is the n-th element of its parent, where n can be an integer, a mathematical expression (e.g n+3) or the keywords odd or even.
- `:nth-of-type` Applies when an element is the n-th element of its parent of the same element type, where n can be an integer, a mathematical expression (e.g n+3) or the keywords odd or even.
- `:only-child` The :only-child CSS pseudo-class represents any element which is the only child of its parent. This is the same as :first-child:last-child or :nth-child(1):nth-last-child(1),
but with a lower speciﬁcity.
- `:optional` The :optional CSS pseudo-class represents any element that does not have the required attribute set on it. This allows forms to easily indicate optional ﬁelds and to style them accordingly.
- `:out-of-range` The :out-of-range CSS pseudo-class matches when an element has its value attribute outside the speciﬁed range limitations for this element. It allows the page to give a feedback that the value currently deﬁned using the element is outside the range limits. A value can be outside of a range if it is either smaller or larger than maximum and minimum set values.
- `:placeholder-shown` Experimental. Applies to any form element currently displaying placeholder text.
- `:read-only` Applies to any element which is not editable by the user.
- `:read-write` Applies to any element that is editable by a user, such as <input> elements.
- `:right` Used in conjunction with the @page rule, this selects all the right pages in a
printed document.
- `:root` matches the root element of a tree representing the document.
- `:scope` CSS pseudo-class matches the elements that are a reference point for selectors to match against.
- `:target` Selects the current active #news element (clicked on a URL containing that anchor name)
- `:visited` Applies to any links which have has been visited by the user.

##### Child Pseudo Class
|pseudo-selector|1|2|3|4|5|6|7|8|9|10|
|-|-|-|-|-|-|-|-|-|-|-|
|:first-child|1||||||||||
|:nth-child(3)|||3||||||||
|:nth-child(n+3)|||3|4|5|6|7|8|9|10|
|:nth-child(3n)|||3|||6|||9||
|:nth-child(3n+1)|1|||4|||7|||10|
|:nth-child(-n+3)|1|2|3||||||||
|:nth-child(odd)|1||3||5||7||9||
|:nth-child(even)||2||4||6||8||10|
|:last-child||||||||||10|
|:nth-last-child(3)|||||||||9||

##### Class Name Selectors
```
.important {
    color: orange;
}
.warning {
    color: blue;
}
.warning.important {
    color: red;
}

<div class="warning">
    <p>This would be some warning copy.</p>
</div>
<div class="important warning">
    <p class="important">This is some really important warning copy.</p>
</div>
```
elements that have both the .important and .warning class name will have a red text color.
> Notice that within the CSS, the .warning.important declaration did not have any spaces between the two class names. This means it will only ﬁnd elements which contain both class names warning and important in their class attribute. Those class names could be in any order on the element.

> If a space was included between the two classes in the CSS declaration, it would only select elements that have parent elements with a .warning class names and child elements with .important class names.

##### ID selector
```
<div id="element">...</div>

#element { ... } /* High specificity will override many selectors */
[id="element"] { ... } /* Low specificity, can be overridden easily */
```
##### The :last-of-type selector
```
p:last-of-type {
    background: #C5CAE9;
}
h1:last-of-type {
    background: #CDDC39;
}

<div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <p>Last paragraph #C5CAE9</p>
    <h1>Heading 1 #C5CAE9</h1>
    <h2>First heading 2</h2>
    <h2>Last heading 2</h2>
</div>
```
##### CSS3 :in-range selector
```
<style>
    input:in-range {
        border: 1px solid blue;
    }
</style>

<input type="number" min="10" max="20" value="15">
<p>The border for this value will be blue</p>
```
##### The :not pseudo-class example
```
input:not([disabled]):not(.example){
    background-color: #ccc;
}

<form>
    Phone: <input type="tel" class="example">
    E-mail: <input type="email" disabled="disabled">
    Password: <input type="password">
</form>
```
```
input:not([disabled], .example){
    background-color: #ccc;
}
```
##### The :focus-within CSS pseudo-class
```
div {
    height: 80px;
}
input {
    margin:30px;
}
div:focus-within {
    background-color: #1565C0;
}

<h3>Background is blue if the input is focused .</p>
<div>
    <input type="text">
</div>
```
##### Global boolean with checkbox:checked and ~ (general sibling combinator)
```
<input type="checkbox" id="sidebarShown" hidden />
<input type="checkbox" id="darkThemeUsed" hidden />
<!-- here begins actual content, for example: -->
<div id="container">
    <div id="sidebar">
        <!-- Menu, Search, ... -->
    </div>
    <!-- Some more content ... -->
</div>
<div id="footer">
    <!-- ... -->
</div>
```
Change the boolean's value
```
<label for="sidebarShown">Show/Hide the sidebar!</label>
```
Accessing boolean value with CSS
```
/* true: */
<checkbox>:checked ~ [sibling of checkbox & parent of target] <target>
/* false: */
<checkbox>:not(:checked) ~ [sibling of checkbox & parent of target] <target>
```
> `<checkbox>`, [sibling ...] and `<target>` should be replaced by the proper selectors.
```
#sidebarShown:checked ~ #container #sidebar {
    margin-left: 300px;
}
#darkThemeUsed:checked ~ #container,
#darkThemeUsed:checked ~ #footer {
    background: #333;
}
```
##### How to style a Range input
```
<input type="range"></input>
```
- `Thumb` 
    - input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb,
    - input[type=range]::-ms-thumb

- `Track`
    - input[type=range]::-webkit-slider-runnable-track, input[type=range]::-moz-range-track,
    - input[type=range]::-ms-track
- `OnFocus`
    - input[type=range]:focus
- Lower part of the track
    - input[type=range]::-moz-range-progress, input[type=range]::-ms-fill-lower

##### The :only-child pseudo-class selector example
```
<div>
    <p>This paragraph is the only child of the div, it will have the color blue</p>
</div>
<div>
    <p>This paragraph is one of the two children of the div</p>
    <p>This paragraph is one of the two children of its parent</p>
</div>
```
```
p:only-child {
    color: blue;
}
```
##### Background Color
- `transparent`, speciﬁes that the background color should be transparent. This is default.
- `inherit`, inherits this property from its parent element.
- `initial`, sets this property to its default value.
```
background-color: rgb(0, 0, 0); /* black */
background-color: rgba(0, 0, 0, 0.5); /* black with 50% opacity */
background-color: hsl(120, 100%, 50%); /* green */
background-color: hsla(120, 100%, 50%, .3); /* green with 30% opacity */
```
```
background: red url(partiallytransparentimage.png);
```
##### Background Gradients
- `linear-gradient()`
- `repeating-linear-gradient()`
- `radial-gradient()`
- `repeating-radial-gradient()`

##### linear-gradient()
```
.linear-gradient {
    background: linear-gradient(to left, red, blue); /* you can also use 270deg */
}
```
```
.diagonal-linear-gradient {
    background: linear-gradient(to left top, red, yellow 10%);
}
```
```
.linear-gradient-rainbow {
    background: linear-gradient(to left, red, orange, yellow, green, blue, indigo, violet)
}
```
##### radial-gradient()
```
.radial-gradient-simple {
    background: radial-gradient(red, blue);
}
.radial-gradient {
    background: radial-gradient(circle farthest-corner at top left, red, blue);
}
```
- `circle` Shape of gradient. Values are circle or ellipse, default is ellipse.
- `farthest-corner` Keywords describing how big the ending shape must be. Values are closest-side, farthestside, closest-corner, farthest-corner
- `top left` Sets the position of the gradient center, in the same way as background-position.

##### Repeating gradients
```
.bullseye {
    background: repeating-radial-gradient(red, red 10%, white 10%, white 20%);
}
.warning {
    background: repeating-linear-gradient(-45deg, yellow, yellow 10%, black 10%, black 20% );
}
```
- `-45deg` Angle unit. The angle starts from to top and rotates clockwise. Can be speciﬁed in deg, grad, rad, or turn.
- `to left` Direction of gradient, default is to bottom. Syntax: to [y-axis(top OR bottom)] [x-axis(left OR right)] ie to top right
`yellow 10%` Color, optionally followed by a percentage or length to display it at. Repeated two or more times.

##### multiple images as background-image
```
.myClass {
    background-image: url('/path/to/image.jpg'), url('/path/to/image2.jpg');
}
```
- `url('/path/to/image.jpg')` Specify background image's path(s) or an image resource speciﬁed with data URI schema (apostrophes can be omitted), separate multiples by comma
- `none` No background image
- `initial` Default value
- `inherit` Inherit parent's value
- `background-size:` xpx ypx | x% y%;
- `background-repeat:` no-repeat | repeat | repeat-x | repeat-y;
- `background-position:` left offset (px/%) right offset (px/%) | center center | left top | right
bottom;

##### Background Shorthand
- `background-image` Background image to use
- `background-color` Background color to apply
- `background-position` Background image's position
- `background-size` Background image's size
- `background-repeat` How to repeat background image
- `background-origin` How the background is positioned (ignored when background-attachment is
fixed)
- `background-clip` How the background is painted relative to the content-box, border-box, or the
padding-box
- `background-attachment` How the background image behaves, whether it scrolls along with its containing block or has a ﬁxed position within the viewport
- `initial` Sets the property to value to default
- `inherit` Inherits property value from parent

The syntax of the background shorthand declaration is:
```
background: [<background-image>] [<background-color>] [<background-position>]/[<background-size>]
[<background-repeat>] [<background-origin>] [<background-clip>] [<background-attachment>]
[<initial|inherit>];
```
```
background: red;
background: border-box red;
background: no-repeat center url("somepng.jpg");
background: url('pattern.png') green;
background: #000000 url("picture.png") top left / 600px auto no-repeat;
```
##### Background Size
```
background-size: 50px;
background-size: 50px auto; /* same as above */
background-size: auto 50px;
background-size: 50px 50px;
```
```
#withbackground {
    background-image: url(to/some/background.png);
    background-size: 100% 66%;
    width: 200px;
    height: 200px;
    padding: 0;
    margin: 0;
}
```
##### Keeping the aspect ratio
The last example in the previos section lost its original aspect ratio. The circle got into an ellipse, the square into a rectangle, the triangle into another triangle. The length or percentage approach isn't ﬂexible enough to keep the aspect ratio at all times. auto doesn't help, since you might not know which dimension of your element will be larger. However, to cover certain areas with an image (and correct aspect ratio) completely or to contain an image with correct aspect ratio completely in a background area, the values, contain and cover provide the additional functionality.

##### Explanation for `contain` and `cover`
we're going to use a picture of the day by Biswarup Ganguly for demonstration. Lets say that this is your screen, and the gray area is outside of your visible screen. For demonstration, We're going to assume a 16 × 9 ratio.

We want to use the aforementioned picture of the day as a background. However, we cropped the image to 4x3 for some reason. We could set the background-size property to some ﬁxed length, but we will focus on contain and cover. Note that I also assume that we didn't mangle the width and/or height of body.

> `contain`

> Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can ﬁt inside the background positioning area. This makes sure that the background image is always completely contained in the background positioning area, however, there could be some empty space ﬁlled with your background-color in this case

> `cover`

> Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area. This makes sure that the background image is covering everything. There will be no visible background-color, however depending on the screen's ratio a great part of your image could be cut oﬀ:

```
div > div {
    background-image: url(http://i.stack.imgur.com/r5CAq.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ccc;
    border: 1px solid;
    width: 20em;
    height: 10em;
}
div.contain {
    background-size: contain;
}
div.cover {
    background-size: cover;
}
div > div {
    margin: 0 1ex 1ex 0;
    float: left;
}
div + div {
    clear: both;
    border-top: 1px dashed silver;
    padding-top:1ex;
}
div > div::after {
    background-color: #000;
    color: #fefefe;
    margin: 1ex;
    padding: 1ex;
    opacity: 0.8;
    display: block;
    width: 10ex;
    font-size: 0.7em;
    content: attr(class);
}

<div>
    <div class="contain"></div>
    <p>Note the grey background. The image does not cover the whole region, but it's fully <em>contained</em>.</p>
</div>
<div>
    <div class="cover"></div>
    <p>Note the ducks/geese at the bottom of the image. Most of the water is cut, as well as a part of the sky. You don't see the complete image anymore, but neither do you see any background color; the image <em>covers</em> all of the <code>&lt;div&gt;</code>.
    </p>
</div>
```
##### Background Position
```
.myClass {
    background-image: url('path/to/image.jpg');
    background-position: 50% 50%;
}
```
- `value% value%`
    - A percentage for the horizontal oﬀset is relative to (width of background positioning area - width of background image).
    - A percentage for the vertical oﬀset is relative to (height of background positioning area - height of background image)
    - The size of the image is the size given by background-size. 
- `valuepx valuepx` 
    - Oﬀsets background image by a length given in pixels relative to the top left of the background positioning area

##### Longhand Background Position Properties
```
backgroundposition-x
background-position-y
```
##### The background-origin property
> If the background-attachment property is set to fixed, this property has no eﬀect.
```
background-origin: padding-box // The position is relative to the padding box
background-origin: border-box // The position is relative to the border box
background-origin: content-box // The position is relative to the content box
background-origin: initial
background-origin: inherit
```
##### Multiple Background Image
#mydiv {
    background-image: url(img_1.png), /* top image */
    url(img_2.png), /* middle image */
    url(img_3.png); /* bottom image */
    background-position: right bottom,
                        left top,
                        right top;
    background-repeat:  no-repeat,
                        repeat, 
                        no-repeat;
}
we can use background shorthand property for this:
```
#mydiv {
    background: url(img_1.png) right bottom no-repeat,
    url(img_2.png) left top repeat,
    url(img_3.png) right top no-repeat;
}
```
We can also stack images and gradients:
```
#mydiv {
    background: url(image.png) right bottom no-repeat,
    linear-gradient(to bottom, #fff 0%,#000 100%);
}
```
##### Background Attachment
The background-attachment property sets whether a background image is ﬁxed or scrolls with the rest of the page.
```
body {
    background-image: url('img.jpg');
    background-attachment: fixed;
}
```
- `scroll` The background scrolls along with the element. This is default.
- `ﬁxed` The background is ﬁxed with regard to the viewport.
- `local` The background scrolls along with the element's contents.
- `initial` Sets this property to its default value.
- `inherit` Inherits this property from its parent element.
```
body {
    background-image: url('image.jpg');
    background-attachment: scroll;
}
```
The background image will be ﬁxed and will not move when the body is scrolled:
```
body {
    background-image: url('image.jpg');
    background-attachment: fixed;
}
```
The background image of the div will scroll when the contents of the div is scrolled.
```
div {
    background-image: url('image.jpg');
    background-attachment: local;
}
```
##### The background-clip property speciﬁes the painting area of the background.
- `border-box` is the default value. This allows the background to extend all the way to the outside edge of the element's border.
- `padding-box` clips the background at the outside edge of the element's padding and does not let it extend into the border;
- `content-box` clips the background at the edge of the content box.
- `inherit` applies the setting of the parent to the selected element.
```
.example {
    width: 300px;
    border: 20px solid black;
    padding: 50px;
    background: url(https://../workspace-medium.jpg);
    background-repeat: no-repeat;
}
.example1 {}
.example2 { background-origin: border-box; }
.example3 { background-origin: content-box; }
```
##### Background Repeat
```
background-repeat: repeat-y;
background-repeat: no-repeat;
```
##### background-blend-mode
```
background-blend-mode:saturation;

background-blend-mode: normal | multiply | screen | overlay | darken | lighten | color-dodge | saturation | color | luminosity;
```
##### Centering using CSS transform
```
<div class="container">
    <div class="element"></div>
</div>

.container {
    position: relative;
}
.element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
> Using a non-static width/height elements with this method of centering can cause the centered element to appear squished. This mostly happens with elements containing text, and can be ﬁxed by adding: marginright: -50%; and margin-bottom: -50%;

##### Centering Using margin: 0 auto;
Objects can be centered by using margin: 0 auto; if they are block elements and have a deﬁned width.
```
<div class="containerDiv">
    <div id="centeredDiv"></div>
</div>
<div class="containerDiv">
    <p id="centeredParagraph">This is a centered paragraph.</p>
</div>
<div class="containerDiv">
    <img id="centeredImage" src="https://..all.jpg" />
</div>

.containerDiv {
    width: 100%;
    height: 100px;
    padding-bottom: 40px;
}
#centeredDiv {
    margin: 0 auto;
    width: 200px;
    height: 100px;
    border: 1px solid #000;
}
#centeredParagraph {
    width: 200px;
    margin: 0 auto;
}
#centeredImage {
    display: block;
    width: 200px;
    margin: 0 auto;
}
```
##### Centering using text-align
The most common and easiest type of centering is that of lines of text in an element
```
<p>Lorem ipsum</p>

p {
    text-align: center;
}
```
> This does not work for centering entire block elements. text-align controls only alignment of inline content

##### Centering using position: absolute
```
<div class="parent">
    <img class="center" src="http://lorempixel.com/400/200/" />
</div>

.parent {
    position: relative;
    height: 500px;
}
.center {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
```
##### Centering using calc()
```
.center {
    position: absolute;
    height: 50px;
    width: 50px;
    background: red;
    top: calc(50% - 50px / 2); /* height divided by 2*/
    left: calc(50% - 50px / 2); /* width divided by 2*/
}

<div class="center"></div>
```
##### Centering using line-height
to center vertically a single line of text inside a container
```
div {
    height: 200px;
    line-height: 200px;
}
```
> works only when the text to be centered spans a single line

##### Vertical align anything with 3 lines of code
```
div.vertical {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

<div class="vertical">Vertical aligned text!</div>
```
##### Centering in relation to another item
```
<div class="content">
    <div class="position-container">
        <div class="thumb">
            <img src="http://lorempixel.com/400/200/">
        </div>
        <div class="details">
            <p class="banner-title">text 1</p>
            <p class="banner-text">content content content content content content content content content content content content content content</p>
            <button class="btn">button</button>
        </div>
    </div>
</div>

.content * {
    box-sizing: border-box;
}
.content .position-container {
    display: table;
}
.content .details {
    display: table-cell;
    vertical-align: middle;
    width: 33.333333%;
    padding: 30px;
    font-size: 17px;
    text-align: center;
}
.content .thumb {
    width: 100%;
}
.content .thumb img {
    width: 100%;
}
```
##### Ghost element technique (Michał Czernow's hack)
```
/* This parent can be any width and height */
.block {
    text-align: center;
    /* May want to do this if there is risk the container may be narrower than the element inside */
    white-space: nowrap;
}
/* The ghost element */
.block:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    /* There is a gap between ghost element and .centered, caused by space character rendered. Could be eliminated by nudging .centered (nudge distance depends on font family), or by zeroing font-size in .parent and resetting it back (probably to 1rem) in .centered. */
    margin-right: -0.25em;
}

/* The element to be centered, can also be of any width and height */
.centered {
    display: inline-block;
    vertical-align: middle;
    width: 300px;
    white-space: normal; /* Resetting inherited nowrap behavior */
}

<div class="block">
    <div class="centered"></div>
</div>
```
##### Centering vertically and horizontally without worrying about height or width
- The outer container
    - should have display: table;
- The inner container
    - should have display: table-cell;
    - should have vertical-align: middle;
    - should have text-align: center;
- The content box
    - should have display: inline-block;
    - should re-adjust the horizontal text-alignment to eg. text-align: left; or text-align: right;, unless you want text to be centered
```
<div class="outer-container">
    <div class="inner-container">
        <div class="centered-content">
            You can put anything here!
        </div>
    </div>
</div>

.outer-container {
    position : absolute;
    display: table;
    width: 100%; /* This could be ANY width */
    height: 100%; /* This could be ANY height */
    background: #ccc;
}
.inner-container {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.centered-content {
    display: inline-block;
    text-align: left;
    background: #fff;
    padding: 20px;
    border: 1px solid #000;
}
```
##### Vertically align an image inside div
```
<div class="wrap">
    <img src="http://lorempixel.com/400/200/" />
</div>

.wrap {
    height: 50px;/* max image height */
    width: 100px;
    border: 1px solid blue;
    text-align: center;
}
.wrap:before {
    content:"";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    width: 1px;
}
img {
    vertical-align: middle;
}
```
##### Centering with ﬁxed size
```
<div class="center">
    Center vertically and horizontally
</div>

.center {
    position: absolute;
    background: #ccc;
    left: 50%;
    width: 150px;
    margin-left: -75px;
    /* width * -0.5 */
    top: 50%;
    height: 200px;
    margin-top: -100px;
    /* height * -0.5 */
}
```
```
<div class="center">
    Center only horizontally
</div>

.center {
    position: absolute;
    background: #ccc;
    left: 50%;
    width: 150px;
    margin-left: -75px;
    /* width * -0.5 */
}
```
```
<div class="center">
    Center only vertically
</div>

.center {
    position: absolute;
    background: #ccc;
    top: 50%;
    height: 200px;
    margin-top: -100px;
    /* width * -0.5 */
}
```
##### Vertically align dynamic height elements
- `vertical-align:middle` isn't applicable to block-level elements
- `margin-top:auto` and `margin-bottom:auto` used values would compute as zero
- `margin-top:-50%` percentage-based margin values are calculated relative to the width of containing block

```
<div class="vcenter--container">
    <div class="vcenter--helper">
        <div class="vcenter--content">
            <!--stuff-->
        </div>
    </div>
</div>

.vcenter--container {
    display: table;
    height: 100%;
    position: absolute;
    overflow: hidden;
    width: 100%;
}
.vcenter--helper {
    display: table-cell;
    vertical-align: middle;
}
.vcenter--content {
    margin: 0 auto;
    width: 200px;
}
```
##### Horizontal and Vertical centering using table layout
```
<div class="wrapper">
    <div class="parent">
        <div class="child"></div>
    </div>
</div>

.wrapper {
    display: table;
    vertical-align: center;
    width: 200px;
    height: 200px;
    background-color: #9e9e9e;
}
.parent {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.child {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 100px;
    height: 100px;
    background-color: teal;
}
```
##### The Box Model
- `content-box` Width and height of the element only includes content area.
- `padding-box` Width and height of the element includes content and padding.
- `border-box` Width and height of the element includes content, padding and border.
- `initial` Sets the box model to its default state.
- `inherit` Inherits the box model of the parent element.

> margin -> border -> padding -> content

The following example demonstrates this potential issue with content-box:
```
textarea {
    width: 100%;
    padding: 3px;
    box-sizing: content-box; /* default value */
}
```
##### Bix Sizing
- `content-box`: The common box model - width and height only includes the content, not the padding or border
- `padding-box`: Width and height includes the content and the padding, but not the border
- `border-box`: Width and height includes the content, the padding as well as the border

> To apply a speciﬁc box model to every element on the page, use the following snippet:
```
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    box-sizing: inherit;
}
```
##### Margins
- `0` set margin to none
- `auto` used for centering, by evenly setting values on each side
- `units` (e.g. px) see parameter section in Units for a list of valid units
inherit
- `inherit` margin value from parent element
- `initial` restore to initial value

> Verical Margins Collapse automatically. Horizontal margins add up

Overlapping margin gotcha

Now, what about if we add some borders to the markup above.
div {
    border: 1px solid red;
}

##### Negative margins
```
div {
    display: inline;
}
#over{
    margin-left: -20px;
}

<div>Base div</div>
<div id="over">Overlapping div</div>
```
##### border-radius
Every corner of an element can have up to two values, for the vertical and horizontal radius of that corner

The 10px is the horizontal radius of the top-left-and-bottom-right. And the 5% is the horizontal radius of the topright-and-bottom-left. The other four values after '/' are the vertical radii for top-left, top-right, bottom-right and
bottom-left.
```
border-radius: 10px 5% / 20px 25em 30px 35em;
```
```
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 0;
border-top-left-radius: 0;
```
##### Multiple Borders
Using outline:
```
.div1 {
    border: 3px solid black;
    outline: 6px solid blue;
    width: 100px;
    height: 100px;
    margin: 20px;
}
```
Using box-shadow:
```
.div2 {
    border: 5px solid green;
    box-shadow: 0px 0px 0px 4px #000;
    width: 100px;
    height: 100px;
    margin: 20px;
}
```
Using a pseudo element:
```
.div3 {
    position: relative;
    border: 5px solid #000;
    width: 100px;
    height: 100px;
    margin: 20px;
}
.div3:before {
    content: " ";
    position: absolute;
    border: 5px solid blue;
    z-index: -1;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
}
```
##### border-collapse
applies only to tables (and elements displayed as display: table or inlinetable) and sets whether the table borders are collapsed into a single border or detached as in standard HTML.
```
table {
    border-collapse: separate; /* default */
    border-spacing: 2px; /* Only works if border-collapse is separate */
}
```
##### border-image
- `border-image-source`: The path to the image to be used
- `border-image-slice`: Speciﬁes the oﬀset that is used to divide the image into nine regions (four corners, four edges and a middle)
- `border-image-repeat`: Speciﬁes how the images for the sides and the middle of the border image are scaled
```
border-image: url("border.png") 30 stretch;
```
- The image will be split into nine regions with 30x30 pixels.
- The edges will be used as the corners of the border while the side will be used in between. If the element is higher / wider than 30px this part of the image will be stretched.
- The middle part of the image defaults to be transparent.

##### Creating a multi-colored border using borderimage
```
.bordered {
    border-image: linear-gradient(to right, red 20%, green 20%, green 40%, blue 40%, blue 60%, maroon 60%, maroon 80%, chocolate 80%);
    border-image-slice: 1;
}
```
##### Outlines
```
outline-style: dotted | dashed | ...
```
##### Overﬂow
- `visible` Shows all overﬂowing content outside the element
- `scroll` Hides the overﬂowing content and adds a scroll bar
- `hidden` Hides the overﬂowing content, both scroll bars disappear and the page becomes ﬁxed
- `auto` Same as scroll if content overﬂows, but doesn't add scroll bar if content ﬁts
- `inherit` Inherit's the parent element's value for this property

##### overﬂow-wrap
overflow-wrap tells a browser that it can break a line of text inside a targeted element onto multiple lines in an otherwise unbreakable place.
```
overflow-wrap:normal; // long word will break outside
overflow-wrap:break-word; // long word broken to accomodate it in next line(s)
```
##### overﬂow-x and overﬂow-y
- `overﬂow-x` if this element is too small to display its contents, the content to the left and right will be clipped.
- `overﬂow-y` if this element is too small to display its contents, the content to the top and bottom will be clipped.

##### overﬂow: scroll
```
overflow:scroll;
```
##### overﬂow: visible
```
overflow:visible;
```
Content is not clipped and will be rendered outside the content box if it exceeds its container size.

##### Block Formatting Context Created with Overﬂow
will wrap text on right side and below the image
```
img {
    float:left;
    margin-right: 10px;
}
```
will wrap text on right side only
```
img {
    float:left;
    margin-right: 10px;
}
div {
    overflow:hidden;
}
```
Chapter 13: Media Queries
```
@media print {..}
@media screen and (max-width: 600px) {..}
@media (orientation: portrait) {..}

@media screen and (min-width: 720px) {
    body {
        background-color: skyblue;
    }
}
```
- `mediatype` (Optional) This is the type of media. Could be anything in the range of all to screen.
- `not` (Optional) Doesn't apply the CSS for this particular media type and applies for everything else.
- `media feature` Logic to identify use case for CSS. Options outlined below.
##### Media Feature
- `aspect-ratio` Describes the aspect ratio of the targeted display area of the output device.
- `color` Indicates the number of bits per color component of the output device. If the device is not a color device, this value is zero.
- `color-index` Indicates the number of entries in the color look-up table for the output device.
- `grid` Determines whether the output device is a grid device or a bitmap device.
- `height` The height media feature describes the height of the output device's rendering surface.
- `max-width` CSS will not apply on a screen width wider than speciﬁed.
- `min-width` CSS will not apply on a screen width narrower than speciﬁed.
- `max-height` CSS will not apply on a screen height taller than speciﬁed.
- `min-height` CSS will not apply on a screen height shorter than speciﬁed.
- `monochrome` Indicates the number of bits per pixel on a monochrome (greyscale) device.
- `orientation` CSS will only display if device is using speciﬁed orientation. See remarks for more details.
- `resolution` Indicates the resolution (pixel density) of the output device.
- `scan` Describes the scanning process of television output devices.
- `width` The width media feature describes the width of the rendering surface of the output device (such as the width of the document window, or the width of the page box on a printer).

##### Deprecated Features Details
- `device-aspect-ratio`
- `max-device-width`
- `min-device-width`
- `max-device-height`
- `min-device-height`

##### mediatype
```
@media print {..}
@media not print {..}
@media only screen {..}
```
-   all  Apply to all devices
- `screen` Default computers
- `print` Printers in general. Used to style print-versions of websites
- `handheld` PDA's, cellphones and hand-held devices with a small screen
- `projection` For projected presentation, for example projectors
- `aural` Speech Systems
- `braille` Braille tactile devices
- `embossed` Paged braille printers
- `tv` Television-type devices
- `tty` Devices with a ﬁxed-pitch character grid. Terminals, portables.

##### Media Queries for Retina and Non Retina Screens
```
/* ----------- Non-Retina Screens ----------- */
@media screen and (min-width: 1200px)and (max-width: 1600px) and  (-webkit-min-device-pixel-ratio: 1) {..}
/* ----------- Retina Screens ----------- */
@media screen and (min-width: 1200px) and (max-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {..}
```
Background Information
There are two types of pixels in the display. One is the logical pixels and the other is the physical pixels. Mostly, the physical pixels always stay the same, because it is the same for all the display devices. The logical pixels change based on the resolution of the devices to display higher quality pixels. The device pixel ratio is the ratio between physical pixels and logical pixels. For instance, the MacBook Pro Retina, iPhone 4 and above report a device pixel ratio of 2, because the physical linear resolution is double the logical resolution. The reason why this works only with WebKit based browsers is because of:

- The vendor preﬁx -webkit- before the rule.
- This hasn't been implemented in engines other than WebKit and Blink.

##### Width vs Viewport
```
<meta name="viewport" content="width=device-width,initial-scale=1">
```
> The width media feature describes the width of the rendering surface of the output device (such as the width of the document window, or the width of the page box on a printer).

> View-port is the width of the device itself. If your screen resolution says the resolution is 1280 x 720, your view-port width is "1280px".

> More often many devices allocate diﬀerent pixel amount to display one pixel. For an example iPhone 6 Plus has 1242 x 2208 resolution. But the actual viewport-width and viewport-height is 414 x 736. That means 3 pixels are used to create 1 pixel.

> But if you did not set the meta tag correctly it will try to show your webpage with its native resolution which results in a zoomed out view (smaller texts and images).

##### Using Media Queries to Target Different Screen Sizes
```
@media only screen and (min-width: 300px) and (max-width: 767px) {
@media only screen and (min-width: 768px) and (max-width: 1023px) {
@media only screen and (min-width: 1024px) {
```
##### Use on link tag
```
<link rel="stylesheet" media="min-width: 600px" href="example.css" />
```
##### Floats
```
// will wrap text on right side and below the image
img {
    float:left;
    margin-right: 1rem;
}
```
##### clear property
The clear property is directly related to ﬂoats
- `none` Default. Allows ﬂoating elements on both sides
- `left` No ﬂoating elements allowed on the left side
- `right` No ﬂoating elements allowed on the right side
- `both` No ﬂoating elements allowed on either the left or the right side
- `initial` Sets this property to its default value. Read about initial
- `inherit` Inherits this property from its parent element.

```
img {
    float: left;
}
p.clear {
    clear: both;
}
```
##### Clearﬁx
> The clearﬁx hack is a popular way to contain ﬂoats

Not to be confused with the clear property, clearﬁx is a concept (that is also related to ﬂoats, thus the possible confusion).

To contain ﬂoats, you've to add .cf or .clearfix class on the container (the parent) and style this class with a few rules described below. 3 versions with slightly diﬀerent eﬀects 

1. Clearﬁx (with top margin collapsing of contained ﬂoats still occurring)
```
.cf:after {
    content: "";
    display: table;
}
.cf:after {
    clear: both;
}
```
2. Clearﬁx also preventing top margin collapsing of contained ﬂoats
```
/**
* For modern browsers
* 1. The space content is one way to avoid an Opera bug when the contenteditable attribute is included anywhere else in the document. Otherwise it causes space to appear at the top and bottom of elements that are clearfixed.
* 2. The use of `table` rather than `block` is only necessary if using `:before` to contain the top-margins of child elements.

.cf:before, .cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}
.cf:after {
    clear: both;
}
```
Clearﬁx with support of outdated browsers IE6 and IE7
```
.cf:before, .cf:after {
    content: " ";
    display: table;
}
.cf:after {
    clear: both;
}
```
##### We can make them in-line by adding a float css property to the div.
```
<div class="outer-div">
    <div class="inner-div1">
        <p>This is DIV 1</p>
    </div>
    <div class="inner-div2">
        <p>This is DIV 2</p>
    </div>
</div>

.inner-div1 {
    width: 50%;
    margin-right:0px;
    float:left;
    background : #337ab7;
    padding:50px 0px;
}
.inner-div2 {
    width: 50%;
    margin-right:0px;
    float:left;
    background : #dd2c00;
    padding:50px 0px;
}
p {
    text-align:center;
}
```
##### Use of overﬂow property to clear ﬂoats
Setting overflow value to hidden,auto or scroll to an element, will clear all the ﬂoats within that element.
> using overflow:scroll will always show the scrollbox

##### Simple Two Fixed-Width Column Layout
A simple two-column layout consists of two ﬁxed-width, ﬂoated elements. Note that the sidebar and content area are not the same height in this example. This is one of the tricky parts with multi-column layouts using ﬂoats, and requires workarounds to make multiple columns appear to be the same height.
```
<div class="wrapper">
    <div class="sidebar">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
    </div>
    <div class="content">
        <h1>Content</h1>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. </p>
    </div>
</div>

.wrapper {
    width:600px;
    padding:20px;
    background-color:pink;
    /* Floated elements don't use any height. Adding "overflow:hidden;" forces the
    parent element to expand to contain its floated children. */
    overflow:hidden;
}
.sidebar {
    width:150px;
    float:left;
    background-color:blue;
}
.content {
    width:450px;
    float:right;
    background-color:yellow;
}
```
##### Simple Three Fixed-Width Column Layout
```
<div class="wrapper">
    <div class="left-sidebar">
        <h1>Left Sidebar</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
    </div>
    <div class="content">
        <h1>Content</h1>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. </p>
    </div>
    <div class="right-sidebar">
        <h1>Right Sidebar</h1>
        <p>Fusce ac turpis quis ligula lacinia aliquet.</p>
    </div>
</div>

.wrapper {
    width:600px;
    background-color:pink;
    padding:20px;
    /* Floated elements don't use any height. Adding "overflow:hidden;" forces the parent element to expand to contain its floated children. */
    overflow:hidden;
}
.left-sidebar {
    width:150px;
    background-color:blue;
    float:left;
}
.content {
    width:300px;
    background-color:yellow;
    float:left;
}
.right-sidebar {
    width:150px;
    background-color:green;
    float:right;
}
```
##### Two-Column Lazy/Greedy Layout
This layout uses one ﬂoated column to create a two-column layout with no deﬁned widths. In this example the left sidebar is "lazy," in that it only takes up as much space as it needs. Another way to say this is that the left sidebar is "shrink-wrapped." The right content column is "greedy," in that it takes up all the remaining space.
```
<div class="sidebar">
    <h1>Sidebar</h1>
    <img src="http://lorempixel.com/150/200/" />
</div>
<div class="content">
    <h1>Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>
    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. </p>
</div>

.sidebar {
    /* `display:table;` shrink-wraps the column */
    display:table;
    float:left;
    background-color:blue;
}
.content {
    /* `overflow:hidden;` prevents `.content` from flowing under `.sidebar` */
    overflow:hidden;
    background-color:yellow;
}
```
##### Typography
- `font-style` italics or oblique
- `font-variant` normal or small-caps
- `font-weight` normal, bold or numeric from 100 to 900.
- `font-size` The font size given in %, px, em, or any other valid CSS measurement
- `line-height` The line height given in %, px, em, or any other valid CSS measurement
- `font-family` This is for deﬁning the family's name.
- `color` Any valid CSS color representation, like red, #00FF00, hsl(240, 100%, 50%) etc.
- `font-stretch` Whether or not to use a confenced or expanded face from font. Valid values are normal, ultracondensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extraexpanded or ultra-expanded
- `text-align` start, end, left, right, center, justify, match-parent
- `text-decoration` none, underline, overline, line-through, initial, inherit;
```
element {
    // put your values in the correct order
    font: [font-style] [font-variant] [font-weight] [font-size/line-height] [font-family];
}
```
##### Quotes
The quotes property is used to customize the opening and closing quotation marks of the <q> tag.
```
q {
    quotes: "«" "»";
}
```
```
direction: ltr; /* Default, text read read from left-to-right */
direction: horizontal-tb | vertical-rl | vertical-lr;
```
##### writing-mode
```
.horizontal-tb {
    writing-mode: horizontal-tb; /* Default, text read from left-to-right and top-to-bottom. */
}
.vertical-rtl {
    writing-mode: vertical-rl; /* text read from right-to-left and top-to-bottom */
}
.vertical-ltr {
    writing-mode: vertical-rl; /* text read from left-to-right and top to bottom */
}
```
##### Text Overﬂow
```
.text {
    overflow: hidden;
    text-overflow: ellipsis;
}
```
> Unfortunately, text-overflow: ellipsis only works on a single line of text. There is no way to support ellipsis on the last line in standard CSS, but it can be achieved with non-standard webkit-only implementation of ﬂexboxes.
```
.giveMeEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: N; /* number of lines to show */
    line-height: X;
    /* fallback */
    max-height: X*N;
    /* fallback */
}
```
##### Text Shadow
To add shadows to text, use the text-shadow property. The syntax is as follows:
```
text-shadow: horizontal-offset vertical-offset blur color;

// Shadow without blur radius
text-shadow: 2px 2px #0000FF;

// To add a blur eﬀect, add an option blur radius argument
text-shadow: 2px 2px 10px #0000FF;

// To give an element multiple shadows, separate them with commas
text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
```
##### Text Transform
```
text-transform: uppercase | capitalize | lowercase | initial | inherit | ..;
```
##### Letter Spacing
```
letter-spacing: -1px;
```
##### Text Indent
```
text-indent: 50px;
```
The text-indent property speciﬁes how much horizontal space text should be moved before the beginning of the ﬁrst line of the text content of an element.

##### Text Decoration
```
text-decoration: none | overline | line-through | underline;
text-decoration: underline dotted blue;

> It should be noted that the following properties are only supported in Firefox
`text-decoration-color`, `text-decoration-line`, `text-decoration-style`, `text-decoration-skip`
```
##### Word Spacing
```
word-spacing: normal; -3px;
```
##### Font Variant
```
font-variant: normal | small-caps;
```
> The font-variant property is a shorthand for the properties: font-variant-caps, font-variant-numeric, fontvariant-alternates, font-variant-ligatures, and font-variant-east-asian.

##### Flexible Box Layout
- `align-items: center` This centers the elements along the axis other than the one speciﬁed by flex-direction, center i.e., vertical centering for a horizontal ﬂexbox and horizontal centering for a vertical ﬂexbox.
- `justify-content center` This centers the elements along the axis speciﬁed by flex-direction. I.e., for a  horizontal (flex-direction: row) ﬂexbox, this centers horizontally, and for a vertical ﬂexbox (flex-direction: column) ﬂexbox, this centers vertically) Individual Property Examples

##### Sticky Variable-Height Footer
This code creates a sticky footer. When the content doesn't reach the end of the viewport, the footer sticks to the bottom of the viewport. When the content extends past the bottom of the viewport, the footer is also pushed out of the viewport. View Result
```
<div class="header">
    <h2>Header</h2>
</div>
<div class="content">
    <h1>Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. </p>
</div>
<div class="footer">
    <h4>Footer</h4>
</div>

html, body {
    height: 100%;
}
body {
    display: flex;
    flex-direction: column;
}
.content {
    /* Include `0 auto` for best browser compatibility. */
    flex: 1 0 auto;
}
.header, .footer {
    background-color: grey;
    color: white;
    flex: none;
}
```
##### Cascading and Speciﬁcity
- a. `id` selectors
- b. `class` selectors, attribute selectors [title], [colspan="2"], pseudo-classes :hover, :nth-child(2)
- c. type selectors `div.li`, pseudo-elements `::before`, `::first-letter`

> The universal selector (*) and combinators (like > and ~) have no speciﬁcity.

Specificity of various selector sequences
- `#foo #baz {}`         /* a=2, b=0, c=0 */
- `#foo.bar {}`          /* a=1, b=1, c=0 */
- `#foo {}`              /* a=1, b=0, c=0 */
- `.bar:hover {}`        /* a=0, b=2, c=0 */
- `div.bar {}`           /* a=0, b=1, c=1 */
- `:hover {}`            /* a=0, b=1, c=0 */
- `[title] {}`           /* a=0, b=1, c=0 */
- `.bar {}`              /* a=0, b=1, c=0 */
- `div ul + li {}`       /* a=0, b=0, c=3 */
- `p::after {}`          /* a=0, b=0, c=2 */
- `*::before {}`         /* a=0, b=0, c=1 */
- `::before {}`          /* a=0, b=0, c=1 */
- `div {}`               /* a=0, b=0, c=1 */
- `* {}`                 /* a=0, b=0, c=0 */

##### `!important` and inline style declarations
> When creating your CSS style sheet, you should maintain the lowest speciﬁcity as possible.have a selector like this
```
body.page header.container nav div#main-nav li a {}
```
##### Length Units
- `%` Deﬁne sizes in terms of parent objects or current object dependent on property
- `em` Relative to the font-size of the element (2em means 2 times the size of the current font)
- `rem` "root em". Relative to font-size of the root or <html> element
- `vw` Relative to 1% of the width of the viewport*
- `vh` Relative to 1% of the height of the viewport*
- `vmin` Relative to 1% of viewport's* smaller dimension
- `vmax` Relative to 1% of viewport's* larger dimension
- `cm`, `mm`, `in`
- `px` pixels (1px = 1/96th of 1in)
- `pt` points (1pt = 1/72 of 1in)
- `pc` picas (1pc = 12 pt)
- `s`, `ms`
- `ex` Relative to the x-height of the current font
- `ch` Based on the width of the zero (0) character
- `fr` fractional unit (used for CSS Grid Layout)

> In other words, 1 vmin is equal to the smaller of 1 vh and 1 vw

> 1 vmax is equal to the larger of 1 vh and 1 vw

##### Pseudo-Elements
- `::after` Insert content after the content of an element
- `::before` Insert content before the content of an element
- `::first-letter` Selects the ﬁrst letter of each element
- `::first-line` Selects the ﬁrst line of each element
- `::selection` Matches the portion of an element that is selected by a user
- `::backdrop` Used to create a backdrop that hides the underlying document for an element in the top layer's stack
- `::placeholder` Allows you to style the placeholder text of a form element
- `::marker` For applying list-style attributes on a given element
- `::spelling-error` Represents a text segment which the browser has ﬂagged as incorrectly spelled - `::grammar-error` Represents a text segment which the browser has ﬂagged as grammatically incorrect 

> The content attribute is required for pseudo-elements to render; however, the attribute can have an empty value
```
div::after {
    content: 'after';
    color: red;
    border: 1px solid red;
}
div {
    color: black;
    border: 1px solid black;
    padding: 1px;
}
div::before {
    content: 'before';
    color: green;
    border: 1px solid green;
}
```
##### Pseudo-Elements in Lists
Pseudo-elements are often used to change the look of lists (mostly for `ul`).
```
// The ﬁrst step is to remove the default list bullets:
ul {
    list-style-type: none;
}
// Then you add the custom styling. In this example, we will create gradient boxes for bullets.
li:before {
    content: "";
    display: inline-block;
    margin-right: 10px;
    height: 10px;
    width: 10px;
    background: linear-gradient(red, blue);
}
```
##### Positioning
- `static` Default value. Elements render in order, as they appear in the document ﬂow. The top, right, bottom, left and z-index properties do not apply.
- `relative` The element is positioned relative to its normal position, so left:20px adds 20 pixels to the element's LEFT position
- `ﬁxed` The element is positioned relative to the browser window
- `absolute` The element is positioned relative to its ﬁrst positioned (not static) ancestor element
- `initial` Sets this property to its default value.
- `inherit` Inherits this property from its parent element.
- `sticky` It behaves like position: static within its parent until a given oﬀset threshold is reached, then it acts as position: fixed.
- `unset` Combination of initial and inherit.

##### Overlapping Elements with z-index
```
z-index: [ number ] | auto;
```
> Negative values are allowed.

> only works on positioned elements. The only value where it is ignored is the default value, static.

##### Absolute Position
When absolute positioning is used the box of the desired element is taken out of the Normal Flow and it no longer aﬀects the position of the other elements on the page. Oﬀset properties. specify the element should appear in relation to its next non-static containing element.
```
.abspos {
    position:absolute;
    top:0px;
    left:500px;
}
```
This code will move the box containing element with attribute class="abspos" down 0px and right 500px relative to its containing element.

##### Fixed position
Deﬁning position as ﬁxed we can remove an element from the document ﬂow and set its position relatively to the browser window. One obvious use is when we want something to be visible when we scroll to the bottom of a long page.
```
#stickyDiv {
    position:fixed;
    top:10px;
    left:10px;
}
```
##### Relative Position
Relative positioning moves the element in relation to where it would have been in normal ﬂow.
```
.relpos{
    position:relative;
    top:20px;
    left:30px;
}
```
This code will move the box containing element with attribute class="relpos" 20px down and 30px to the right from where it would have been in normal ﬂow.

##### Static positioning
The default position of an element is static.
This keyword lets the element use the normal behavior, that is it is laid out in its current position in the ﬂow. The top, right, bottom, left and z-index properties do not apply.
```
.element {
    position:static;
}
```
##### Layout Control
- `none` Hide the element and prevent it from occupying space.
- `block` Block element, occupy 100% of the available width, break after element. `<div>Hello world!</div><div>This is an example!</div>`
- `inline` Inline element, occupy no width, no break after element. `<span>This is some <b>bolded</b> text!</span>`
- `inline-block` Taking special properties from both inline and block elements, no break, but can have width. The inline-block value gives us the best of both worlds: it blends the element in with the ﬂow of the text while allowing us to use padding, margin, height and similar properties which have no visible eﬀect on inline elements. Elements with this display value act as if they were regular text and as a result are aﬀected by rules controlling the ﬂow of text such as text-align. By default they are also shrunk to the the smallest size possible to accommodate their content.
```
<!--Inline: unordered list-->
li {
    display : inline;
    background : lightblue;
    padding:10px;
    border-width:2px;
    border-color:black;
    border-style:solid;
}

<!--block: unordered list-->
li {
    display : block;
    background : lightblue;
    padding:10px;
    border-width:2px;
    border-color:black;
    border-style:solid;
}

<!--Inline-block: unordered list-->
li {
    display : inline-block;
    background : lightblue;
    padding:10px;
    border-width:2px;
    border-color:black;
    border-style:solid;
}

<ul>
<li>First Element </li>
<li>Second Element </li>
<li>Third Element </li>
</ul>
```
- `inline-flex` Displays an element as an inline-level ﬂex container.
- `inline-table` The element is displayed as an inline-level table.
- `grid` Behaves like a block element and lays out its content according to the grid model.
- `flex` Behaves like a block element and lays out its content according to the ﬂexbox model.
- `inherit` Inherit the value from the parent element.
- `initial` Reset the value to the default value taken from behaviors described in the HTML speciﬁcations or from the browser/user default stylesheet.
- `table` Behaves like the HTML table element.
- `table-cell` Let the element behave like a `<td>` element
- `table-column` Let the element behave like a `<col>` element
- `table-row` Let the element behave like a `<tr>` element
- `list-item` Let the element behave like a `<li>` element.

##### To get old table structure using div
```
.table-div {
    display: table;
}
.table-row-div {
    display: table-row;
}
.table-cell-div {
    display: table-cell;
}

<div class="table-div">
    <div class="table-row-div">
        <div class="table-cell-div">
            I behave like a table now
        </div>
    </div>
</div>
```
##### Grid
```
display: grid / inline-grid
```
```
<section class="container">
    <div class="item1">item1</div>
    <div class="item2">item2</div>
    <div class="item3">item3</div>
    <div class="item4">item4</div>
</section>

.container {
    display: grid;
}
```
However, doing this will invariably cause all the child elements to collapse on top of one another.

This is because the children do not currently know how to position themselves within the grid. But we can explicitly tell them. First we need to tell the grid element .container how many rows and columns will make up its structure and we can do this using the grid-columns and grid-rows properties (note the pluralisation):
```
.container {
    display: grid;
    grid-columns: 50px 50px 50px;
    grid-rows: 50px 50px;
}
```
However, that still doesn't help us much because we need to give an order to each child element. We can do this by
specifying the grid-row and grid-column values which will tell it where it sits in the grid:
```
.container .item1 {
    grid-column: 1;
    grid-row: 1;
}
.container .item2 {
    grid-column: 2;
    grid-row: 1;
}
.container .item3 {
    grid-column: 1;
    grid-row: 2;
}
.container .item4 {
    grid-column: 2;
    grid-row: 2;
}
```
By giving each item a column and row value it identiﬁes the items order within the container.

##### table-layout
```
width: 150px;
table-layout: auto; //  tables expands to accommodate content
table-layout: fixed; // contents overﬂow out of the table boundary
```
##### empty-cells
```
border-collapse: seperate;
empty-cells: show;
empty-cells: hide;
```
##### border-collapse
```
border-collapse: seperate;
border-collapse: collapse;
```
##### border-spacing
```
border-spacing: 2px;
border-spacing: 2px 2px;
```
##### caption-side
```
caption-side: top/bottom;
```
##### Transitions
- `transition-property` The speciﬁc CSS property whose value change needs to be transitioned (or) all, if all the transitionable properties need to be transitioned.
- `transition-duration` The duration (or period) in seconds (s) or milliseconds (ms) over which the transition must take place.
- `transition-timing-function` A function that describes how the intermediate values during the transition are calculated. Commonly used values are `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `cubic-bezier()`, `steps()`.
- `transition-delay` The amount of time that must have elapsed before the transition can start. Can be speciﬁed in seconds (s) or milliseconds (ms)

##### Transition shorthand
```
div {
    width: 150px;
    height:150px;
    background-color: red;
    transition: background-color 1s;
}
div:hover{
    background-color: green;
}

<div></div>
```
##### cubic-bezier
transition-timing-function:
```
cubic-bezier(P1_x, P1_y, P2_x, P2_y);
cubic-bezier(0.1, 0.7, 1.0, 0.1);
```
```
linear: cubic-bezier(0,0,1,1)
ease-in: cubic-bezier(0.42, 0.0, 1.0, 1.0)
ease-out: cubic-bezier(0.0, 0.0, 0.58, 1.0)
ease-in-out: cubic-bezier(0.42, 0.0, 0.58, 1.0)
```
##### Transition (longhand)
```
div {
    height: 100px;
    width: 100px;
    border: 1px solid;
    transition-property: height, width;
    transition-duration: 1s, 500ms;
    transition-timing-function: linear;
    transition-delay: 0s, 1s;
}

div:hover {
    height: 200px;
    width: 200px;
}

<div></div>
```
- `transition-property`: Speciﬁes the CSS properties the transition eﬀect is for. In this case, the div will expand both horizontally and vertically when hovered.
- `transition-duration`: Speciﬁes the length of time a transition takes to complete. In the above example, the height and width transitions will take 1 second and 500 milliseconds respectively.
- `transition-timing-function`: Speciﬁes the speed curve of the transition eﬀect. A linear value indicates the transition will have the same speed from start to ﬁnish.
- `transition-delay`: Speciﬁes the amount of time needed to wait before the transition eﬀect starts. In this case, the height will start transitioning immediately, whereas the width will wait 1 second.

##### Animations
- `Transition` Either the CSS property to transition on, or all, which speciﬁes all transitionable properties.
- `duration` Transition time, either in seconds or milliseconds.
- `timing-function` Speciﬁes a function to deﬁne how intermediate values for properties are computed. Common values are ease, linear, and step-end.
- `delay` Amount of time, in seconds or milliseconds, to wait before playing the animation.
- `@keyframes` `[ from | to | <percentage> ]` You can either specify a set time with a percentage value, or two percentage values, ie 10%, 20%, for a period of time where the keyframe's set attributes are set.
- `block` Any amount of CSS attributes for the keyframe.

##### Animations with keyframes
```
@keyframes rainbow-background {
    0% { background-color: #ff0000; }
    8.333% { background-color: #ff8000; }
    16.667% { background-color: #ffff00; }
    25.000% { background-color: #80ff00; }
    33.333% { background-color: #00ff00; }
    41.667% { background-color: #00ff80; }
    50.000% { background-color: #00ffff; }
    58.333% { background-color: #0080ff; }
    66.667% { background-color: #0000ff; }
    75.000% { background-color: #8000ff; }
    83.333% { background-color: #ff00ff; }
    91.667% { background-color: #ff0080; }
    100.00% { background-color: #ff0000; }
}

.RainbowBackground {
    animation: rainbow-background 5s infinite;
}
```
The actual animation property takes the following arguments.
- `animation-name`: The name of our animation. In this case, rainbow-background
- `animation-duration`: How long the animation will take, in this case 5 seconds.
- `animation-iteration-count (Optional)`: The number of times the animation will loop. In this case, the animation will go on indeﬁnitely. By default, the animation will play once.
- `animation-delay (Optional)`: Speciﬁes how long to wait before the animation starts. It defaults to 0 seconds, and can take negative values. For example, -2s would start the animation 2 seconds into its loop.
- `animation-timing-function (Optional)`: Speciﬁes the speed curve of the animation. It defaults to ease, where the animation starts slow, gets faster and ends slow.
```
0%, 100% { background-color: #ff0000; }
```
##### Animations with the transition property
```
.Example {
    height: 100px;
    background: #fff;
    // if no transition, 'hover' will happen instantaneously
    transition: all 400ms ease;
}
.Example:hover {
    height: 120px;
    background: #ff0000;
}
```
The all value applies the transition to all compatible (numbers-based) properties. Any compatible property name (such as height or top) can be substituted for this keyword.

> The transition property can animate changes between any two numerical values, regardless of unit. However, it cannot transition between 100px to auto.

##### Syntax Examples
```
animation: 3s ease-in 1s 2 reverse both paused slidein;

duration | timing-function | delay | iteration-count | direction | fill-mode | playstate | name
```
```
animation: 3s linear 1s slidein;

duration | timing-function | delay | name
```
```
animation: 3s slidein;

duration | name 
```
If brevity isn't your thing, you can also skip the shorthand property and write out each property individually:
```
animation-duration: 3s;
animation-timing-function: ease-in;
animation-delay: 1s;
animation-iteration-count: 2;
animation-direction: reverse;
animation-fill-mode: both;
animation-play-state: paused;
animation-name: slidein;
```
##### Increasing Animation Performance Using the `will-change` Attribute
When creating animations and other GPU-heavy actions, it's important to understand the will-change attribute. Both CSS keyframes and the transition property use GPU acceleration. Performance is increased by oﬄoading calculations to the device's GPU. This is done by creating paint layers (parts of the page that are individually rendered) that are oﬄoaded to the GPU to be calculated. The will-change property tells the browser what will animate, allowing the browser to create smaller paint areas, thus increasing performance. 

The will-change property accepts a comma-separated list of properties to be animated. For example, if you plan on transforming an object and changing its opacity, you would specify:
```
.Example{
    ...
    will-change: transform, opacity;
}
```
> Use will-change sparingly. Setting will-change for every element on a page can cause performance problems

##### 2D Transforms
- `rotate(x)` Deﬁnes a transformation that moves the element around a ﬁxed point on the Z axis
- `translate(x,y)` Moves the position of the element on the X and Y axis
- `translateX(x)` Moves the position of the element on the X axis
- `translateY(y)` Moves the position of the element on the Y axis
- `scale(x,y)` Modiﬁes the size of the element on the X and Y axis
- `scaleX(x)` Modiﬁes the size of the element on the X axis
- `scaleY(y)` Modiﬁes the size of the element on the Y axis
- `skew(x,y)` Shear mapping, or transvection, distorting each point of an element by a certain angle in each direction
- `skewX(x)` Horizontal shear mapping distorting each point of an element by a certain angle in the horizontal direction
- `skewY(y)` Vertical shear mapping distorting each point of an element by a certain angle in the vertical direction
- `matrix()` Deﬁnes a 2D transformation in the form of a transformation matrix. 
- `angle` The angle by which the element should be rotated or skewed (depending on the function
with which it is used). Angle can be provided in degrees (deg), gradians (grad), radians (rad)
or turns (turn). In skew() function, the second angle is optional. If not provided, there will be
no (0) skew in Y-axis.
- `length-or-percentage` The distance expressed as a length or a percentage by which the element should be  translated. In translate() function, the second length-or-percentage is optional. If not provided, then there would be no (0) translation in Y-axis. 
- `scale-factor` A number which deﬁnes how many times the element should be scaled in the speciﬁed axis. In scale() function, the second scale-factor is optional. If not provided, the ﬁrst scale-factor will be applied for Y-axis also.

##### Rotate
```
<div class="rotate"></div>

CSS
.rotate {
    width: 100px;
    height: 100px;
    background: teal;
    transform: rotate(45deg);
}
```
This example will rotate the div by 45 degrees clockwise. The center of rotation is in the center of the div, 50% from left and 50% from top. You can change the center of rotation by setting the transform-origin property. transform-origin: 100% 50%;

> The above example will set the center of rotation to the middle of the right side end.

##### Scale
```
<div class="scale"></div>

CSS
.scale {
width: 100px;
height: 100px;
background: teal;
transform: scale(0.5, 1.3);
}
```
This example will scale the div to 100px * 0.5 = 50px on the X axis and to 100px * 1.3 = 130px on the Y axis.
> The center of the transform is in the center of the div, 50% from left and 50% from top.

##### Skew
```
<div class="skew"></div>

.skew {
    width: 100px;
    height: 100px;
    background: teal;
    transform: skew(20deg, -30deg);
}
```
This example will skew the div by 20 degrees on the X axis and by - 30 degrees on the Y axis.

> The center of the transform is in the center of the div, 50% from left and 50% from top.

##### Multiple transforms
```
transform: rotate(15deg) translateX(200px);
```
This will rotate the element 15 degrees clockwise and then translate it 200px to the right.
In chained transforms, the coordinate system moves with the element. This means that the translation won't be horizontal but on an axis rotate 15 degrees clockwise

##### Changing the order of the transforms will change the output.
```
transform: translateX(200px) rotate(15deg);
<div class="transform"></div>
```
```
.transform {
    transform: rotate(15deg) translateX(200px);
}
```
##### Translate
```
<div class="translate"></div>

.translate {
    width: 100px;
    height: 100px;
    background: teal;
    transform: translate(200px, 50%);
}
```
> This example will move the div by 200px on the X axis and by 100px * 50% = 50px on the Y axis.

You can also specify translations on a single axis.
- On the X axis:
```
.translate {
    transform: translateX(200px);
}
```
- On the Y axis:
```
.translate {
    transform: translateY(50%);
}
```
##### Transform Origin
```
transform-origin: X Y;
```
```
<div class="transform originl"></div>
<div class="transform origin2"></div>

.transform {
    display: inline-block;
    width: 200px;
    height: 100px;
    background: teal;
    transition: transform 1s;
}
.origin1 {
    transform-origin: 0 0;
}
.origin2 {
    transform-origin: 100% 0;
}
.transform:hover {
    transform: rotate(30deg);
}
```
> The default value for the transform-origin property is 50% 50% which is the center of the element.

##### 3D Transforms
```
div.needle {
    margin: 100px;
    height: 150px;
    width: 150px;
    transform: rotateY(85deg) rotateZ(45deg);
    /* presentational */
    background-image: linear-gradient(to top left, #555 0%, #555 40%, #444 50%, #333 97%);
    box-shadow: inset 6px 6px 22px 8px #272727;
}

<div class='needle'></div>
```
In the above example, a needle or compass pointer shape is created using 3D transforms. Generally when we apply the rotate transform on an element, the rotation happens only in the Z-axis and at best we will end up with diamond shapes only. But when a rotateY transform is added on top of it, the element gets squeezed in the Y-axis and thus ends up looking like a needle. The more the rotation of the Y-axis the more squeezed the element looks.

The output of the above example would be a needle resting on its tip. For creating a needle that is resting on its base, the rotation should be along the X-axis instead of along Y-axis. So the transform property's value would have to be something like rotateX(85deg) rotateZ(45deg);.

##### 3D text eect with shadow
```
<div id="title">
    <h1 data-content="HOVER">HOVER</h1>
</div>

* {
    margin:0;
    padding:0;
}
html, body {
    height:100%;
    width:100%;
    overflow:hidden;
    background:#0099CC;
}
#title {
    position:absolute;
    top:50%; left:50%;
    transform:translate(-50%,-50%);
    perspective-origin:50% 50%;
    perspective:300px;
}
h1 {
    text-align:center;
    font-size:12vmin;
    font-family: 'Open Sans', sans-serif;
    color:rgba(0,0,0,0.8);
    line-height:1em;
    transform:rotateY(50deg);
    perspective:150px;
    perspective-origin:0% 50%;
}
h1:after {
    content:attr(data-content);
    position:absolute;
    left:0;top:0;
    transform-origin:50% 100%;
    transform:rotateX(-90deg);
    color:#0099CC;
}
#title:before {
    content:'';
    position:absolute;
    top:-150%; left:-25%;
    width:180%; height:328%;
    background:rgba(255,255,255,0.7);
    transform-origin: 0 100%;
    transform: translatez(-200px) rotate(40deg) skewX(35deg);
    border-radius:0 0 100% 0;
}
```
In this example, the text is transformed to make it look like it is going into the screen away from the user.

The shadow is transformed accordingly so it follows the text. As it is made with a pseudo element and the data attribute, it inherits the transforms form it's parent (the H1 tag).

The white "light" is made with a pseudo element on the #title element. It is skewed and uses border-radius for the rounded corner.

##### backface-visibility
The backface-visibility property relates to 3D transforms.

With 3D transforms and the backface-visibility property, you're able to rotate an element such that the original front of an element no longer faces the screen.
```
<div class="flip">Loren ipsum</div>
<div class="flip back">Lorem ipsum</div>

.flip {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -webkit-backface-visibility: visible;
    -moz-backface-visibility: visible;
    -ms-backface-visibility:visible;
}
.flip.back {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
}
```
-webkit-backface-visibility has 4 values:
- `visible (default)` the element will always be visible even when not facing the screen.
- `hidden` the element is not visible when not facing the screen.
- `inherit` the property will gets its value from the its parent element
- `initial` sets the property to its default, which is visible

##### 3D cube
```
<div class="cube">
<div class="cubeFace"></div>
<div class="cubeFace face2"></div>
</div>

body {
    perspective-origin: 50% 100%;
    perspective: 1500px;
    overflow: hidden;
}
.cube {
    position: relative;
    padding-bottom: 20%;
    transform-style: preserve-3d;
    transform-origin: 50% 100%;
    transform: rotateY(45deg) rotateX(0);
}
.cubeFace {
    position: absolute;
    top: 0;
    left: 40%;
    width: 20%;
    height: 100%;
    margin: 0 auto;
    transform-style: inherit;
    background: #C52329;
    box-shadow: inset 0 0 0 5px #333;
    transform-origin: 50% 50%;
    transform: rotateX(90deg);
    backface-visibility: hidden;
}
.face2 {
    transform-origin: 50% 50%;
    transform: rotatez(90deg) translateX(100%) rotateY(90deg);
}
.cubeFace:before, .cubeFace:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    background: inherit;
    box-shadow: inherit;
    backface-visibility: inherit;
}
.cubeFace:before {
    top: 100%;
    left: 0;
    transform: rotateX(-90deg);
}
.cubeFace:after {
    top: 0;
    left: 100%;
    transform: rotateY(90deg);
}
```
> 4 faces are made with pseudo elements

> chained transforms are applied

##### Filter Property
- `blur(x)` Blurs the image by x pixels.
- `brightness(x)` Brightens the image at any value above 1.0 or 100%. Below that, the image will be darkened.
- `contrast(x)` Provides more contrast to the image at any value above 1.0 or 100%. Below that, the image will get less saturated.
- `drop-shadow(h, v, x, y, z)` Gives the image a drop-shadow. h and v can have negative values. x, y, and z are optional.
- `greyscale(x)` Shows the image in greyscale, with a maximum value of 1.0 or 100%.
- `hue-rotate(x)` Applies a hue-rotation to the image.
- `invert(x)` Inverts the color of the image with a maximum value of 1.0 or 100%.
- `opacity(x)` Sets how opaque/transparent the image is with a maximum value of 1.0 or 100%.
- `saturate(x)` Saturates the image at any value above 1.0 or 100%. Below that, the image will start to de-saturate.
- `sepia(x)` Converts the image to sepia with a maximum value of 1.0 or 100%.

##### Blur
```
<img src='donald-duck.png' alt='Donald Duck' title='Donald Duck' />

img {
    -webkit-filter: blur(1px);
    filter: blur(1px);
}
```
##### Drop Shadow (use box-shadow instead if possible)
```
<p>My shadow always follows me.</p>

p {
    -webkit-filter: drop-shadow(10px 10px 1px green);
    filter: drop-shadow(10px 10px 1px green);
}
```
##### Hue Rotate
```
<img src='donald-duck.png' alt='Donald Duck' title='Donald Duck' />

img {
    -webkit-filter: hue-rotate(120deg);
    filter: hue-rotate(120deg);
}
```
##### Multiple Filter Values
```
<img src='donald-duck.png' alt='Donald Duck' title='Donald Duck' />

img {
    -webkit-filter: brightness(200%) grayscale(100%) sepia(100%) invert(100%);
    filter: brightness(200%) grayscale(100%) sepia(100%) invert(100%);
}
```
##### Invert Color
Turns from white to black.
```
<div></div>

div {
    width: 100px;
    height: 100px;
    background-color: white;
    -webkit-filter: invert(100%);
    filter: invert(100%);
}
```
##### Cursor Styling
- `none` No cursor is rendered for the element
- `auto` Default. The browser sets a cursor
- `help` The cursor indicates that help is available
- `wait` The cursor indicates that the program is busy
- `move`The cursor indicates something is to be moved
- `pointer` The cursor is a pointer and indicates a link

##### pointer-events
```
.disabled {
    pointer-events: none;
}
```
##### caret-color
```
<input id="example" />

#example {
    caret-color: red;
}
```
##### box-shadow
- `inset` by default, the shadow is treated as a drop shadow. the inset keyword draws the shadow inside the frame/border.
- `oﬀset-x` the horizontal distance
- `oﬀset-y` the vertical distance
- `blur-radius` 0 by default. value cannot be negative. the bigger the value, the bigger and lighter the shadow becomes.
- `spread-radius` 0 by default. positive values will cause the shadow to expand. negative values will cause the shadow to shrink.
- `color` 

##### bottom-only drop shadow using a pseudoelement
```
<div class="box_shadow"></div>

.box_shadow {
    background-color: #1C90F3;
    width: 200px;
    height: 100px;
    margin: 50px;
}
.box_shadow:after {
    content: "";
    width: 190px;
    height: 1px;
    margin-top: 98px;
    margin-left: 5px;
    display: block;
    position: absolute;
    z-index: -1;
    box-shadow: 0px 0px 8px 2px #444444;
}
```
##### drop shadow
```
<div class="box_shadow"></div>

.box_shadow {
    box-shadow: 0px 0px 10px -1px #444444;
}
```
##### inner drop shadow
```
<div class="box_shadow"></div>

.box_shadow {
    background-color: #1C90F3;
    width: 200px;
    height: 100px;
    margin: 50px;
    box-shadow: inset 0px 0px 10px 0px #444444;
}
```
##### multiple shadows
```
<div class="box_shadow"></div>

.box_shadow {
    width: 100px;
    height: 100px;
    margin: 100px;
    box-shadow: -52px -52px 0px 0px #f65314,
                52px -52px 0px 0px #7cbb00,
                -52px 52px 0px 0px #00a1f1,
                52px 52px 0px 0px #ffbb00;
}
```
##### Shapes for Floats
- `none` A value of none means that the ﬂoat area (the area that is used for wrapping content around a ﬂoat element) is unaﬀected. This is the default/initial value.
- `basic-shape` Refers to one among `inset()`, `circle()`, `ellipse()` or `polygon()`. Using one of these functions and its values the shape is deﬁned.
- `shape-box` Refers to one among `margin-box`, `border-box`, `padding-box`, `content-box`. When only `<shape-box>` is provided (without `<basic-shape>`) this box is the shape. When it is used along with `<basic-shape>`, this acts as the reference box.
- `image` When an image is provided as value, the shape is computed based on the alpha channel of the image speciﬁed.

##### Shape Outside with Basic Shape – circle()
With the shape-outside CSS property one can deﬁne shape values for the ﬂoat area so that the inline content wraps around the shape instead of the ﬂoat's box.
```
img:nth-of-type(1) {
    shape-outside: circle(80px at 50% 50%);
    float: left;
    width: 200px;
}
img:nth-of-type(2) {
    shape-outside: circle(80px at 50% 50%);
    float: right;
    width: 200px;
}
p {
    text-align: center;
    line-height: 30px; /* purely for demo */
}


<img src="http://images.clipartpanda.com/circle-clip-art-circlergb.jpg">
<img src="http://images.clipartpanda.com/circle-clip-art-circlergb.jpg">
<p>Some paragraph whose text content is required to be wrapped such that it follows the curve of the circle on either side. And then there is some filler text just to make the text long enough. Lorem Ipsum Dolor Sit Amet....</p>
```
##### Shape margin
The shape-margin CSS property adds a margin to shape-outside.
```
img:nth-of-type(1) {
    shape-outside: circle(80px at 50% 50%);
    shape-margin: 10px;
    float: left;
    width: 200px;
}
img:nth-of-type(2) {
    shape-outside: circle(80px at 50% 50%);
    shape-margin: 10px;
    float: right;
    width: 200px;
}
p {
    text-align: center;
    line-height: 30px; /* purely for demo */
}

<img src="http://images.clipartpanda.com/circle-clip-art-circlergb.jpg">
<img src="http://images.clipartpanda.com/circle-clip-art-circlergb.jpg">
<p>Some paragraph whose text content is required to be wrapped such that it follows the curve of the circle on either side. And then there is some filler text just to make the text long enough. Lorem Ipsum Dolor Sit Amet....</p>
```
##### List Styles
- `list-style-type` the type of list-item marker.
- `list-style-position` speciﬁes where to place the marker
- `list-style-image` speciﬁes the type of list-item marker
- `initial` sets this property to its default value
- `inherit` inherits this property from its parent element

##### Bullet Position
```
list-style-position: inside;
list-style-position: outside;
```
##### Removing Bullets / Numbers
```
ul {
    list-style-type: none;
}
li {
    margin: 0;
    padding: 0;
}
```
##### Type of Bullet or Numbering
```
list-style: disc/circle/square/'-'/list-style: decimal/decimal-leading-zero/lower-roman/...
list-style: none;
list-style: inherit;
```
##### Counters
- `counter-name` This is the name of the counter that needs to be created or incremented or printed. It can be any custom name as the developer wishes.
- `integer` This integer is an optional value that when provided next to the counter name will represent the initial value of the counter (in counter-set, counter-reset properties) or the value by which the counter should be incremented (in counter-increment).
- `none` This is the initial value for all 3 counter-* properties. When this value is used for counterincrement, the value of none of the counters are aﬀected. When this is used for the other two, no counter is created.
- `counter-style` This speciﬁes the style in which the counter value needs to be displayed. It supports all values supported by the list-style-type property. If none is used then the counter value is not printed at all.
- `connector-string` This represents the string that must be placed between the values of two diﬀerent counter levels (like the "." in "2.1.1").

##### Applying roman numerals styling to the counter
```
body {
    counter-reset: item-counter;
}
.item {
    counter-increment: item-counter;
}
.item:before {
    content: counter(item-counter, upper-roman) ". "; /* by specifying the upper-roman as style the output would be in roman numbers */
}

<div class='item'>Item No: 1</div>
<div class='item'>Item No: 2</div>
<div class='item'>Item No: 3</div>
```
##### Number each item using CSS Counter
```
body {
    counter-reset: item-counter; /* create the counter */
}
.item {
    counter-increment: item-counter; /* increment the counter every time an element with class "item" is encountered */
}
.item-header:before {
    content: counter(item-counter) ". "; /* print the value of the counter before the header and append a "." to it */
}

/* just for demo */
.item {
    border: 1px solid;
    height: 100px;
    margin-bottom: 10px;
}
.item-header {
    border-bottom: 1px solid;
    height: 40px;
    line-height: 40px;
    padding: 5px;
}
.item-content {
    padding: 8px;
}

<div class='item'>
    <div class='item-header'>Item 1
        <div class='item-content'>Lorem</div>
        <div class='item'>
            <div class='item-header'>Item 2
                <div class='item-content'>Lorem</div>
                <div class='item'>
                    <div class='item-header'>Item 3
                        <div class='item-content'>Lorem</div>
                        Header
                    </div>
                    Ipsum Dolor Sit Amet....
                </div>
                Header
            </div>
            Ipsum Dolor Sit Amet....
        </div>
        Header
    </div>
    Ipsum Dolor Sit Amet....
</div>
```
##### Implementing multi-level numbering using CSS counters
```
ul {
    list-style: none;
    counter-reset: list-item-number; /* self nesting counter as name is same for all levels */
}
li {
    counter-increment: list-item-number;
}
li:before {
    content: counters(list-item-number, ".") " "; /* usage of counters() function means value of counters at all higher levels are combined before printing */
}

<ul>
    <li>Level 1
        <ul>
            <li>Level 1.1
                <ul>
                    <li>Level 1.1.1</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Level 2
        <ul>
            <li>Level 2.1
                <ul>
                    <li>Level 2.1.1</li>
                    <li>Level 2.1.2</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Level 3</li>
</ul>
```
##### calc() function
Use calc() to calculate the width of a div element:
```
#div1 {
    position: absolute;
    left: 50px;
    width: calc(100% - 100px);
    border: 1px solid black;
    background-color: yellow;
    padding: 5px;
    text-align: center;
}
```
Use calc() to determine the position of a background-image:
```
background-position: calc(50% + 17px) calc(50% + 10px), 50% 50%;
```
Use calc() to determine the height of an element:
```
height: calc(100% - 20px);
```
##### attr() function
```
<blockquote data-mark='"'></blockquote>

blockquote[data-mark]::before,
blockquote[data-mark]::after {
    content: attr(data-mark);
}
```
##### var() function
```
:root {
    --primary-color: blue;
}

selector {
    color: var(--primary-color);
}
```
##### radial-gradient() function
Creates an image representing a gradient of colors radiating from the center of the gradient
```
radial-gradient(red, orange, yellow) /*A gradient coming out from the middle of the
gradient, red at the center, then orange, until it is finally yellow at the edges*/
```
##### linear-gradient() function
Creates a image representing a linear gradient of colors.
```
linear-gradient( 0deg, red, yellow 50%, blue);
```
This creates a gradient going from bottom to top, with colors starting at red, then yellow at 50%, and ﬁnishing in blue.

##### Variable Color
:root {
    --red: #b00;
    --blue: #4679bd;
    --grey: #ddd;
}
.Bx1 {
    color: var(--red);
    background: var(--grey);
    border: 1px solid var(--red);
}
```
##### Variable Dimensions
```
:root {
    --W200: 200px;
    --W10: 10px;
}
.Bx2 {
    width: var(--W200);
    height: var(--W200);
    margin: var(--W10);
}
```
##### Variable Cascading
```
<a class="button">Button Green</a>
<a class="button button_red">Button Red</a>
<a class="button">Button Hovered On</a>

.button {
    --color: green;
    padding: .5rem;
    border: 1px solid var(--color);
    color: var(--color);
}
```
.button:hover {
    --color: blue;
}
.button_red {
    --color: red;
}
```
##### Valid/Invalids
```
// These are Invalids variable names
--123color: blue;
--#color: red;
--bg_color: yellow
--$width: 100px;
// Valid variable names
--color: red;
--bg-color: yellow
--width: 100px;
// The variable names below are all different variables
--pcolor: ;
--Pcolor: ;
--pColor: ;
// Empty Vs Space
--color:; // Invalid
--color: ; // Valid. space is assigned
// Concatenations
// Invalid - CSS doesn't support concatenation*/
.logo{
    --logo-url: 'logo';
    background: url('assets/img/' var(--logo-url) '.png');
}
// Invalid - CSS bug 
.logo{
    --logo-url: 'assets/img/logo.png';
    background: url(var(--logo-url));
}
// Valid
.logo{
    --logo-url: url('assets/img/logo.png');
    background: var(--logo-url);
}
// Careful when using Units
// Invalid
--width: 10;
width: var(--width)px;
// Valid
--width: 10px;
width: var(--width);
// Valid
--width: 10;
width: calc(1px * var(--width)); /* multiply by 1 unit to convert */
width: calc(1em * var(--width));
```
##### With media queries
```
:root{
    --width: 25%;
    --content: 'This is desktop';
}
@media only screen and (max-width: 767px){
    :root{
        --width:50%;
        --content: 'This is mobile';
    }
}
@media only screen and (max-width: 480px){
    :root{
        --width:100%;
    }
}
div{
    width: calc(var(--width) - 20px);
    height: 100px;
}
div:before{
    content: var(--content);
}

body {
    padding: 10px;
}
div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight:bold;
    float:left;
    margin: 10px;
    border: 4px solid black;
    background: red;
}
```
##### Trapezoid
```
<div class="trapezoid"></div>

.trapezoid {
    width: 50px;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid black;
}
```
##### Triangle - Pointing Up
```
<div class="triangle-up"></div>

.triangle-up {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid rgb(246, 156, 85);
}
```
##### Triangle - Pointing Down
```
<div class="triangle-down"></div>

.triangle-down {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 50px solid rgb(246, 156, 85);
}
```
##### Triangle - Pointing Right
```
<div class="triangle-right"></div>

.triangle-right {
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 50px solid rgb(246, 156, 85);
}
```
##### Triangle - Pointing Left
```
<div class="triangle-left"></div>

.triangle-left {
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-right: 50px solid rgb(246, 156, 85);
}
```
##### Triangle - Pointing Up/Right
```
<div class="triangle-up-right"></div>

.triangle-up-right {
    width: 0;
    height: 0;
    border-top: 50px solid rgb(246, 156, 85);
    border-left: 50px solid transparent;
}
```
##### Triangle - Pointing Up/Left
```
<div class="triangle-up-left"></div>

.triangle-up-left {
    width: 0;
    height: 0;
    border-top: 50px solid rgb(246, 156, 85);
    border-right: 50px solid transparent;
}
```
##### Triangle - Pointing Down/Right
```
<div class="triangle-down-right"></div>

.triangle-down-right {
    width: 0;
    height: 0;
    border-bottom: 50px solid rgb(246, 156, 85);
    border-left: 50px solid transparent;
}
```
##### Triangle - Pointing Down/Left
```
<div class="triangle-down-left"></div>

.triangle-down-left {
    width: 0;
    height: 0;
    border-bottom: 50px solid rgb(246, 156, 85);
    border-right: 50px solid transparent;
}
```
##### Circles and Ellipses
```
<div class="circle"></div>

.circle {
    width: 50px;
    height: 50px;
    background: rgb(246, 156, 85);
    border-radius: 50%;
}
```
```
<div class="oval"></div>

.oval {
    width: 50px;
    height: 80px;
    background: rgb(246, 156, 85);
    border-radius: 50%;
}
```
##### 8 Point Burst
An 8 point burst are 2 layered squares. The bottom square is the element itself, the additional square is created using the :before pseudo-element. The bottom is rotated 20°, the top square is rotated 135°.
```
<div class="burst-8"></div>

.burst-8 {
    background: rgb(246, 156, 85);
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    transform: rotate(20eg);
}

.burst-8::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    background: rgb(246, 156, 85);
    transform: rotate(135deg);
}
```
##### 12 Point Burst
An 12 point burst are 3 layered squares. The bottom square is the element itself, the additional squares are created using the :before and :after pseudo-elements. The bottom is rotated 0°, the next square is rotated 30°, and the top is rotated 60°.
```
<div class="burst-12"></div>

.burst-12 {
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    background: rgb(246, 156, 85);
}
.burst-12::before, .burst-12::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    background: rgb(246, 156, 85);
}
.burst-12::before {
    transform: rotate(30deg);
}
.burst-12::after {
    transform: rotate(60deg);
}
```
##### Square
```
<div class="square"></div>

.square {
    width: 100px;
    height: 100px;
    background: rgb(246, 156, 85);
}
```
##### Cube
This example shows how to create a cube using 2D transformation methods skewX() and skewY() on pseudo elements.
```
<div class="cube"></div>

.cube {
    background: #dc2e2e;
    width: 100px;
    height: 100px;
    position: relative;
    margin: 50px;
}
.cube::before {
    content: '';
    display: inline-block;
    background: #f15757;
    width: 100px;
    height: 20px;
    transform: skewX(-40deg);
    position: absolute;
    top: -20px;
    left: 8px;
}
.cube::after {
    content: '';
    display: inline-block;
    background: #9e1515;
    width: 16px;
    height: 100px;
    transform: skewY(-50deg);
    position: absolute;
    top: -10px;
    left: 100%;
}
```
##### Pyramid
This example shows how to create a pyramid using borders and 2D transformation methods skewY() and rotate() on pseudo elements.
```
<div class="pyramid"></div>

.pyramid {
    width: 100px;
    height: 200px;
    position: relative;
    margin: 50px;
}
.pyramid::before,.pyramid::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border: 50px solid;
    position: absolute;
}
.pyramid::before {
    border-color: transparent transparent #ff5656 transparent;
    transform: scaleY(2) skewY(-40deg) rotate(45deg);
}
.pyramid::after {
    border-color: transparent transparent #d64444 transparent;
    transform: scaleY(2) skewY(40deg) rotate(-45deg);
}
```
##### Columns
```
<div id="multi-columns">
    ...big content
</div>

.multi-columns {
    column-count: 2;
}
```
##### Column Width
```
<div id="multi-columns">
    ...big content
</div>
.multi-columns {
    column-width: 100px;
}
```
##### Multiple columns
```
<div class="content">
    ...big content
</div>

.content {
    column-count: 3;
}
```
Section 40.2: Basic example
Consider the following HTML markup:
```
<section>
    ...big content
</section>

section {
    columns: 3;
    column-gap: 40px;
    column-rule: 2px solid gray;
}
```
##### Inline-Block Layout. Justiﬁed navigation bar
The horizontally justiﬁed navigation (menu) bar has some number of items that should be justiﬁed. The ﬁrst (left) item has no left margin within the container, the last (right) item has no right margin within the container. The distance between items is equal, independent on the individual item width.
```
<nav>
    <ul>
        <li>abc</li>
        <li>abcdefghijkl</li>
        <li>abcdef</li>
    </ul>
</nav>

nav {
    width: 100%;
    line-height: 1.4em;
}
ul {
    list-style: none;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: justify;
    margin-bottom: -1.4em;
}
ul:after {
    content: "";
    display: inline-block;
    width: 100%;
}
li {
    display: inline-block;
}
```
> The nav, ul and li tags were chosen for their semantic meaning of 'a list of navigation (menu) items'. Other tags may also be used of course.

> The :after pseudo-element causes an extra 'line' in the ul and thus an extra, empty height of this block, pushing other content down. This is solved by the negative margin-bottom, which has to have the same magnitude as the line-height (but negative).

> If the page becomes too narrow for all the items to ﬁt, the items will break to a new line (starting from the right) and be justiﬁed on this line. The total height of the menu will grow as needed.

##### Automatic inheritance
Common properties that are automatically inherited are: font, color, text-align, line-height.
```
#myContainer {
    color: red;
    padding: 5px;
}
// `color` is inherited, whereas `padding` is not
<div id="myContainer">
    <h3>Some header</h3>
    <p>Some paragraph</p>
</div>
```
##### Enforced inheritance
Some properties not inherited are margin, padding, background, display, etc.
```
#myContainer {
    color: red;
    padding: 5px;
}
#myContainer p {
    padding: inherit;
}

<div id="myContainer">
    <h3>Some header</h3>
    <p>Some paragraph</p>
</div>
```
##### CSS Image Sprites
```
<div class="icon icon1"></div>
<div class="icon icon2"></div>
<div class="icon icon3"></div>

.icon {
    background: url(“icons-sprite.png”);
    display: inline-block;
    height: 20px;
    width: 20px;
}
.icon1 {
    background-position: 0px 0px;
}
.icon2 {
    background-position: -20px 0px;
}
.icon3 {
    background-position: -40px 0px;
}
```
##### Clipping and Masking
- `clip-source` A URL which can point to an inline SVG element (or) an SVG element in an external ﬁle that contains the clip path's deﬁnition.
- `basic-shape` Refers to one among inset(), circle(), ellipse() or polygon(). Using one of these functions the clipping path is deﬁned. These shape functions work exactly the same way as they do in Shapes for Floats
- `clip-geometry-box` This can have one among content-box, padding-box, border-box, margin-box, fill-box, stroke-box, view-box as values. When this is provided without any value for `<basic-shape>`, the edges of the corresponding box is used as the path for clipping. When used with a `<basic-shape>`, this acts as the reference box for the shape.
- `mask-reference` This can be none or an image or a reference URL to a mask image source.
- `repeat-style` This speciﬁes how the mask should be repeated or tiled in the X and Y axes. The supported values are repeat-x, repeat-y, repeat, space, round, no-repeat.
- `mask-mode` Can be alpha or luminance or auto and indicates whether the mask should be treated as a alpha mask or a luminance mask. If no value is provided and the mask-reference is a direct image then it would be considered as alpha mask (or) if the mask-reference is a URL then it would be considered as luminance mask.
- `position` This speciﬁes the position of each mask layer and is similar in behavior to the backgroundposition property. The value can be provided in 1 value syntax (like top, 10%) or in 2 value syntax (like top right, 50% 50%).
- `geometry-box` This speciﬁes the box to which the mask should be clipped (mask painting area) or the box which should be used as reference for the mask's origin (mask positioning area) depending on the property. The list of possible values are content-box, padding-box, border-box, margin-box, fill-box, stroke-box, view-box. Detailed explanation of how each of those values work is available in the W3C Spec.
- `bg-size` This represents the size of each mask-image layer and has the same syntax as backgroundsize. The value can be length or percentage or auto or cover or contain. Length, percentage and auto can either be provided as a single value or as one for each axis. This can be any one among add, subtract, exclude, multiply per layer and deﬁnes the type compositing-operator of compositing operation that should be used for this layer with those below it.

```
clip-path: circle(100px at center);
```
The element will be only visible inside of this circle, which is positioned at the center of the element and has a radius of 100px.
```
mask: url(masks.svg#rectangle) luminance;
```
An element called rectangle deﬁned in masks.svg will be used as an luminance mask on the element.

#####: Simple mask that fades an image from solid to transparent
```
div {
    height: 200px;
    width: 200px;
    background: url(http://lorempixel.com/200/200/nature/1);
    mask-image: linear-gradient(to right, white, transparent);
}

<div></div>
```
##### Clipping (Circle)
```
div {
    width: 200px;
    height: 200px;
    background: teal;
    clip-path: circle(30% at 50% 50%); /* refer remarks before usage */
}

<div></div>
```
##### Clipping (Polygon)
```
div {
    width:200px;
    height:200px;
    background:teal;
    clip-path: polygon(0 0, 0 100%, 100% 50%); /* refer remarks before usage */
}

<div></div>
```
##### Using masks to cut a hole in the middle of an image
```
div {
    width: 200px;
    height: 200px;
    background: url(http://lorempixel.com/200/200/abstract/6);
    mask-image: radial-gradient(circle farthest-side at center, transparent 49%, white 50%); /* check remarks before using */
}
```
##### Using masks to create images with irregular
```
div { /* check remarks before usage */
    height: 200px;
    width: 400px;
    background-image: url(http://lorempixel.com/400/200/nature/4);
    mask-image: linear-gradient(to top right, transparent 49.5%, white 50.5%), linear-gradient(to top left, transparent 49.5%, white 50.5%), linear-gradient(white, white);
    mask-size: 75% 25%, 25% 25%, 100% 75%;
    mask-position: bottom left, bottom right, top left;
    mask-repeat: no-repeat;
}

<div></div>
```
##### Fragmentation
- `auto` Default. Automatic page breaks
- `always` Always insert a page break
- `avoid` Avoid page break (if possible)
- `left` Insert page breaks so that the next page is formatted as a left page
- `right` Insert page breaks so that the next page is formatted as a right page
- `initial` Sets this property to its default value.
- `inherit` Inherits this property from its parent element.

##### Media print page-break
```
@media print {
    p {
        page-break-inside: avoid;
    }
    h1 {
        page-break-before: always;
    }
    h2 {
        page-break-after: avoid;
    }
}
```
This code does 3 things:
1. it prevents a page break inside any p tags, meaning a paragraph will never be broken in two pages, if possible.
2. it forces a page-break-before in all h1 headings, meaning that before every h1 occurrence, there will be a page break.
3. it prevents page-breaks right after any h2

##### CSS Object Model (CSSOM)
```
// To add a background-image rule via the CSSOM, ﬁrst get a reference to the rules of the ﬁrst stylesheet:
var stylesheet = document.styleSheets[0].cssRules;

// Then, get a reference to the end of the stylesheet: 
var end = stylesheet.length - 1;

// Finally, insert a background-image rule for the body element at the end of the stylesheet:
stylesheet.insertRule("body { background-image:
url('http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico'); }", end);
```
> The browser identiﬁes tokens from stylesheet and coverts them into nodes which are linked into a tree structure.

> The entire map of all the nodes with their associated styles of a page would be the CSS Object Model.

To display the webpage, a web browser takes following steps.
1. The web browser examines your HTML and builds the DOM (Document Object Model).
2. The web browser examines your CSS and builds the CSSOM (CSS Object Model).
3. The web browser combines the DOM and the CSSOM to create a render tree. The web browser displays your webpage.

##### Feature Queries
- `(property: value)` Evaluates true if the browser can handle the CSS rule. The parenthesis around the rule are required.
- `and` Returns true only if both the previous and next conditions are true.
- `not` Negates the next condition
- `or` Returns true if either the previous or next condition is true.
- `(...)` Groups conditions

##### Basic @supports usage
```
@supports (display: flex) {
    /* Flexbox is available, so use it */
    .my-container {
        display: flex;
    }
}
```
> @supports will detect whether the browser can handle a given CSS rule.

##### Chaining feature detections
```
@supports (transform: translateZ(1px)) and (transform-style: preserve-3d) and (perspective: 1px) {
    /* Probably do some fancy 3d stuff here */
}
// There is also an or operator and a not operator:
@supports (display: flex) or (display: table-cell) {
/* Will be used if the browser supports flexbox or display: table-cell */
}
@supports not (-webkit-transform: translate(0, 0, 0)) {
/* Will *not* be used if the browser supports -webkit-transform: translate(...) */
}
```
For the ultimate @supports experience, try grouping logical expressions with parenthesis:
```
@supports ((display: block) and (zoom: 1)) or ((display: flex) and (not (display: table-cell))) or
(transform: translateX(1px)) {
    /* ... */
}
```
This will work if the browser
1. Supports display: block AND zoom: 1, or
2. Supports display: flex AND NOT display: table-cell, or
3. Supports transform: translateX(1px).

##### Stacking Context
```
<div id="div1">
    <h1>Division Element #1</h1>
    <code>
        position: relative;
        <br/>
        z-index: 5;
    </code>
</div>
<div id="div2">
    <h1>Division Element #2</h1>
    <code>
        position: relative;
        <br/>
        z-index: 2;
    </code>
</div>
<div id="div3">
    <div id="div4">
        <h1>Division Element #4</h1>
        <code>
            position: relative;
            <br/>
            z-index: 6;
        </code>
    </div>
    <h1>Division Element #3</h1>
    <code>
        position: absolute;
        <br/>
        z-index: 4;
    </code>
    <div id="div5">
        <h1>Division Element #5</h1>
        <code>
            position: relative;
            <br/>
            z-index: 1;
        </code>
    </div>
    <div id="div6">
        <h1>Division Element #6</h1>
        <code>
            position: absolute;
            <br/>
            z-index: 3;
        </code>
    </div>
</div>

* {
    margin: 0;
}
html {
    padding: 20px;
    font: 12px/20px Arial, sans-serif;
}
div {
    opacity: 0.7;
    position: relative;
}
h1 {
    font: inherit;
    font-weight: bold;
}
#div1, #div2 {
    border: 1px dashed #696;
    padding: 10px;
    background-color: #cfc;
}
#div1 {
    z-index: 5;
    margin-bottom: 190px;
}
#div2 {
    z-index: 2;
}
#div3 {
    z-index: 4;
    opacity: 1;
    position: absolute;
    top: 40px;
    left: 180px;
    width: 330px;
    border: 1px dashed #900;
    background-color: #fdd;
    padding: 40px 20px 20px;
}
#div4, #div5 {
    border: 1px dashed #996;
    background-color: #ffc;
}
#div4 {
    z-index: 6;
    margin-bottom: 15px;
    padding: 25px 10px 5px;
}
#div5 {
    z-index: 1;
    margin-top: 15px;
    padding: 5px 10px;
}
#div6 {
    z-index: 3;
    position: absolute;
    top: 20px;
    left: 180px;
    width: 150px;
    height: 125px;
    border: 1px dashed #009;
    padding-top: 125px;
    background-color: #ddf;
    text-align: center;
}
```
##### Block Formatting Contexts. Using the overﬂow property with a value different to visible
```
img{
    float:left;
    width:100px;
    margin:0 10px;
}
.div1{
    background:#f1f1f1;
    /* does not create block formatting context */
}
.div2{
    background:#f1f1f1;
    overflow:hidden;
    /* creates block formatting context */
}
```
> Using the overﬂow property with a value diﬀerent to visible (its default) will create a new block formatting
context. This is technically necessary — if a ﬂoat intersected with the scrolling element it would forcibly
rewrap the content.

##### Vertical Centering with display: table
```
<div class="wrapper">
    <div class="outer">
        <div class="inner">
            centered
        </div>
    </div>
</div>

.wrapper {
    height: 600px;
    text-align: center;
}
.outer {
    display: table;
    height: 100%;
    width: 100%;
}
.outer .inner {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```
##### Centering with Flexbox
```
<div class="container">
    <div class="child"></div>
</div>

.container {
    height: 500px;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
}
.child {
    width: 100px;
    height: 100px;
    background: blue;
}
```
##### Centering with Transform
```
<div class="wrapper">
    <div class="centered">
        centered
    </div>
</div>

.wrapper {
    position: relative;
    height: 600px;
}
.centered {
    position: absolute;
    z-index: 999;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
```
##### Centering Text with Line Height
```
<div class="container">
    <span>vertically centered</span>
</div>

.container{
    height: 50px;
    /* set height */
    line-height: 50px;
    /* set line-height equal to the height */
    vertical-align: middle; /* works without this rule, but it is good having it explicitly set */
}
```
> This method will only vertically center a single line of text. It will not center block elements correctly and if the text breaks onto a new line, you will have two very tall lines of text.

##### Centering with Position: absolute
```
<div class="wrapper">
    <img src="http://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a">
</div>

.wrapper{
    position:relative;
    height: 600px;
}
.wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
If you want to center other then images, then you must give height and width to that element.
```
<div class="wrapper">
    <div class="child">
        make me center
    </div>
</div>

.wrapper{
    position:relative;
    height: 600px;
}
.wrapper .child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 30px;
    border: 1px solid #f00;
}
```
##### Centering with pseudo element
```
<div class="wrapper">
    <div class="content"></div>
</div>

.wrapper{
    min-height: 600px;
}
.wrapper:before{
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
.content {
    display: inline-block;
    height: 80px;
    vertical-align: middle;
}
```
> This method is best used in cases where you have a varied-height .content centered inside .wrapper; and you
want .wrapper's height to expand when .content's height exceed .wrapper's min-height.

##### Object Fit
The object-ﬁt property will deﬁnes how an element will ﬁt into a box with an established height and width. Usually applied to an image or video
```
object-fit:fill;
object-fit:contain;
object-fit:cover;
object-fit:none;
object-fit:scale-down;
```

##### CSS design patterns. BEM
- `Blocks`: standalone entities that are meaningful on their own. Examples are header, container, menu, checkbox & textbox
- `Elements`: Part of blocks that have no standalone meaning and are semantically tied to their blocks. Examples are menu item, list item, checkbox caption & header title
- `Modiﬁers`: Flags on a block or element, used to change appearance or behavior Examples are disabled, highlighted, checked, fixed, size big & color yellow

The goal of BEM is to keep optimize the readability, maintainability and ﬂexibility of your CSS code. The way to achieve this, is to apply the following rules.
- Block styles are never dependent on other elements on a page
- Blocks should have a simple, short name and avoid _ or - characters
- When styling elements, use selectors of format blockname__elementname
- When styling modiﬁers, use selectors of format blockname--modifiername and blockname__elementname-modifiername
- Elements or blocks that have modiﬁers should inherit everything from the block or element it is modifying except the properties the modiﬁer is supposed to modify

```
.form { }                   // Block
.form--theme-xmas { }       // Block + modifier
.form--simple { }           // Block + modifier
.form__input { }            // Block > element
.form__submit { }           // Block > element
.form__submit--disabled { } // Block > element + modifier
```
```
<form class="form form--theme-xmas form--simple">
    <input class="form__input" type="text" />
    <input class="form__submit form__submit--disabled" type="submit" />
</form>
```
##### normalize.css vs reset.css
> While normalize.css provides consistency by setting diﬀerent properties to uniﬁed defaults, reset.css achieves consistency by removing all basic styling that a browser may apply. While this might sound like a good idea at ﬁrst, this actually means you have to write all rules yourself, which goes against having a solid standard.

##### reset css
```
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
```
##### Eric Meyer's Reset CSS
```
/**
* 1. Change the default font family in all browsers (opinionated).
* 2. Correct the line height in all browsers.
* 3. Prevent adjustments of font size after orientation changes in IE and iOS.
*/
/* Document
========================================================================== */
html {
    font-family: sans-serif; /* 1 */
    line-height: 1.15; /* 2 */
}
/* Sections
========================================================================== */
/**
* Remove the margin in all browsers (opinionated).
*/
body {
    margin: 0;
}
/**
* Add the correct display in IE 9-.
*/
article,
aside,
footer,
header,
nav,
section {
    display: block;
}
/**
* Correct the font size and margin on `h1` elements within `section` and
* `article` contexts in Chrome, Firefox, and Safari.
*/
h1 {
    font-size: 2em;
    margin: 0.67em 0;
}
```
##### Performance. Use transform and opacity to avoid trigger layout
> when you need to animate at 60fps. DON'T Animate with left and top trigger layout.
```
#box {
    left: 0;
    top: 0;
    transition: left 0.5s, top 0.5s;
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: gray;
}
#box.active {
    left: 100px;
    top: 100px;
}
```
Demo took 11.7ms for rendering, 9.8ms for painting

> DO Animate with transform with the same animation.
```
#box {
    left: 0;
    top: 0;
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: gray;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
}
#box.active {
    transform: translate3d(100px, 100px, 0);
}
```
Demo same animation, took 1.3ms for rendering, 2.0ms for painting.