##### Elements: `video`, `audio`, `table`, `footer`
##### Tags: `<video>`, `<audio>`, `<table>`, `<footer>`, `</html>`, `</body>`
##### `<!DOCTYPE html>`: HTML5 is not based on SGML (Standard Generalized Markup Language), and therefore does not require a reference to a DTD (Document Type Deﬁnition).
##### `<br>` Inserts a single line break
##### `<pre>` Deﬁnes pre-formatted text
##### `<mark>`
```
<p>Here is some content from an article that contains the <mark>searched query</mark> that we are looking for. Highlighting the text will make it easier for the user to find what they are looking for.</p>
```
##### `Bold`, `Italic`, and `Underline`
```
<strong>Bold Text Here</strong>
<b>Bold Text Here</b>

<em>Italicized Text Here</em>
<i>Italicized Text Here</i>

<u>mispelled</u>
```
##### Abbreviation
```
<p>I like to write <abbr title="Hypertext Markup Language">HTML</abbr>!</p>
```
##### Inserted
```
<ins>New Text</ins>
```
##### Deleted, or Stricken
```
<del>Deleted Text</del>
<s>Struck-through text here</s>
```
##### Anchors and Hyperlinks
- href
- hreflang: BCP 47 for HTML5 and RFC 1766 for HTML 4.
- rel: relationship between the current document and the linked document.
- target: _blank, _self, _parent, _top, framename (deprecated). Forcing such behaviour is not recommended  since it violates the control of the user over a website.
- title: tooltip text.
- download 
```
<a href="ftp://example.com/">This could be a link to a FTP site</a>
```
```
<h2 id="Topic1">First topic</h2>
<p>Content about the first topic</p>
<h2 id="Topic2">Second topic</h2>
<p>Content about the second topic</p>

<a href='#Topic1'>Click to jump to the First Topic</a>
<a href='#Topic2'>Click to jump to the Second Topic</a>
```
```
<a href="page1.html#Topic1">look back in the First Topic</a>
```
```
<a href="tel:11234567890">Call us</a>
```
##### SECURITY VULNERABILITY WARNING!
```
<a href="example.com" target="_blank">Text Here</a>
```
Using target="_blank" gives the opening site partial access to the window.opener object via JavaScript, which allows that page to then access and change the window.opener.location of your page and potentially redirect users to malware or phishing sites. Whenever using this for pages you do not control, add rel="noopener" to your link to prevent the window.opener object from being sent with the request.

Currently, Firefox does not support noopener, so you will need to use rel="noopener noreferrer" for
maximum eﬀect.
```
<a href="javascript:myFunction();">Run Code</a>
// You can also achieve the same thing using the onclick attribute:
<a href="#" onclick="myFunction(); return false;">Run Code</a>
```
The return false; is necessary to prevent your page from scrolling to the top when the link to # is clicked.

