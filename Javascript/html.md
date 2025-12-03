Elements: `video, audio, table, footer`
Tags: `<video>, <audio>, <table>, <footer>, </html>, </body>`
HTML5: `<!DOCTYPE html>`
Meta ATTRIBUTES:
```
<meta charset="UTF-8">
...COMING MORE
```
```html
<mark>I am highlighted (selected in yellow color)</mark>
<strong> or <b>
<em> or <i>
<u>mispelled, unarticulated, non-textual annotation</u>
<abbr title="Hypertext Markup Language">HTML</abbr>
<ins>To mark text as inserted</ins>
<del>To mark text as deleted/del>
<s>Struck-through text here</s>    
```
### anchor
```html
<a 
    href="page1.html#Topic1"
    hreflang="BCP 47"
    rel="external noopener noreferrer"
    target="_blank,_self,_parent,_top"
    title="tooltip text" 
    download
/>
```
```html
// link to another site
<a href="https://example.com" rel="external">example</a>
<a href="ftp://example.com">ftp site</a>
// link to an anchor
<a href="#topic">go to topic on same page</a>
<a href="page1.html#topic">go to topic another page</a>
// link to a page on the same site
<a href="/page">Text</a>
// link that dials a number
href="tel:11234567890"
```
```html
// open link in new tab/window
target="_blank" tells the browser to open it in a new tab or window (per user preference).
```
Using `target="_blank"` gives the opening site **partial access** to the `window.opener` object via JavaScript, which allows that page to then access and change the `window.opener.location` of your page and potentially redirect users to **malware or phishing sites**.

Whenever using this for pages you do not control, add `rel="noopener"` to your link to prevent the window.opener object from being sent with the request.

Currently, Firefox does not support noopener, so you will need to use `rel="noopener noreferrer"` for maximum effect.
```html
// link that runs javascript
<a href="javascript:myFunction();">Run Code</a>
<a href="#" onclick="myFunction(); return false;">Run Code</a>
```
The `return false;` is necessary to **prevent your page from scrolling to the top** when the link to # is clicked.

you can include an exclamation mark ! after the hashtag in order to **prevent the page from scrolling to the top**. This works because any invalid slug will cause the link to not scroll anywhere on the page, because it couldn't locate the element it references (an element with id="!"). You could also just use any invalid slug (such as #scrollsNowhere) to achieve the same effect. In this case, return false; is not required:
```html
<a href="#!" onclick="myFunction();">Run Code</a>
```
```html
// link that runs email client
<a href="
    mailto:example@example.com?
    cc=john@example.com&
    bcc=jane@example.com&
    subject=Example+subject&
    body=Message+text">Send email</a>
// First URL encode all values and then put in the code above
```
### lists
code below starts with index 5, 6 and then again 4, 5, 6.
```
<ol start="5">
 <li>Item</li>
 <li>Some Other Item</li>
 <li value="4">A Reset Item</li>
 <li>Another Item</li>
 <li>Yet Another Item</li>
</ol>
```
```
<ol reversed>...</ol>
```
1 shows 1,2,3,4
a shows a,b,c,d
A shows A,B,C,D
i shows i,ii,iii,iv
I shows I,II,III,IV
```
<ol type="1|a|A|i|I">
```
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
shows
```
name 1
name 2
    value for 1 and 2
name 3
    value for 3
    value for 3
```
```
<table>
    // 'caption' is always the first child of table, if present
    <colgroup>
        <col id="MySpecialColumn" />
        <col />
    </colgroup>
    <colgroup>
        <col class="CoolColumn" />
        <col class="NeatColumn" span="2" />
    </colgroup>
    ...
</table>

```
```
<table>
    <caption>Table Title</caption> <!--| caption is the first child of table |-->
    <thead> <!--======================| thead is after caption |-->
        <tr>
            <th>Header content 1</th>
            <th>Header content 2</th>
        </tr>
    </thead>
    <tbody> <!--======================| tbody is after thead |-->
        <tr>
            <td>Body content 1</td>
            <td>Body content 2</td>
        </tr>
    </tbody>
    <tfoot><!--| tfoot can be placed before or after tbody, but not in a group of tbody. |-->
    <!--| Regardless where tfoot is in markup, it is rendered at the bottom. |-->
        <tr>
            <td>Footer content 1</td>
            <td>Footer content 2</td>
        </tr>
    </tfoot>
</table>
```
### data attributes
```html
<div data-submitted="yes">...</div>
... more coming
```
### Linking Resources (script, icon, stylesheet)
|Attribute|Details|
|---|---|
|charset|Specifies the character encoding of the linked document|
|crossorigin|Specifies how the element handles cross origin requests|
|href|Specifies the location of the linked document|
|hreflang|Specifies the language of the text in the linked document|
|media|Specifies on what device the linked document will be displayed, often used with selecting stylesheets based on the device in question|
|rel|Required. Specifies the relationship between the current document and the linked document|
|rev|Specifies the relationship between the linked document and the current document|
|sizes|Specifies the size of the linked resource. Only when rel="icon"|
|target|Specifies where the linked document is to be loaded|
|type|Specifies the media type of the linked document|
|integrity|integrity Specifies a base64 encoded hash (sha256, sha384, or sha512) of the linked resource allowing the browser to verify its legitimacy|

