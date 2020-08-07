# w-boilerplate
Documentation to use this template.

## Table of contents

1. [New project](#new-project)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Templating](#templating)
5. [Styling](#styling)
5. [Scripts](#scripts)

## New project

For each new project, you must create a new repository, choosing this one (w-boilerplate) as the repository template. Then, you can clone your repository on your computer.

## Installation

You need to install the dependencies use in this template. You can see the dependencies use in [package.json](https://github.com/mathieudaix/w-boilerplate/blob/master/package.json). If you need to use other dependencies, install them with the command line.

```shell script
# Install the dependencies
npm i

# Install new dependencies
npm i gsap
```

## Usage

This template use [webpack](https://webpack.js.org/) as compiling system. To use this template, you can find all the npm scripts in [package.json](https://github.com/mathieudaix/w-boilerplate/blob/master/package.json).

```shell script
# Run the development server (open a new page with hot reload)
npm run dev

# Build productions files (update the dist folder)
npm run prod 

# Generate 3 sizes of images (mobile, tablet and desktop) and convert them to webp
npm run img:generate

# Clear the images folder (not resize and static folder inside)
npm run img:clear
```

## Templating

This template use the [pug](https://pugjs.org/api/getting-started.html) as the templating system. The pug allows us to use block, include and other methods.

### Images

Correctly load images.

```pug
picture
  source(srcset="images/image-small.webp 500w, images/image-medium.webp 1000w, images/image-large.webp 1500w" sizes="92vw" type="image/webp")
  source(srcset="images/image-small.jpg 500w, images/image-medium.jpg 1000w, images/image-large.jpg 1500w" sizes="92vw" type="image/jpeg")
  img(src="images/image-small.jpg" alt="Image")
```

## Styling

[Scss](https://pugjs.org/api/getting-started.html) is the css preprocessor.

#### Architecture

* `components`: components ui.
* `global`: global style use in website.
* `pages`: pages html design.
* `settings`: configuration of the project.
* `tools`: mixins and functions.

### Naming

[Bem](http://getbem.com/) is the syntax for class names.

```scss
// block
.block {}

// element
.block__container {}

// modifier
.block__container--dark {}

// class use in js
.js-block {}
```

### Functions

The functions are declared in [_functions.scss](https://github.com/mathieudaix/w-boilerplate/blob/master/src/styles/tools/_functions.scss).

```scss
// spacing
.block {
  padding: s(2);
}

// font-size
.title {
  font-size: f(4);
}
```

### Size system

The size system is defined is [_settings.scss](https://github.com/mathieudaix/w-boilerplate/blob/master/src/styles/settings/_config.scss). You can change variables begining with $size- to change the size of all element. The size system is use in [_pages.scss](https://github.com/mathieudaix/w-boilerplate/blob/master/src/styles/global/_page.scss). Then, you need to use the `rem` unit instead of `px` unit.

```scss
// _config.scss
$from-small: 700px;
$size-small: 2vw;

$from-medium: 1000px;
$to-medium: $from-medium - 1;

// _pages.scss
@media (min-width: $from-small) and (max-width: $to-medium) {
  font-size: $size-small;
}
```

## Scripts

By default, this template use 3 dependencies: [gsap](https://greensock.com/gsap/), [locomotive scroll](https://github.com/locomotivemtl/locomotive-scroll) and [barba](https://barba.js.org/).

### Gsap

Gsap is use for animation and micro-interaction.

### Locomotive scroll

Locomotive scroll is use for scroll animation and smooth scroll.

### Barba

Barba is use for pages transition.

### Syntax

``` js
// Select an html element
$btn = el('.btn')

// Select mutliples elements
$items = els('.item')
```
