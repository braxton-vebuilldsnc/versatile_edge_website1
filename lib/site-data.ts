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
  "Knightdale",
  "Wendell",
  "Rolesville",
  "Garner",
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
  { title: "Hutter Kitchen — Gathering Island", category: "Kitchens", location: "Historic Raleigh, NC", image: "/images/projects/hutter-kitchen-05.webp", summary: "A generous working island, tailored white cabinetry, warm brass lighting, and a dedicated pantry create a kitchen made for everyday gathering." },
  { title: "Hutter Kitchen — Family Room Addition", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-03.webp", summary: "The renovated kitchen opens naturally into a light-filled family room addition, creating an inviting everyday gathering space around the home’s original brick fireplace." },
  { title: "Hutter Kitchen — Cooking Wall", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-02.webp", summary: "Integrated appliances, a statement range hood, and full-height geometric tile bring performance and visual rhythm to the cooking zone." },
  { title: "Hutter Kitchen — Pantry View", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-01.webp", summary: "Purposeful storage and a direct pantry connection support a clean, efficient path through the heart of the home." },
  { title: "Hutter Kitchen — Connected Flow", category: "Kitchens", location: "Versatile Edge Project", image: "/images/projects/hutter-kitchen-04.webp", summary: "A long island, durable surfaces, and carefully layered lighting connect cooking, dining, and conversation areas." },
  { title: "Johnson Bath — Herringbone Shower", category: "Bathrooms", location: "Wake Forest, NC", image: "/images/projects/johnson-bath-04.webp", summary: "A spacious frameless shower with a full-height herringbone feature wall, integrated niches, and a built-in bench." },
  { title: "Johnson Bath — Double Vanity", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-02.webp", summary: "A tailored double vanity combines deep navy cabinetry, generous storage, floral wallcovering, and warm metal fixtures." },
  { title: "Johnson Bath — Vanity Details", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-01.webp", summary: "Custom storage, quartz surfaces, individual mirrors, and layered lighting make the everyday routine feel considered." },
  { title: "Johnson Bath — Shower Entry", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-03.webp", summary: "Clear frameless glass keeps the herringbone tilework visible while preserving an open feeling in the room." },
  { title: "Johnson Bath — Freestanding Tub", category: "Bathrooms", location: "Versatile Edge Project", image: "/images/projects/johnson-bath-05-color-corrected.webp", summary: "A sculptural soaking tub, glass-block daylight, gray-green tile, and custom storage create a calm companion space to the walk-in shower." },
  { title: "Brown — Marble-Look Shower", category: "Multiple Rooms", location: "Raleigh, NC", image: "/images/projects/brown-bath-01.webp", summary: "A compact bathroom gains a bright frameless shower, large-format marble-look surfaces, and a coordinated vanity." },
  { title: "Brown — Shower Details", category: "Multiple Rooms", location: "Versatile Edge Project", image: "/images/projects/brown-bath-02.webp", summary: "A sliding glass enclosure, recessed storage niche, and mosaic shower floor maximize function in a carefully planned footprint." },
  { title: "Brown - New Wet Bar Installation", category: "Multiple Rooms", location: "Versatile Edge Project", image: "/images/projects/brown-working-vanity-install.webp", summary: "A construction-stage view of the new wet bar installation, including protected flooring, cabinet layout checks, and preparation for the finished countertop." },
  { title: "Brown — Wet Bar Cabinet Dry-Fit", category: "Multiple Rooms", location: "Versatile Edge Project", image: "/images/projects/brown-working-vanity-dry-fit.webp", summary: "Cabinet placement and clearances are checked before the wet bar’s countertop, fixtures, and finish details are installed." },
  { title: "Brown — Shower-Base Preparation", category: "Multiple Rooms", location: "Versatile Edge Project", image: "/images/projects/brown-working-shower-base.webp", summary: "The mosaic shower floor and backer-board preparation show the moisture-conscious construction beneath the finished glass enclosure." },
  { title: "Walsh Deck — Cable Railing", category: "Outdoor Living", location: "Apex, NC", image: "/images/projects/walsh-deck-cable-railing.webp", summary: "Low-maintenance composite decking and slim cable rails create an open outdoor platform with clear views to the landscape." },
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
    overview: "A broad transformation in Historic Raleigh, NC, bringing a new bedroom and family room addition, expanded living spaces, a highly functional kitchen, two bathrooms, and purpose-built storage into one cohesive home.",
    rooms: [
      { name: "Kitchen", description: "White tailored cabinetry, generous work surfaces, warm brass lighting, and a direct pantry connection create an inviting center for daily life.", images: ["hutter-kitchen-05.webp", "hutter-kitchen-04.webp", "hutter-kitchen-03.webp", "hutter-kitchen-02.webp", "hutter-kitchen-01.webp"] },
      { name: "New Family Room Addition", description: "Constructed as part of the addition, the new family room pairs a vaulted, beam-detailed ceiling with the home’s original brick fireplace and broad windows overlooking the landscape.", images: ["hutter-living-01-corrected.webp", "hutter-living-02.webp", "hutter-living-04.webp", "hutter-living-05.webp", "hutter-living-06.webp"] },
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
    overview: "A full bathroom renovation in Wake Forest, NC, combining a frameless walk-in shower, sculptural soaking tub, custom vanity storage, and carefully coordinated gray-green tile.",
    rooms: [
      { name: "Walk-In Shower", description: "A full-height herringbone feature wall, integrated niches, bench, and frameless glass make the tilework the focal point.", images: ["johnson-bath-03.webp"] },
      { name: "Vanity", description: "Deep navy cabinetry, warm metal fixtures, quartz surfaces, and layered lighting bring character and function to the double vanity.", images: ["johnson-bath-01.webp", "johnson-bath-02.webp"] },
      { name: "Soaking Tub", description: "The adjacent soaking area pairs a freestanding tub with matching gray-green tile and softly diffused daylight.", images: ["johnson-bath-05-color-corrected.webp"] },
    ],
  },
  {
    slug: "brown-bathroom", title: "Brown – Multiple Rooms", shortTitle: "Brown – Multiple Rooms", type: "Multiple rooms", status: "Completed project + construction documentation", heroImage: "/images/projects/brown-bath-01.webp",
    overview: "A multi-room renovation in Raleigh, NC, including a bright bathroom with marble-look surfaces and a carefully built frameless shower, plus a new wet bar with fitted cabinetry.",
    rooms: [
      { name: "Finished Bathroom", description: "Large-format surfaces, a mosaic shower floor, recessed niche, and glass enclosure maximize light and function.", images: ["brown-bath-02.webp"] },
      { name: "Wet Bar & Behind the Build", description: "Working photographs document the new wet bar cabinetry, layout checks, shower-base preparation, and the construction beneath the finished rooms.", images: ["brown-working-vanity-install.webp", "brown-working-vanity-dry-fit.webp", "brown-working-shower-base.webp"] },
    ],
  },
  {
    slug: "walsh-sunroom-deck", title: "Walsh – Sunroom and Deck", shortTitle: "Walsh – Sunroom & Deck", type: "Sunroom addition and deck", status: "Completed project", heroImage: "/images/projects/walsh-sunroom-03.webp",
    overview: "A light-filled sunroom addition and low-maintenance deck in Apex, NC, create complementary indoor and outdoor places to enjoy the surrounding landscape.",
    rooms: [
      { name: "Sunroom Addition", description: "Abundant glass, a soft green ceiling, and a clean white interior create a comfortable year-round room connected to the existing home.", images: ["walsh-sunroom-01.webp", "walsh-sunroom-02.webp"] },
      { name: "Deck", description: "Composite decking, a generous stair run, cable railing, and sound structural details create a durable outdoor platform.", images: ["walsh-deck-cable-railing.webp", "walsh-deck-steps.webp", "walsh-deck-rim-joist.webp"] },
    ],
  },
  {
    slug: "janet-home-addition", title: "Janet – Home Addition", shortTitle: "Janet – Home Addition", type: "Home addition", status: "Currently in progress", heroImage: "/images/projects/janet-floor-plan.webp",
    overview: "An active home-addition project in Five Points, Raleigh, NC, expanding the house with a new bedroom, bathroom and laundry functions, improved everyday circulation, and a stronger connection to the back porch.",
    video: { src: "/videos/janet-jobsite-introduction.m4v", poster: "/videos/janet-jobsite-introduction-poster.webp", title: "At the start of the Janet addition" },
    rooms: [
      { name: "Project Planning", description: "The demolition and proposed-construction plans document the coordinated layout, new bedroom, bathroom and laundry functions, and porch connection before construction began.", images: [] },
      { name: "Foundations & Masonry", description: "Excavation, concrete footings, masonry foundation walls, and brick piers establish the footprint and structural support for the addition.", images: ["janet-progress-0066.webp", "janet-progress-0079.webp", "janet-progress-0080.webp"] },
      { name: "Floor Framing & Sheathing", description: "The floor system ties the new foundation together and creates the working platform for the addition’s wall framing.", images: ["janet-progress-0130.webp", "janet-progress-0131.webp"] },
      { name: "Wall Framing", description: "New exterior and interior walls begin defining the addition’s rooms, openings, and connection back into the existing home.", images: ["janet-progress-0135.webp", "janet-progress-0136.webp", "janet-progress-0137.webp"] },
    ],
  },
] as const;

type ServiceSlug = (typeof services)[number]["slug"];

export type ServiceAreaPage = {
  slug: string;
  city: string;
  state: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  heroCredit?: {
    label: string;
    sourceUrl: string;
    license: string;
    licenseUrl?: string;
  };
  heroLead?: string;
  introduction: string;
  localContext: {
    heading: string;
    paragraphs: readonly string[];
  };
  serviceIntroduction: string;
  serviceDescriptions: Record<ServiceSlug, string>;
  priorityServices?: readonly {
    slug: ServiceSlug;
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
    projectSlug?: string;
    projectLabel?: string;
  }[];
  supportingServiceSlugs?: readonly ServiceSlug[];
  planningHeading?: string;
  planningIntroduction?: string;
  planning: readonly {
    title: string;
    text: string;
    href?: string;
    linkLabel?: string;
  }[];
  projectSlugs: readonly string[];
  projectHeading?: string;
  projectIntroduction?: string;
  locallyVerifiedProjectSlugs?: readonly string[];
  faq: readonly (readonly [string, string])[];
};

// Only approved, substantive city pages belong in this collection. Each entry
// is exported by the shared service-area route and discovered by the generated
// sitemap and Apache route-normalization steps.
export const serviceAreaPages: readonly ServiceAreaPage[] = [
  {
    slug: "raleigh-nc",
    city: "Raleigh",
    state: "North Carolina",
    title: "Raleigh Home Remodeling & Renovations | Versatile Edge LLC",
    description:
      "Explore Raleigh home remodeling with Versatile Edge, a licensed NC general contractor for kitchens, bathrooms, additions, screened porches, and renovations.",
    h1: "Home Remodeling in Raleigh, North Carolina",
    eyebrow: "Raleigh residential remodeling",
    heroImage: "/images/service-areas/raleigh-nc-capitol.webp",
    heroAlt: "North Carolina State Capitol framed by trees in downtown Raleigh",
    introduction:
      "Raleigh homes do not all ask the same thing of a remodeling plan. An interior renovation may need to improve circulation within an established footprint, while an addition or screened porch must also respond to the lot, the existing structure, and the requirements attached to the address.",
    localContext: {
      heading: "Versatile Edge. Remodeling Raleigh Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Raleigh includes homes in locally designated historic districts, houses shaped by established neighborhood patterns, and newer properties with different layouts and site conditions. A useful plan begins by understanding what is already there before deciding what should change.",
        "Versatile Edge brings the proposed scope, existing construction, trade work, selections, scheduling, and applicable permit steps into one coordinated conversation. That early work helps identify practical constraints before construction decisions become expensive to reverse.",
      ],
    },
    serviceIntroduction:
      "The right scope depends on the home. These services can stand alone or work together under a coordinated Raleigh remodeling plan.",
    serviceDescriptions: {
      "whole-home-renovations":
        "Coordinate several Raleigh living spaces, systems, and finish decisions under one plan so the completed home feels cohesive rather than pieced together.",
      "interior-remodeling":
        "Improve rooms that feel disconnected, dated, or poorly arranged while accounting for the existing structure and the way your household moves through the home.",
      "kitchen-renovations":
        "Plan cabinetry, storage, lighting, utilities, work surfaces, and circulation around how the kitchen needs to function every day.",
      "bathroom-renovations":
        "Rework bathroom layouts and finishes with coordinated plumbing, ventilation, waterproofing, tile, storage, lighting, and fixture decisions.",
      "porches-and-decks":
        "Create a screened porch, covered outdoor room, or deck that connects naturally to the house and accounts for structure, drainage, exposure, and permitting.",
      "home-additions":
        "Add living space that belongs with the original home by coordinating footprint, structure, rooflines, systems, circulation, exterior transitions, and approvals.",
      "window-replacement":
        "Address aging or underperforming windows with careful attention to fit, flashing, water management, trim, insulation, and clean interior and exterior transitions.",
    },
    planning: [
      {
        title: "Permits follow the work",
        text: "The City of Raleigh separates residential alterations, additions, and decks or porches into different permit paths. The exact application materials and review depend on the address and approved scope.",
        href: "https://raleighnc.gov/permits/services/how-get-residential-permit",
        linkLabel: "Review City permit guidance",
      },
      {
        title: "Zoning is property-specific",
        text: "Base zoning and any applicable overlay district can affect what is feasible on a particular lot. Early property review is especially important before setting an addition or outdoor-living footprint.",
        href: "https://raleighnc.gov/planning/services/zoning-map",
        linkLabel: "Find Raleigh zoning resources",
      },
      {
        title: "Historic status changes the sequence",
        text: "Exterior changes to a locally designated Historic Overlay District property or Raleigh Historic Landmark require a Certificate of Appropriateness before work begins. Older age alone does not establish that requirement.",
        href: "https://raleighnc.gov/planning/services/certificate-appropriateness-coa",
        linkLabel: "Read the City COA guidance",
      },
    ],
    projectSlugs: [
      "hutter-whole-house-remodel-addition",
      "brown-bathroom",
      "janet-home-addition",
    ],
    faq: [
      [
        "What should Raleigh homeowners prepare before a remodeling consultation?",
        "Bring the problems you want to solve, your priorities, desired timing, a realistic investment range, and the property address. Photos, plans, and examples can help, but the first conversation should begin with how the home works today and what needs to improve.",
      ],
      [
        "Does a home remodel in Raleigh require a permit?",
        "Many projects do, but the required application, plans, and inspections depend on the address and scope. Raleigh publishes different guidance for interior alterations, additions, and decks or porches, so requirements should be confirmed for the specific project before work begins.",
      ],
      [
        "What should be reviewed before planning a Raleigh home addition?",
        "The early review should cover the existing structure, property survey and site conditions, zoning, utilities, access, proposed footprint, historic status where applicable, and a realistic investment range. These factors help determine whether the initial idea can become a practical project.",
      ],
      [
        "Do screened porches and covered decks require permits in Raleigh?",
        "The City of Raleigh states that screened porches, decks, balconies, sunrooms, and similar structures require a building permit. The documents and additional approvals vary by property and scope, so the proposed structure should be reviewed before plans are finalized.",
      ],
      [
        "Can homeowners remain in the house during remodeling?",
        "Sometimes. The answer depends on the rooms affected, utility interruptions, safe access, dust control, construction sequencing, and the scale of the work. Those conditions should be discussed during planning rather than assumed after construction starts.",
      ],
      [
        "Which Versatile Edge projects can Raleigh homeowners review?",
        "The completed Hutter whole-house remodel and addition in Historic Raleigh and the completed Brown multiple-room renovation in Raleigh show finished work. The Janet home addition in Five Points documents an active project in progress.",
      ],
      [
        "How do I confirm whether my Raleigh property is within the service area?",
        "Send the property address and a short description of the work through the consultation form. Versatile Edge can review the location and project scope before scheduling the next conversation.",
      ],
    ],
  },
  {
    slug: "cary-nc",
    city: "Cary",
    state: "North Carolina",
    title: "Cary Home Remodeling & Renovations | Versatile Edge LLC",
    description:
      "Plan a Cary home remodel with Versatile Edge, a licensed NC general contractor for kitchens, bathrooms, porches, decks, additions, and renovations.",
    h1: "Home Remodeling in Cary, North Carolina",
    eyebrow: "Cary residential remodeling",
    heroImage: "/images/service-areas/cary-nc-landmark.webp",
    heroAlt: "Brick facade and arched entrance of the Cary Arts Center",
    heroCredit: {
      label: "Cary Arts Center photograph by Pithon314",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cary_Arts_Center.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    },
    heroLead:
      "Careful planning, coordinated construction, and remodeling work shaped around how Cary households use their homes.",
    introduction:
      "A Cary renovation may begin with a kitchen that no longer supports a busy household, a bathroom that needs safer movement, or an outdoor space that does not connect well to the home. The best answer comes from the property, the existing construction, and the way the family wants to live—not from a one-size-fits-all scope.",
    localContext: {
      heading: "Versatile Edge. Remodeling Cary Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Cary includes established neighborhoods, newer planned communities, and homes that have already changed through earlier additions or finish updates. Before construction, we look at circulation, structure, utilities, exterior transitions, and the site conditions that can shape a practical scope.",
        "Town review is tied to the work and the address. Additions, alterations, decks, and trade work can follow different permit paths, while setbacks, easements, and neighborhood requirements may influence what is feasible. We coordinate the construction plan while confirming the applicable requirements for the specific property.",
      ],
    },
    serviceIntroduction:
      "Kitchens, bathrooms, and outdoor living are common starting points in Cary. Four supporting services can be coordinated with them when the home needs a broader solution.",
    serviceDescriptions: {
      "whole-home-renovations": "Connect several Cary rooms, systems, and finish decisions under one organized construction plan.",
      "interior-remodeling": "Improve circulation, storage, and daily function in living spaces that no longer fit the household.",
      "kitchen-renovations": "Rework the kitchen around useful storage, durable surfaces, layered lighting, and comfortable movement.",
      "bathroom-renovations": "Coordinate waterproofing, ventilation, tile, fixtures, storage, and clearances for everyday comfort.",
      "porches-and-decks": "Create a deck, screened porch, or covered outdoor room that connects naturally to the house and yard.",
      "home-additions": "Expand living space with attention to structure, rooflines, systems, zoning, and exterior continuity.",
      "window-replacement": "Replace aging windows with careful fit, flashing, trim, insulation, and water-management details.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Cary kitchens",
        heading: "A kitchen organized around real weekday routines.",
        paragraphs: [
          "Cary households often ask a kitchen to handle meal preparation, homework, entertaining, and the steady movement between garage, pantry, dining, and living areas. We study those paths before changing an island, opening a wall, or assigning cabinetry.",
          "The finished plan coordinates storage, appliances, lighting, ventilation, plumbing, electrical work, surfaces, and flooring so the room functions as one system. Where the kitchen connects to adjacent rooms, the finish plan carries that relationship beyond a single doorway.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a completed whole-house and kitchen transformation",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Cary bathrooms",
        heading: "Comfort and durability beneath every finish.",
        paragraphs: [
          "A bathroom renovation can improve storage, lighting, ventilation, shower access, or the balance between a tub and a walk-in shower. We work through those choices with the room’s actual footprint and plumbing conditions in view.",
          "Waterproofing, substrate preparation, ventilation, fixture clearances, tile layout, and clean trade coordination matter as much as the visible materials. The goal is a room that feels calm because the technical details have been resolved.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "Review a completed bathroom renovation",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Cary porches and decks",
        heading: "An outdoor room that belongs to the home.",
        paragraphs: [
          "A screened porch or deck should make the transition from interior living to the yard feel natural. That means considering door locations, rooflines, shade, drainage, stairs, views, and how people will move through the space.",
          "We also review structural attachment, weather exposure, material maintenance, setbacks, easements, and applicable permits before finalizing the footprint. Those decisions help the new work look intentional and perform through North Carolina seasons.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed sunroom and deck",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Match the Cary project to the property before final design.",
    planningIntroduction:
      "Town guidance provides a starting point. The address, approved scope, site plan, and any applicable private requirements determine the actual path.",
    planning: [
      {
        title: "Alterations and additions follow the scope",
        text: "Cary groups residential additions, alterations, decks, and trade permits within its development resources. The required plans and reviews depend on what is changing.",
        href: "https://www.carync.gov/business-development/developing-in-cary",
        linkLabel: "Review Cary development guidance",
      },
      {
        title: "The site plan matters outdoors",
        text: "Property lines, setbacks, easements, drainage, and the connection to the existing house should be reviewed before fixing a deck, porch, or addition footprint.",
      },
      {
        title: "Plan for the way the home must age",
        text: "Cary's Healthy Homes program reflects the community's focus on repairs, accessibility, and aging in place. Those same long-term needs can inform a private remodeling scope.",
        href: "https://housing.carync.gov/healthy-homes-cary/",
        linkLabel: "See Cary Healthy Homes information",
      },
    ],
    projectSlugs: ["hutter-whole-house-remodel-addition", "johnson-bathroom", "walsh-sunroom-deck"],
    projectHeading: "Project examples for planning a Cary remodel.",
    projectIntroduction:
      "These completed Versatile Edge projects illustrate relevant kitchen, bathroom, addition, and outdoor-living work across the service area. They are examples of capability and are not presented as Cary properties.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Does a remodeling project in Cary require a permit?", "Many additions, alterations, decks, and plumbing, electrical, or mechanical changes require permits. The exact applications and inspections depend on the address and scope, so requirements should be confirmed before construction."],
      ["What should be reviewed before planning a Cary deck or screened porch?", "Review the survey, property lines, setbacks, easements, drainage, structural connection, stairs, roof conditions, and any applicable neighborhood requirements before committing to a footprint."],
      ["Can Versatile Edge coordinate a kitchen and adjacent-room remodel together?", "Yes. When rooms share circulation, finishes, structure, or utilities, one coordinated scope can reduce conflicts and create a more cohesive result."],
      ["Can a Cary bathroom remodel support aging in place?", "Yes. Depending on the room, planning can consider shower access, clear floor space, lighting, blocking, slip-conscious surfaces, storage, and fixtures that are easier to use."],
      ["Are the featured projects located in Cary?", "No. The featured Hutter, Johnson, and Walsh projects are relevant examples from the wider Versatile Edge service area and are not represented as Cary properties."],
      ["How do I start a Cary remodeling conversation?", "Share the Cary property address, the rooms or exterior areas involved, the problems you want to solve, desired timing, and a realistic investment range through the consultation form."],
    ],
  },
  {
    slug: "wake-forest-nc",
    city: "Wake Forest",
    state: "North Carolina",
    title: "Wake Forest Home Remodeling | Versatile Edge LLC",
    description:
      "Explore Wake Forest home remodeling with Versatile Edge for kitchens, bathrooms, porches, decks, additions, and coordinated residential renovations.",
    h1: "Home Remodeling in Wake Forest, North Carolina",
    eyebrow: "Wake Forest residential remodeling",
    heroImage: "/images/service-areas/wake-forest-nc-landmark.webp",
    heroAlt: "Historic Wait Hall on the former Wake Forest College campus in Wake Forest",
    heroLead:
      "Residential remodeling planned for the home, the lot, and the everyday rhythms of life in Wake Forest.",
    introduction:
      "Wake Forest homes range from historic properties near the original college campus to established subdivisions and newer neighborhoods. A useful renovation plan respects those differences while focusing on the homeowner’s actual priorities: better function, more comfortable rooms, durable details, and a scope that can be built responsibly.",
    localContext: {
      heading: "Versatile Edge. Remodeling Wake Forest Homes to Your Style & the Way You Live.",
      paragraphs: [
        "The first planning questions change with the project. An interior kitchen or bath may center on structure and utilities, while a porch, deck, or addition also depends on a site plan, setbacks, easements, exterior connections, and permit documentation.",
        "Wake Forest publishes project-specific resources for residential renovations and outdoor structures. We use those public requirements as a starting point, then confirm the path for the address and approved scope before construction begins.",
      ],
    },
    serviceIntroduction:
      "The three priority services below address common Wake Forest remodeling goals. Broader renovation, interior, addition, and window work can be coordinated when the project crosses those boundaries.",
    serviceDescriptions: {
      "whole-home-renovations": "Coordinate multiple rooms, systems, schedules, and selections through one Wake Forest renovation plan.",
      "interior-remodeling": "Rework underused or disconnected rooms to improve movement, storage, and everyday comfort.",
      "kitchen-renovations": "Build a kitchen plan around storage, work zones, lighting, appliances, and connections to nearby rooms.",
      "bathroom-renovations": "Resolve layout, waterproofing, ventilation, tile, fixtures, and lighting as one durable bathroom system.",
      "porches-and-decks": "Plan decks, screened porches, and covered spaces around structure, drainage, setbacks, and outdoor use.",
      "home-additions": "Add living space with coordinated structure, rooflines, systems, circulation, and site review.",
      "window-replacement": "Improve comfort and operation with installation details focused on fit, flashing, trim, and water management.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Wake Forest kitchens",
        heading: "Bring cooking, storage, and gathering into better balance.",
        paragraphs: [
          "A kitchen can look dated and still have a deeper problem: pinched circulation, scattered storage, poor task lighting, or an island that interrupts rather than supports the room. We begin with the way the household moves between food storage, preparation, cooking, cleanup, and adjacent living spaces.",
          "Cabinetry, appliances, surfaces, ventilation, plumbing, electrical work, flooring, and lighting are then coordinated around that flow. The design decisions and the construction sequence stay connected from the first layout discussion through final details.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See coordinated kitchen and whole-home work",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Wake Forest bathrooms",
        heading: "A proven local bathroom project, backed by careful construction.",
        paragraphs: [
          "The completed Johnson bathroom in Wake Forest combines a frameless walk-in shower, herringbone feature wall, soaking tub, custom vanity storage, and coordinated gray-green tile. It shows how strong visual choices depend on precise planning behind the finishes.",
          "For each bathroom, we evaluate the footprint, plumbing, ventilation, waterproofing, lighting, storage, fixture clearances, and tile transitions. That technical foundation supports a room that feels composed and works comfortably every day.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "View the Johnson bathroom in Wake Forest",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Wake Forest porches and decks",
        heading: "Set the outdoor footprint only after the site is understood.",
        paragraphs: [
          "Wake Forest guidance for decks and porches calls for attention to the site plan, property lines, setbacks, easements, structural drawings, and the connection between the new work and the house. Those are design inputs, not paperwork to postpone.",
          "We plan framing, roof and wall transitions, flashing, drainage, stairs, guards, screens, materials, and maintenance expectations together. The result should support outdoor life while looking and performing like a considered part of the home.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed sunroom and deck",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Wake Forest review begins with scope and site.",
    planningIntroduction:
      "Municipal guidance can clarify the expected documents, but final requirements remain specific to the property and proposed work.",
    planning: [
      {
        title: "Residential review can begin early",
        text: "Wake Forest offers an Express Residential Plan Review meeting for additions, renovations, decks, covered porches, and sunrooms so applicants can discuss zoning and code questions.",
        href: "https://www.wakeforestnc.gov/inspections/express-residential-plan-review",
        linkLabel: "Review the Town program",
      },
      {
        title: "Deck and porch plans need site information",
        text: "Town guidance identifies property lines, setbacks, easements, structural drawings, flashing, and water-management details among the planning considerations.",
        href: "https://www.wakeforestnc.gov/inspections/decks-porches",
        linkLabel: "Read deck and porch guidance",
      },
      {
        title: "Historic context may affect exterior choices",
        text: "When a property is subject to historic review, additions and outdoor structures should be planned with the building's character and the applicable review sequence in mind.",
        href: "https://www.wakeforestnc.gov/planning/historic-preservation",
        linkLabel: "See Wake Forest preservation resources",
      },
    ],
    projectSlugs: ["johnson-bathroom", "hutter-whole-house-remodel-addition", "walsh-sunroom-deck"],
    projectHeading: "Local bathroom proof, plus relevant renovation examples.",
    projectIntroduction:
      "The Johnson bathroom is a verified completed project in Wake Forest. The Hutter and Walsh records demonstrate related whole-home, kitchen, addition, and outdoor-living capabilities elsewhere in the service area.",
    locallyVerifiedProjectSlugs: ["johnson-bathroom"],
    faq: [
      ["Which featured Versatile Edge project is in Wake Forest?", "The completed Johnson bathroom renovation is in Wake Forest. The Hutter and Walsh projects shown on this page are clearly presented as service-area examples, not Wake Forest properties."],
      ["Does Wake Forest require permits for decks and covered porches?", "These structures generally require permits and project documentation. The Town's guidance identifies site-plan and structural information, but the exact requirements should be confirmed for the address and scope."],
      ["Can I discuss a renovation concept with Wake Forest before submitting plans?", "The Town publishes an Express Residential Plan Review option for certain additions, renovations, decks, covered porches, and sunrooms. Availability and applicability should be confirmed directly with the Town."],
      ["What should a Wake Forest kitchen consultation cover?", "Discuss circulation, storage, appliances, lighting, ventilation, utilities, adjacent rooms, desired finishes, timing, and an investment range, along with any known structural or prior-renovation conditions."],
      ["Can historic status affect a Wake Forest exterior remodel?", "It can when the property is subject to applicable historic review. Older age alone is not enough to assume a requirement, so the property's status and proposed exterior work should be confirmed."],
      ["How do I request a Wake Forest remodeling consultation?", "Send the property address, the spaces involved, what is not working today, your timing goals, and a realistic investment range through the inquiry form."],
    ],
  },
  {
    slug: "apex-nc",
    city: "Apex",
    state: "North Carolina",
    title: "Apex Home Remodeling & Renovations | Versatile Edge LLC",
    description:
      "Plan an Apex home renovation with Versatile Edge for kitchens, bathrooms, decks, porches, additions, and coordinated whole-home remodeling.",
    h1: "Home Remodeling in Apex, North Carolina",
    eyebrow: "Apex residential remodeling",
    heroImage: "/images/service-areas/apex-nc-landmark.webp",
    heroAlt: "Historic 1912 Apex Town Hall with brick facade and white columns",
    heroLead:
      "Remodeling and additions coordinated around Apex homes, property conditions, and the way each household wants to live.",
    introduction:
      "Apex remodeling projects often need to solve more than one problem at once: a kitchen that pinches circulation, a bathroom that wastes its footprint, or an outdoor area that feels disconnected from the interior. We shape the scope around those real conditions while accounting for the structure, utilities, site, and approvals that make the work buildable.",
    localContext: {
      heading: "Versatile Edge. Remodeling Apex Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Apex includes historic fabric, established neighborhoods, and rapidly built newer communities, so the same project idea can require a different response from one address to another. We begin with the existing house and lot, then coordinate design decisions with construction realities.",
        "The Town publishes separate residential checklists and plot-plan guidance for work such as additions, decks, and screened porches. Early attention to setbacks, easements, utilities, grading, and structural connections helps prevent a polished concept from overlooking a property constraint.",
      ],
    },
    serviceIntroduction:
      "Apex kitchens, bathrooms, and porches or decks receive focused planning below. Whole-home, interior, addition, and window work can support those projects when the solution reaches further.",
    serviceDescriptions: {
      "whole-home-renovations": "Unify multiple Apex rooms, systems, selections, and construction phases under one accountable plan.",
      "interior-remodeling": "Improve the flow and usefulness of living, work, storage, and connecting spaces.",
      "kitchen-renovations": "Coordinate layout, cabinetry, appliances, utilities, light, and durable materials around daily use.",
      "bathroom-renovations": "Plan moisture control, ventilation, tile, storage, fixtures, lighting, and comfortable clearances together.",
      "porches-and-decks": "Build outdoor space around site conditions, structure, weather exposure, access, and code requirements.",
      "home-additions": "Create new living area with careful site, structural, systems, roof, and finish coordination.",
      "window-replacement": "Address window fit, water management, insulation, operation, and interior and exterior trim details.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Apex kitchens",
        heading: "Make the center of the home easier to move through.",
        paragraphs: [
          "The strongest kitchen plan starts with movement: where groceries enter, how the refrigerator and pantry relate, where preparation happens, and whether seating blocks a working path. We test those relationships before assigning finishes.",
          "Cabinetry, surfaces, appliances, ventilation, plumbing, electrical work, flooring, and layered lighting are coordinated as one scope. When walls or adjacent rooms are involved, structural review and finish continuity become part of the same conversation.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "Review a completed kitchen and whole-home remodel",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Apex bathrooms",
        heading: "Use the footprint well and build for moisture from the start.",
        paragraphs: [
          "Apex bathroom goals may include a larger shower, better storage, a calmer material palette, improved lighting, or easier movement. We balance those priorities against plumbing locations, ventilation, clearances, and the room's actual dimensions.",
          "The construction plan follows through on waterproofing, substrate preparation, tile layout, fixtures, glass, trim, and ventilation. That coordination protects the design intent where it matters most: behind the finished surfaces.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "See detailed bathroom workmanship",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Apex porches and decks",
        heading: "Local proof of indoor-outdoor living done as one project.",
        paragraphs: [
          "The completed Walsh project in Apex pairs a light-filled sunroom addition with a low-maintenance deck, broad landscape views, generous stairs, and cable railings. It demonstrates how an indoor addition and outdoor platform can support each other without becoming disconnected scopes.",
          "For new projects, we study the plot plan, setbacks, easements, roof and wall transitions, grading, drainage, structural support, stairs, guards, screens, and material exposure before finalizing the design.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "View the Walsh sunroom and deck in Apex",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Use Apex plot and permit information as design inputs.",
    planningIntroduction:
      "The Town's published materials help define the starting documents. The property and final scope determine the complete review path.",
    planning: [
      {
        title: "Permit needs follow the work",
        text: "Apex publishes a homeowner guide explaining when permits are needed. Structural, trade, addition, and outdoor work should be checked against the current Town requirements.",
        href: "https://apexnc.org/DocumentCenter/View/42996/When-is-a-permit-needed",
        linkLabel: "Read the Apex permit guide",
      },
      {
        title: "Plot plans reveal constraints early",
        text: "A plot plan can identify the lot, existing improvements, proposed work, setbacks, easements, and other site information relevant to a deck, porch, or addition.",
        href: "https://apexnc.org/DocumentCenter/View/36444/Applicants-Guide-to-Plot-Plans",
        linkLabel: "Review Apex plot-plan guidance",
      },
      {
        title: "Use the checklist for the project type",
        text: "Apex maintains residential checklists for additions, decks, and screen porches. Current forms should be matched to the approved project rather than treated as interchangeable.",
        href: "https://apexnc.org/188/FormsApplications",
        linkLabel: "Find Apex forms and checklists",
      },
    ],
    projectSlugs: ["walsh-sunroom-deck", "hutter-whole-house-remodel-addition", "johnson-bathroom"],
    projectHeading: "An Apex sunroom and deck, with complementary remodeling work.",
    projectIntroduction:
      "The Walsh sunroom and deck is a verified completed project in Apex. The Hutter and Johnson projects are relevant examples elsewhere in the Versatile Edge service area and are labeled accordingly.",
    locallyVerifiedProjectSlugs: ["walsh-sunroom-deck"],
    faq: [
      ["Which featured Versatile Edge project is in Apex?", "The completed Walsh sunroom addition and deck is in Apex. Other projects shown are identified as broader service-area examples and are not represented as Apex properties."],
      ["Do Apex decks and screened porches require a plot plan?", "Apex publishes plot-plan guidance and project-specific checklists for outdoor structures. The exact submittal should be confirmed for the address, scope, and current Town requirements."],
      ["Can a sunroom and deck be planned as one Apex project?", "Yes. Planning them together can coordinate structure, levels, doors, views, roof and wall transitions, drainage, stairs, materials, and the construction sequence."],
      ["What should be decided before an Apex kitchen renovation proposal?", "Identify the problems to solve, preferred layout changes, storage and appliance needs, connections to nearby rooms, material priorities, timing, and a realistic investment range."],
      ["Can Versatile Edge coordinate permit and inspection steps?", "Versatile Edge coordinates applicable permit and inspection steps for the approved construction scope, while requirements are confirmed with the authority responsible for the specific property."],
      ["How do I start an Apex remodeling project?", "Send the property address and a clear description of the rooms or exterior areas involved, your goals, desired timing, and investment range through the consultation form."],
    ],
  },
  {
    slug: "morrisville-nc",
    city: "Morrisville",
    state: "North Carolina",
    title: "Morrisville Home Remodeling | Versatile Edge LLC",
    description:
      "Plan a Morrisville home remodel with Versatile Edge for kitchens, bathrooms, porches, decks, additions, windows, and coordinated renovations.",
    h1: "Home Remodeling in Morrisville, North Carolina",
    eyebrow: "Morrisville residential remodeling",
    heroImage: "/images/service-areas/morrisville-nc-landmark.webp",
    heroAlt: "White Gothic Revival facade of the historic Morrisville Christian Church",
    heroCredit: {
      label: "Morrisville Christian Church photograph by sw23",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Morrisville_Christian_Church_2013-09-21_18-01-52.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    heroLead:
      "Residential renovations coordinated for Morrisville homes where thoughtful use of space matters as much as the finished materials.",
    introduction:
      "Morrisville homeowners often need existing space to work harder. A kitchen may need more purposeful storage, a bathroom may need a better shower and clearer movement, or a deck may need to create a genuine extension of the living area without overwhelming the lot.",
    localContext: {
      heading: "Versatile Edge. Remodeling Morrisville Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Morrisville's growth sits alongside historic community landmarks and established residential areas. That mix is a reminder that every remodeling plan begins with a particular building, not just a city name. We review the existing structure, utilities, circulation, exterior conditions, and site before defining the construction path.",
        "Town guidance identifies room additions, decks, roofs over decks or porches, finished spaces, and systems work among projects that may need permits. We confirm current requirements for the address and scope rather than assuming that one residential checklist fits every project.",
      ],
    },
    serviceIntroduction:
      "Morrisville kitchen, bathroom, and outdoor-living projects are developed in detail below, with four related services available when the home needs a wider response.",
    serviceDescriptions: {
      "whole-home-renovations": "Coordinate connected rooms and systems so a Morrisville renovation feels deliberate from one space to the next.",
      "interior-remodeling": "Use existing square footage more effectively through layout, storage, lighting, and finish improvements.",
      "kitchen-renovations": "Balance work zones, seating, storage, appliances, lighting, and circulation within the available footprint.",
      "bathroom-renovations": "Bring waterproofing, ventilation, tile, plumbing, lighting, storage, and clearances into one plan.",
      "porches-and-decks": "Connect the house and yard through durable structure, practical access, and weather-aware materials.",
      "home-additions": "Expand the home with coordinated site review, structure, systems, rooflines, and transitions.",
      "window-replacement": "Improve comfort with correctly fitted windows and careful flashing, insulation, trim, and water management.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Morrisville kitchens",
        heading: "Get more function from the kitchen's existing footprint.",
        paragraphs: [
          "In a compact or open-plan kitchen, every clearance and storage decision has consequences. We map the working triangle, pantry and refrigerator access, seating, cleanup, and the route to adjacent rooms before deciding whether the answer is new cabinetry, a changed layout, or a broader interior scope.",
          "Appliances, ventilation, electrical capacity, plumbing, lighting, flooring, surfaces, and finish transitions are coordinated with the cabinetry plan. That keeps visual choices tied to the way the room must perform.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a kitchen planned within a larger renovation",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Morrisville bathrooms",
        heading: "Make a smaller room feel resolved, not crowded.",
        paragraphs: [
          "A bathroom can gain comfort through better fixture placement, storage, lighting, shower access, or a clearer visual hierarchy without necessarily becoming larger. We test those options against actual dimensions and plumbing conditions.",
          "Waterproofing, substrate preparation, ventilation, tile layout, niches, glass, fixtures, and trim are built into the scope from the start. The finished room should feel simple because the layers beneath it were carefully coordinated.",
        ],
        projectSlug: "brown-bathroom",
        projectLabel: "Review a carefully planned compact bathroom",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Morrisville porches and decks",
        heading: "Create useful outdoor space without losing sight of the lot.",
        paragraphs: [
          "The right outdoor footprint depends on doors, grade, views, sunlight, privacy, stairs, drainage, and the way the structure meets the house. On a constrained lot, those relationships deserve attention before choosing decking or railing.",
          "We coordinate framing, roof or wall connections, flashing, guards, screens, materials, setbacks, easements, and permit documents around the approved design. The goal is a durable outdoor room that feels proportionate to the home.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore connected indoor and outdoor living",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Confirm Morrisville jurisdiction and project requirements early.",
    planningIntroduction:
      "The Town's residential information is a useful starting point, while the property address and final scope control the actual permit and inspection path.",
    planning: [
      {
        title: "Common residential projects may need permits",
        text: "Morrisville lists room additions, decks, roofs over decks or porches, finished spaces, and systems work among projects that may require permits and inspections.",
        href: "https://www.morrisvillenc.gov/Our-Community/Residents/Residential-Inspections",
        linkLabel: "Review residential inspection guidance",
      },
      {
        title: "Confirm the reviewing authority",
        text: "A Morrisville mailing address does not by itself establish every zoning or permitting detail. The project address should be checked before relying on a particular process.",
      },
      {
        title: "Historic resources deserve accurate treatment",
        text: "Morrisville documents surviving historic structures, including the Historic Christian Church. Property-specific status should be confirmed before drawing conclusions about review requirements.",
        href: "https://www.morrisvillenc.gov/Our-Community/Town-History/Historic-Preservation",
        linkLabel: "Explore Town preservation information",
      },
    ],
    projectSlugs: ["brown-bathroom", "hutter-whole-house-remodel-addition", "walsh-sunroom-deck"],
    projectHeading: "Relevant work from across the Versatile Edge service area.",
    projectIntroduction:
      "These bathroom, kitchen, whole-home, addition, and outdoor-living projects demonstrate applicable capabilities. None is presented as a verified Morrisville property.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Does Morrisville require permits for room additions and decks?", "The Town identifies room additions, decks, roofs over decks or porches, and related work among projects that may need permits. Requirements should be confirmed for the address and approved scope."],
      ["Why should jurisdiction be confirmed for a Morrisville project?", "Mailing addresses and municipal review boundaries do not always communicate the same information. Confirming the authority responsible for the property avoids relying on the wrong forms or requirements."],
      ["Can Versatile Edge improve a kitchen without adding square footage?", "Often, yes. Better cabinetry, appliance placement, lighting, storage, openings, and circulation can improve an existing footprint, depending on structural and utility conditions."],
      ["What should be considered for a Morrisville deck on a smaller lot?", "Consider setbacks, easements, drainage, grade, privacy, stairs, door locations, structural connections, and the proportion of the outdoor structure to the home and yard."],
      ["Are the featured projects located in Morrisville?", "No. They are clearly identified as relevant Versatile Edge projects from the wider service area and are not claimed as Morrisville properties."],
      ["How can I request a Morrisville remodeling consultation?", "Provide the property address, the rooms or exterior work involved, your goals, desired timing, and an investment range through the contact form."],
    ],
  },
  {
    slug: "fuquay-varina-nc",
    city: "Fuquay-Varina",
    state: "North Carolina",
    title: "Fuquay-Varina Home Remodeling | Versatile Edge LLC",
    description:
      "Explore Fuquay-Varina home remodeling with Versatile Edge for kitchens, bathrooms, porches, decks, additions, and coordinated residential renovations.",
    h1: "Home Remodeling in Fuquay-Varina, North Carolina",
    eyebrow: "Fuquay-Varina residential remodeling",
    heroImage: "/images/service-areas/fuquay-varina-nc-landmark.webp",
    heroAlt: "Historic brick storefronts along downtown Fuquay-Varina",
    heroCredit: {
      label: "Historic Downtown Fuquay-Varina photograph by Alexisrael",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fuquay_Varina_Downtown.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    heroLead:
      "Practical remodeling plans for Fuquay-Varina homes, coordinated from existing conditions through construction and final details.",
    introduction:
      "Fuquay-Varina's growth includes older in-town properties, established neighborhoods, and newer homes whose layouts may still miss the way a household wants to cook, gather, bathe, or spend time outdoors. Remodeling begins by identifying that mismatch and then testing the solution against the actual house and lot.",
    localContext: {
      heading: "Versatile Edge. Remodeling Fuquay-Varina Homes to Your Style & the Way You Live.",
      paragraphs: [
        "A kitchen or bath can be highly focused, while a porch, deck, or addition quickly brings the site into the conversation. Structure, utilities, grading, setbacks, easements, access, and the relationship between old and new construction all influence what belongs in the scope.",
        "Fuquay-Varina's Inspections Department enforces applicable North Carolina codes and publishes residential compliance resources. We coordinate the approved construction work while confirming current permit and inspection expectations for the address.",
      ],
    },
    serviceIntroduction:
      "Kitchens, bathrooms, and porches or decks receive the fullest treatment here. Whole-home, interior, addition, and window services remain available when the project needs a coordinated extension.",
    serviceDescriptions: {
      "whole-home-renovations": "Bring several Fuquay-Varina rooms, systems, and selections together under one construction plan.",
      "interior-remodeling": "Improve the flow, usefulness, and finish continuity of existing living spaces.",
      "kitchen-renovations": "Coordinate cabinetry, storage, work zones, appliances, utilities, light, and gathering space.",
      "bathroom-renovations": "Build comfort on careful layout, waterproofing, ventilation, tile, fixtures, and storage.",
      "porches-and-decks": "Create outdoor living space that responds to the home, lot, climate, and permit requirements.",
      "home-additions": "Expand with deliberate structure, rooflines, systems, circulation, and exterior transitions.",
      "window-replacement": "Replace windows with attention to fit, flashing, water management, insulation, and trim.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Fuquay-Varina kitchens",
        heading: "Plan for everyday meals and the people gathered around them.",
        paragraphs: [
          "A useful kitchen balances working clearances with the social role of the room. We look at food storage, preparation, cooking, cleanup, seating, pantry access, and the path to dining or outdoor spaces before establishing the layout.",
          "Cabinetry, appliances, ventilation, plumbing, electrical work, surfaces, flooring, and lighting are coordinated around that plan. If walls or adjoining rooms need to change, the structural and finish implications are addressed within the same scope.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a kitchen designed for daily gathering",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Fuquay-Varina bathrooms",
        heading: "Resolve the hidden details before the tile goes in.",
        paragraphs: [
          "Bathroom goals may be visual, functional, or both: a better shower, easier movement, more storage, warmer lighting, or fixtures that suit the household. We test each priority against the room's footprint, plumbing, ventilation, and clearances.",
          "Waterproofing, backer materials, tile layout, niches, glass, fixtures, lighting, and trim stay coordinated through construction. A clean finished room depends on that disciplined sequence behind the surface.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "Review a detailed bathroom renovation",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Fuquay-Varina porches and decks",
        heading: "Design outdoor living for sun, storms, and daily use.",
        paragraphs: [
          "North Carolina outdoor spaces need to manage heat, rain, drainage, and changing exposure while providing a comfortable connection to the home. Door locations, shade, rooflines, grade, stairs, views, and privacy help determine whether a deck, covered porch, or screened room is the right answer.",
          "The construction plan coordinates framing, attachment, flashing, guards, screens, materials, setbacks, easements, and inspections. For properties with well or septic conditions, site review may also involve Wake County requirements.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed sunroom and deck",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Build the Fuquay-Varina plan on current property information.",
    planningIntroduction:
      "Permit and inspection details follow the project and location. Public resources guide the first review, not the final conclusion for every home.",
    planning: [
      {
        title: "Town inspections follow North Carolina codes",
        text: "Fuquay-Varina's Inspections Department issues permits and conducts inspections under applicable state codes, including residential accessory structures such as decks.",
        href: "https://www.fuquay-varina.org/229/Inspections-Department",
        linkLabel: "Visit the Inspections Department",
      },
      {
        title: "Residential compliance resources change with scope",
        text: "The Town publishes residential code-compliance information for homeowners and applicants. The current material should be matched to the work being proposed.",
        href: "https://www.fuquay-varina.org/1289/Residential-Code-Compliance-Information",
        linkLabel: "Review residential compliance information",
      },
      {
        title: "Site conditions can cross agencies",
        text: "Plot plans, easements, setbacks, and property utilities matter for additions and outdoor structures. Well or septic properties may require coordination beyond the Town review.",
        href: "https://www.fuquay-varina.org/1410/Single-Family-Residence-Permit-Requireme",
        linkLabel: "See residential permit requirements",
      },
    ],
    projectSlugs: ["hutter-whole-house-remodel-addition", "johnson-bathroom", "walsh-sunroom-deck"],
    projectHeading: "Construction examples relevant to Fuquay-Varina homes.",
    projectIntroduction:
      "These Versatile Edge projects show kitchen, bathroom, addition, and outdoor-living capabilities across the service area. They are not represented as Fuquay-Varina properties.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Do decks require permits in Fuquay-Varina?", "The Town's inspections information includes decks among residential accessory structures subject to permitting and inspection. The exact plans and approvals should be confirmed for the property and scope."],
      ["What site information matters before a Fuquay-Varina addition?", "Review the survey or plot plan, setbacks, easements, grading, drainage, access, utilities, existing structure, proposed footprint, and any well or septic conditions before final design."],
      ["Can Versatile Edge remodel a kitchen and nearby living area together?", "Yes. Coordinating connected rooms can address circulation, structure, lighting, flooring, finishes, and construction sequencing more coherently than isolated scopes."],
      ["What makes a bathroom renovation moisture-conscious?", "It requires coordinated waterproofing, appropriate substrates, ventilation, plumbing, tile transitions, penetrations, and installation details—not just water-resistant finish selections."],
      ["Are the projects shown on this page in Fuquay-Varina?", "No. They are relevant project examples from the broader Versatile Edge service area and are not presented as Fuquay-Varina properties."],
      ["How do I begin a Fuquay-Varina remodeling consultation?", "Share the property address, what you want to change, known site or utility conditions, timing goals, and a realistic investment range through the consultation form."],
    ],
  },
  {
    slug: "holly-springs-nc",
    city: "Holly Springs",
    state: "North Carolina",
    title: "Holly Springs Home Remodeling | Versatile Edge LLC",
    description:
      "Plan a Holly Springs home remodel with Versatile Edge for kitchens, bathrooms, porches, decks, additions, windows, and coordinated renovations.",
    h1: "Home Remodeling in Holly Springs, North Carolina",
    eyebrow: "Holly Springs residential remodeling",
    heroImage: "/images/service-areas/holly-springs-nc-landmark.webp",
    heroAlt: "Historic Holly Springs Masonic Lodge with white porch and brick chimneys",
    heroCredit: {
      label: "Holly Springs Masonic Lodge photograph by Jon Harrison",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Masonic_Lodge,_Holly_Springs,_NC.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    heroLead:
      "Thoughtful remodeling for Holly Springs homes, with scope, site conditions, and construction details coordinated from the beginning.",
    introduction:
      "A Holly Springs home may be relatively new and still need a kitchen that supports the family better, a bathroom with more useful storage, or an outdoor room that makes the backyard part of daily life. Remodeling is less about the age of the house than the gap between the existing space and the way the household wants to use it.",
    localContext: {
      heading: "Versatile Edge. Remodeling Holly Springs Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Interior work begins with layout, structure, utilities, and finish coordination. Decks, screened porches, and additions add plot plans, setbacks, easements, grading, drainage, rooflines, and exterior attachment to the planning picture.",
        "Holly Springs publishes homeowner and permit guidance for residential alterations, including decks, screen porches, and additions. We treat those current requirements as part of the project definition and confirm which authority applies to the address before construction.",
      ],
    },
    serviceIntroduction:
      "Detailed kitchen, bathroom, and porch or deck planning anchors this Holly Springs page. Four connected services support projects that extend across the home.",
    serviceDescriptions: {
      "whole-home-renovations": "Coordinate multiple Holly Springs rooms, systems, selections, and schedules through one cohesive plan.",
      "interior-remodeling": "Improve underused rooms, storage, circulation, lighting, and finish continuity.",
      "kitchen-renovations": "Plan work zones, cabinetry, seating, appliances, utilities, surfaces, and light around the household.",
      "bathroom-renovations": "Resolve layout, waterproofing, ventilation, tile, storage, fixtures, and lighting together.",
      "porches-and-decks": "Create an outdoor room that responds to the home, lot, weather, access, and maintenance priorities.",
      "home-additions": "Add living space with coordinated site review, structure, systems, rooflines, and finishes.",
      "window-replacement": "Improve operation and comfort with careful fit, flashing, insulation, water management, and trim.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Holly Springs kitchens",
        heading: "Turn a builder-era layout into a kitchen fitted to the household.",
        paragraphs: [
          "Even a newer kitchen can have shallow storage, a poorly scaled island, weak task lighting, or traffic that cuts through the work zone. We start with the family's routines and the relationship between pantry, appliances, seating, dining, and outdoor access.",
          "The construction scope coordinates cabinetry, surfaces, appliances, ventilation, plumbing, electrical work, flooring, lighting, and any structural changes. That integrated plan keeps the room's appearance and performance moving in the same direction.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a kitchen built for gathering and daily work",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Holly Springs bathrooms",
        heading: "Use layout and detail to make the daily routine easier.",
        paragraphs: [
          "A bathroom renovation can improve shower access, storage, lighting, ventilation, fixture placement, or simply the feeling of the room. We compare those goals with the available footprint and the cost and consequence of moving plumbing.",
          "Waterproofing, backer materials, niches, tile layout, glass, fixtures, ventilation, and trim are coordinated before the final surfaces arrive. The result is designed to feel intentional and built to handle daily moisture.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "Review a completed bathroom transformation",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Holly Springs porches and decks",
        heading: "Make the backyard easier to use through more of the year.",
        paragraphs: [
          "A deck can create an open gathering platform; a screened or covered porch can add shade and protection. Choosing between them depends on the house, sun, grade, door locations, views, privacy, roof conditions, and how the family expects to use the space.",
          "Holly Springs calls for building plans and a plot plan for relevant outdoor alterations. We coordinate those documents with framing, attachment, flashing, drainage, stairs, guards, screens, materials, and the final construction sequence.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore completed indoor-outdoor living",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Holly Springs alterations start with plans and property lines.",
    planningIntroduction:
      "Town resources establish useful expectations. Current requirements, municipal jurisdiction, and the property itself still need to be confirmed for the approved project.",
    planning: [
      {
        title: "Outdoor alterations need project documents",
        text: "Holly Springs guidance for decks, screen porches, alterations, and additions identifies building plans and a plot plan, with setbacks and property lines among the site considerations.",
        href: "https://www.hollyspringsnc.gov/2180/Other-Alterations",
        linkLabel: "Review alteration guidance",
      },
      {
        title: "Use the current permit path",
        text: "Town permit resources should be checked when the scope is established so residential building and trade requirements are coordinated with the work.",
        href: "https://www.hollyspringsnc.gov/1064/Permits",
        linkLabel: "Find Holly Springs permit information",
      },
      {
        title: "Jurisdiction can be address-specific",
        text: "Properties near municipal boundaries may involve extraterritorial-jurisdiction questions. Confirm the reviewing authority before relying on Town zoning or permit assumptions.",
        href: "https://www.hollyspringsnc.gov/1264/Extraterritorial-Jurisdiction-Informatio",
        linkLabel: "Read the Town's ETJ information",
      },
    ],
    projectSlugs: ["walsh-sunroom-deck", "johnson-bathroom", "hutter-whole-house-remodel-addition"],
    projectHeading: "Outdoor, bathroom, and kitchen work to inform the conversation.",
    projectIntroduction:
      "These completed Versatile Edge projects show relevant capabilities across the service area. They are presented as examples and not claimed as Holly Springs properties.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Do Holly Springs decks and screened porches require plans?", "Town guidance for relevant alterations identifies building plans and a plot plan. The exact submittal and approvals should be confirmed for the property and final scope."],
      ["What should a Holly Springs plot plan show for outdoor work?", "It should accurately communicate the property and proposed work, including information needed to review property lines, setbacks, easements, and the relationship to existing improvements."],
      ["Can a newer Holly Springs kitchen still benefit from remodeling?", "Yes. A newer room may still have poor work-zone circulation, insufficient storage, weak lighting, limited pantry function, or finishes and details that do not suit the household."],
      ["How do I decide between a deck and a screened porch?", "Consider sun and rain exposure, desired seasons of use, budget, roof and wall conditions, views, privacy, maintenance, stairs, grade, and how the space connects to the interior."],
      ["Are the featured projects in Holly Springs?", "No. They are clearly described as relevant Versatile Edge project examples from the wider service area, not Holly Springs properties."],
      ["How do I request a Holly Springs remodeling consultation?", "Send the property address, project goals, spaces involved, desired timing, and a realistic investment range through the inquiry form."],
    ],
  },
  {
    slug: "knightdale-nc",
    city: "Knightdale",
    state: "North Carolina",
    title: "Knightdale Home Remodeling | Versatile Edge LLC",
    description:
      "Plan a Knightdale home remodel with Versatile Edge for kitchens, bathrooms, porches, decks, additions, windows, and whole-home renovations.",
    h1: "Home Remodeling in Knightdale, North Carolina",
    eyebrow: "Knightdale residential remodeling",
    heroImage: "/images/service-areas/knightdale-nc-landmark.webp",
    heroAlt: "Historic brick storefronts along First Avenue in downtown Knightdale",
    heroLead:
      "Residential remodeling planned around Knightdale homes, changing household needs, and the property conditions that shape buildable work.",
    introduction:
      "A Knightdale renovation should respond to the home in front of us, whether the goal is to correct an awkward kitchen in a newer floor plan, rebuild an aging bathroom, or connect the house to a deck or screened porch. We define the problem first, then coordinate the design and construction decisions needed to solve it.",
    localContext: {
      heading: "Versatile Edge. Remodeling Knightdale Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Knightdale's established center and expanding residential areas bring different structures, lots, and everyday needs into the same community. A recently built house may need more useful storage or a layout tailored to its owners, while an older property may call for a closer look at framing, utilities, prior work, and exterior connections.",
        "Town review and Wake County building inspections can both be part of a Knightdale project. When a deck, porch, or addition changes the footprint, the site plan, setbacks, easements, drainage conditions, and any floodplain or Neuse River buffer constraints should inform the plan before the finishes take over the conversation.",
      ],
    },
    serviceIntroduction:
      "Kitchen, bathroom, and outdoor-living work receive detailed attention below. Whole-home, interior, addition, and window services support a broader Knightdale scope when the solution crosses rooms or building systems.",
    serviceDescriptions: {
      "whole-home-renovations": "Bring multiple Knightdale rooms, systems, selections, and construction phases into one cohesive renovation plan.",
      "interior-remodeling": "Improve circulation, storage, daylight, and the relationship between existing living spaces.",
      "kitchen-renovations": "Coordinate work zones, cabinetry, appliances, utilities, ventilation, lighting, and durable finishes.",
      "bathroom-renovations": "Resolve layout, waterproofing, ventilation, plumbing, tile, storage, fixtures, and lighting together.",
      "porches-and-decks": "Plan outdoor living around the lot, house connection, weather exposure, structure, drainage, and access.",
      "home-additions": "Add useful space with site, structural, systems, roofline, and interior-transition decisions aligned.",
      "window-replacement": "Improve comfort and operation through proper fit, flashing, insulation, water management, and trim work.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Knightdale kitchens",
        heading: "Tailor the kitchen to the household instead of the original floor plan.",
        paragraphs: [
          "An island can be too large for its traffic paths, a pantry can be too shallow for the household, or an open plan can leave cooking and cleanup exposed without enough working storage. We map how groceries enter, where preparation happens, how people gather, and which routes need to stay clear.",
          "Cabinetry, appliances, ventilation, plumbing, electrical work, surfaces, flooring, and layered lighting are coordinated around that movement. If the answer involves walls or adjacent rooms, structural review and finish continuity become part of the same scope.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a coordinated kitchen and whole-home renovation",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Knightdale bathrooms",
        heading: "Build a better routine into a room that handles moisture every day.",
        paragraphs: [
          "A primary bathroom may need a more comfortable shower and better storage, while a shared bathroom may need durable surfaces and a layout that supports overlapping schedules. We compare those goals with the available footprint, fixture clearances, and plumbing conditions.",
          "Ventilation, waterproofing, substrate preparation, niches, tile layout, glass, lighting, cabinetry, fixtures, and trim are planned as connected layers. Care behind the finished surfaces is what allows the room to feel simple and dependable in use.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "Review completed bathroom craftsmanship",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Knightdale porches and decks",
        heading: "Let the lot and the house connection guide the outdoor room.",
        paragraphs: [
          "A deck, covered porch, or screened enclosure changes how the home meets the yard. Door locations, grade, sun, privacy, rooflines, drainage, stairs, and the proposed footprint all influence which option will work well at a particular Knightdale property.",
          "Town inspection guidance calls attention to property and building corners, setbacks, easements, floodplains, and Neuse River buffers for relevant work. We bring those site questions into the same plan as framing, attachment, flashing, guards, screens, and material exposure.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed deck and sunroom project",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Knightdale projects can involve Town review and Wake County inspections.",
    planningIntroduction:
      "Current requirements depend on the address and approved scope. These official resources establish useful starting points for early planning.",
    planning: [
      {
        title: "Start with the Town permit path",
        text: "Knightdale states that residential building permits are submitted through the Wake County Permit Portal, then reviewed, invoiced, and issued by the Town's Development Services staff.",
        href: "https://www.knightdalenc.gov/development-services/permits-and-inspections/building-permits",
        linkLabel: "Review Knightdale building permits",
      },
      {
        title: "Footprint changes need site information",
        text: "Town guidance calls for a scaled site plan when a project adds a structure or changes a building footprint, making property constraints an early design input.",
        href: "https://www.knightdalenc.gov/development-services/permits-and-inspections/building-permits",
        linkLabel: "See Town submittal guidance",
      },
      {
        title: "Confirm every reviewing agency",
        text: "Knightdale performs zoning and setback inspections, while Wake County conducts building and trade inspections on the Town's behalf. Well, septic, and site conditions can add other review steps.",
        href: "https://www.knightdalenc.gov/development-services/permits-and-inspections/inspections",
        linkLabel: "Read the inspection overview",
      },
    ],
    projectSlugs: ["hutter-whole-house-remodel-addition", "walsh-sunroom-deck", "johnson-bathroom"],
    projectHeading: "Relevant kitchen, outdoor-living, and bathroom experience.",
    projectIntroduction:
      "These completed Versatile Edge projects demonstrate related capabilities elsewhere in the service area. They are project examples, not represented as Knightdale properties.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Who reviews residential remodeling permits in Knightdale?", "Knightdale directs permit applications through the Wake County Permit Portal and states that Town Development Services reviews and issues them. Wake County conducts building and trade inspections on the Town's behalf. The current path should be confirmed for the address and scope."],
      ["When does a Knightdale remodeling project need a site plan?", "Town guidance calls for a scaled site plan when a new structure or changed building footprint is proposed. The exact information required should be confirmed before submittal."],
      ["Can floodplain or Neuse River buffer conditions affect a deck or addition?", "They can affect some properties. Knightdale inspection guidance identifies floodplain and Neuse River buffer information among relevant site considerations, so property-specific constraints should be checked early."],
      ["Can Versatile Edge remodel an occupied Knightdale home?", "Depending on scope, portions of a home may remain usable. Access, dust control, utility interruptions, temporary facilities, work zones, and household safety should be planned before construction begins."],
      ["Are the featured projects located in Knightdale?", "No. They are labeled as completed Versatile Edge examples from the wider service area and are not claimed as Knightdale properties."],
      ["How do I prepare for a Knightdale remodeling consultation?", "Share the property address, rooms or exterior areas involved, what is not working today, desired timing, and a realistic investment range through the inquiry form."],
    ],
  },
  {
    slug: "wendell-nc",
    city: "Wendell",
    state: "North Carolina",
    title: "Wendell Home Remodeling & Renovations | Versatile Edge",
    description:
      "Explore Wendell home remodeling with Versatile Edge for kitchens, bathrooms, porches, decks, additions, windows, and coordinated renovations.",
    h1: "Home Remodeling in Wendell, North Carolina",
    eyebrow: "Wendell residential remodeling",
    heroImage: "/images/service-areas/wendell-nc-landmark.webp",
    heroAlt: "Brick commercial buildings and streetscape in downtown Wendell",
    heroLead:
      "Thoughtful remodeling for Wendell's established homes and newer neighborhoods, coordinated from existing conditions through final construction.",
    introduction:
      "Wendell homeowners may be adapting an older house with accumulated changes or personalizing a newer home that does not quite fit daily life. In either case, the useful question is not how to make the project look like every other remodel. It is how to make this house work better while respecting what is sound and correcting what is not.",
    localContext: {
      heading: "Versatile Edge. Remodeling Wendell Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Wendell's historic downtown is surrounded by long-established residential fabric, while continued homebuilding has added distinctly newer neighborhoods. Older construction can reveal framing, utility, or prior-renovation conditions as work is opened; newer construction can still need more purposeful storage, lighting, circulation, and outdoor connection.",
        "The Wendell Boulevard Historic District is recognized for an intact collection of residential architecture, but a historic listing should not be confused with a blanket review requirement for every Wendell address. We verify the property, jurisdiction, current permit path, and scope before drawing conclusions about approvals.",
      ],
    },
    serviceIntroduction:
      "Wendell kitchens, bathrooms, and porches or decks are addressed in depth, with whole-home, interior, addition, and window work available when the renovation needs a wider frame.",
    serviceDescriptions: {
      "whole-home-renovations": "Connect multiple rooms, systems, and finish decisions so a Wendell renovation reads as one home.",
      "interior-remodeling": "Improve room relationships, storage, lighting, and circulation while responding to existing conditions.",
      "kitchen-renovations": "Plan cabinetry, work zones, appliances, utilities, ventilation, lighting, and adjoining-room transitions.",
      "bathroom-renovations": "Coordinate the footprint, plumbing, ventilation, waterproofing, tile, fixtures, storage, and light.",
      "porches-and-decks": "Create durable outdoor space shaped by the house, lot, shade, grade, drainage, and desired use.",
      "home-additions": "Expand with careful attention to site conditions, structure, rooflines, systems, and old-to-new transitions.",
      "window-replacement": "Address operation, energy comfort, flashing, insulation, water management, and appropriate trim details.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Wendell kitchens",
        heading: "Respect the house while making the kitchen work for life now.",
        paragraphs: [
          "In an older home, a kitchen may have been altered in stages, leaving disconnected storage, tight openings, or utilities that need investigation. In a newer plan, the challenge may be an undersized pantry, weak task lighting, or an island and seating arrangement that compete for the same path.",
          "We evaluate adjacent rooms, structure, appliances, ventilation, plumbing, electrical needs, cabinetry, surfaces, flooring, and lighting before locking the layout. The result can feel current without losing the proportions and transitions that make the rest of the home coherent.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a kitchen integrated with an established home",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Wendell bathrooms",
        heading: "Plan for what may be behind the finishes as well as what replaces them.",
        paragraphs: [
          "An older bathroom can conceal uneven framing, past repairs, limited ventilation, or plumbing choices that affect the new layout. A focused investigation and realistic allowances help turn those possibilities into planning questions instead of assumptions.",
          "For every age of home, waterproofing, substrate preparation, ventilation, fixture clearances, tile layout, storage, lighting, and trim need a coordinated sequence. Those technical decisions support the calm, finished room the homeowner ultimately sees.",
        ],
        projectSlug: "brown-bathroom",
        projectLabel: "Review a compact completed bathroom",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Wendell porches and decks",
        heading: "Add shade and gathering space without treating the exterior as an afterthought.",
        paragraphs: [
          "A porch or deck should relate to the home's doors, roof, windows, grade, and yard rather than simply fill an open area. Sun exposure, privacy, views, stairs, drainage, and preferred seasons of use help determine whether an open deck, roofed porch, or screened room is the better fit.",
          "We coordinate the footprint, structural support, attachment, flashing, guards, screens, materials, and finish transitions. For an older house, exterior proportions and details also deserve attention so the addition feels connected rather than pasted on.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore connected indoor and outdoor living",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Confirm the Wendell property and permit path before design hardens.",
    planningIntroduction:
      "Official planning and preservation records provide context, while the responsible reviewing authority and current requirements remain specific to the address and scope.",
    planning: [
      {
        title: "Building work follows current code and permits",
        text: "Wendell's ordinance incorporates the state building code and provides for permits covering construction, repairs, and alterations as required by the Town.",
        href: "https://library.municode.com/nc/wendell/codes/code_of_ordinances?nodeId=SPBLAUSREUNDEORUD_CH34HO_ARTIIMIHOCO_DIV3EN_S34-98PE",
        linkLabel: "Review the Town ordinance",
      },
      {
        title: "The parcel and scope guide coordination",
        text: "Permit and planning questions should begin with the exact property and proposed work, particularly when an addition or outdoor structure changes the footprint or site conditions.",
        href: "https://townofwendellnc.gov/Departments/Planning",
        linkLabel: "Visit Wendell Planning",
      },
      {
        title: "Historic recognition is property-specific context",
        text: "State records document the Wendell Boulevard Historic District's residential resources. Confirm a property's status and any applicable review rather than assuming that every older Wendell home follows the same path.",
        href: "https://files.nc.gov/historic-preservation/nr/WA4069.pdf",
        linkLabel: "Read the state historic-district record",
      },
    ],
    projectSlugs: ["hutter-whole-house-remodel-addition", "brown-bathroom", "walsh-sunroom-deck"],
    projectHeading: "Examples selected for established-home, bathroom, and exterior questions.",
    projectIntroduction:
      "These completed projects show relevant Versatile Edge work across the service area. They provide construction context without being presented as Wendell properties.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Do Wendell home renovations require permits?", "Permits can be required for construction, alterations, structural work, and building trades. The exact permit and review path should be confirmed with the responsible authority for the property and approved scope."],
      ["Does an older Wendell home automatically require historic approval?", "No. Age or appearance alone does not establish a review requirement. Confirm the property's designation, jurisdiction, and the nature of the proposed exterior work before assuming a historic-review path."],
      ["How does planning differ between an older and newer Wendell home?", "Older homes may warrant more investigation of framing, utilities, prior alterations, and finish transitions. Newer homes can still need meaningful layout, storage, lighting, or outdoor-living changes tailored to the household."],
      ["What should guide a Wendell screened-porch design?", "Consider the house connection, roof and window relationships, sun and rain exposure, grade, drainage, privacy, stairs, screening, maintenance, site constraints, and intended seasons of use."],
      ["Are the projects shown on this page in Wendell?", "No. Each is presented as a relevant completed Versatile Edge project from the broader service area, not as a Wendell property."],
      ["Can remodeling happen while we live in the Wendell house?", "Sometimes. The answer depends on scope and utilities. Access, separation, dust control, temporary facilities, work hours, and household safety should be discussed during planning."],
    ],
  },
  {
    slug: "rolesville-nc",
    city: "Rolesville",
    state: "North Carolina",
    title: "Rolesville Home Remodeling | Versatile Edge LLC",
    description:
      "Plan a Rolesville home remodel with Versatile Edge for kitchens, bathrooms, covered porches, decks, additions, windows, and whole-home updates.",
    h1: "Home Remodeling in Rolesville, North Carolina",
    eyebrow: "Rolesville residential remodeling",
    heroImage: "/images/service-areas/rolesville-nc-landmark.webp",
    heroAlt: "Long brick facade of Rolesville Elementary School in Rolesville",
    heroCredit: {
      label: "Rolesville Elementary School photograph by Mkrpowers",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolesville_Elementary_School.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    heroLead:
      "Personalized remodeling for Rolesville homes, with layout, site, permit, and construction decisions developed as one practical scope.",
    introduction:
      "A newer home can still be a poor match for the people living in it. Rolesville homeowners may need a kitchen with stronger storage and flow, a bathroom designed around their routines, or a covered outdoor room that makes the backyard genuinely usable. We begin with those lived needs and test them against the structure and property.",
    localContext: {
      heading: "Versatile Edge. Remodeling Rolesville Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Rolesville's residential growth has produced many homes with contemporary open plans, but a standard plan does not guarantee useful pantry space, comfortable work-zone clearances, or an outdoor connection suited to a particular family. Targeted remodeling can personalize those relationships without assuming the whole house must be rebuilt.",
        "A Rolesville mailing address does not by itself establish that a property is within Town limits or its planning jurisdiction. Confirming the parcel, zoning, reviewing authority, impervious-area considerations, and utility responsibilities early is especially important when the work changes the footprint.",
      ],
    },
    serviceIntroduction:
      "Rolesville kitchens, bathrooms, and porches or decks receive the most detailed treatment here. Whole-home, interior, addition, and window work can extend the plan where a single-room scope is not enough.",
    serviceDescriptions: {
      "whole-home-renovations": "Coordinate connected Rolesville rooms, systems, and finish choices under one construction strategy.",
      "interior-remodeling": "Adapt living, work, storage, laundry, and connecting spaces to the household's actual routines.",
      "kitchen-renovations": "Improve circulation, pantry function, cabinetry, work zones, utilities, light, and gathering space.",
      "bathroom-renovations": "Plan clearances, shower or tub choices, waterproofing, ventilation, storage, tile, and fixtures.",
      "porches-and-decks": "Shape outdoor space around attachment, rooflines, lot coverage, grade, weather, and access.",
      "home-additions": "Create needed square footage with site, zoning, structure, systems, and transitions coordinated.",
      "window-replacement": "Replace windows with attention to fit, flashing, insulation, water management, operation, and trim.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Rolesville kitchens",
        heading: "Turn an open plan into a kitchen with defined, useful zones.",
        paragraphs: [
          "In a newer kitchen, the opportunity is often refinement rather than expansion: make the pantry more useful, protect the cooking path from through-traffic, correct an island's scale, or add task lighting and storage where the original plan left gaps.",
          "We examine the relationship to dining, family, mudroom, garage, and outdoor areas, then coordinate cabinetry, appliances, ventilation, plumbing, electrical capacity, surfaces, flooring, and lighting. Each selection supports a tested layout instead of masking its problems.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "See a kitchen organized for work and gathering",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Rolesville bathrooms",
        heading: "Use early decisions to protect comfort and construction quality.",
        paragraphs: [
          "The choice between a tub, larger shower, or combined arrangement affects clearances, plumbing, storage, glass, and the room's visual balance. Settling those priorities early allows the footprint and investment to be evaluated together.",
          "Waterproofing, ventilation, substrate preparation, tile layout, niches, fixtures, lighting, cabinetry, and trim then follow one coordinated plan. The Johnson project shows the finished result of giving those layers equal attention.",
        ],
        projectSlug: "johnson-bathroom",
        projectLabel: "Review a complete bathroom transformation",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Rolesville porches and decks",
        heading: "Choose the outdoor structure before treating the permits as interchangeable.",
        paragraphs: [
          "Rolesville's permit guidance distinguishes an attached or freestanding residential deck from a covered porch, which follows the residential-addition path. That difference reflects real design questions about roof structure, enclosure, foundation, drainage, and the connection to the house.",
          "We also consider impervious area, setbacks, easements, grade, doors, sun, privacy, stairs, guards, screens, and material exposure. Those inputs help identify whether an open deck, screened porch, or more fully conditioned addition best matches the goal.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed deck and enclosed addition",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "A Rolesville address is the start of jurisdiction review, not the answer.",
    planningIntroduction:
      "Town and Wake County resources identify the likely sequence, but the exact parcel, municipal limits, scope, utilities, and current requirements determine the path.",
    planning: [
      {
        title: "Confirm Town jurisdiction first",
        text: "Rolesville notes that a postal address can use the Town name without being inside its municipal limits or planning jurisdiction. Check the zoning map and parcel before relying on Town assumptions.",
        href: "https://www.rolesvillenc.gov/planning/frequently-asked-questions-0",
        linkLabel: "Read Rolesville planning FAQs",
      },
      {
        title: "Town planning and County inspections connect",
        text: "Rolesville Planning describes its partnership with Wake County inspections and use of the Wake County Permit Portal, with other agencies potentially involved for utilities.",
        href: "https://www.rolesvillenc.gov/planning",
        linkLabel: "Review Rolesville Planning",
      },
      {
        title: "Decks and covered porches use different categories",
        text: "The Town's permit guide identifies residential decks separately and directs covered porches to the residential-addition permit type, so the intended structure should be defined accurately.",
        href: "https://www.rolesvillenc.gov/sites/default/files/uploads/projects/documents/town-of-rolesville-permit-document.pdf",
        linkLabel: "Open the Town permit guide",
      },
    ],
    projectSlugs: ["walsh-sunroom-deck", "johnson-bathroom", "hutter-whole-house-remodel-addition"],
    projectHeading: "Outdoor, bathroom, and kitchen examples for a tailored home plan.",
    projectIntroduction:
      "These completed Versatile Edge projects demonstrate relevant service-area experience. None is represented as a Rolesville property.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Does a Rolesville mailing address mean the property is in Town limits?", "Not necessarily. The Town advises that a Rolesville postal address can be outside municipal limits or its planning jurisdiction. Confirm the parcel and reviewing authority before planning around Town requirements."],
      ["Are a deck and a covered porch treated the same in Rolesville?", "The Town's published permit guide lists residential decks separately and directs covered porches to the residential-addition permit type. Current requirements should be confirmed for the specific design."],
      ["Can impervious surface affect a Rolesville outdoor project?", "It can be relevant when a project adds covered or paved area. Property-specific zoning, drainage, easements, and impervious-area limits should be reviewed before the footprint is finalized."],
      ["What can improve a newer Rolesville kitchen?", "Common opportunities include pantry function, island scale, work-zone traffic, task lighting, appliance relationships, storage, ventilation, and a better connection to dining or outdoor areas."],
      ["Are the featured projects located in Rolesville?", "No. They are clearly labeled as broader Versatile Edge service-area examples and are not presented as Rolesville properties."],
      ["How do I request a Rolesville remodeling consultation?", "Provide the property address, the spaces involved, the problems to solve, timing goals, and a realistic investment range through the inquiry form."],
    ],
  },
  {
    slug: "garner-nc",
    city: "Garner",
    state: "North Carolina",
    title: "Garner Home Remodeling & Renovations | Versatile Edge LLC",
    description:
      "Explore Garner home remodeling with Versatile Edge for kitchens, bathrooms, screened porches, decks, additions, windows, and complete renovations.",
    h1: "Home Remodeling in Garner, North Carolina",
    eyebrow: "Garner residential remodeling",
    heroImage: "/images/service-areas/garner-nc-landmark.webp",
    heroAlt: "Garner water tower rising above trees in the historic district",
    heroCredit: {
      label: "Garner water-tower photograph by Mikeiamunion21, cropped",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Garner,_NC_Water_Tower_and_Historic_distric._Oct_2013_-_panoramio_(cropped).jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    heroLead:
      "Remodeling for Garner homes where established construction, changing needs, and practical project coordination all deserve attention.",
    introduction:
      "A Garner remodeling project may begin with a room that has reached the end of its useful life or with a household that has outgrown the way its space is organized. We translate that starting point into a defined scope that connects layout and finish goals with structure, building systems, site information, permits, and construction sequence.",
    localContext: {
      heading: "Versatile Edge. Remodeling Garner Homes to Your Style & the Way You Live.",
      paragraphs: [
        "Garner includes long-established neighborhoods as well as newer residential growth, creating a range of home ages and lot conditions. An older kitchen may need utility and structural investigation before walls move, while an addition or screened porch may need a plot plan that answers zoning and site questions before the new footprint is settled.",
        "The Town maintains its own inspections portal and publishes distinct residential resources for additions or alterations, decks, and screen porches. Matching the proposed work to the appropriate checklist early helps keep the design, permit documents, and construction plan aligned.",
      ],
    },
    serviceIntroduction:
      "Garner kitchen, bathroom, and outdoor-living projects are explored in detail below. Four related services complete the offering when the work extends beyond those focal spaces.",
    serviceDescriptions: {
      "whole-home-renovations": "Coordinate Garner rooms, systems, structural work, selections, and construction phases within one plan.",
      "interior-remodeling": "Rework existing rooms for clearer circulation, better storage, stronger lighting, and daily usefulness.",
      "kitchen-renovations": "Balance layout, cabinetry, appliances, utilities, ventilation, surfaces, flooring, and task lighting.",
      "bathroom-renovations": "Coordinate plumbing, waterproofing, ventilation, tile, fixtures, glass, storage, and clearances.",
      "porches-and-decks": "Develop outdoor rooms around plot conditions, structure, access, shade, drainage, and weather exposure.",
      "home-additions": "Expand with zoning, site, structural, systems, roofline, and finish transitions considered together.",
      "window-replacement": "Improve fit, comfort, operation, flashing, insulation, water management, and surrounding trim.",
    },
    priorityServices: [
      {
        slug: "kitchen-renovations",
        eyebrow: "Garner kitchens",
        heading: "Solve the working footprint before selecting the visible layers.",
        paragraphs: [
          "An established kitchen may have narrow circulation, fragmented storage, limited electrical capacity, or an awkward relationship to dining and living rooms. We study how the household cooks, cleans, enters, gathers, and stores food before deciding whether the best move is a targeted rebuild or a larger interior change.",
          "Cabinetry, appliances, ventilation, plumbing, electrical work, surfaces, flooring, and lighting are then developed around the chosen layout. Existing-condition investigation helps identify where the design needs flexibility for work concealed behind walls and finishes.",
        ],
        projectSlug: "hutter-whole-house-remodel-addition",
        projectLabel: "Review a kitchen coordinated with broader renovation work",
      },
      {
        slug: "bathroom-renovations",
        eyebrow: "Garner bathrooms",
        heading: "Coordinate the trades so a compact room performs as a complete system.",
        paragraphs: [
          "Bathrooms bring plumbing, electrical work, ventilation, waterproofing, tile, cabinetry, fixtures, and glass into a small footprint. Clear early decisions about the shower or tub, storage, lighting, and fixture locations give those trades a workable sequence.",
          "The Brown project demonstrates how large-format wall surfaces, a mosaic shower floor, recessed storage, and a glass enclosure can make a compact room feel brighter and more useful. The result depends on preparation and moisture control beneath those finishes.",
        ],
        projectSlug: "brown-bathroom",
        projectLabel: "See a compact bathroom and its construction details",
      },
      {
        slug: "porches-and-decks",
        eyebrow: "Garner porches and decks",
        heading: "Use the Town's project-specific resources to define the right outdoor scope.",
        paragraphs: [
          "Garner publishes separate residential references for deck plans and screen porches, as well as plot-plan guidance. That distinction matters because an open platform, roofed porch, and enclosed or conditioned room place different demands on structure, foundations, walls, roof connections, and building systems.",
          "We pair those requirements with how the property feels in use: sun, grade, privacy, views, door locations, drainage, stairs, maintenance, and desired seasons outdoors. The selected structure should fit both the site and the household.",
        ],
        projectSlug: "walsh-sunroom-deck",
        projectLabel: "Explore a completed sunroom and deck",
      },
    ],
    supportingServiceSlugs: ["whole-home-renovations", "interior-remodeling", "home-additions", "window-replacement"],
    planningHeading: "Garner publishes distinct paths for additions, decks, and screen porches.",
    planningIntroduction:
      "The Town's current portal and residential checklists are the authoritative starting point. Final documents and reviews remain tied to the address and approved design.",
    planning: [
      {
        title: "Use the Garner inspection portal",
        text: "Garner Inspections administers building-code and local-ordinance requirements and provides an online portal for permit and inspection activity.",
        href: "https://www.garnernc.gov/departments/inspections",
        linkLabel: "Visit Garner Inspections",
      },
      {
        title: "Match the checklist to the structure",
        text: "Town residential resources distinguish addition or alteration work, deck plans, screen porches, and plot plans. Define the project accurately before assembling documents.",
        href: "https://www.garnernc.gov/departments/inspection-form-test",
        linkLabel: "Find residential permit resources",
      },
      {
        title: "Plot and zoning questions belong up front",
        text: "Garner Planning staff provides zoning-compliance and plot-plan assistance, which can help identify site constraints before an addition or outdoor footprint is finalized.",
        href: "https://www.garnernc.gov/departments/planning/new-planning-staff",
        linkLabel: "Review Garner Planning contacts",
      },
    ],
    projectSlugs: ["brown-bathroom", "hutter-whole-house-remodel-addition", "walsh-sunroom-deck"],
    projectHeading: "Bathroom, kitchen, addition, and outdoor experience to draw from.",
    projectIntroduction:
      "These completed Versatile Edge records show relevant work elsewhere in the service area. They are examples of capability and are not identified as Garner projects.",
    locallyVerifiedProjectSlugs: [],
    faq: [
      ["Where do Garner residential permit and inspection requests begin?", "Garner maintains an Inspections portal and residential permit resources. The appropriate forms and reviews should be confirmed for the property and final scope before submittal."],
      ["Does Garner use the same checklist for a deck and screened porch?", "The Town publishes separate resources for deck plans and screen porches, along with plot-plan and addition or alteration materials. Use the current documents that match the proposed structure."],
      ["Why is a plot plan important for a Garner addition?", "It helps communicate the property, existing improvements, proposed footprint, and information needed for zoning and site review. The Town should confirm what the specific project must show."],
      ["Can Versatile Edge coordinate a multi-room Garner remodel?", "Yes. Whole-home and interior scopes can coordinate layouts, structural work, building systems, selections, scheduling, trades, permits, inspections, and room-to-room finish transitions."],
      ["Are any featured projects verified in Garner?", "No. The featured work is explicitly labeled as completed Versatile Edge service-area examples and is not represented as Garner property."],
      ["What should I send for a Garner remodeling consultation?", "Include the property address, rooms or exterior spaces involved, what you want to change, desired timing, and a realistic investment range in the inquiry form."],
    ],
  },
];

type ServiceAreaProjectPresentation = {
  projectSlugs: readonly string[];
  cardImages: Readonly<Record<string, string>>;
  priorityImages: Partial<Record<ServiceSlug, string>>;
};

// Presentation-only selections keep the city pages visually varied without
// changing project facts or implying a project occurred in an unsupported city.
export const serviceAreaProjectPresentation: Readonly<Record<string, ServiceAreaProjectPresentation>> = {
  "raleigh-nc": {
    projectSlugs: ["hutter-whole-house-remodel-addition", "brown-bathroom", "janet-home-addition"],
    cardImages: {
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-living-01-corrected.webp",
      "brown-bathroom": "/images/projects/brown-bath-02.webp",
      "janet-home-addition": "/images/projects/janet-progress-0135.webp",
    },
    priorityImages: {},
  },
  "cary-nc": {
    projectSlugs: ["walsh-sunroom-deck", "brown-bathroom", "johnson-bathroom"],
    cardImages: {
      "walsh-sunroom-deck": "/images/projects/walsh-sunroom-02.webp",
      "brown-bathroom": "/images/projects/brown-working-vanity-install.webp",
      "johnson-bathroom": "/images/projects/johnson-bath-01.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-01.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-01.webp",
      "porches-and-decks": "/images/projects/walsh-deck-steps.webp",
    },
  },
  "wake-forest-nc": {
    projectSlugs: ["johnson-bathroom", "hutter-whole-house-remodel-addition", "walsh-sunroom-deck"],
    cardImages: {
      "johnson-bathroom": "/images/projects/johnson-bath-05-color-corrected.webp",
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-living-04.webp",
      "walsh-sunroom-deck": "/images/projects/walsh-deck-rim-joist.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-02.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-04.webp",
      "porches-and-decks": "/images/projects/walsh-sunroom-01.webp",
    },
  },
  "apex-nc": {
    projectSlugs: ["walsh-sunroom-deck", "hutter-whole-house-remodel-addition", "brown-bathroom"],
    cardImages: {
      "walsh-sunroom-deck": "/images/projects/walsh-deck-cable-railing.webp",
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-dining-02.webp",
      "brown-bathroom": "/images/projects/brown-bath-02.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-03.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-02.webp",
      "porches-and-decks": "/images/projects/walsh-deck-cable-railing.webp",
    },
  },
  "morrisville-nc": {
    projectSlugs: ["brown-bathroom", "johnson-bathroom", "hutter-whole-house-remodel-addition"],
    cardImages: {
      "brown-bathroom": "/images/projects/brown-working-vanity-dry-fit.webp",
      "johnson-bathroom": "/images/projects/johnson-bath-01.webp",
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-front-living.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-04.webp",
      "bathroom-renovations": "/images/projects/brown-bath-02.webp",
      "porches-and-decks": "/images/projects/walsh-sunroom-02.webp",
    },
  },
  "fuquay-varina-nc": {
    projectSlugs: ["hutter-whole-house-remodel-addition", "walsh-sunroom-deck", "brown-bathroom"],
    cardImages: {
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-exterior-02.webp",
      "walsh-sunroom-deck": "/images/projects/walsh-sunroom-03.webp",
      "brown-bathroom": "/images/projects/brown-working-shower-base.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-05.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-03.webp",
      "porches-and-decks": "/images/projects/walsh-deck-rim-joist.webp",
    },
  },
  "holly-springs-nc": {
    projectSlugs: ["walsh-sunroom-deck", "johnson-bathroom", "brown-bathroom"],
    cardImages: {
      "walsh-sunroom-deck": "/images/projects/walsh-deck-steps.webp",
      "johnson-bathroom": "/images/projects/johnson-bath-03.webp",
      "brown-bathroom": "/images/projects/brown-working-shower-base.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-01.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-05-color-corrected.webp",
      "porches-and-decks": "/images/projects/walsh-sunroom-03.webp",
    },
  },
  "knightdale-nc": {
    projectSlugs: ["hutter-whole-house-remodel-addition", "johnson-bathroom", "brown-bathroom"],
    cardImages: {
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-kitchen-05.webp",
      "johnson-bathroom": "/images/projects/johnson-bath-05-color-corrected.webp",
      "brown-bathroom": "/images/projects/brown-working-vanity-install.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-02.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-01.webp",
      "porches-and-decks": "/images/projects/walsh-deck-steps.webp",
    },
  },
  "wendell-nc": {
    projectSlugs: ["brown-bathroom", "walsh-sunroom-deck", "hutter-whole-house-remodel-addition"],
    cardImages: {
      "brown-bathroom": "/images/projects/brown-bath-01.webp",
      "walsh-sunroom-deck": "/images/projects/walsh-sunroom-01.webp",
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-front-living.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-03.webp",
      "bathroom-renovations": "/images/projects/brown-bath-01.webp",
      "porches-and-decks": "/images/projects/walsh-sunroom-01.webp",
    },
  },
  "rolesville-nc": {
    projectSlugs: ["johnson-bathroom", "brown-bathroom", "walsh-sunroom-deck"],
    cardImages: {
      "johnson-bathroom": "/images/projects/johnson-bath-02.webp",
      "brown-bathroom": "/images/projects/brown-working-vanity-dry-fit.webp",
      "walsh-sunroom-deck": "/images/projects/walsh-deck-cable-railing.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-04.webp",
      "bathroom-renovations": "/images/projects/johnson-bath-02.webp",
      "porches-and-decks": "/images/projects/walsh-deck-cable-railing.webp",
    },
  },
  "garner-nc": {
    projectSlugs: ["brown-bathroom", "hutter-whole-house-remodel-addition", "johnson-bathroom"],
    cardImages: {
      "brown-bathroom": "/images/projects/brown-bath-02.webp",
      "hutter-whole-house-remodel-addition": "/images/projects/hutter-exterior-01.webp",
      "johnson-bathroom": "/images/projects/johnson-bath-04.webp",
    },
    priorityImages: {
      "kitchen-renovations": "/images/projects/hutter-kitchen-05.webp",
      "bathroom-renovations": "/images/projects/brown-bath-02.webp",
      "porches-and-decks": "/images/projects/walsh-deck-rim-joist.webp",
    },
  },
};

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
