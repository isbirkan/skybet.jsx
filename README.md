# skybet.jsx

## My own flavor of skybet's test, in order to prove my knowledge

### Let's get started, shall we?

<p align="left">
  <img width="250" height="152" src="https://tenor.com/view/typing-jim-carrey-fast-busy-gif-4903969.gif">
</p>   

---

#### I think you also need these:

* An operating system, why not? You can choose Windows, but it works better on any Unix based system. My choice: **Ubuntu**! (I don't afford a Mac)
* Your favorite choice of code editor or IDE. Psst, just so you know, I am using **Visual Studio Code** on Ubuntu. I know, hardcore!
* We also need to use a container, so that our application doesn't escape and go wild. Please call **Docker**, if your application misbehaves. They know how to take good care of it.
* Oh and last, but not least, our buddy **node**. The most important entity, since it holds our application altogether. I like to think of it as Atlas, from the Greek Mythology. A true hero, really strong guy!

#### Do you really want to run it?

* Ok, enough thinking, just clone the repository on your machine  
`git clone https://github.com/isbirkan/skybet.jsx.git`
* Get yourself into the cloned directory and simply run   
`npm run docker:build` or `docker-compose build`   
This will setup the environment for you. Please sit back and sip on your beer. Oops, sorry, I meant tea. It's green tea with bubbles!
* Finished your tea? Let's see the awesome website in action:   
`npm run docker:start` or `docker-compose up`
* BOOM! It now runs on your [local machine](http://localhost:3000)! *But how? You said it's inside docker!* 
<p align="left" style="padding-left: 40px;">
  <img width="220" height="144" src="https://tenor.com/view/magic-confetti-awesome-gif-11884906.gif">
</p>  

### Since you're such a nice listener, I threw in a bonus section
<p align="left">
  <img width="427" height="215" src="https://tenor.com/view/themoreyouknow-more-know-gif-4483207.gif">
</p>

#### Best font ever:

* FiraCode with font ligatures support. This will really make your code look neat!   
You can download it from its official GitHub repo or install it through Ubuntu's package manager.   
Then, all you need to do is change the Visual Studio Code settings, in order to support it:   
`"editor.fontFamily": "'Fira Code', 'monospace', monospace",   
"editor.fontLigatures": true,`

#### Awesome extensions I use (alphabetically listed, because OCD):

* Auto Close Tag
* Babel ES6/ES7 
* Bracket Pair Colorizer - because I like to unicorn-ise my code, if that's a word
* Color Highlight
* Debugger for Chrome
* ESLint - my superhero
* GitLens - Git supercharged
* Material Icon Theme - need to keep a strong visual
* Path Intellisense
* Prettier - Javascript formatter (standard --fix)
* Sort lines - still keeping the OCD alive since 2015
* vscode-faker