Also noteworthy, you can include an exclamation mark ! after the hashtag in order to prevent the page from scrolling to the top. This works because any invalid slug will cause the link to not scroll anywhere on the page, because it couldn't locate the element it references (an element with id="!"). 
You could also just use any invalid
slug (such as #scrollsNowhere) to achieve the same eﬀect. In this case, return false; is not required:
```
<a href="#!" onclick="myFunction();">Run Code</a>
```
```
<a href="mailto:example@example.com">Send email</a>
<a href="mailto:example@example.com?cc=john@example.com&bcc=jane@example.com">Send email</a>
<a href="mailto:example@example.com?subject=Example+subject&body=Message+text">Send email</a>
```
1. ordered lists
```
<ol start="5">
<li>Item</li>
<li>Some Other Item</li>
<li value="4">A Reset Item</li>
<li>Another Item</li>
<li>Yet Another Item</li>
</ol>
// 5, 6, 4, 5, 6
```
```
<ol reversed>
<ol type="1|a|A|i|I">
```
2. unordered lists
3. description lists
```
<dl>
    <dt>name 1</dt>
    <dt>name 2</dt>
    <dd>value for 1 and 2</dd>
    <dt>name 3</dt>
    <dd>value for 3</dd>
    <dd>value for 3</dd>
</dl>
```
```
<table>
    <colgroup>
        <col id="MySpecialColumn" />
        <col />
    </colgroup>
    <colgroup>
        <col class="CoolColumn" />
        <col class="NeatColumn" span="2" />
    </colgroup>
</table>
```
##### CSS styles that can be applied to <colgroup> and <col> elements:
- border
- background
- width
- visibility
- display (as in display: none)
- display: none; will actually remove the columns from the display, causing the table to render as if

##### thead, tbody, tfoot, and caption
```
<table>
    <caption>Table Title</caption>
    <thead> <!-- thead is after caption -->
        <tr>
            <th>Header content 1</th>
            <th>Header content 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Body content 1</td>
            <td>Body content 2</td>
        </tr>
    </tbody>
    <tfoot>
        // tfoot can be placed before or after tbody, but not in a group of tbody.
        // Regardless where tfoot is in markup, it is rendered at the bottom.
        <tr>
            <td>Footer content 1</td>
            <td>Footer content 2</td>
        </tr>
    </tfoot>
</table>
```
##### Heading scope
```
<table>
    <thead>
        <tr>
            <td></td>
            <th>Column Heading 1</th>
            <th>Column Heading 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Row Heading 1</th>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th>Row Heading 2</th>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```
##### accessibility by the use of the scope attribute
```
<table>
    <thead>
        <tr>
            <td></td>
            <th scope="col">Column Heading 1</th>
            <th scope="col">Column Heading 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Row Heading 1</th>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Row Heading 1</th>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```
> scope is known as an enumerated attribute, meaning that it can have a value from a speciﬁc set of possible values.

> This set includes `col`, `row`, `colgroup`, `rowgroup`.

##### CSS Selectors
```
// if we only want to target div's with the class
div.highlight { color: green; }

.main .highlight { color: red; } /* Descendant combinator *
.footer > .highlight { color: blue; } /* Child combinator */
```
```
<div class="special left menu">This text will be pink</div> // HTML
.special.left.menu { color: pink; } // CSS
```
##### Data Attribute Use
HTML5 data-* attributes provide a convenient way to store data in HTML elements. The stored data can be read or modiﬁed using JavaScript
```
// Data in string, hson format
<div data-submitted="yes">
```
##### Linking Resources
|Attribute|Details|
|-|-|
|charset|Speciﬁes the character encoding of the linked document|
|crossorigin|Speciﬁes how the element handles cross origin requests|
|href|Speciﬁes the location of the linked document|
|hreflang|Speciﬁes the language of the text in the linked document|
|media|Speciﬁes on what device the linked document will be displayed, often used with selecting stylesheets based on the device in question|
|rel|Required. Speciﬁes the relationship between the current document and the linked document|
|rev|Speciﬁes the relationship between the linked document and the current document|
|sizes|Speciﬁes the size of the linked resource. Only when rel="icon"|
|target|Speciﬁes where the linked document is to be loaded|
|type|Speciﬁes the media type of the linked document|
|integrity|Speciﬁes a base64 encoded hash (sha256, sha384, or sha512) of the linked resource allowing the browser to verify its legitimacy.|

##### Linking JavaScript
- Synchronous
```
<script src="path/to.js"></script>
```
- Asynchronous. When the Javascript code being loaded is not necessary for page initialization, it can be loaded asynchronously, speeding up the page load. Using async the browser will load the contents of the script in parallel and, once it is fully downloaded, will interrupt the HTML parsing in order to parse the Javascript ﬁle.
```
<script src="path/to.js" async></script>
```
- Deferred. script are like async scripts, with the exception that the parsing will only be performed once the HTML is fully parsed. Deferred scripts are guaranteed to be loaded in the order of declaration, same way as synchronous scripts.
```
<script src="path/to.js" defer></script>
```
- noscript
```
<noscript>JavaScript disabled</noscript>
```
##### Linking CSS
```
<link rel="stylesheet" href="path/to.css" type="text/css">

// type is optional
<link rel="stylesheet" href="path/to.css">

<style type="text/css">
    @import("path/to.css")
</style>

// type is optional
<style>
    @import("path/to.css")
</style>
```
##### Linking Favicon
```
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
```
Use the mime-type image/png for PNG ﬁles and image/x-icon for icon (*.ico) ﬁles.

A ﬁle named favicon.ico at the root of your website will typically be loaded and applied automatically, without the need for a <link> tag.
If this ﬁle ever changes, browsers can be slow and stubborn about updating their cache.

##### Alternative CSS
```
<link rel="alternate stylesheet" href="path/to/style.css" title="yourTitle">
```
Chrome requires an extension to use the feature (as of version 48). The web page can also provide its own user interface to let the user switch styles.

##### Resource Hint: dns-prefetch, prefetch, prerender
- Preconnect. The preconnect relationship is similar to dns-prefetch in that it will resolve the DNS. However, it will also make the TCP handshake, and optional TLS negotiation.
```
<link rel="preconnect" href="URL">
```
- DNS-Prefetch. Informs browsers to resolve the DNS for a URL, so that all assets from that URL load faster.
```
<link rel="dns-prefetch" href="URL">
```
- Prefetch. Informs the browsers that a given resource should be prefetched so it can be loaded more quickly.
```
<link rel="prefetch" href="URL">
```
DNS-Prefetch resolves only the domain name whereas prefetch downloads/stores the speciﬁed resources.
- Prerender. Informs browsers to fetch and render the URL in the background, so that they can be delivered to the user instantaneously as the user navigates to that URL. This is an experimental feature.
```
<link rel="prerender" href="URL">
```
##### Link 'media' attribute
```
<link rel="stylesheet" href="test.css" media="print">
```
it has all the same mediatype values as media query.
##### Prev and Next
When a page is part of a series of articles, for instance, one can use prev and next to point to pages that are coming before and after.
```
<link rel="prev" href="http://stackoverflow.com/documentation/java/topics">
<link rel="next" href="http://stackoverflow.com/documentation/css/topics">
```
##### Web Feed
Use the rel="alternate" attribute to allow discoverability of your Atom/RSS feeds.
```
<link rel="alternate" type="application/atom+xml" href="http://example.com/feed.xml" />
<link rel="alternate" type="application/rss+xml" href="http://example.com/feed.xml" />
```
##### `<script>` Attributes
- `src`
- `type` MIME type. required in HTML4, but optional in HTML5
- `async`
- `defer`
- `charset` e.g. UTF-8
- `crossorigin` How the element handles crossorigin requests
- `nonce` Cryptographic nonce used in Content Security Policy checks CSP3

##### External Stylesheet
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```
### Image attributes
- `src`
- `srcset` Images to use in diﬀerent situations (e.g., high-resolution displays, small monitors, etc)
- `sizes` Image sizes between breakpoints
- `crossorigin` How the element handles crossorigin requests
- `usemap` Name of image map to use
- `ismap` Whether the image is a server-side image map
- `alt`
- `width`
- `height`

> Images are not technically inserted into an HTML page, images are linked to HTML pages.
##### embed images directly
```
<img src="data:image/png;base64,iVBOR..." alt="Hello World">
```
##### Responsive image using the srcset attribute
```
<img 
    sizes="(min-width: 1200px) 
           580px, 
           (min-width: 640px) 
           48vw, 
           98vw" 
    srcset="img/hello-300.jpg 300w, 
            img/hello-600.jpg 600w, 
            img/hello-900.jpg 900w, 
            img/hello-1200.jpg 1200w" 
    src="img/hello-900.jpg" alt="hello">

// sizes are like media queries
// if viewport is larger than 1200px, image is exactly 580px
// if viewport is between 640px and 1200px, image takes 48% of viewport
// if viewport is less than 640px, image takes 98% of viewport
// src is always mandatory image source. In case of using with srcset, src will serve fallback image
```
```
<img src="img/hello-300.jpg" alt="hello" srcset="img/hello-300.jpg 1x, img/hello-600.jpg 2x, img/hello-1200.jpg 3x">

// if device-pixel ratio is 1, use img/hello-300.jpg
// if device-pixel ratio is 2, use img/hello-600.jpg
// if device-pixel ratio is 3, use img/hello-1200.jpg
```
##### Responsive image using picture element
```
<picture>
    <source media="(min-width: 600px)" srcset="large_image.jpg">
    <source media="(min-width: 450px)" srcset="small_image.jpg">
    <img src="default_image.jpg" style="width:auto;">
</picture>
```
##### Image Maps
- `usemap` The name of the map with a hash symbol prepended to it. For example, for a map with `name="map"`, the image should have `usemap="#map"`
- `name` The name of the map to identify it. To be used with the image's usemap attribute.
- `<area>` Below are `<area>`-speciﬁc attributes. When href is speciﬁed, making the `<area>` a link, `<area>` also supports all of the attributes of the anchor tag (`<a>`) except ping. See them at the MDN docs.
- `alt` This is only necessary if href is also set on the `<area>`.
- `coords` When shape="polygon" `shape="polygon" coords="x1, y1, x2, y2, x3, y3, ..."`). When `shape="rectangle"`, this should be set to left, top, right, bottom. When shape="circle", this should be set to centerX, centerY, radius.
- `href` The URL of the hyperlink, if speciﬁed. If it is omitted, then the <area> will not represent a hyperlink.
- `shape` The shape of the <area>. Can be set to default to select the entire image (no coords attribute necessary), circle or circ for a circle, rectangle or rect for a rectangle, and polygon or poly for a polygonal area speciﬁed by corner points.

##### Introduction to Image Maps
```
<img src="http://jaced.com/blogpix/2007/trisquarecircle/002.gif" usemap="#shapes">
<map name="shapes">
    <area shape="polygon" coords="79,6,5,134,153,134">
    <area shape="rectangle" coords="177,6,306,134">
    <area shape="circle" coords="397,71,65">
</map>
```
##### Input Control Elements
- `class` 
- `id`
- `type` Acceptable values are `hidden`, `text`, `tel`, `url`, `email`, `password`, `date`, `time`, `number`, `range`, `color`, `checkbox`, `radio`, `file`, `submit`, `image`, `reset`, and `button`.
- `name`
- `disabled`
- `checked` When the value of the type attribute is radio or checkbox
- `multiple` multiple ﬁles or values can be passed (Applies only to file and email type inputs )
- `placeholder`
- `autocomplete`
- `readonly` not applicable to `hidden`, `range`, `color`, `checkbox`, `radio`, `file` or `button`.
- `required`
- `alt` An alternative text for images
- `autofocus` The `<input>` element should get the focus when page loads.
- `value`
- `step` works with `number`, `range`, `date`, `datetime-local`, `month`, `time` and `week`.

##### Text
```
<input type="text" size="50">
```
##### Checkbox and Radio Buttons
```
<input type="checkbox">

<input type="radio" name="color" id="red" value="#F00">
<input type="radio" name="color" id="green" value="#0F0">
<input type="radio" name="color" id="blue" value="#00F">
```
##### Each of these are valid
```
<input checked>
<input checked="">
<input checked="checked">
<input checked="ChEcKeD">
```
When resetting a <form>, checkboxes and radio buttons revert to the state of their checked attribute.

##### Accessibility
```
<label>
    <input type="radio" name="color" value="#F00">
    Red
</label>
// OR
<input type="checkbox" name="color" value="#F00" id="red">
<label for="red">Red</label>
```
##### Button Groups
```
<fieldset>
    <legend>Theme color:</legend>
    <p>
        <input type="radio" name="color" id="red" value="#F00">
        <label for="red">Red</label>
    </p>
    <p>
        <input type="radio" name="color" id="green" value="#0F0">
        <label for="green">Green</label>
    </p>
    <p>
        <input type="radio" name="color" id="blue" value="#00F">
        <label for="blue">Blue</label>
    </p>
</fieldset>
```
> Checkboxes can also be grouped in a similar fashion. However, keep in mind that checkboxes should not share the same name because they are not mutually exclusive. Each checkbox should either have a unique name, or use a set of square brackets ([])

##### Input Validation
The validation only occurs when attempting to submit the form. Keep in mind that inputs which are disabled or read-only will not trigger validation. Some newer input types (like email, url, tel, date and many more ) are automatically validated and do not require your own validation constraints.
- Required
```
<input required>
```
- Minimum / Maximum Length
```
<input minlength="3">
<input maxlength="15">
<input minlength="3" maxlength="15">
```
- Specifying a range
```
<input type="number" size="6" name="marks" min="0" max="100" />
<input type="range" size="2" name="feedback" min="1" max="5" />
```
- Match a Pattern
```
<input pattern="\d*" title="Numbers only, please.">
```
- Accept File Type
```
<input type="file" accept="image/*" title="Only images are allowed">

// Multiple values can be speciﬁed with a comma, e.g.:
<input type="file" accept="image/*,.rar,application/zip">
```
> Adding novalidate attribute to the form element or formnovalidate attribute to the submit button, prevents validation on form elements.
```
<form>
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <input pattern="\d*" name="number" required>
    <input type="submit" value="Publish"> <!-- form will be validated -->
    <input type="submit" value="Save" formnovalidate> <!-- form will NOT be validated -->
</form>
The form has ﬁelds that are required for "publishing" the draft but aren’t required for "saving" the draft.
```
- color 
```
<input type="color" name="favcolor" value="#ff0000">
```
- Password
```
<input type="password" name="password" placeholder="Password">
```
- `File`
```
<form action="upload_file.php" method="post" enctype="multipart/form-data">
    <input type="file" name="fileSubmission" id="fileSubmission">
    <input type="submit" value="Upload your file" name="submit">

    // Multiple ﬁles
    <input type="file" name="fileSubmission" id="fileSubmission" multiple>
    // Accept Files
    <input type="file" name="fileSubmission" accept="image/x-png,image/gif,image/jpeg" />
</form>
```
##### Button
```
<input type="button" value="Button Text">
<button type="button">Button Text</button>

<input type="button" onclick="alert('hello world!')" value="Click Me">
// OR

<button type="button" onclick="alert('hello world!')">Click Me</button>
```
- `name`, submitted with the form data
- `type = submit` : The button submits the form data to the server. This is the default if the attribute is not speciﬁed, or if the attribute is dynamically changed to an empty or invalid value. 
- `type = reset`
- `type = menu` The button opens a popup menu deﬁned via its designated element.
##### Extra Attributes for Submit Buttons
|Attribute|Description|
|-|-|
|form|Speciﬁes the ID of the form the button belongs to.|
|formaction|Speciﬁes where to send the form-data
|formenctype|Speciﬁes how the form-data should be encoded when submitting it to the server using this button. Can only be used with formmethod="post".
|formmethod|Speciﬁes the HTTP method to use (POST or GET) when sending form-data using this button.|
|formnovalidate|Speciﬁes that the form-data should not be validated on submission|
|formtarget|Speciﬁes where to display the response that is received after submitting the form using this button.

##### Submit
```
<input type="submit" value="Submit">
<button type="submit">
    <img src="submit-icon.jpg" /> Submit
</button>
```
##### Reset
```
<input type="reset" value="Reset">
```
##### Hidden
A hidden input won't be visible to the user, but its value will be sent to the server when the form is submitted.
```
<input type="hidden" name="inputName" value="inputValue">
```
##### Tel
```
<input type="tel" value="+8400000000">
```
##### Email
```
<input type="email" name="email">
```
##### Number
```
<input type="number" value="0" name="quantity">
```
##### Range
```
<input type="range" min="" max="" step="" />
```
##### Search
```
<input type="search" name="googlesearch">
```
##### Image
```
<input type="image" src="img.png" alt="image_name" height="50px" width="50px"/>
```
# Week
```
<input type="week" />
```
##### url
```
<input type="url" name="Homepage">
```
##### DateTime-Local
```
<input type="datetime-local" />
```
##### Month
```
<input type="month" />
```
##### Time
```
<input type="time" />
```
##### DateTime (Global)
```
<fieldset>
    <p><label>Meeting time: <input type=datetime name="meeting.start"></label>
</fieldset>
```
Permitted attributes:
- global attributes
- name
- disabled
- form
- type
- autocomplete
- autofocus
- list
- min & max
- step (ﬂoat)
- readonly
- required value

##### Date
```
<input type="date" />
```
##### Forms
- `accept-charset` Speciﬁes the character encodings that are to be used for the form submission.
- `action` Speciﬁes where to send the form-data when a form is submitted.
- `autocomplete` Speciﬁes whether a form should have autocomplete on or oﬀ.
- `enctype` Speciﬁes how the form-data should be encoded when submitting it to the server (only for method="post").
- `method` Speciﬁes the HTTP method to use when sending form-data (POST or GET).
- `name` Speciﬁes the name of a form.
- `novalidate` Speciﬁes that the form should not be validated when submitted.
- `target` Speciﬁes where to display the response that is received after submitting the form.

##### Form Submitting
- The Action Attribute
if you leave it blank, it will send it to the same ﬁle
```
<form action="action.php">
```
- The Method Attribute
```
<form action="action.php" method="get">
<form action="action.php" method="post">
```
To submit the data from the form correctly, a name attribute name must be speciﬁed.
As an example let's send the value of the ﬁeld and set its name to lastname:
```
<input type="text" name="lastname" value="Mouse">
```
More attributes
```
<form action="action.php" method="post" target="_blank" accept-charset="UTF-8"
enctype="application/x-www-form-urlencoded" autocomplete="off" novalidate>
</form>
```
##### Target attribute in form tag
The target attribute speciﬁes a name or a keyword that indicates where to display the response that is received after submitting the form.
The target attribute deﬁnes a name of, or keyword for, a browsing context (e.g. tab, window, or inline frame).
```
<form target="_blank">
```
- `_blank` The response is displayed in a new window or tab
- `_self` The response is displayed in the same frame (this is default)
- `_parent` The response is displayed in the parent frame
- `_top` The response is displayed in the full body of the window
- `framename` The response is displayed in a named iframe

> Frames and framesets are not supported in HTML5, so the _parent, _top and framename values are now mostly used with iframes.

##### Uploading Files
Images and ﬁles can be uploaded/submitted to server by setting enctype attribute of form tag to multipart/formdata.
```
<form method="post" enctype="multipart/form-data" action="upload.php">
    <input type="file" name="pic" />
    <input type="submit" value="Upload" />
</form>
```
##### Grouping a few input ﬁelds
```
<form>
    <fieldset>
        <legend>1st field set:</legend>
        Field one:<br><input type="text"><br>
        Field two:<br><input type="text"><br>
    </fieldset>
    <br>
    <fieldset>
        <legend>2nd field set:</legend>
        Field three:<br><input type="text"><br>
        Field four:<br><input type="text"><br>
    </fieldset>
    <br>
    <input type="submit" value="Submit">
</form>
```
##### `nav` element
```
<nav role="navigation"><!-- ... --></nav>
```
##### `section`, `article`, `header`, `footer` elements
```
<section>
    <article>
        <header>
            <h1>Blog Post</h1>
            <time datetime="2016-03-13">13th March 2016</time>
        </header>
        <p>The article element represents a self contained article or document.</p>
        <p>The section element represents a grouping of content.</p>
        <section>
            <h2>Comments <small>relating to "Blog Post"</small></h2>
            <!-- Related comment is also a self-contained article -->
            <article id="user-comment-1">
                <p>Excellent!</p>
                <footer>
                    <p>...</p><time>...</time>
                </footer>
            </article>
        </section>
    </article>
    <!-- ./repeat: <article> -->
</section>
<!-- Content unrelated to the blog or posts should be outside the section. -->
<footer>
    <p>This content should be unrelated to the blog.</p>
</footer>
```
##### Main Element
> The `<main>` element contains the main content for your web page. This content is unique to the individual page, and should not appear elsewhere on the site. Repeating content like headers, footers, navigation, logos, etc., is placed outside the element.

> The `<main>` element should only ever be used at most once on a single page.
> The `<main>` element must not be included as a descendant of an `article`, `aside`, `footer`, `header` or `nav` element. 
```
<body>
    <header>
        <nav>...</nav>
    </header>
    <main>
        <h1>Individual Blog Post</h1>
        <p>An introduction for the post.</p>
        <article>
            <h2>References</h2>
            <p>...</p>
        </article>
        <article>
            <h2>Comments</h2> ...
        </article>
    </main>
    <footer>...</footer>
</body>
```
> The HTML5 speciﬁcation recognizes the `<main>` element as a grouping element, and not a sectioning element.

> Add a role="main" ARIA role attribute to other elements intended to be used as main content

##### Section Element
> You can use the <section> element within an <article> and vice-versa.
> Every section should have a theme (a heading element identifying this region)
> Don't use the <section> element as a general styling 'container'.
```
<article>
    <header>
        <h2>Blog Post</h2>
    </header>
    <p>An introduction for the post.</p>
    <section>
        <h3>Chapter 1</h3>
        <p>...</p>
    </section>
    <section>
        <h3>Chapter 2</h3>
        <p>...</p>
    </section>
    <section>
        <h3>Comments</h3> ...
    </section>
</article>
```
> Developers should use the article element when it makes sense to syndicate the contents of the
element.

##### Label Element
```
// Clicking on the text the target input will toggle it's state / value)
<input id="cats" type="checkbox" name="Cats">
<label for="cats" >I like Cats!</label>
```

##### Output Element
- `Global` Attributes that are available to any HTML5 element.
- `name` 
- `for` A space separated list of form element ids (e.g. `<inputs id="inp1">` for value is "inp1") that the output is meant to display calculations for.
- `form` A string representing the `<form>` that is associated to the output. If the output is actually outside the `<form>`, this attribute will ensure that the output still belongs to the <form> and subject to collections and submits of said `<form>`.
```
<form id="form1" name="form1" oninput="out1.value = parseInt(in1.value, 10) + parseInt(in2.value, 10)">
    <input type="number" id="in1" name="in1" value="0">
    <input type="number" id="in2" name="in2" value="0">
</form>
<output name="out1" for="in1 in2" form="form1">0</output>
```
##### Void Elements: a closing tag, only require an opening tag
> they themselves do not contain any elements.
- `area` clickable, deﬁned area in an image
- `base` - speciﬁes a base URL from which all links base
- `br`
- `hr`
- `img`
- `input`
- `link`
- `meta`
- `param` - deﬁnes parameters for plugins
- `command` - represents a command users can invoke [obsolete]
- `keygen` - facilitates public key generation for web certiﬁcates [deprecated]
- `source` - speciﬁes media sources for picture, audio, and video elements

##### Media Elements
- `width` element's width in pixels.
- `height` element's height in pixels.
- `<source>` Deﬁnes resources of the audio or video ﬁles
- `track` Deﬁnes the text track for media elements
- `controls` Displays controls
- `autoplay` Automatically start playing the media
- `loop` 
- `muted` Plays the media without sound
- `poster` Assigns an image to display until a video is loaded

##### Audio
```
<audio controls>
    <source src="file.mp3" type="audio/mpeg">
</audio>
```
```
<audio src="foo.ogg" autoplay >
    <track kind="captions" src="foo.en.vtt" srclang="en" label="English">
    <track kind="captions" src="foo.sv.vtt" srclang="sv" label="Svenska">
</audio>
```
##### Video
```
<video width="500" height="700" controls>
    <source src="video.mp4" type="video/mp4">
</video>
```
```
// video with sub titles
<video src="videofile.webm" autoplay poster="posterimage.jpg">
    <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English">
    <track kind="subtitles" src="foo.sv.vtt" srclang="sv" label="Svenska">
</video>
```
```
<video width="480" controls poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif" >
    <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm" type="video/webm">
    <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4" type="video/mp4">
    <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8.ogv" type="video/ogg">
</video>

// Video header or background
<video width="1280" height="720" autoplay muted loop poster="video.jpg" id="videobg">
```
##### Progress Element
```
<progress value="22" max="100"></progress>
```
- `position` returns the current position of the `<progress>` element
##### Changing the color of a progress bar
```
progress[value] {
    width: 250px;
    height: 20px;
}
```
##### Select
```
<select name="" size="4">
    <option>Some Option</option>
<select>

<select name="" multiple>
    <option label="Some Option" value="Some Option" selected>
    <option value="option2" selected>Some option</option>
</select>
```
##### Option Groups
```
<select name="">
    <option value="milk">Milk</option>
    <optgroup label="Fruits">
        <option value="banana">Bananas</option>
        <option value="strawberry">Strawberries</option>
    </optgroup>
    <optgroup label="Vegetables" disabled>
        <option value="carrot">Carrots</option>
        <option value="zucchini">Zucchini</option>
    </optgroup>
</select>
```
> disabling an option group will disable all options within the group, and it is not possible to manually re-enable a single option within a disabled group.

##### Datalist
```
<datalist id="Languages">
    <option value="PHP">
    <option value="Perl">
    <option value="Python">
    <option value="Ruby">
    <option value="C+">
</datalist>
```
##### Embed
The embed tag is new in HTML5. This element provides an integration point for an external (typically non-HTML)
```
<embed src="myflash.swf">
```
```
<embed type="video/mp4" src="video.mp4" width="640" height="480">
```

##### IFrames (Inline Frame)
- `name` 
- `width`
- `height`
- `src`
- `srcdoc`
- `sandbox` When set, the contents of the iframe is treated as being from a unique origin and features
including scripts, plugins, forms and popups will be disabled. Restrictions can be selectively relaxed by adding a space separated list of values. See the table in Remarks for possible values.
- `allowfullscreen` Whether to allow the iframe’s contents to use `requestFullscreen()`
```
<iframe src="base.html"></iframe>
```
##### Sandboxing: The following embeds an untrusted web page with all restrictions enabled
```
<iframe sandbox src="http://example.com/"></iframe>
```
##### To allow the page to run scripts and submit forms, add allow-scripts and allow-forms to the sandbox attribute.
```
<iframe sandbox="allow-scripts allow-forms" src="http://example.com/"></iframe>
```
```
<iframe sandbox="allow-same-origin allow-top-navigation" src="http://example.com/untrusted/comments/page2">
```
##### `srcdoc`
> if both the src and srcdoc attributes are present and supported by the browser, srcdoc takes precedence.
```
<iframe srcdoc="<p>Iframes are cool!</p>" src="base.html"></iframe>
```
```
<iframe src="webpage.html" name="myIframe"></iframe>
<a href="different_webpage.html" target="myIframe">Change the Iframe content to different_webpage.html</a>
```
##### The language declaration gets inherited:
```
<div lang="en">
    <p>This element contains English content.</p>
    <p title="This attribute, too.">Same with this element.</p>
</div>
```
##### You can "overwrite" a language declaration:
```
<p lang="en">This English sentence contains the German word <span lang="de">Hallo</span>.</p>
```
##### Regional URLs
It is possible to add the attribute hreflang to the elements `<a>` and `<area>` that create hyperlinks.
```
<p>
    <a href="example.org" hreflang="en">example.org</a> is one of IANA's example domains.
</p>
```
> For `applet`, `base`, `basefont`, `br`, `frame`, `frameset`, `hr`, `iframe`, `meta`, `param`; the `lang` attribute doesn't work

##### Inline SVG
```
<svg class="attention" xmlns="..." xmlns:xlink="..." viewBox="0 0 1000 1000" >
    <path id="attention" d="..." />
</svg>

// The above inline SVG can then be styled using the corresponding CSS class:
.attention {
    fill: red;
    width: 50px;
    height: 50px;
}
```
##### Embedding external SVG ﬁles in HTML
```
<img src="attention.svg" width="50" height="50">
<object type="image/svg+xml" data="attention.svg" width="50" height="50">
```
> Unlike `<img>`; `<object>` directly imports the SVG into the document and therefore it can be manipulated using Javascript and CSS.

##### Embedding SVG using CSS
```
<div class="attention"></div>

.attention {
    background-image: url(attention.svg);
    ...
}
```
##### Embedding SVD into a css ﬁle
```
background-image: url(data:image/svg+xml, ...);
```

##### Canvas
The canvas's 2D drawable layer surface Object is referred to as `CanvasRenderingContext2D`, or from a `HTMLCanvasElement` using the `.getContext("2d")` method:
```
<canvas id="myCanvas"></canvas>
```
```
var ctx = document.getElementById("myCanvas").getContext("2d");
// now we can refer to the canvas's 2D layer context using `ctx`
ctx.fillStyle = "#f00";
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // x, y, width, height
ctx.fillStyle = "#000";
ctx.fillText("My red canvas with some black text", 24, 32); // text, x, y
```
##### Drawing two rectangles on a `<canvas>`
```
<script async>
window.onload = init;
// call init() once the window is completely loaded
function init(){
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,100,100);
    ctx.fillStyle = 'green';
    ctx.fillRect(25,25,50,50);
}
</script>

