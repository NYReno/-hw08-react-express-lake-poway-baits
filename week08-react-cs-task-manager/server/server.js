import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

// Reasct runs on a different port during development
app.use(cors());

const catchFish = [
  {
    species: "Trout",
    rank: 1,
    name: "Berkley PowerBait Dough",
    Type: "Bait",
    description: "Malleable scented dough that floats",
    specialInstruction: "Rig with #16 treble hook and small weight",
  },
  {
    species: "Trout",
    rank: 2,
    name: "Thomas Buoyant Spoon",
    Type: "Spoon",
    description: "An erratic action spoon for trout",
    specialInstruction: "Cast and slow steady retrieve",
  },
  {
    species: "Trout",
    rank: 3,
    name: "Mini Jig (Marabou / Tube)",
    Type: "Jig",
    description: "1/32 to 1/16 oz micro jig",
    specialInstruction: "Use 2 lb test line, twitch gently",
  },
  {
    species: "Trout",
    rank: 4,
    name: "Berkley PowerBait Trout Worm",
    Type: "Bait",
    description: "3-inch synthetic floating worm",
    specialInstruction: "Rig tail-hooked or wackystyle on #8 hook",
  },
  {
    species: "Trout",
    rank: 5,
    name: "Nightcrawler / Live Earthworm",
    Type: "Bait",
    description: "Live, natural scent and movement",
    specialInstruction: "Use a split shot and small single hook",
  },
  {
    species: "Trout",
    rank: 6,
    name: "Acme Kastmaster",
    Type: "Spoon",
    description: "Aerodynamic long-casting lure",
    specialInstruction: "Choose gold or silver blade",
  },
  {
    species: "Trout",
    rank: 7,
    name: "Panther Martin Spinner",
    Type: "Spinner",
    description: "Inline spinner with heavy body",
    specialInstruction: "Cast upstream, retrieve across current",
  },
  {
    species: "Trout",
    rank: 8,
    name: "Berkley Gulp! Trout Dough",
    Type: "Bait",
    description: "Hybrid scent dispersion dough",
    specialInstruction: "Fish on bottom with light leader",
  },
  {
    species: "Trout",
    rank: 9,
    name: "Rapala Original Floater",
    Type: "Lure",
    description: "Balsa wood minnow bait",
    specialInstruction: "Ideal for shallow rivers and lakes",
  },
  {
    species: "Trout",
    rank: 10,
    name: "Super Duper",
    Type: "Spoon",
    description: "U-shaped metal trolling/casting lure",
    specialInstruction: "Troll at very slow speeds",
  },
  {
    species: "Bass",
    rank: 1,
    name: "Gary Yamamoto Senko",
    Type: "Worm",
    description: "High-salt stickbait with natural fall",
    specialInstruction: "Rig Wacky or Texas weightless",
  },
  {
    species: "Bass",
    rank: 2,
    name: "Roboworm Straight Tail",
    Type: "Worm",
    description: "Precision poured drop shot worm",
    specialInstruction: "Fish on a Drop Shot rig with light line",
  },
  {
    species: "Bass",
    rank: 3,
    name: "Huddleston Deluxe Swimbait",
    Type: "Crank",
    description: "Ultra-realistic soft swimbait",
    specialInstruction: "Use heavy swimbait setup with slow roll",
  },
  {
    species: "Bass",
    rank: 4,
    name: "Keitech Easy Shiner",
    Type: "Crank",
    description: "Scented paddle tail swimbait",
    specialInstruction: "Pair with jighead or underspin",
  },
  {
    species: "Bass",
    rank: 5,
    name: "Keitech Swing Impact Fat",
    Type: "Worm",
    description: "Lead head or swimbait hook bait",
    specialInstruction: "Thread on weightless swimbait hook",
  },
  {
    species: "Bass",
    rank: 6,
    name: "Strike King Football Jig",
    Type: "Jig",
    description: "Heavy tungsten bottom bouncing jig",
    specialInstruction: "Drag slowly along rocky structure",
  },
  {
    species: "Bass",
    rank: 7,
    name: "Megabass Vision 110",
    Type: "Crank",
    description: "Premium suspending jerkbait",
    specialInstruction: "Retrieve with aggressive jerk-jerk-pause",
  },
  {
    species: "Bass",
    rank: 8,
    name: "Crawdad / Live Crayfish",
    Type: "Worm",
    description: "Live freshwater crustacean",
    specialInstruction: "Hook lightly through tail crust",
  },
  {
    species: "Bass",
    rank: 9,
    name: "River2Sea Whopper Plopper",
    Type: "Surface",
    description: "Surface prop bait with loud sound",
    specialInstruction: "Throw along weed edges or open water",
  },
  {
    species: "Bass",
    rank: 10,
    name: "Ned Rig (Z-Man Finesse TRD)",
    Type: "Worm",
    description: "Minimalist finesse stickworm on jighead",
    specialInstruction: "Use on 6-8 lb line, hop gently",
  },
];

// rank: top/bottom
// Request top baits
// GET http://localhost:3000/api/catchFish?species=trout&limit=5&rank=bottom
// All Data
// GET http://localhost:3000/api/catchFish
app.get("/api/catchFish", (req, res) => {
  const { species, limit, rank } = req.query;

  // 2. Create a shallow copy
  // won't mutate the original array
  let results = [...catchFish];

  // Filter by species, if species is provided
  if (species) {
    results = results.filter(
      (fish) => fish.species.toLowerCase() === species.toLowerCase(),
    );
  }

  // Sort the results
  // if (rank === "bottom") {
  //   results.sort((a, b) => b.rank - a.rank);
  // } else {
  //   results.sort((a, b) => a.rank - b.rank);
  // }
  // Trying to evolve
  results.sort((a, b) =>
    rank === "bottom" ? b.rank - a.rank : a.rank - b.rank,
  );

  // if limit, then truncate
  if (limit) {
    const numLimit = parseInt(limit, 10);
    if (species) {
      // Return requested limit
      results = results.slice(0, parseInt(limit, 10));
    } else {
      // No species, then reurn limit for every species
      const trout = results
        .filter((f) => f.species.toLowerCase() === "trout")
        .slice(0, numLimit);
      const bass = results
        .filter((f) => f.species.toLowerCase() === "bass")
        .slice(0, numLimit);

      results = [...trout, ...bass];
    }
  }

  res.json(results);
});

// Root Check Route
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, function () {
  console.log(
    "catchFish API running at http://localhost:" + PORT + "/api/catchFish",
  );
});
