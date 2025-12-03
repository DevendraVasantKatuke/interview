## 1. use: https://blurha.sh/
## 2. Image Formats
#### WebP
WebP is an image format developed by Google that offers better compression and smaller file sizes compared to JPEG and PNG. It is supported by most modern browsers (excluding some versions of Safari and Internet Explorer). To use WebP, you can provide both WebP and fallback formats like JPEG or PNG in your HTML.

```
// 👇 Set image sources with different formats in the `srcSet`, the attribute in order of preference
// 👇 Fallback image source for browsers that don't support srcSet in `src` attribute
<img
 srcset="car.webp, car.jpg"
 src="car.jpg"
 alt="Car"
/>
```

#### JPEG 2000
JPEG 2000 is another high-quality image format with good compression. However, its support in browsers is limited. Similar to WebP, you can provide a JPEG 2000 version and fallback formats.
```
<img
 srcset="car.jp2, car.jpg"
 src="car.jpg"
 alt="Car"
/>
```
#### AVIF
AVIF is a newer image format that provides excellent compression and image quality. It is supported in modern browsers like Chrome and Firefox.
```
<img
 srcset="car.avif, car.jpg"
 src="car.jpg"
 alt="Car"
/>
```
## 3. Responsive Images
Responsive images allow you to serve different images based on the user’s device and screen size. This prevents large images from being loaded on smaller screens, saving bandwidth. Use the srcset and sizes attributes in the img element to achieve this:
```
<img src="small.jpg"
  srcset="medium.jpg 800w,
          large.jpg 1200w,
          xlarge.jpg 1600w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  alt="Responsive Image">
```
sizes — Informs the browser of the image's intended display size based on media queries. It doesn't affect which image the browser chooses to download. srcset — Lists multiple image sources with width descriptors (800w). Each width descriptor represents the actual width of the image in pixels. When the browser encounters both attributes (sizes and srcset), it follows these steps:

- It evaluates the sizes attribute to determine the image's intended display size based on the device's viewport width.
- It then uses this calculated size, along with the available width descriptors in srcset, to decide which image to download. The browser picks the image with the closest width descriptor (closest to the calculated size) from the srcset.
## 4. Lazy Loading
Lazy loading is a method that postpones the loading of images until they are about to become visible within the user’s viewport. This reduces the initial page load time. Use the loading="lazy" attribute on the img element (by default loading attribute is set as eager)
```
<img src="image.jpg" alt="Image" loading="lazy" width="100%" height="100%" />
```
## 5. Preloading and Caching
Preload critical images to reduce the delay when they are actually needed. Use the link tag with rel="preload" in the head of your HTML:
```
<link rel="preload" href="image.jpg" as="image"></link>
```
Additionally, consider using service workers to cache images for subsequent visits. The following is a basic example of using a service worker to cache images
```
// Service worker code (sw.js)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('images-cache').then(cache => {
      return cache.addAll([
        'image.jpg',
        'other-image.jpg',
        // Add more images to the cache here
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```
In a React app, you can use the react-helmet package to add the preload link in the HTML head section for critical images
```
import React from 'react';
import { Helmet } from 'react-helmet';
import PreloadImage from './assets/preload-image.png';

const ImageComponent = () => {
  return (
    <>
      <Helmet>
        <link rel="preload" href={PreloadImage} as="image" />
      </Helmet>
      <img src={PreloadImage} alt="Preload image alt" />
    </>
  );
};
```
## 6. Image Sprites
An image sprite sheet is a single image that contains multiple smaller images or icons. It’s used to reduce the number of HTTP requests when rendering numerous small images on a web page. By loading a single sprite sheet, you can display specific images by adjusting the CSS background-position.

Suppose you are building a social media web application and want to display various icons for actions such as liking a post, commenting, and sharing. Each icon is a small image that is typically used in different parts of the application.