<canvas width=300 height=200>Your browser does not support canvas.</canvas>
```

##### Meta Information
```
<meta name="application-name" content="OpenStreetMap">
<meta name="author" content="Your Name">
<meta name="description" content="Page Description">
<meta name="generator" content="HTML Generator 1.42">
<meta name="keywords" content="Keyword1, Keyword2">
```
```
<meta charset="UTF-8">
<meta charset="ISO-8859-1">

// HTML 4 way
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
```
##### Robots
```
<meta name="robots" content="noindex">
```

- `all` Default. Equivalent to index
- `noindex` Do not index the page at all.
- `nofollow` Do not follow the links on this page
- `follow` The links on the page can be followed
- `none` Equivalent to noindex, nofollow.
- `noarchive` Do not make a cached version of this page available in search results.
- `nocache` Synonym of noarchive used by some bots such as Bing.
- `nosnippet` Do not show a snippet of this page in search results.
- `noodp` Do not use metadata of this page from the Open Directory project for titles or
snippets in search results.
- `notranslate` Do not oﬀer translations of this page in search results.
- `noimageindex` Do not index images on this page.
- `unavailable_after [RFC-850 date/time]` Do not show this page in search results after the speciﬁed date/time. The date/time must be speciﬁed in the RFC 850 format.

> search engines generally only look for things they are not allowed to do

##### Social Media
```
// Facebook / Open Graph
<meta property="fb:app_id" content="123456789">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:type" content="website">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<meta property="article:author" content="">
<!-- Facebook: https://developers.facebook.com/docs/sharing/webmasters#markup -->
<!-- Open Graph: http://ogp.me/ -->
```
```
Facebook / Instant Articles
<meta charset="utf-8">
<meta property="op:markup_version" content="v1.0">
<!-- The URL of the web version of your article -->
<link rel="canonical" href="http://example.com/article.html">
<!-- The style to be used for this article -->
<meta property="fb:article_style" content="myarticlestyle">
```
##### Twitter
```
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="https://example.com/page.html">
<meta name="twitter:title" content="Content Title">
<meta name="twitter:description" content="Content description less than 200 characters">
<meta name="twitter:image" content="https://example.com/image.jpg">
```
##### Google+ / Schema.org
```
<link href="https://plus.google.com/+YourPage" rel="publisher">
<meta itemprop="name" content="Content Title">
<meta itemprop="description" content="Content description less than 200 characters">
<meta itemprop="image" content="https://example.com/image.jpg">
```
##### Mobile Layout Control
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- `width` device-width or the actual width in pixels, like 480
- `height` device-height or the actual width in pixels, like 600
- `initial-scale` The initial zoom when the page is loaded. 1.0 does not zoom.
- `minimum-scale` The minimum amount the visitor can zoom on the page. 1.0 does not zoom.
- `maximum-scale` The maximum amount the visitor can zoom on the page. 1.0 does not zoom.
- `user-scalable` Allows the device to zoom in and out. Values are yes or no. If set to no, the user is not able to zoom 

##### Automatic Refresh
To refresh the page every ﬁve seconds, add this meta element in the head element:
```
<meta http-equiv="refresh" content="5">
```
> If some information on the page needs to be updated continuously, there are much better ways to do that by only refreshing a portion of a page.

##### Phone Number Recognition
```
<meta name="format-detection" content="telephone=no">
```
##### Automatic redirect
```
// to redirect to example.com after 5 seconds:
<meta http-equiv="refresh" content="5;url=https://www.example.com/" />
```
##### Web App
You can set up your web app or website to have an application shortcut icon added to a device's homescreen, and have the app launch in full-screen "app mode" using Chrome for Android’s "Add to homescreen" menu item.

Below meta tag(s) will open web app in full-screen mode (without address bar).
```
// Android Chrome
<meta name="mobile-web-app-capable" content="yes">
// IOS
<meta name="apple-mobile-web-app-capable" content="yes">
```
You can also set color for status bar and address bar in meta tag.
```
// Android Chrome
<meta name="theme-color" content="black">
// IOS
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```
##### code
```
<pre>
    <code>
        x = 42
        if x == 42:
            print "x is …    … 42"
    </code>
