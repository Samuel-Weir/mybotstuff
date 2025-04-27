# 🤖 Bot Function Guide

Every bot you write must **export a function** like this:

```js
export default function YourBot(history, self, opponent) {
  // Return one of: "Shoot", "Reload", or "Block"
  return "Reload";
}
```

You decide your bot’s logic — it can be smart, random, defensive, or chaotic.
The engine is looking for either "Reload", "Block" or "Shoot"

---

## 🧠 Function Parameters Explained

### 1. `history` (Array of past rounds)

A log of all previous rounds.

Example:

```js
[
  {
    round: 1,
    results: [
      { name: "Bot 1", choice: "Reload", health: 3, ammo: 1 },
      { name: "Bot 2", choice: "Block", health: 3, ammo: 0 }
    ]
  },
  {
    round: 2,
    results: [
      { name: "Bot 1", choice: "Shoot", health: 3, ammo: 0 },
      { name: "Bot 2", choice: "Reload", health: 2, ammo: 1 }
    ]
  }
]
```

You can use this to:
- See what your opponent did in previous rounds
- Track how much ammo or health they had
- Build a strategy around predicting them

---

### 2. `self` (Your bot’s current state)

Object that looks like this:

```js
{
  name: "Bot 1",
  health: 3,
  ammo: 1,
  lastChoice: "Shoot"
}
```

You can check:
- How much ammo you have left (`self.ammo`)
- How much health you have
- What you did last round (if you want to alternate)

---

### 3. `opponent` (Your opponent’s current state)

Same structure as `self`, but for your enemy bot:

```js
{
  name: "Bot 2",
  health: 2,
  ammo: 1,
  lastChoice: "Reload"
}
```

You can use this to:
- Check if they have ammo (and might shoot)
- See their last action
- Time your blocks or strikes

---

## 🎯 What Your Bot Must Return

One of the following strings:

```js
"Shoot"   // if you have ammo
"Reload"  // gain +1 ammo
"Block"   // block all shots this round
```

> If you try to shoot without ammo, nothing happens (no damage, no penalty — but you still look silly 😅).

---


## 🎯 How to add your bot to the selections
1. in index.html
2. under line 22 and 41 you can add your bot as an option
3. use the other options to connect a bot to a selection

---

## 🖼 Optional: Add a Portrait

You can submit a custom avatar for your bot!

- Place it inside: `bots/bPortraits/`
- Name the file exactly like your function, e.g. `Blockey.png`
- Recommended format: PNG or JPG
- Recommended size: 100x100px

Your portrait will automatically show beside your bot during the match!
