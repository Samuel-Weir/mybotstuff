# 🧠 Shoot-Em-Up Tournament Engine — Parent Project README

This project is a fully interactive JavaScript game designed for student engagement and teaching. It allows students to code their own bots that compete in a simple turn-based game using "Shoot", "Reload", and "Block" actions.

---

## 🎮 Overview

Players can:
- Select bots from a dropdown list (from `./bots` folder)
- Manually control actions via interface buttons, or let bots run automatically
- View real-time stats (ammo, health, last action)
- Run a fixed number of rounds
- Export match history as a `.json` file
- See a pop-up modal at the end of a match with a winner announcement and stat summary

---

## 📁 Folder Structure

```
project/
├── bots/                  # Student-submitted bot files
├── index.html             # Main webpage
├── main.js                # Game logic and bot integration
├── style.css              # Layout and design styles
└── assets/
    ├── sfx/               # Sound effects (shoot, reload, block)
    └── bot1.png, bot2.png # Default avatars
```

---

## 📦 Core Features

### Bot Selection
- Players select a bot from a dropdown.
- Bots are imported dynamically using `import()` from ES modules.

### Manual Mode
- Each bot has four control buttons: `Shoot`, `Reload`, `Block`, `Auto`.
- Buttons are dynamically generated based on bot name and player side.

### Game Engine
- Tracks health (3 max), ammo (starts at 0), and last action.
- Allows manual overrides per round.
- History of all rounds is stored for export and reference.

### Modal Winner Display
- When the game ends, a modal pops up with:
  - 🏆 Winner
  - Final health and ammo of both bots
  - Close button

### Logging
- A scrollable log in the center panel keeps track of each round's actions.

---

## 🎨 Styling & Layout

- Layout is fully responsive for laptops and desktops.
- Log area is scrollable.
- All panels (bot 1, controls, bot 2) have equal height.
- Flexbox ensures tight alignment and spacing.

---

## 🖼 Avatar Specs

- Image size: **100px × 100px**
- Format: **PNG** or **JPG**
- Use `object-fit: cover` to ensure square scaling
- Fallbacks are shown if avatars fail to load

---

## 📤 Export

- Click "Export Match History" to download a `.json` summary of every round played.

---

## 🛠 Customization Ideas

- Add sound toggle or dark mode
- Let students register their bot name and avatar
- Add leaderboard persistence with `localStorage`

---

## 🤝 Credits

Built as a teaching tool to make programming fun, competitive, and interactive.