Without Image Sprites:
In a traditional approach, you would include each icon as a separate image file in your HTML or CSS, like this:
```
<!-- Separate images for each icon -->
<img src="like-icon.png" alt="Like" />
<img src="comment-icon.png" alt="Comment" />
<img src="share-icon.png" alt="Share" />
<!-- and so on... -->
```
With Image Sprites:
Using image sprites, you can combine all these icons into a single sprite sheet, reducing the number of HTTP requests. Here’s an example of how it would look:
```
/* CSS using image sprites */
.icon {
  background-image: url("icons-sprite.png");
  background-repeat: no-repeat;
}

.like-icon {
  background-position: 0 0;
  width: 24px;
  height: 24px;
}

.comment-icon {
  background-position: -24px 0;
  width: 24px;
  height: 24px;
}

.share-icon {
  background-position: -48px 0;
  width: 24px;
  height: 24px;
}

/* and so on... */
```
```
<div class="icon like-icon"></div>
<div class="icon comment-icon"></div>
<div class="icon share-icon"></div>
```
In this example, all the icons (like, comment, share, etc.) are combined into a single icons-sprite.png sprite sheet. The CSS classes (e.g., .like-icon, .comment-icon, .share-icon) use the background-position property to display the correct part of the sprite sheet as the background for each icon.

Benefits:
- Instead of loading multiple image files, the web application now loads just one image (icons-sprite.png), reducing the number of HTTP requests.
- The sprite sheet is loaded once and can be cached by the browser, improving subsequent page loads.
- CSS classes control the display of individual icons from the sprite sheet, allowing for seamless hover and rollover effects without additional loading delays.
- This leads to faster and more efficient user experiences with improved overall page loading times.
## 7. Adaptive Image Serving
Adaptive Image Serving is a technique used in web development to deliver images that are optimized for the user’s specific device and network conditions. Adaptive image serving aims to provide the best possible image quality while minimizing the image file size and ensuring optimal performance.

It is typically handled by a CDN or image server with dynamic resizing capabilities, and the implementation details may vary based on the chosen service. For instance, if you prefer to utilize AWS CloudFront, refer to this link for further information on image optimization: AWS Blog — Image Optimization using Amazon CloudFront and AWS Lambda.

## 8. Remove metadata
Removing metadata from images is an essential step in image optimization. Because Image metadata can sometimes take up a significant portion of an image’s file size, especially for images captured by digital cameras or smartphones, by removing metadata, you can significantly reduce the overall file size of the image, leading to faster image loading on web pages. Tools like ImageMagick or online image metadata remover can help with this.

## 9. Use SVG for icons and logos
SVGs are ideal for simple icons and logos because they are vector-based and can be scaled without losing quality.
```
<!-- logo.svg -->
<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>

<!-- index.html -->
<img src="logo.svg" alt="Logo" />
```
Using SVG for logos and icons provides a lightweight, scalable, and visually appealing solution that improves web page performance, ensures crisp visuals, and enhances the overall user experience across various devices and browsers.

## 10. Image Dimensions
Specifying the image’s dimensions in HTML or CSS is essential to prevent layout shifts and improve page rendering speed. By specifying the image’s dimensions in HTML or CSS, you provide the browser with the necessary information to allocate the correct space for the image during the initial rendering process.

Benefits
- Prevents Layout Shifts: Specifying the dimensions ensures that the browser knows the image’s exact size before loading it, preventing sudden layout shifts.
- Faster Page Rendering: With the image dimensions known in advance, the browser can render the layout more efficiently, leading to faster page loading times.
- Improved User Experience: By eliminating layout shifts, users have a more consistent and pleasant browsing experience.
To specify the image dimensions, you can directly include the width and height attributes within the <img> tag or apply a specific style by adding a class attribute to the <img> tag in CSS.
```
<img src="logo.jpg" alt="logo" width="300" height="200" />

<!-- or -->

.logo {
  width: 300px;
  height: 200px;
}

<img src="logo.jpg" alt="logo" class="logo" />
```

Apart from the techniques mentioned above, You can utilize techniques like Blurhash for Placeholder Images, Progressive Image Loading for gradual quality improvement(where the image is initially displayed in low resolution and progressively improves in quality as it fully loads), and Automatic Image Compression with Image CDN for faster loading.