</pre>
```
You still have to escape characters with special meaning in HTML (like < with &lt;)
```
<pre>
    <code>
        &lt;p>This is a paragraph.&lt;/p>
    </code>
</pre>
```
##### Inline with `<code>`
```
<p>The <code>a</code> element creates a hyperlink.</p>
```
##### Inline Quotation marks
```
<p>She wrote <q>The answer is 42.</q> and everyone agreed.</p>
// She wrote "The answer is 42." and everyone agreed.
```
##### cite attribute can be used to reference the URL of the quoted source:
```
<p>She wrote <q cite="http://example.com/blog/hello-world">The answer is 42.</q> and everyone
agreed.</p>
```
> browsers typically don’t show this URL, so if the source is relevant, you should add a hyperlink (a element) in addition.

##### `<blockquote>`
```
<blockquote cite="http://example.com/blog/hello-world">
    <p>The answer is 42.</p>
</blockquote>
```
```
<blockquote cite="http://example.com/blog/hello-world">
    <p>The answer is 42.</p>
    <footer>
        <p>Source: 
            <cite><a href="http://example.com/blog/hello-world" rel="external">
                 Hello World</a>
            </cite>
        </p>
    </footer>
</blockquote>
```
##### Tabindex
```
<div tabindex="0">Some button</div>
```
```
<button tabindex="-1">This button will not be reachable by tab</button>
// The element will be removed from the tabbing order but will still be focusable.
```
##### Deﬁne a custom tabbing order (not recommended)
Try to create a natural order by rearranging your DOM structure.
```
<div tabindex="2">Second</div>
<div tabindex="1">First</div>
```
Chapter 37: Global Attributes
- `class`
- `contenteditable`
- `contextmenu` Deﬁnes a context menu shown when a user right-clicks an element.
- `dir` text direction
- `draggable`
- `hidden`
- `id`
- `lang`
- `spellcheck` Sets whether to spell/grammar check the content of an element.
- `style`
- `tabindex`
- `title` additional information about an element, in the form of tooltip text on mouseover.
- `translate` Deﬁnes whether to translate the content of an element.

Section 37.1: Contenteditable Attribute
```
<p contenteditable>
    This is an editable paragraph.
    <span contenteditable="false">But not this.</span>
