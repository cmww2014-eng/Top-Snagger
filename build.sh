#!/bin/sh
# Builds the installable standalone app (app/index.html) from src/app.html.
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  printf '<meta name="theme-color" content="#16212c"><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon.svg"><link rel="apple-touch-icon" href="icon-192.png">\n'
  printf '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Top Snagger">\n'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head><body>\n'
  sed 's#https://cdn.jsdelivr.net/npm/docx@9.0.2/build/index.umd.js#docx.umd.js#' src/app.html
  printf '\n</body></html>\n'
} > docs/index.html