#### Synchronous Loading
`<script src="path/to.js"></script>`
> Place before the closing body tag, if it is referencing any html tag
#### Asynchronous Loading
`<script src="path/to.js" async></script>`
- html content and script code, both are downloaded in parallel
- use for the javascript files, which are not referencing any html content
#### Deferred Loading
`<script src="path/to.js" defer></script>`
- html content and script code, both are downloaded in parallel
- scripts are only parsed after HTML is fully parses
- scripts are loaded in the order of declaration
#### noscript
`<noscript>JavaScript disabled</noscript>`

#### CSS Style
```
<link rel="stylesheet" href="path/to.css" type="text/css">
<link rel="stylesheet" href="path/to.css">
<style type="text/css">
    @import("path/to.css")
</style>
<style>
    @import("path/to.css")
</style>
```
#### Favicon
```
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
```
Use the `mime-type` `image/png` for PNG files and image/x-icon for icon (`*.ico`) files.

> A file named `favicon.ico` at the root of your website will typically be loaded and applied automatically, without the need for a `<link>` tag. If this file ever changes, browsers can be slow and stubborn about updating their cache.

#### Alternative CSS
`<link rel="alternate stylesheet" href="path/to/style.css" title="yourTitle">`

#### Resource Hint: dns-prefetch, prefetch, prerender
**Preconnect**
The preconnect relationship is similar to dns-prefetch in that it will resolve the DNS. However, it will also make the TCP handshake, and optional TLS negotiation. This is an experimental feature.
`<link rel="preconnect" href="URL">`
**DNS-Prefetch**
Informs browsers to resolve the DNS for a URL, so that all assets from that URL load faster.
`<link rel="dns-prefetch" href="URL">`
**Prefetch**
Informs the browsers that a given resource should be prefetched so it can be loaded more quickly.
`<link rel="prefetch" href="URL">`
DNS-Prefetch resolves only the domain name whereas prefetch downloads/stores the specified resources.
##### Prerender
Informs browsers to fetch and render the URL in the background, so that they can be delivered to the user instantaneously as the user navigates to that URL. This is an experimental feature.
`<link rel="prerender" href="URL">`

#### Link 'media' attribute
`<link rel="stylesheet" href="test.css" media="print">`
####  Prev and Next
```
<link rel="prev" href="http://stackoverflow.com/documentation/java/topics">
<link rel="next" href="http://stackoverflow.com/documentation/css/topics">
```
#### Web Feed
Use the rel="alternate" attribute to allow discoverability of your Atom/RSS feeds.
```
<link rel="alternate" type="application/atom+xml" href="http://example.com/feed.xml" />
<link rel="alternate" type="application/rss+xml" href="http://example.com/feed.xml" />
```

### Include JavaScript Code in HTML
|Attribute|Details|
|-|-|
|src|Specifies the path to a JavaScript file. Either a relative or absolute URL.|
|type|Specifies the MIME type. This attribute is required in HTML4, but optional in HTML5.|
|async|Specifies that the script shall be executed asynchronously (only for external scripts). This attribute does not require any value (except of XHTML).|
|defer|Specifies that the script shall be executed when the page has finished parsing (only for external scripts). This attribute does not require any value (except of XHTML).
|charset|Specifies the character encoding used in an external script file, e.g. UTF-8|
|crossorigin|How the element handles crossorigin requests|
|nonce|Cryptographic nonce used in Content Security Policy checks CSP3|

### images
|Parameters|Details|
|-|-|
|src, alt, width, height||
|srcset|for different resolutions, different monitor sizes|
|sizes|breakpoints|
|crossorigin|how the element handles crossorigin requests|
|usemap|name of the image map to use|
|ismap|whether the image is a server side map|

```
<img src="images/hello.png" alt="Hello World">
<img src="https://imgur.com/hello.png" alt="Hello World">
<img src="data:image/png:base64, iVBOR..." alt="Hello World">
```
`Alt` is for accesibility. Must be "" for most of the cases

<img >