</p>
```
##### HTML 5 Cache
```
<html manifest="index.appcache">
```
> then we will create index.appcache ﬁle with below codes
```
CACHE MANIFEST
index.html
```
write those ﬁles that you want to be cached load index.html then go for oﬄine mode and reload the tab
> The two ﬁles must be in the same folder in this example

##### HTML Form Events
- `onblur`
- `onchange`
- `oncontextmenu` Script to be run when a context menu is triggered
- `onfocus`
- `oninput`
- `oninvalid`
- `onreset`
- `onsearch` when the user writes something in `<input="search">`
- `onselect` Fires after some text has been selected in an element
- `onsubmit` Fires when a form is submitted

##### Keyboard Events
- `onkeydown`
- `onkeypress`
- `onkeyup`

##### Character Entities
```
<input type="text" placeholder="&#128269; Search"/>
<b>&copy; 2016 Stack Exchange Inc.</b>
```
### ARIA
##### 1 role="presentation"
An element whose implicit native role semantics will not be mapped to the accessibility API.
```
<div style="float:left;">Some content on the left.</div>
<div style="float:right;">Some content on the right</div>
<div role="presentation" style="clear:both;"></div> <!-- Only used to clear floats -->
```
##### 2: role="alert"
A message with important, and usually time-sensitive, information.
```
<div role="alert" aria-live="assertive">Your session will expire in 60 seconds.</div>
```
> Note that I've included both role="alert" and aria-live="assertive" at the same time. These are synonymous attributes, but some screen readers only support one or the other. By using both simultaneously we therefore maximize the chances that the live region will function as expected.

##### 3: role="alertdialog"
A type of dialog that contains an alert message, where initial focus goes to an element within the dialog.
```
<div role="alertdialog">
    <h1>Warning</h1>
    <div role="alert">Your session will expire in 60 seconds.</div>
