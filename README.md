# dbot

a discord bot that can play music from youtube and also has a tts

(currently uses [espeak-ng](https://github.com/espeak-ng/espeak-ng) but planning to switch to [opentts](https://github.com/synesthesiam/opentts))

## prerequisites
* [nodejs](https://nodejs.org)
* [espeak-ng](https://github.com/espeak-ng/espeak-ng)

## running

configure configs in configs.json

example:
```json
{
    "token": "your token goes here",
    "clientID": "your client id goes here",
    "espeak_path": "your espeak path goes here",
    "out_wav": "wav file out (for espeak)"
}
```

download dependancies
```bash
npm install
```

run
```bash
npm run commands
npm run test
```