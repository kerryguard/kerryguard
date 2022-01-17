---
title: This is a post
description: This is some meta
date: 2021-12-16
images:
  small: https://images.pexels.com/photos/6822288/pexels-photo-6822288.jpeg?q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=450&amp;w=940
  large: https://images.unsplash.com/photo-1517171771326-cbc7f641008a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80
categories:
  - Book
---

Webfonts are now ubiquitous across the web to the point where most of the big players even have their own typefaces and the web looks a lot better for it.

Unfortunately the problem still exists that either the browser has to wait before it draws anything while it is getting the font or it renders without the font then re-renders the page again once the font is available. Neither is a great solution and Google's PageSpeed will hit you for either so what is an enterprising web developer to do?

I was tasked with exactly this problem while redesigning my wife's web site - [MKG Marketing Inc](https://mkgmarketinginc.com). Having been brought in right at the start while design and technologies were still on the table gave me some control that we might be able to mitigate this quite well.

What we need to do is reduce the amount of time it takes to get this font on the screen and then decide whether we want to go with the [block or swap approach](https://developers.google.com/web/updates/2016/02/font-display).

## Variable fonts are a boon

The first opportunity here was to go with a good variable font.

Variable fonts - unlike traditional static fonts - have a number of axes which you can think of as [sliders in which to push and pull the design](https://www.axis-praxis.org/samsa/).

The most obvious one is how light or bold a font is - rather than just say a light (200), a normal (400) and a bold (700) the browser can make a single font file perform all these roles and anything inbetween. Another one might be how thin or wide a font is - eliminating the need for separate condensed or expanded fonts - another might be how slanted or italic the design is or even whether a font is a serif or a sans-serif... and plenty of small serifs inbetween.

This means instead of having to load 3 or more web fonts we need just one which will decrease our page load time.

## Getting a variable font

[Google Fonts](https://fonts.google.com/) helpfully has an option to "Show only variable fonts" however it is important to note that while Google can show you them.. it is not capable of serving you the actual variable font to your site! Instead it will use the variable font to make you a set of static fonts to serve up which kind of defeats a lot of the point in using them.

Anyway, feel free to browse their site for a variable font that looks great on your site. Even use their CSS temporary to see what it would look like. Once you're happy it's time to head into the font information to see who created the font and where you can get the actual variable font file from.

For example, the rather nice [Readex Pro](https://fonts.google.com/specimen/Readex+Pro) says in its about section to head over to their [GitHub repository](https://github.com/ThomasJockin/readexpro) to contribute.

Unlike most open source code project binaries for fonts often get checked in as users don't typically have the (sometimes commercial such as Glyphs or FontLab) tool-chain to build them. This is good for us as inside the `/fonts/variable/` folder we see two .ttf files. You will note that the filename includes `[wght]` on one which means it contains the weight axes. The second in this case is `[HEXP,wght]` which in this case is for "hyper-expansion". Choose the one that has just the axes you need.

You can also check the download link from Google Fonts - that often has a full variable font they are using. It will probably contain much more than you want. Alternatively, some fonts such as [Recursive](https://www.recursive.design/) even have an online configurator that lets you choose what options you want and provides a ready-to-go fully-subset and compressed woff2 (so you can skip straight to serving the font!)

## Preparing the font

Now you could just load that .ttf file up somewhere but there are still some optimizations we can do. We want to shrink this file down as much as possible and there are two parts to that.

Firstly we want to strip out everything we don't need also known as subsetting. In the case of this font for example if I were using it on damieng.com I could strip out the Arabic characters as I do not write anything in Arabic (browsers will fall back to an installed font that does should they need to such as somebody entering something into your contact form).

### Subsetting the font

The open source [fontTools](https://fonttools.readthedocs.io/) comes to the rescue here. I installed it in WSL but Linux and other operating systems should be the same:

```bash
pip install fonttools brotli zopfli
```

The [subset](https://fonttools.readthedocs.io/en/latest/subset/) command has a number of options to choose what to keep. Unfortunately there is no easy language option but you can specify unicode ranges `--unicodes=` or even text files full of characters `--text-file=` or simply provide a list of characters with `--text=`. If you go the unicode range route then [Unicodepedia](https://www.unicodepedia.com/groups/) has some good coverage of what you'll need.

For this site we just needed Latin and the Latin-1 supplement, so:

```bash
fonttools subset ReadexPro[wght].ttf --unicodes=U+0020-007F,U+00A0-00FF --flavor=woff2
```

Which produces a `ReadexPro[wght].subset.woff2` weighing in at just 16KB (down from 188KB).

## Serving the font

Now at this point you **could** just upload the woff2 file to your CDN and reference it from your CSS.

Your CSS would look like this:

```css
@font-face {
  font-family: "ReadexPro";
  src: url(/fonts/readexpro[wght].subset.woff2) format("woff2");
  font-weight: 100 900;
}
```

The important bit here is `font-weight: 100 900` which lets the browser know that this is a variable font capable of handling all the font weights from 100 to 900. You can do this with other properties too:

| Axes     | CSS property                                                                             | Named example        | Numeric example              |
| -------- | ---------------------------------------------------------------------------------------- | -------------------- | ---------------------------- |
| `[slnt]` | [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style)     | `normal oblique`     | `normal oblique 30deg 50deg` |
| `[wdth]` | [font-stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch) | `condensed expanded` | `50% 200%`                   |
| `[wght]` | [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight)   | `thin heavy`         | `100 900`                    |

**Do not** instead create a `@font-face` per weight all linking to the same url as the browsers are often not smart enough to de-duplicate the requests and you're back to effectively waiting for multiple resources to load.

Now this might be fast enough, you could measure it and test... but this font is only 16KB so there's one more trick we can do.

With the url in the CSS the browser must first request the HTML, then the CSS, then finally the font. If you're smart you'll have them all on the same host so at least there will be no extra DNS lookups slowing things down in there. (Also note that requesting popular files from well-known CDNs will not reuse local copies any more in order to provide better security so it really is worth hosting your own again especially if you have a CDN in front of your site such as CloudFlare, CloudFront etc).

But we can do better!

## Base64 the font into the CSS!

By Base64 encoding the font you can drop it directly into the CSS thereby removing a whole other HTTP request/wait! Simply encode your woff2 file using a either an online tool like [Base64Encode.org](https://www.base64encode.org/) where you click the "click here to select a file", choose your .woff2 then click Encode and download the encoded text file or the command-line tool such as `base64`, I used wsl again with:

```bash
base64 readexpro[wght].subset.woff -w0 | clip.exe
```

Which stuffs the base64 encoded version into the clipboard ready to be pasted.

Now change your `@font-face` replacing the url with a data section, like this:

```css
@font-face {
  font-family: "ReadexPro";
  font-display: block;
  font-weight: 100 900;
  src: url(data:application/x-font-woff;charset=utf-8;base64,d09GMgABAAAAAEK0ABQAAAAAgZAAAEJFAAEz
  [truncated for this blog post]AQ==) format("woff2");
}
```

And hey presto! You can now happily slip that `font-display: block` in as well as the font is always going to be available at the same time as the CSS :)
