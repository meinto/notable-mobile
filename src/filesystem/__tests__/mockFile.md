---
title: Test File
tags: [Notebooks/Test/Bla Blub, Notebooks/Test/Bla Blub2]
created: '2019-04-14T15:29:58.877Z'
modified: '2019-04-14T16:51:51.674Z'
---

# 02 - Setup first program

```python
import retro

# choose a game & state
# https://github.com/openai/retro/tree/master/retro/data/stable
env = retro.make(game='SuperMarioBros-Nes')

# env = retro.make('NameOfGame', 'NameOfState')
# if you don't choose a scenario file it uses the default one defined in the game folder
```

---

## Scenario File

- States for done (emulator output)
- Reward Number

## Neat Python

```bash
# https://github.com/CodeReclaimers/neat-python
pip install neat-python
pip install graphviz
pip install matplotlib
pip install opencv-python
```