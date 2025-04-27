export default function Bot1(history, self, opponent) {
    // Basic logic: shoot if you have ammo, else reload
    if (self.ammo > 0) {
      return "Shoot";
    } else {
      return "Reload";
    }
  }