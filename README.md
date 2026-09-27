# Opus 5.5 Motion Graphics

## Make your own in 4 steps

1. Pick one idea to animate, like a grid that bends.
2. Name every state: cover, flip, animate, flip back.
3. Ask for one HTML file, then fix it frame by frame.
4. Render it to a GIF with Playwright and ffmpeg.

Full walkthrough + starter prompt → [motion-graphics/](motion-graphics)

## What each cover does

![12 AI/ML book covers, each acting out its idea](motion-graphics/ai-ml-books.gif)

`1080×1350` · `8-second loop` · `one HTML file` · `no animation library`

Built with Opus 5.5 in Claude Code. Every cover is the real one. Each flips open, animates the idea its book teaches, and flips back.

| # | Book | What moves |
|---|---|---|
| 1 | AI Engineering | App, model and infra blocks stack up |
| 2 | Applied ML and AI for Engineers | Points land, a regression line fits them |
| 3 | AI: A Modern Approach | A knight searches the board |
| 4 | Generative Deep Learning | Noise clears into a landscape |
| 5 | Deep Learning | Signals flow through the layers |
| 6 | GANs in Action | G fakes, D stamps FAKE, G tries again |
| 7 | Hands-On Generative AI | "a cat on the moon" renders in 50 steps |
| 8 | Hands-On LLMs | Tokens → embeddings → attention → next token |
| 9 | Hands-On ML | A decision boundary settles at 100% |
| 10 | LLM Engineer's Handbook | Data → fine-tune → RAG → deploy |
| 11 | Math for ML | A matrix bends the grid |
| 12 | NLP with Transformers | "it" attends to "animal" |

Buy links and official code repos → [books/](books)

## Caught in review

- The reference image put an AI-made frog on Hands-On ML. The real cover is an orangutan.
- Cover typos like "Learnig" and "Languge" were fixed.
- Made-up labels like "layer 9, head 5" were cut. The Hands-On ML accuracy is computed live from the dots.

## Repo map

```
motion-graphics/
  ai-ml-books.html   open in Chrome, has Play / Pause
  ai-ml-books.gif    the rendered loop
  render.mjs         HTML → GIF + MP4
  covers/            12 real covers
books/
  README.md          buy links + code repos
```

---

Made by [Ved Prakash Meena](https://www.linkedin.com/in/ved-prakash-meena/). Follow for more AI resources.