</div>
```
##### 4: role="application"
A region declared as a web application, as opposed to a web document. In this example, the application is a simple
calculator that might add two numbers together.
```
<div role="application">
    <h1>Calculator</h1>
    <input id="num1" type="text"> + <input id="num2" type="text"> =
    <span id="result"></span>
</div>
```
##### 5: role="article"
A section of a page that consists of a composition that forms an independent part of a document, page, or site.
> Setting an ARIA role and/or aria-* attribute that matches the default implicit ARIA semantics is unnecessary and is not recommended as these properties are already set by the browser.
```
<article>
    <h1>My first article</h1>
    <p>Lorem ipsum...</p>
</article>
```
You would use role=article on non-semantic elements (not recommended, invalid)
```
<div role="article">
    <h1>My first article</h1>
    <p>Lorem ipsum...</p>
</div>
```
##### 6: role="banner"
A region that contains mostly site-oriented content, rather than page-speciﬁc content.
```
<div role="banner">
    <h1>My Site</h1>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</div>
```
##### 7: role="button"
An input that allows for user-triggered actions when clicked or pressed.
```
<button role="button">Add</button>
```
##### 8: role="cell"
A cell in a tabular container.
```
<table>
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <td role="cell">95</td>
        <td role="cell">14</td>
        <td role="cell">25</td>
    </tbody>
</table>
```
##### 9: role="checkbox"
A checkable input that has three possible values: true, false, or mixed.
```
<p>
    <input type="checkbox" role="checkbox" aria-checked="false">
    I agree to the terms
</p>
```
##### 10: role="columnheader"
A cell containing header information for a column.
```
<table role="grid">
    <thead>
        <tr>
            <th role="columnheader">Day 1</th>
            <th role="columnheader">Day 2</th>
            <th role="columnheader">Day 3</th>
        </tr>
    </thead>
    <tbody>
        <!-- etc -->
    </tbody>
<table>
```
##### 11: role="combobox"
A presentation of a select; usually similar to a textbox where users can type ahead to select an option, or type to enter arbitrary text as a new item in the list.
```
<input type="text" role="combobox" aria-expanded="false">
```
Typically, you would use JavaScript to build the rest of the typeahead or list select functionality.
##### 12: role="complementary"
A supporting section of the document, designed to be complementary to the main content at a similar level in the DOM hierarchy, but remains meaningful when separated from the main content.
```
<div role="complementary">
    <h2>More Articles</h2>
    <ul>
        <!-- etc -->
    </ul>
