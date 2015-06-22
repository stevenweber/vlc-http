# vlc-http

Simple web app to be used with a VLC running in http mode, i.e. headless.

## Features

* Frontend
  * Add music to its library
  * Displays current track and library information
  * Live querying and in-place updates

* API
  * Proxies requests to VLC
  * Only requires Node.js and cvlc
  * Dynamic song matching

## Purpose

This is an experiment to integrate [Hubot](https://hubot.github.com/)
with a [Raspberry Pi](https://www.raspberrypi.org/) to play music.

## Setup

### Dependencies

* [Node.js](https://nodejs.org/)
* cvlc (VLC), `apt-get`

### Development

```
npm install
node server.js # this app
cvlc -I http # headless VLC
```

## Looks Something Like This

![screen shot](https://cloud.githubusercontent.com/assets/96204/8275616/e83329f2-186e-11e5-9244-e43471cb6e66.png)
