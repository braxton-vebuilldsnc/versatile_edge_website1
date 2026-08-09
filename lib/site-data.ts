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
    image: "/images/projects/hutter-kitchen-03.webp",
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
    image: "/images/projects/hutter-kitchen-04.webp",
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
    image: "/images/projects/johnson-bath-04.webp",
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
    image: "/images/projects/walsh-deck-cable-railing.webp",
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
    image: "/images/projects/walsh-sunroom-01.webp",
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
  { title: "Hutter Kitchen — Gathering Island", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-05.webp", summary: "A generous working island, tailored white cabinetry, warm brass lighting, and a dedicated pantry create a kitchen made for everyday gathering." },
  { title: "Hutter Kitchen — Open Living", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-03.webp", summary: "The renovated kitchen opens naturally into a light-filled living space while retaining the home’s original brick character." },
  { title: "Hutter Kitchen — Cooking Wall", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-02.webp", summary: "Integrated appliances, a statement range hood, and full-height geometric tile bring performance and visual rhythm to the cooking zone." },
  { title: "Hutter Kitchen — Pantry View", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-01.webp", summary: "Purposeful storage and a direct pantry connection support a clean, efficient path through the heart of the home." },
  { title: "Hutter Kitchen — Connected Flow", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-04.webp", summary: "A long island, durable surfaces, and carefully layered lighting connect cooking, dining, and conversation areas." },
  { title: "Johnson Bath — Herringbone Shower", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-04.webp", summary: "A spacious frameless shower with a full-height herringbone feature wall, integrated niches, and a built-in bench." },
  { title: "Johnson Bath — Double Vanity", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-02.webp", summary: "A tailored double vanity combines deep navy cabinetry, generous storage, floral wallcovering, and warm metal fixtures." },
  { title: "Johnson Bath — Vanity Details", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-01.webp", summary: "Custom storage, quartz surfaces, individual mirrors, and layered lighting make the everyday routine feel considered." },
  { title: "Johnson Bath — Shower Entry", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-03.webp", summary: "Clear frameless glass keeps the herringbone tilework visible while preserving an open feeling in the room." },
  { title: "Johnson Bath — Freestanding Tub", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-05-color-corrected.webp", summary: "A sculptural soaking tub, glass-block daylight, gray-green tile, and custom storage create a calm companion space to the walk-in shower." },
  { title: "Brown Bath — Marble-Look Shower", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/brown-bath-01.webp", summary: "A compact bathroom gains a bright frameless shower, large-format marble-look surfaces, and a coordinated vanity." },
  { title: "Brown Bath — Shower Details", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/brown-bath-02.webp", summary: "A sliding glass enclosure, recessed storage niche, and mosaic shower floor maximize function in a carefully planned footprint." },
  { title: "Brown Bath — Vanity Installation", category: "Behind the Build", location: "Versatile Edge Project", image: "/images/projects/brown-working-vanity-install.webp", summary: "A real construction-stage view of the vanity installation, protected flooring, layout checks, and preparation for the finished countertop." },
  { title: "Brown Bath — Vanity Dry-Fit", category: "Behind the Build", location: "Versatile Edge Project", image: "/images/projects/brown-working-vanity-dry-fit.webp", summary: "Cabinet placement and clearances are checked against the newly tiled floor before final fixtures and finish details are installed." },
  { title: "Brown Bath — Shower-Base Preparation", category: "Behind the Build", location: "Versatile Edge Project", image: "/images/projects/brown-working-shower-base.webp", summary: "The mosaic shower floor and backer-board preparation show the moisture-conscious construction beneath the finished glass enclosure." },
  { title: "Walsh Deck — Cable Railing", category: "Outdoor Living", location: "Versatile Edge Project", image: "/images/projects/walsh-deck-cable-railing.webp", summary: "Low-maintenance composite decking and slim cable rails create an open outdoor platform with clear views to the landscape." },
  { title: "Walsh Deck — Stair Approach", category: "Outdoor Living", location: "Versatile Edge Project", image: "/images/projects/walsh-deck-steps.webp", summary: "A generous stair run and coordinated cable railing provide a clean, durable transition from the yard to the elevated deck." },
  { title: "Walsh Deck — Framing Details", category: "Outdoor Living", location: "Versatile Edge Project", image: "/images/projects/walsh-deck-rim-joist.webp", summary: "Finished rim boards, structural posts, bracing, and cable railing show the practical construction behind the completed deck." },
  { title: "Brick & Brass Kitchen", category: "Kitchens", location: "Wake County", image: "/images/projects/kitchen-wooley.webp", summary: "A warm, highly functional kitchen centered on custom details and a generous gathering island." },
  { title: "Clean-Line Kitchen", category: "Kitchens", location: "Triangle Area", image: "/images/projects/kitchen-modern.webp", summary: "Crisp cabinetry, layered lighting, and durable surfaces create a bright everyday workspace." },
  { title: "Herringbone Shower", category: "Bathrooms", location: "Wake County", image: "/images/projects/herringbone.webp", summary: "A carefully composed walk-in shower with full-height tile, niches, and frameless glass." },
  { title: "Backyard Deck", category: "Outdoor Living", location: "Wake County", image: "/images/projects/deck.webp", summary: "A straightforward outdoor gathering space with durable framing and open views to the yard." },
  { title: "Walsh Sunroom — Window Wall", category: "Additions", location: "Versatile Edge Project", image: "/images/projects/walsh-sunroom-01.webp", summary: "A bright, furnished sunroom with broad landscape views and comfortable year-round living space." },
  { title: "Walsh Sunroom — Connected Living", category: "Additions", location: "Versatile Edge Project", image: "/images/projects/walsh-sunroom-02.webp", summary: "Interior windows preserve the connection to the original home while the new room creates a distinct place to relax." },
  { title: "Walsh Sunroom — Full Room View", category: "Additions", location: "Versatile Edge Project", image: "/images/projects/walsh-sunroom-03.webp", summary: "A soft green ceiling, abundant glass, and a clean white interior make the addition feel open, calm, and complete." },
  { title: "Addition in Progress", category: "Behind the Build", location: "Wake County", image: "/images/projects/addition-in-progress.webp", summary: "A real look at the planning, coordination, and structural work behind the finished space." },
];

export const namedProjects = [
  {
    slug: "hutter-whole-house-remodel-addition",
    title: "Hutter – Whole House Remodel and Addition",
    shortTitle: "Hutter – Whole House",
    type: "Whole-house remodel and addition",
    status: "Completed project",
    heroImage: "/images/projects/hutter-living-03.webp",
    overview: "A broad transformation that brings a new bedroom addition, expanded living spaces, a highly functional kitchen, two bathrooms, and purpose-built storage into one cohesive home.",
    rooms: [
      { name: "Kitchen", description: "White tailored cabinetry, generous work surfaces, warm brass lighting, and a direct pantry connection create an inviting center for daily life.", images: ["hutter-kitchen-05.webp", "hutter-kitchen-04.webp", "hutter-kitchen-03.webp", "hutter-kitchen-02.webp", "hutter-kitchen-01.webp"] },
      { name: "New Living Room", description: "A vaulted, beam-detailed ceiling and original brick fireplace anchor the expanded living area while broad windows bring in the landscape.", images: ["hutter-living-01-corrected.webp", "hutter-living-02.webp", "hutter-living-04.webp", "hutter-living-05.webp", "hutter-living-06.webp"] },
      { name: "Dining, Front Living & Entry", description: "Connected rooms preserve the character of the original home while improving movement and sightlines between everyday spaces.", images: ["hutter-dining-01-corrected.webp", "hutter-dining-02.webp", "hutter-dining-03.webp", "hutter-front-living.webp", "hutter-entry-view.webp"] },
      { name: "Bedroom Addition", description: "The new bedroom suite extends the home with abundant daylight, a calm material palette, and a natural connection to the remodeled interior.", images: ["hutter-bedroom-addition-01.webp", "hutter-bedroom-addition-02.webp", "hutter-bedroom.webp"] },
      { name: "Primary Bathroom", description: "A long double vanity, walk-in tiled shower, and thoughtful circulation make the primary bath feel spacious and practical.", images: ["hutter-primary-bath-01.webp", "hutter-primary-bath-02.webp", "hutter-primary-bath-03.webp"] },
      { name: "Guest Bathroom", description: "Classic finishes, built-in shower storage, and compact custom details give the guest bath a clean, finished character.", images: ["hutter-guest-bath-01.webp", "hutter-guest-bath-detail-01.webp", "hutter-guest-bath-detail-02.webp"] },
      { name: "Closet & Pantry", description: "Purpose-built storage turns support spaces into an organized extension of the home’s design.", images: ["hutter-primary-closet-01.webp", "hutter-primary-closet-02.webp", "hutter-pantry-01.webp"] },
      { name: "Exterior Addition", description: "Exterior views document how the new construction connects to the existing home.", images: ["hutter-exterior-01.webp", "hutter-exterior-02.webp"] },
    ],
  },
  {
    slug: "johnson-bathroom", title: "Johnson – Bathroom", shortTitle: "Johnson – Bathroom", type: "Bathroom renovation", status: "Completed project", heroImage: "/images/projects/johnson-bath-04.webp",
    overview: "A full bathroom renovation combining a frameless walk-in shower, sculptural soaking tub, custom vanity storage, and carefully coordinated gray-green tile.",
    rooms: [
      { name: "Walk-In Shower", description: "A full-height herringbone feature wall, integrated niches, bench, and frameless glass make the tilework the focal point.", images: ["johnson-bath-03.webp"] },
      { name: "Vanity", description: "Deep navy cabinetry, warm metal fixtures, quartz surfaces, and layered lighting bring character and function to the double vanity.", images: ["johnson-bath-01.webp", "johnson-bath-02.webp"] },
      { name: "Soaking Tub", description: "The adjacent soaking area pairs a freestanding tub with matching gray-green tile and softly diffused daylight.", images: ["johnson-bath-05-color-corrected.webp"] },
    ],
  },
  {
    slug: "brown-bathroom", title: "Brown – Bathroom", shortTitle: "Brown – Bathroom", type: "Bathroom renovation", status: "Completed project + construction documentation", heroImage: "/images/projects/brown-bath-01.webp",
    overview: "A compact bathroom remodeled around bright marble-look surfaces, a coordinated vanity, and a carefully built frameless shower.",
    rooms: [
      { name: "Finished Bathroom", description: "Large-format surfaces, a mosaic shower floor, recessed niche, and glass enclosure maximize light and function.", images: ["brown-bath-02.webp"] },
      { name: "Behind the Build", description: "Working photographs document cabinet layout, shower-base preparation, and the construction beneath the finished room.", images: ["brown-working-vanity-install.webp", "brown-working-vanity-dry-fit.webp", "brown-working-shower-base.webp"] },
    ],
  },
  {
    slug: "walsh-sunroom-deck", title: "Walsh – Sunroom and Deck", shortTitle: "Walsh – Sunroom & Deck", type: "Sunroom addition and deck", status: "Completed project", heroImage: "/images/projects/walsh-sunroom-03.webp",
    overview: "A light-filled sunroom addition and low-maintenance deck create complementary indoor and outdoor places to enjoy the surrounding landscape.",
    rooms: [
      { name: "Sunroom Addition", description: "Abundant glass, a soft green ceiling, and a clean white interior create a comfortable year-round room connected to the existing home.", images: ["walsh-sunroom-01.webp", "walsh-sunroom-02.webp"] },
      { name: "Deck", description: "Composite decking, a generous stair run, cable railing, and sound structural details create a durable outdoor platform.", images: ["walsh-deck-cable-railing.webp", "walsh-deck-steps.webp", "walsh-deck-rim-joist.webp"] },
    ],
  },
  {
    slug: "janet-home-addition", title: "Janet – Home Addition", shortTitle: "Janet – Home Addition", type: "Home addition", status: "Currently in progress", heroImage: "/images/projects/janet-floor-plan.webp",
    overview: "An active home-addition project expanding the house with a new bedroom, bathroom and laundry functions, improved everyday circulation, and a stronger connection to the back porch.",
    video: { src: "/videos/janet-jobsite-introduction.m4v", poster: "/videos/janet-jobsite-introduction-poster.webp", title: "At the start of the Janet addition" },
    rooms: [
      { name: "Project Planning", description: "The demolition and proposed-construction plans document the coordinated layout, new bedroom, bathroom and laundry functions, and porch connection before construction began.", images: [] },
      { name: "Foundations & Masonry", description: "Excavation, concrete footings, masonry foundation walls, and brick piers establish the footprint and structural support for the addition.", images: ["janet-progress-0066.webp", "janet-progress-0079.webp", "janet-progress-0080.webp"] },
      { name: "Floor Framing & Sheathing", description: "The floor system ties the new foundation together and creates the working platform for the addition’s wall framing.", images: ["janet-progress-0130.webp", "janet-progress-0131.webp"] },
      { name: "Wall Framing", description: "New exterior and interior walls begin defining the addition’s rooms, openings, and connection back into the existing home.", images: ["janet-progress-0135.webp", "janet-progress-0136.webp", "janet-progress-0137.webp"] },
    ],
  },
] as const;

export function projectPageForTitle(title: string) {
  const project = namedProjects.find((item) => title.startsWith(item.title.split(" – ")[0]));
  return project ? `/projects/${project.slug}` : undefined;
}

export const processSteps = [
  { number: "01", title: "Consultation & site visit", text: "We walk the property, listen to your goals, and identify the conditions that will shape the work." },
  { number: "02", title: "Scope & detailed proposal", text: "You receive a clear scope, practical options, and a proposal aligned with the project we discussed." },
  { number: "03", title: "Planning & construction", text: "We coordinate selections, scheduling, trades, inspections, communication, and a clean jobsite." },
  { number: "04", title: "Final walkthrough", text: "We review the completed work together and close the project with the details accounted for." },
];