</div>
```
###### 13: role="contentinfo"
A large perceivable region that contains information about the parent document.
```
<p role="contentinfo">
    Author: Albert Einstein<br>
    Published: August 15, 1940
</p>
```
##### 14: role="deﬁnition"
A deﬁnition of a term or concept.
```
<span role="term" aria-labelledby="def1">Love</span>
<span id="def1" role="definition">an intense feeling of deep affection.</span>
```
##### 15: role="dialog"
A dialog is an application window that is designed to interrupt the current processing of an application in order to prompt the user to enter information or require a response.
```
<div role="dialog">
    <p>Are you sure?</p>
    <button role="button">Yes</button>
    <button role="button">No</button>
</div>
```
##### 16: role="directory"
A list of references to members of a group, such as a static table of contents.
```
<ul role="directory">
    <li><a href="/chapter-1">Chapter 1</a></li>
    <li><a href="/chapter-2">Chapter 2</a></li>
    <li><a href="/chapter-3">Chapter 3</a></li>
</ul>
```
##### 17: role="document"
A region containing related information that is declared as document content, as opposed to a web application.
```
<div role="document">
    <h1>The Life of Albert Einstein</h1>
    <p>Lorem ipsum...</p>
</div>
```
##### 18: role="form"
A landmark region that contains a collection of items and objects that, as a whole, combine to create a form.

Using the semantically correct HTML element <form> implies default ARIA semantics, meaning role=form is not required as you should not apply a contrasting role to an element that is already semantic, as adding a role overrides the native semantics of an element.
> Setting an ARIA role and/or aria-* attribute that matches the default implicit ARIA semantics is unnecessary and is not recommended as these properties are already set by the browser.
```
<form action="">
    <fieldset>
        <legend>Login form</legend>
        <div>
            <label for="username">Your username</label>
            <input type="text" id="username" aria-describedby="username-tip" required />
            <div role="tooltip" id="username-tip">Your username is your email address</div>
        </div>
        <div>
            <label for="password">Your password</label>
            <input type="text" id="password" aria-describedby="password-tip" required />
            <div role="tooltip" id="password-tip">Was emailed to you when you signed up</div>
        </div>
    </fieldset>
</form>
```
You would use role=form on non-semantic elements (not recommended, invalid)
```
<div role=form>
    <input type="email" placeholder="Your email address">
    <button>Sign up</button>
</div>
```
##### 19: role="grid"
A grid is an interactive control which contains cells of tabular data arranged in rows and columns, like a table.
```
<table role="grid">
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <!-- etc -->
    </tbody>
</table>
```
##### 20: role="gridcell"
A cell in a grid or treegrid.
```
<table role="grid">
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <tr>
            <td role="gridcell">17</td>
            <td role="gridcell">64</td>
            <td role="gridcell">18</td>
        </tr>
    </tbody>
<table>
```
##### 21: role="group"
A set of user interface objects which are not intended to be included in a page summary or table of contents by assistive technologies.
```
<div role="group">
    <button role"button">Previous</button>
    <button role"button">Next</button>
</div>
```
##### 22: role="heading"
A heading for a section of the page.
```
<h1 role="heading">Introduction</h1>
<p>Lorem ipsum...</p>
```
##### 23: role="img"
A container for a collection of elements that form an image.
```
<figure role="img">
    <img alt="A cute cat." src="albert.jpg">
    <figcaption>This is my cat, Albert.</figcaption>
<figure>
```
#### 24: role="link"
An interactive reference to an internal or external resource that, when activated, causes the user agent to navigate to that resource.
> In the majority of cases setting an ARIA role and/or aria-* attribute that matches the default implicit ARIA semantics is unnecessary and not recommended as these properties are already set by the browser.

##### 25: role="list"
A group of non-interactive list items.
```
<ul role="list">
    <li role="listitem">One</li>
    <li role="listitem">Two</li>
    <li role="listitem">Three</li>
</ul>
```
##### 26: role="listbox"
A widget that allows the user to select one or more items from a list of choices.
```
<ul role="listbox">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
</ul>
```
Typically, you would use JavaScript to build the multiple-selection functionality.

##### 27: role="listitem"
A single item in a list or directory.
```
<ul role="list">
    <li role="listitem">One</li>
    <li role="listitem">Two</li>
    <li role="listitem">Three</li>
</ul>
```
##### 28: role="log"
A type of live region where new information is added in meaningful order and old information may disappear.
```
<ul role="log">
    <li>User 1 logged in.</li>
    <li>User 2 logged in.</li>
    <li>User 1 logged out.</li>
</ul>
```
##### 29: role="main"
The main content of a document.
```
<!-- header & nav here -->
<div role="main">
    <p>Lorem ipsum...</p>
</div>
<!-- footer here -->
```
##### 30: role="marquee"
A type of live region where non-essential information changes frequently.
```
<ul role="marquee">
    <li>Dow +0.26%</li>
    <li>Nasdaq +0.54%</li>
    <li>S&amp;P +0.44%</li>
</ul>
```
##### 31: role="math"
Content that represents a mathematical expression.
```
<img role="math" alt="y=mx+b" src="slope.png">
```
##### 32: role="menu"
A type of widget that oﬀers a list of choices to the user.
```
<ul role="menu">
    <li role="menuitem">New</li>
    <li role="menuitem">Open</li>
    <li role="menuitem">Save</li>
    <li role="menuitem">Close</li>
</ul>
```
##### 33: role="menubar"
A presentation of menu that usually remains visible and is usually presented horizontally.
```
<ul role="menubar">
    <li role="menuitem">File</li>
    <li role="menuitem">Edit</li>
    <li role="menuitem">View</li>
    <li role="menuitem">Help</li>
</ul>
```
##### 34: role="menuitem"
An option in a group of choices contained by a menu or menubar.
```
<ul role="menubar">
<li role="menuitem">File</li>
<li role="menuitem">Edit</li>
<li role="menuitem">View</li>
<li role="menuitem">Help</li>
</ul>
```
Section 41.35: role="menuitemcheckbox"
A checkable menuitem that has three possible values: true, false, or mixed.
```
<ul role="menu">
    <li role="menuitem">Console</li>
    <li role="menuitem">Layout</li>
    <li role="menuitemcheckbox" aria-checked="true">Word wrap</li>
</ul>
```
##### 36: role="menuitemradio"
A checkable menuitem in a group of menuitemradio roles, only one of which can be checked at a time.
```
<ul role="menu">
    <li role="menuitemradio" aria-checked="true">Left</li>
    <li role="menuitemradio" aria-checked="false">Center</li>
    <li role="menuitemradio" aria-checked="false">Right</li>
</ul>
```
##### 37: role="navigation"
A collection of navigational elements (usually links) for navigating the document or related documents.
```
<ul role="navigation">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
</ul>
```
##### 38: role="note"
A section whose content is parenthetic or ancillary to the main content of the resource.
```
<p>Lorem ipsum...</p>
<p>Lorem ipsum...</p>
<p role="note">Lorem ipsum...</p>
```
##### 39: role="option"
A selectable item in a select list.
```
<ul role="listbox">
    <li role="option">Option 1</li>
    <li role="option">Option 2</li>
    <li role="option">Option 3</li>
