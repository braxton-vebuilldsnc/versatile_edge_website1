import {
  Bath,
  Blocks,
  CookingPot,
  Hammer,
  HousePlus,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";

export const phoneDisplay = "888-381-1033";
export const phoneHref = "tel:+18883811033";

export const serviceAreas = [
  "Raleigh",
  "Cary",
  "Wake Forest",
  "Apex",
  "Morrisville",
  "Fuquay-Varina",
  "Holly Springs",
];

export const services = [
  {
    slug: "whole-home-renovations",
    title: "Whole-Home Renovations",
    shortTitle: "Renovations",
    icon: Sparkles,
    image: "/images/projects/kitchen-wooley.webp",
    eyebrow: "Cohesive transformation",
    summary:
      "Bring multiple rooms, systems, and finishes together under one clear plan—managed from first walkthrough through final details.",
    intro:
      "A successful whole-home renovation should feel intentional, not pieced together. We coordinate layout changes, finish selections, structural work, and the construction schedule so every space belongs to the same home.",
    highlights: ["Unified design direction", "Structural and systems coordination", "Phased or full-scope construction"],
    faq: [
      ["Can we live in the home during construction?", "Sometimes. We plan access, dust control, utilities, and temporary living arrangements around the scope before work begins."],
      ["Do you handle permits and inspections?", "Yes. Versatile Edge coordinates applicable Wake County and municipal requirements as part of the project plan."],
    ],
  },
  {
    slug: "interior-remodeling",
    title: "Interior Remodeling",
    shortTitle: "Remodeling",
    icon: Hammer,
    image: "/images/projects/kitchen-modern.webp",
    eyebrow: "Make the space work better",
    summary:
      "Rework dated or disconnected interiors with thoughtful layouts, durable materials, and construction details built for daily life.",
    intro:
      "Whether the challenge is poor flow, underused space, or finishes that no longer fit your home, we turn a collection of problems into a coordinated remodeling plan.",
    highlights: ["Layout and flow improvements", "Finish and fixture coordination", "Clean, code-compliant execution"],
    faq: [
      ["What kinds of rooms can you remodel?", "We work across living spaces, bedrooms, bonus rooms, home offices, laundry rooms, and connected interior areas."],
      ["Can you remove walls?", "Where appropriate, we assess structural conditions and coordinate engineering before changing load-bearing assemblies."],
    ],
  },
  {
    slug: "kitchen-renovations",
    title: "Kitchen Renovations",
    shortTitle: "Kitchens",
    icon: CookingPot,
    image: "/images/projects/kitchen-wooley-detail.webp",
    eyebrow: "The heart of the home, reconsidered",
    summary:
      "Create a kitchen with better flow, purposeful storage, durable finishes, and the right atmosphere for everyday life.",
    intro:
      "From targeted upgrades to full gut renovations, we coordinate cabinetry, surfaces, lighting, flooring, tile, plumbing, electrical work, and layout changes around the way your household actually uses the kitchen.",
    highlights: ["Functional layout planning", "Cabinetry and finish coordination", "Lighting, plumbing, and electrical updates"],
    faq: [
      ["Can you change the kitchen layout?", "Yes. We evaluate walls, utilities, ventilation, and clearances before proposing practical layout changes."],
      ["How long does a kitchen renovation take?", "Timing varies by scope and material lead times. Your proposal includes a project-specific schedule before construction begins."],
    ],
  },
  {
    slug: "bathroom-renovations",
    title: "Bathroom Renovations",
    shortTitle: "Bathrooms",
    icon: Bath,
    image: "/images/projects/herringbone.webp",
    eyebrow: "Comfort built on sound details",
    summary:
      "Transform an outdated bathroom with moisture-conscious construction, precise tile work, and a layout that feels effortless.",
    intro:
      "Bathrooms demand craftsmanship behind the finishes as much as they do on the surface. We plan waterproofing, ventilation, plumbing, lighting, storage, tile, and fixtures as one coordinated system.",
    highlights: ["Waterproofing and ventilation", "Custom tile and shower work", "Vanities, fixtures, and lighting"],
    faq: [
      ["Can you convert a tub to a shower?", "Yes. We assess the existing plumbing, footprint, waterproofing needs, and accessibility goals before designing the conversion."],
      ["Do you handle all the trades?", "Yes. We coordinate the trades required for the approved renovation scope."],
    ],
  },
  {
    slug: "porches-and-decks",
    title: "Porches & Decks",
    shortTitle: "Porches & Decks",
    icon: PanelsTopLeft,
    image: "/images/projects/deck.webp",
    eyebrow: "Outdoor rooms for Carolina living",
    summary:
      "Build a deck, screened porch, or covered outdoor space designed for how you relax, gather, and move between home and yard.",
    intro:
      "North Carolina outdoor spaces need sound framing, weather-conscious materials, and details that connect naturally to the existing home. We build for comfort now and durability over time.",
    highlights: ["Decks and screened porches", "Covered outdoor living", "Durable, climate-aware materials"],
    faq: [
      ["Can you add a roof or screened enclosure?", "Yes. We evaluate the existing structure, rooflines, drainage, and permit requirements before finalizing the design."],
      ["Which decking materials do you use?", "Material recommendations depend on appearance, maintenance expectations, exposure, and budget."],
    ],
  },
  {
    slug: "home-additions",
    title: "Home Additions",
    shortTitle: "Additions",
    icon: HousePlus,
    image: "/images/projects/three-season-room.webp",
    eyebrow: "More space, made to belong",
    summary:
      "Expand your home with an addition that supports your needs and connects naturally to the existing structure.",
    intro:
      "An addition must solve the need for space without feeling like an afterthought. We coordinate structure, exterior transitions, systems, permitting, and interior finishes around a complete plan.",
    highlights: ["Living and bedroom additions", "Sunrooms and flex spaces", "Seamless interior and exterior transitions"],
    faq: [
      ["Where does an addition project begin?", "We start with your goals, property conditions, zoning constraints, utilities, and a realistic investment range."],
      ["Will the addition match the house?", "That is the goal. We study rooflines, proportions, materials, circulation, and finish details to create a cohesive result."],
    ],
  },
  {
    slug: "window-replacement",
    title: "Window Replacement",
    shortTitle: "Windows",
    icon: Blocks,
    image: "/images/projects/kitchen-wooley.webp",
    eyebrow: "Comfort, efficiency, and curb appeal",
    summary:
      "Replace aging windows with carefully installed units that improve comfort, operation, and the look of your home.",
    intro:
      "Good window replacement is about more than the unit. We focus on fit, flashing, water management, trim, insulation, and clean interior and exterior transitions.",
    highlights: ["Full-frame and replacement options", "Water-managed installation", "Interior and exterior finish work"],
    faq: [
      ["How do I know whether to repair or replace?", "We evaluate operation, frame condition, signs of water intrusion, drafts, glass performance, and your long-term goals."],
      ["Can you match existing trim?", "We plan interior and exterior trim details as part of the installation scope."],
    ],
  },
] as const;

export const projects = [
  { title: "Brick & Brass Kitchen", category: "Kitchens", location: "Wake County", image: "/images/projects/kitchen-wooley.webp", summary: "A warm, highly functional kitchen centered on custom details and a generous gathering island." },
  { title: "Clean-Line Kitchen", category: "Kitchens", location: "Triangle Area", image: "/images/projects/kitchen-modern.webp", summary: "Crisp cabinetry, layered lighting, and durable surfaces create a bright everyday workspace." },
  { title: "Herringbone Shower", category: "Bathrooms", location: "Wake County", image: "/images/projects/herringbone.webp", summary: "A carefully composed walk-in shower with full-height tile, niches, and frameless glass." },
  { title: "Backyard Deck", category: "Outdoor Living", location: "Wake County", image: "/images/projects/deck.webp", summary: "A straightforward outdoor gathering space with durable framing and open views to the yard." },
  { title: "Three-Season Room", category: "Additions", location: "Triangle Area", image: "/images/projects/three-season-room.webp", summary: "A light-filled transition between the home and landscape for more usable living space." },
  { title: "Addition in Progress", category: "Behind the Build", location: "Wake County", image: "/images/projects/addition-in-progress.webp", summary: "A real look at the planning, coordination, and structural work behind the finished space." },
];

export const processSteps = [
  { number: "01", title: "Consultation & site visit", text: "We walk the property, listen to your goals, and identify the conditions that will shape the work." },
  { number: "02", title: "Scope & detailed proposal", text: "You receive a clear scope, practical options, and a proposal aligned with the project we discussed." },
  { number: "03", title: "Planning & construction", text: "We coordinate selections, scheduling, trades, inspections, communication, and a clean jobsite." },
  { number: "04", title: "Final walkthrough", text: "We review the completed work together and close the project with the details accounted for." },
];