</ul>
```
##### 40: role="progressbar"
An element that displays the progress status for tasks that take a long time.
```
<progress role="progressbar" value="25" max="100">25%</progress>
```
##### 41: role="radio"
A checkable input in a group of radio roles, only one of which can be checked at a time.
```
<div role="radiogroup">
    <input role="radio" type="radio" aria-checked="true"> One<br>
    <input role="radio" type="radio" aria-checked="false"> Two<br>
    <input role="radio" type="radio" aria-checked="false"> Three
</div>
```
##### 42: role="region"
A large perceivable section of a web page or document, that the author feels is important enough to be included in a page summary or table of contents, for example, an area of the page containing live sporting event statistics.
```
<div role="region">
    Home team: 4<br>
    Away team: 2
</div>
```
##### 43: role="radiogroup"
A group of radio buttons.
```
<div role="radiogroup">
    <input role="radio" type="radio" aria-checked="true"> One<br>
    <input role="radio" type="radio" aria-checked="false"> Two<br>
    <input role="radio" type="radio" aria-checked="false"> Three
</div>
```
##### 44: role="row"
A row of cells in a tabular container.
```
<table>
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <tr role="row">
            <!-- etc -->
        </tr>
    </tbody>
</table>
```
##### 45: role="rowgroup"
A group containing one or more row elements in a grid.
```
<table>
    <thead role="rowgroup">
        <!-- etc -->
    </thead>
    <tbody role="rowgroup">
        <!-- etc -->
    </tbody>
</table>
```
##### 46: role="rowheader"
A cell containing header information for a row in a grid.
```
<table role="grid">
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <tr>
            <th role="rowheader">Day 1</th>
            <td>65</td>
        </tr>
        <tr>
            <th role="rowheader">Day 2</th>
            <td>74</td>
        </tr>
    </tbody>
</table>
```
##### 47: role="scrollbar"
A graphical object that controls the scrolling of content within a viewing area, regardless of whether the content is fully displayed within the viewing area.
```
<div id="content1">Lorem ipsum...</div>
<div role="scrollbar" 
        aria-controls="content1"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0" 
        aria-valuenow="25">
    <div class="scrollhandle"></div>
</div>
```
##### 48: role="search"
A landmark region that contains a collection of items and objects that, as a whole, combine to create a search facility.
```
<div role="search">
    <input role="searchbox" type="text">
    <button role="button">Search</button>
</div>
```
##### 49: role="searchbox"
A type of textbox intended for specifying search criteria.
```
<div role="search">
    <input role="searchbox" type="text">
    <button role="button">Search</button>
</div>
```
##### 50: role="separator"
A divider that separates and distinguishes sections of content or groups of menuitems.
```
<p>Lorem ipsum...</p>
<hr role="separator">
<p>Lorem ipsum...</p>
```
##### 51: role="slider"
A user input where the user selects a value from within a given range.
```
<div role="slider" aria-valuemax="100" aria-valuemin="0" aria-valuenow="25">
    <div class="sliderhandle"></div>
</div>
```
##### 52: role="spinbutton"
A form of range that expects the user to select from among discrete choices.
```
<input
    role="spinbutton"
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow="25"
    type="number"
    value="25">
```
##### 53: role="status"
A container whose content is advisory information for the user but is not important enough to justify an alert, often but not necessarily presented as a status bar.
```
<div role="status">Online</div>
```
##### 54: role="switch"
A type of checkbox that represents on/oﬀ values, as opposed to checked/unchecked values.
```
<select role="switch" aria-checked="false">
    <option>On</option>
    <option selected>Off</option>
</select>
```
##### 55: role="tab"
A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
```
<ul role="tablist">
    <li role="tab">Introduction</li>
    <li role="tab">Chapter 1</li>
    <li role="tab">Chapter 2</li>
</ul>
```
##### 56: role="table"
A section containing data arranged in rows and columns. The table role is intended for tabular containers which are not interactive.
```
<table role="table">
    <thead>
        <!-- etc -->
    </thead>
    <tbody>
        <!-- etc -->
    </tbody>
</table>
```
##### 57: role="tablist"
A list of tab elements, which are references to tabpanel elements.
```
<ul role="tablist">
    <li role="tab">Introduction</li>
    <li role="tab">Chapter 1</li>
    <li role="tab">Chapter 2</li>
</ul>
```
##### 58: role="tabpanel"
A container for the resources associated with a tab, where each tab is contained in a tablist.
```
<ul role="tablist">
    <li role="tab">Introduction</li>
    <li role="tab">Chapter 1</li>
    <li role="tab">Chapter 2</li>
</ul>
<div role="tabpanel">
    <!-- etc -->
</div>
```
##### 59: role="textbox"
Input that allows free-form text as its value.
```
<textarea role="textbox"></textarea>
```
##### 60: role="timer"
A type of live region containing a numerical counter which indicates an amount of elapsed time from a start point, or the time remaining until an end point.
```
<p>
    <span role="timer">60</span> seconds remaining.
</p>
```
Section 41.61: role="toolbar"
A collection of commonly used function buttons represented in compact visual form.
```
<ul role="toolbar">
    <li><img alt="New" src="new.png"></li>
    <li><img alt="Open" src="open.png"></li>
    <li><img alt="Save" src="save.png"></li>
    <li><img alt="Close" src="close.png"></li>
</ul>
```
##### 62: role="tooltip"
A contextual popup that displays a description for an element.
```
<span aria-describedby="slopedesc">Slope</span>
<div role="tooltip" id="slopedesc">y=mx+b</div>
```
Typically, the tooltip would be hidden. Using JavaScript, the tooltip would be displayed after a delay when the user hovers over the element that it describes.

##### 63: role="tree"
A type of list that may contain sub-level nested groups that can be collapsed and expanded.
```
<ul role="tree">
    <li role="treeitem">
        Part 1
        <ul>
            <li role="treeitem">Chapter 1</li>
            <li role="treeitem">Chapter 2</li>
            <li role="treeitem">Chapter 3</li>
        </ul>
    </li>
    <li role="treeitem">
        Part 2
        <ul>
            <li role="treeitem">Chapter 4</li>
            <li role="treeitem">Chapter 5</li>
            <li role="treeitem">Chapter 6</li>
        </ul>
    </li>
    <li role="treeitem">
        Part 3
        <ul>
            <li role="treeitem">Chapter 7</li>
            <li role="treeitem">Chapter 8</li>
            <li role="treeitem">Chapter 9</li>
        </ul>
    </li>
</ul>
```
##### 64: role="treegrid"
A grid whose rows can be expanded and collapsed in the same manner as for a tree.

##### 65: role="treeitem"
An option item of a tree. This is an element within a tree that may be expanded or collapsed if it contains a sublevel group of treeitems.
```
<ul role="tree">
    <li role="treeitem">
        Part 1
        <ul>
            <li role="treeitem">Chapter 1</li>
            <li role="treeitem">Chapter 2</li>
            <li role="treeitem">Chapter 3</li>
        </ul>
    </li>
    <li role="treeitem">
        Part 2
        <ul>
            <li role="treeitem">Chapter 4</li>
            <li role="treeitem">Chapter 5</li>
            <li role="treeitem">Chapter 6</li>
        </ul>
    </li>
    <li role="treeitem">
        Part 3
        <ul>
            <li role="treeitem">Chapter 7</li>
            <li role="treeitem">Chapter 8</li>
            <li role="treeitem">Chapter 9</li>
        </ul>
    </li>
</ul>
```