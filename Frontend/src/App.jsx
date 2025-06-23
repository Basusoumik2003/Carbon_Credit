// import { useState, useEffect, useRef, useCallback } from "react"
// import './App.css';

// export default function App() {
//   // Game state
//   const [players, setPlayers] = useState([])
//   const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
//   const [currentQuestion, setCurrentQuestion] = useState(null)
//   const [usedQuestions, setUsedQuestions] = useState([])
//   const [isSinglePlayer, setIsSinglePlayer] = useState(false)
//   const [gameOver, setGameOver] = useState(false)
//   const [isPaused, setIsPaused] = useState(false)
//   const [gameStarted, setGameStarted] = useState(false)
//   const [showRules, setShowRules] = useState(false)
//   const [showQuestion, setShowQuestion] = useState(false)
//   const [questionFlipped, setQuestionFlipped] = useState(false)
//   const [showWin, setShowWin] = useState(false)
//   const [winFlipped, setWinFlipped] = useState(false)
//   const [showDice, setShowDice] = useState(false)
//   const [diceRolling, setDiceRolling] = useState(false)
//   const [diceValue, setDiceValue] = useState(0)
//   const [message, setMessage] = useState("")
//   const [numPlayers, setNumPlayers] = useState(1)
//   const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true)
//   const [audioInitialized, setAudioInitialized] = useState(false)
//   const [selectedAnswer, setSelectedAnswer] = useState("")

//   // Refs for timers and audio
//   const timersRef = useRef([])
//   const messageTimeoutRef = useRef(null)
//   const audioContextRef = useRef(null)
//   const backgroundMusicRef = useRef(null)

//   // Game data
//   const carbonLosses = [
//     { from: 95, to: 24, name: "Air Pollution", emoji: "🏭" },
//     { from: 92, to: 69, name: "Deforestation", emoji: "🪓" },
//     { from: 55, to: 25, name: "Melting Ice Caps", emoji: "🧊" },
//     { from: 48, to: 29, name: "Soil Degradation", emoji: "🏜" },
//     { from: 73, to: 1, name: "Ocean Acidification", emoji: "🌊" },
//   ]

//   const naturalResources = [
//     { from: 2, to: 38, name: "Forests", emoji: "🌳" },
//     { from: 16, to: 36, name: "Rivers", emoji: "💧" },
//     { from: 21, to: 42, name: "Solar Energy", emoji: "☀" },
//     { from: 43, to: 64, name: "Wind Energy", emoji: "🌬" },
//     { from: 66, to: 85, name: "Biodiversity", emoji: "🦋" },
//     { from: 28, to: 84, name: "Wetlands", emoji: "🌾" },
//     { from: 36, to: 44, name: "Clean Air", emoji: "💨" },
//     { from: 51, to: 67, name: "Coral Reefs", emoji: "🐠" },
//     { from: 71, to: 91, name: "Soil Fertility", emoji: "🌱" },
//     { from: 78, to: 98, name: "Geothermal Energy", emoji: "🌋" },
//     { from: 87, to: 94, name: "Grasslands", emoji: "🌿" },
//   ]

//   const playerStyles = [
//     { color: "#66bb6a", borderColor: "#2e7d32", emoji: "🐘", emojiName: "Elephant" },
//     { color: "#2196f3", borderColor: "#1565c0", emoji: "🦒", emojiName: "Giraffe" },
//     { color: "#ff9800", borderColor: "#e65100", emoji: "🐢", emojiName: "Turtle" },
//     { color: "#e91e63", borderColor: "#ad1457", emoji: "🦜", emojiName: "Parrot" },
//   ]

//   // 100 Comprehensive Sustainability Questions with varying difficulty levels
//   const questions = [
//     // Easy Level (1-3 points)
//     {
//       question: "What is one way to save electricity at home?",
//       options: ["Leave lights on all day", "Turn off lights when not needed", "Use more appliances", "Waste energy"],
//       answer: "Turn off lights when not needed",
//       points: 2,
//     },
//     {
//       question: "Which of these is NOT a renewable energy source?",
//       options: ["Solar", "Wind", "Coal", "Hydro"],
//       answer: "Coal",
//       points: 2,
//     },
//     {
//       question: "What does recycling help reduce?",
//       options: ["Pollution", "Money", "Fun", "Space"],
//       answer: "Pollution",
//       points: 2,
//     },
//     {
//       question: "What can you do to save water?",
//       options: ["Leave the tap running", "Take short showers", "Use more water", "Waste water"],
//       answer: "Take short showers",
//       points: 2,
//     },
//     {
//       question: "Which of these helps keep the air clean?",
//       options: ["Burning trash", "Driving cars everywhere", "Planting trees", "Using plastic bags"],
//       answer: "Planting trees",
//       points: 2,
//     },
//     {
//       question: "What is composting?",
//       options: ["Throwing away food", "Turning food scraps into soil", "Burning waste", "Buying new food"],
//       answer: "Turning food scraps into soil",
//       points: 3,
//     },
//     {
//       question: "Which material is best for reusable bags?",
//       options: ["Plastic", "Paper", "Cloth", "Metal"],
//       answer: "Cloth",
//       points: 2,
//     },
//     {
//       question: "What does 'reduce' mean in the 3Rs of waste management?",
//       options: ["Use more things", "Use fewer things", "Throw things away", "Buy new things"],
//       answer: "Use fewer things",
//       points: 2,
//     },
//     {
//       question: "Which transportation method has the lowest carbon footprint?",
//       options: ["Car", "Airplane", "Bicycle", "Motorcycle"],
//       answer: "Bicycle",
//       points: 3,
//     },
//     {
//       question: "What is the greenhouse effect?",
//       options: [
//         "Growing plants in greenhouses",
//         "Trapping heat in Earth's atmosphere",
//         "Making houses green",
//         "Cooling the planet",
//       ],
//       answer: "Trapping heat in Earth's atmosphere",
//       points: 3,
//     },

//     // Medium Level (4-6 points)
//     {
//       question: "What is the main gas responsible for global warming?",
//       options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
//       answer: "Carbon Dioxide",
//       points: 4,
//     },
//     {
//       question: "What percentage of Earth's water is fresh water?",
//       options: ["97%", "71%", "3%", "50%"],
//       answer: "3%",
//       points: 5,
//     },
//     {
//       question: "Which country produces the most solar energy per capita?",
//       options: ["Germany", "China", "Australia", "Japan"],
//       answer: "Australia",
//       points: 5,
//     },
//     {
//       question: "What is the largest source of plastic pollution in oceans?",
//       options: ["Bottles", "Bags", "Fishing nets", "Straws"],
//       answer: "Fishing nets",
//       points: 4,
//     },
//     {
//       question: "How long does it take for a plastic bottle to decompose?",
//       options: ["10 years", "50 years", "450 years", "1000 years"],
//       answer: "450 years",
//       points: 4,
//     },
//     {
//       question: "Which greenhouse gas is most abundant in Earth's atmosphere?",
//       options: ["Carbon dioxide", "Methane", "Water vapor", "Nitrous oxide"],
//       answer: "Water vapor",
//       points: 6,
//     },
//     {
//       question: "What is permaculture?",
//       options: ["Permanent agriculture design", "Using pesticides", "Monoculture farming", "Industrial farming"],
//       answer: "Permanent agriculture design",
//       points: 5,
//     },
//     {
//       question: "What is the main cause of deforestation globally?",
//       options: ["Logging", "Agriculture", "Urban development", "Mining"],
//       answer: "Agriculture",
//       points: 4,
//     },
//     {
//       question: "Which energy source produces no greenhouse gases during operation?",
//       options: ["Natural gas", "Nuclear", "Coal", "Oil"],
//       answer: "Nuclear",
//       points: 5,
//     },
//     {
//       question: "What is ocean acidification caused by?",
//       options: ["Plastic pollution", "Oil spills", "CO2 absorption", "Overfishing"],
//       answer: "CO2 absorption",
//       points: 5,
//     },

//     // Hard Level (7-10 points)
//     {
//       question: "What is the current atmospheric CO2 concentration (as of 2024)?",
//       options: ["350 ppm", "400 ppm", "420 ppm", "450 ppm"],
//       answer: "420 ppm",
//       points: 8,
//     },
//     {
//       question: "Which feedback loop accelerates Arctic ice melting?",
//       options: ["Albedo effect", "Carbon cycle", "Water cycle", "Nitrogen cycle"],
//       answer: "Albedo effect",
//       points: 7,
//     },
//     {
//       question: "What is the most effective carbon capture technology currently?",
//       options: ["Direct air capture", "Afforestation", "Ocean fertilization", "Biochar"],
//       answer: "Afforestation",
//       points: 9,
//     },
//     {
//       question: "Which tipping point could cause 4°C of additional warming?",
//       options: [
//         "Arctic sea ice loss",
//         "Amazon rainforest dieback",
//         "Permafrost thaw",
//         "West Antarctic ice sheet collapse",
//       ],
//       answer: "Permafrost thaw",
//       points: 10,
//     },
//     {
//       question: "What is the EROI (Energy Return on Investment) of solar panels?",
//       options: ["5:1", "10:1", "20:1", "50:1"],
//       answer: "20:1",
//       points: 8,
//     },

//     // Additional 75 questions covering various difficulty levels
//     {
//       question: "What is biodiversity?",
//       options: ["Number of trees", "Variety of life forms", "Amount of water", "Type of soil"],
//       answer: "Variety of life forms",
//       points: 3,
//     },
//     {
//       question: "Which gas depletes the ozone layer?",
//       options: ["CO2", "CFCs", "Methane", "Oxygen"],
//       answer: "CFCs",
//       points: 4,
//     },
//     {
//       question: "What is sustainable development?",
//       options: [
//         "Fast development",
//         "Meeting present needs without compromising future",
//         "Building more",
//         "Using all resources",
//       ],
//       answer: "Meeting present needs without compromising future",
//       points: 5,
//     },
//     {
//       question: "Which ecosystem stores the most carbon?",
//       options: ["Forests", "Grasslands", "Wetlands", "Oceans"],
//       answer: "Oceans",
//       points: 6,
//     },
//     {
//       question: "What is eutrophication?",
//       options: ["Water purification", "Nutrient pollution in water", "Fish breeding", "Water conservation"],
//       answer: "Nutrient pollution in water",
//       points: 7,
//     },
//     {
//       question: "Which renewable energy has the highest capacity factor?",
//       options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
//       answer: "Geothermal",
//       points: 8,
//     },
//     {
//       question: "What is the circular economy?",
//       options: ["Round factories", "Eliminating waste through reuse", "Circular transportation", "Round products"],
//       answer: "Eliminating waste through reuse",
//       points: 6,
//     },
//     {
//       question: "Which country has the highest per capita carbon emissions?",
//       options: ["China", "USA", "Qatar", "Australia"],
//       answer: "Qatar",
//       points: 7,
//     },
//     {
//       question: "What is greenwashing?",
//       options: [
//         "Washing with green soap",
//         "Misleading environmental claims",
//         "Painting buildings green",
//         "Cleaning the environment",
//       ],
//       answer: "Misleading environmental claims",
//       points: 5,
//     },
//     {
//       question: "Which biome has the highest biodiversity?",
//       options: ["Temperate forest", "Tropical rainforest", "Grassland", "Desert"],
//       answer: "Tropical rainforest",
//       points: 4,
//     },
//     {
//       question: "What is carbon neutrality?",
//       options: ["No carbon use", "Balancing carbon emissions with removal", "Using only carbon", "Avoiding carbon"],
//       answer: "Balancing carbon emissions with removal",
//       points: 6,
//     },
//     {
//       question: "Which farming practice prevents soil erosion?",
//       options: ["Monoculture", "Contour farming", "Overgrazing", "Deep plowing"],
//       answer: "Contour farming",
//       points: 4,
//     },
//     {
//       question: "What is the main component of natural gas?",
//       options: ["Carbon dioxide", "Methane", "Propane", "Butane"],
//       answer: "Methane",
//       points: 3,
//     },
//     {
//       question: "Which material has the lowest environmental impact for packaging?",
//       options: ["Plastic", "Glass", "Aluminum", "Cardboard"],
//       answer: "Cardboard",
//       points: 4,
//     },
//     {
//       question: "What is the primary cause of coral bleaching?",
//       options: ["Pollution", "Overfishing", "Rising water temperature", "Acidification"],
//       answer: "Rising water temperature",
//       points: 5,
//     },
//     {
//       question: "Which energy storage technology is most promising for renewables?",
//       options: ["Pumped hydro", "Lithium batteries", "Compressed air", "Hydrogen"],
//       answer: "Lithium batteries",
//       points: 7,
//     },
//     {
//       question: "What is the tragedy of the commons?",
//       options: ["Common people suffering", "Overuse of shared resources", "Lack of common areas", "Community problems"],
//       answer: "Overuse of shared resources",
//       points: 8,
//     },
//     {
//       question: "Which gas has the highest global warming potential?",
//       options: ["CO2", "Methane", "Nitrous oxide", "Sulfur hexafluoride"],
//       answer: "Sulfur hexafluoride",
//       points: 9,
//     },
//     {
//       question: "What is ecological footprint?",
//       options: ["Animal tracks", "Human impact on environment", "Foot size", "Walking distance"],
//       answer: "Human impact on environment",
//       points: 4,
//     },
//     {
//       question: "Which city is considered the most sustainable?",
//       options: ["Copenhagen", "Singapore", "Vancouver", "Stockholm"],
//       answer: "Copenhagen",
//       points: 6,
//     },
//     {
//       question: "What is biomimicry?",
//       options: ["Copying animals", "Learning from nature for innovation", "Animal behavior", "Plant growth"],
//       answer: "Learning from nature for innovation",
//       points: 7,
//     },
//     {
//       question: "Which pollutant causes the most premature deaths globally?",
//       options: ["Water pollution", "Air pollution", "Soil pollution", "Noise pollution"],
//       answer: "Air pollution",
//       points: 5,
//     },
//     {
//       question: "What is the precautionary principle?",
//       options: ["Being careful", "Acting despite uncertainty to prevent harm", "Avoiding all risks", "Planning ahead"],
//       answer: "Acting despite uncertainty to prevent harm",
//       points: 8,
//     },
//     {
//       question: "Which ecosystem service is most valuable economically?",
//       options: ["Food production", "Climate regulation", "Water purification", "Recreation"],
//       answer: "Climate regulation",
//       points: 7,
//     },
//     {
//       question: "What is environmental justice?",
//       options: [
//         "Punishing polluters",
//         "Fair treatment regardless of demographics",
//         "Environmental laws",
//         "Nature rights",
//       ],
//       answer: "Fair treatment regardless of demographics",
//       points: 6,
//     },
//     {
//       question: "Which technology removes CO2 most efficiently?",
//       options: ["Trees", "Machines", "Algae", "Rocks"],
//       answer: "Trees",
//       points: 4,
//     },
//     {
//       question: "What is the Anthropocene?",
//       options: ["Human geological era", "Animal era", "Plant era", "Rock era"],
//       answer: "Human geological era",
//       points: 8,
//     },
//     {
//       question: "Which renewable energy grows fastest globally?",
//       options: ["Solar", "Wind", "Hydro", "Geothermal"],
//       answer: "Solar",
//       points: 5,
//     },
//     {
//       question: "What is life cycle assessment?",
//       options: ["Measuring lifespan", "Environmental impact analysis", "Age calculation", "Growth measurement"],
//       answer: "Environmental impact analysis",
//       points: 7,
//     },
//     {
//       question: "Which country leads in electric vehicle adoption?",
//       options: ["China", "Norway", "USA", "Germany"],
//       answer: "Norway",
//       points: 6,
//     },
//     {
//       question: "What is the rebound effect in energy efficiency?",
//       options: [
//         "Energy bouncing back",
//         "Increased consumption offsetting savings",
//         "Efficiency improvement",
//         "Energy storage",
//       ],
//       answer: "Increased consumption offsetting savings",
//       points: 9,
//     },
//     {
//       question: "Which material requires the most water to produce?",
//       options: ["Cotton", "Beef", "Rice", "Aluminum"],
//       answer: "Beef",
//       points: 5,
//     },
//     {
//       question: "What is environmental economics?",
//       options: ["Nature's economy", "Economic value of environment", "Green money", "Natural resources trading"],
//       answer: "Economic value of environment",
//       points: 7,
//     },
//     {
//       question: "Which gas is released from rice paddies?",
//       options: ["CO2", "Methane", "Nitrous oxide", "Oxygen"],
//       answer: "Methane",
//       points: 4,
//     },
//     {
//       question: "What is the urban heat island effect?",
//       options: ["Islands in cities", "Cities being warmer than surroundings", "Hot islands", "Urban cooling"],
//       answer: "Cities being warmer than surroundings",
//       points: 6,
//     },
//     {
//       question: "Which certification ensures sustainable forestry?",
//       options: ["ISO", "FSC", "EPA", "OSHA"],
//       answer: "FSC",
//       points: 5,
//     },
//     {
//       question: "What is ecological succession?",
//       options: ["Animal inheritance", "Ecosystem development over time", "Plant growth", "Species evolution"],
//       answer: "Ecosystem development over time",
//       points: 6,
//     },
//     {
//       question: "Which factor most influences renewable energy adoption?",
//       options: ["Technology", "Policy", "Cost", "Public opinion"],
//       answer: "Policy",
//       points: 7,
//     },
//     {
//       question: "What is the nitrogen cycle's main environmental concern?",
//       options: ["Depletion", "Excess causing pollution", "Imbalance", "Toxicity"],
//       answer: "Excess causing pollution",
//       points: 8,
//     },
//     {
//       question: "Which building material has the lowest carbon footprint?",
//       options: ["Concrete", "Steel", "Wood", "Aluminum"],
//       answer: "Wood",
//       points: 4,
//     },
//     {
//       question: "What is environmental remediation?",
//       options: ["Environmental medicine", "Cleaning up pollution", "Environmental education", "Nature conservation"],
//       answer: "Cleaning up pollution",
//       points: 5,
//     },
//     {
//       question: "Which transportation mode is most energy efficient?",
//       options: ["Car", "Train", "Plane", "Ship"],
//       answer: "Train",
//       points: 4,
//     },
//     {
//       question: "What is the main driver of species extinction?",
//       options: ["Climate change", "Habitat loss", "Pollution", "Overhunting"],
//       answer: "Habitat loss",
//       points: 5,
//     },
//     {
//       question: "Which technology converts waste to energy most efficiently?",
//       options: ["Incineration", "Gasification", "Pyrolysis", "Anaerobic digestion"],
//       answer: "Gasification",
//       points: 8,
//     },
//     {
//       question: "What is environmental monitoring?",
//       options: [
//         "Watching nature",
//         "Systematic observation of environment",
//         "Environmental security",
//         "Nature photography",
//       ],
//       answer: "Systematic observation of environment",
//       points: 6,
//     },
//     {
//       question: "Which renewable energy has the smallest land footprint?",
//       options: ["Solar", "Wind", "Nuclear", "Hydroelectric"],
//       answer: "Nuclear",
//       points: 7,
//     },
//     {
//       question: "What is the main benefit of green roofs?",
//       options: ["Aesthetics", "Insulation and stormwater management", "Food production", "Recreation"],
//       answer: "Insulation and stormwater management",
//       points: 6,
//     },
//     {
//       question: "Which pollutant is the primary component of smog?",
//       options: ["CO2", "Ozone", "Methane", "Nitrogen"],
//       answer: "Ozone",
//       points: 5,
//     },
//     {
//       question: "What is environmental impact assessment?",
//       options: [
//         "Measuring environmental damage",
//         "Predicting project impacts",
//         "Environmental testing",
//         "Impact measurement",
//       ],
//       answer: "Predicting project impacts",
//       points: 7,
//     },
//     {
//       question: "Which practice increases soil carbon storage?",
//       options: ["Tillage", "Cover cropping", "Monoculture", "Fertilization"],
//       answer: "Cover cropping",
//       points: 6,
//     },
//     {
//       question: "What is the main environmental concern with nuclear energy?",
//       options: ["CO2 emissions", "Radioactive waste", "Water use", "Land use"],
//       answer: "Radioactive waste",
//       points: 5,
//     },
//     {
//       question: "Which ecosystem provides the most oxygen?",
//       options: ["Amazon rainforest", "Phytoplankton in oceans", "Boreal forests", "Grasslands"],
//       answer: "Phytoplankton in oceans",
//       points: 8,
//     },
//     {
//       question: "What is environmental sustainability?",
//       options: [
//         "Lasting environment",
//         "Meeting needs without depleting resources",
//         "Environmental protection",
//         "Nature conservation",
//       ],
//       answer: "Meeting needs without depleting resources",
//       points: 5,
//     },
//     {
//       question: "Which factor most affects renewable energy intermittency?",
//       options: ["Technology", "Weather", "Demand", "Storage"],
//       answer: "Weather",
//       points: 6,
//     },
//     {
//       question: "What is the main cause of groundwater depletion?",
//       options: ["Climate change", "Over-extraction", "Pollution", "Urbanization"],
//       answer: "Over-extraction",
//       points: 5,
//     },
//     {
//       question: "Which green technology has the highest job creation potential?",
//       options: ["Solar", "Wind", "Energy efficiency", "Electric vehicles"],
//       answer: "Energy efficiency",
//       points: 7,
//     },
//     {
//       question: "What is environmental governance?",
//       options: [
//         "Government environment",
//         "Managing environmental issues",
//         "Environmental politics",
//         "Nature management",
//       ],
//       answer: "Managing environmental issues",
//       points: 6,
//     },
//     {
//       question: "Which carbon pricing mechanism is most effective?",
//       options: ["Carbon tax", "Cap and trade", "Carbon credits", "Regulations"],
//       answer: "Carbon tax",
//       points: 8,
//     },
//     {
//       question: "What is the main environmental benefit of electric vehicles?",
//       options: ["No emissions", "Reduced local air pollution", "Noise reduction", "Energy efficiency"],
//       answer: "Reduced local air pollution",
//       points: 5,
//     },
//     {
//       question: "Which waste management strategy is most sustainable?",
//       options: ["Recycling", "Reduction", "Reuse", "Recovery"],
//       answer: "Reduction",
//       points: 4,
//     },
//     {
//       question: "What is environmental education's primary goal?",
//       options: [
//         "Teaching about nature",
//         "Developing environmental awareness",
//         "Nature appreciation",
//         "Environmental careers",
//       ],
//       answer: "Developing environmental awareness",
//       points: 5,
//     },
//     {
//       question: "Which technology is most promising for carbon utilization?",
//       options: ["Concrete production", "Fuel synthesis", "Plastic production", "Chemical manufacturing"],
//       answer: "Fuel synthesis",
//       points: 9,
//     },
//     {
//       question: "What is the main driver of environmental policy?",
//       options: ["Science", "Economics", "Politics", "Public pressure"],
//       answer: "Public pressure",
//       points: 7,
//     },
//     {
//       question: "Which environmental indicator is most comprehensive?",
//       options: ["Carbon footprint", "Ecological footprint", "Water footprint", "Energy footprint"],
//       answer: "Ecological footprint",
//       points: 8,
//     },
//     {
//       question: "What is the primary goal of environmental restoration?",
//       options: ["Beautification", "Ecosystem function recovery", "Species reintroduction", "Habitat creation"],
//       answer: "Ecosystem function recovery",
//       points: 7,
//     },
//     {
//       question: "Which renewable energy technology is advancing fastest?",
//       options: ["Solar efficiency", "Wind turbine size", "Battery storage", "Grid integration"],
//       answer: "Battery storage",
//       points: 8,
//     },
//     {
//       question: "What is the most effective climate adaptation strategy?",
//       options: ["Technology", "Infrastructure", "Ecosystem-based adaptation", "Migration"],
//       answer: "Ecosystem-based adaptation",
//       points: 9,
//     },
//     {
//       question: "Which environmental challenge requires the most urgent action?",
//       options: ["Climate change", "Biodiversity loss", "Pollution", "Resource depletion"],
//       answer: "Climate change",
//       points: 6,
//     },
//     {
//       question: "What is the main barrier to environmental sustainability?",
//       options: ["Technology", "Economics", "Politics", "Behavior"],
//       answer: "Behavior",
//       points: 8,
//     },
//     {
//       question: "Which approach is most effective for environmental protection?",
//       options: ["Regulation", "Market mechanisms", "Education", "Integrated approach"],
//       answer: "Integrated approach",
//       points: 9,
//     },
//     {
//       question: "What is the ultimate goal of environmental science?",
//       options: ["Understanding nature", "Solving environmental problems", "Conservation", "Sustainability"],
//       answer: "Solving environmental problems",
//       points: 7,
//     },
//     {
//       question: "Which factor most determines environmental policy success?",
//       options: ["Design", "Implementation", "Monitoring", "Enforcement"],
//       answer: "Implementation",
//       points: 8,
//     },
//     {
//       question: "What is the most important environmental skill for the future?",
//       options: ["Technical knowledge", "Systems thinking", "Communication", "Leadership"],
//       answer: "Systems thinking",
//       points: 10,
//     },
//   ]

//   // Background music functions
//   const initAudioContext = useCallback(() => {
//     if (!audioContextRef.current && audioInitialized) {
//       try {
//         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
//         if (audioContextRef.current.state === "suspended") {
//           audioContextRef.current.resume()
//         }
//       } catch (error) {
//         console.log("Audio context creation failed:", error)
//       }
//     }
//     return audioContextRef.current
//   }, [audioInitialized])

//   const initializeAudio = useCallback(() => {
//     if (!audioInitialized) {
//       setAudioInitialized(true)
//       try {
//         const context = new (window.AudioContext || window.webkitAudioContext)()
//         if (context.state === "suspended") {
//           context.resume()
//         }
//         audioContextRef.current = context
//       } catch (error) {
//         console.log("Audio initialization failed:", error)
//       }
//     }
//   }, [audioInitialized])

//   const startBackgroundMusic = useCallback(() => {
//     if (!backgroundMusicEnabled || backgroundMusicRef.current || !audioInitialized) return

//     try {
//       const audioContext = initAudioContext()
//       if (!audioContext) return

//       const createTone = (freq, startTime, duration, volume = 0.08) => {
//         const oscillator = audioContext.createOscillator()
//         const gainNode = audioContext.createGain()

//         oscillator.connect(gainNode)
//         gainNode.connect(audioContext.destination)

//         oscillator.frequency.setValueAtTime(freq, startTime)
//         oscillator.type = "sine"

//         gainNode.gain.setValueAtTime(volume, startTime)
//         gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

//         oscillator.start(startTime)
//         oscillator.stop(startTime + duration)
//       }

//       // More engaging melody with nature-inspired progression
//       const mainMelody = [
//         261.63,
//         329.63,
//         392.0,
//         523.25,
//         440.0,
//         349.23,
//         293.66,
//         261.63, // C-E-G-C-A-F-D-C
//         293.66,
//         369.99,
//         440.0,
//         587.33,
//         523.25,
//         415.3,
//         349.23,
//         293.66, // D-F#-A-D-C-G#-F-D
//       ]

//       const harmonyNotes = [
//         130.81,
//         164.81,
//         196.0,
//         261.63,
//         220.0,
//         174.61,
//         146.83,
//         130.81, // Lower octave harmony
//         146.83,
//         185.0,
//         220.0,
//         293.66,
//         261.63,
//         207.65,
//         174.61,
//         146.83,
//       ]

//       let currentTime = audioContext.currentTime

//       const playMelodyLoop = () => {
//         if (audioContext.state === "suspended") {
//           audioContext.resume()
//         }

//         // Play main melody
//         mainMelody.forEach((freq, index) => {
//           createTone(freq, currentTime + index * 0.4, 0.35, 0.06)
//         })

//         // Play harmony (softer)
//         harmonyNotes.forEach((freq, index) => {
//           createTone(freq, currentTime + index * 0.4, 0.35, 0.03)
//         })

//         currentTime += mainMelody.length * 0.4 + 1 // Small gap between loops
//       }

//       // Start the continuous loop
//       const playLoop = () => {
//         playMelodyLoop()
//         backgroundMusicRef.current = setTimeout(playLoop, (mainMelody.length * 0.4 + 1) * 1000)
//       }

//       playLoop() // Start immediately
//     } catch (error) {
//       console.log("Background music not supported:", error)
//     }
//   }, [backgroundMusicEnabled, audioInitialized, initAudioContext])

//   const stopBackgroundMusic = useCallback(() => {
//     if (backgroundMusicRef.current) {
//       clearTimeout(backgroundMusicRef.current)
//       backgroundMusicRef.current = null
//     }
//   }, [])

//   const toggleBackgroundMusic = useCallback(() => {
//     setBackgroundMusicEnabled(!backgroundMusicEnabled)
//     if (backgroundMusicEnabled) {
//       stopBackgroundMusic()
//     } else if (gameStarted && audioInitialized) {
//       startBackgroundMusic()
//     }
//   }, [backgroundMusicEnabled, gameStarted, audioInitialized, startBackgroundMusic, stopBackgroundMusic])

//   // Sound effects functions
//   const playSound = useCallback(
//     (frequency, duration, type = "sine", volume = 0.2) => {
//       if (!audioInitialized) return

//       try {
//         const audioContext = initAudioContext()
//         if (!audioContext) return

//         if (audioContext.state === "suspended") {
//           audioContext.resume()
//         }

//         const oscillator = audioContext.createOscillator()
//         const gainNode = audioContext.createGain()

//         oscillator.connect(gainNode)
//         gainNode.connect(audioContext.destination)

//         oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
//         oscillator.type = type

//         gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
//         gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

//         oscillator.start(audioContext.currentTime)
//         oscillator.stop(audioContext.currentTime + duration)
//       } catch (error) {
//         console.log("Audio not supported:", error)
//       }
//     },
//     [initAudioContext, audioInitialized],
//   )

//   const playCorrectSound = useCallback(() => {
//     playSound(523, 0.2) // C note
//     setTimeout(() => playSound(659, 0.2), 100) // E note
//     setTimeout(() => playSound(784, 0.3), 200) // G note
//   }, [playSound])

//   const playIncorrectSound = useCallback(() => {
//     playSound(200, 0.5, "sawtooth")
//   }, [playSound])

//   const playDiceSound = useCallback(() => {
//     playSound(400, 0.1, "square")
//   }, [playSound])

//   const playMoveSound = useCallback(() => {
//     playSound(300, 0.1)
//   }, [playSound])

//   const playWinSound = useCallback(() => {
//     const notes = [523, 659, 784, 1047] // C, E, G, C
//     notes.forEach((note, index) => {
//       setTimeout(() => playSound(note, 0.3), index * 150)
//     })
//   }, [playSound])

//   const playSlideSound = useCallback(() => {
//     playSound(800, 0.1)
//     setTimeout(() => playSound(600, 0.1), 50)
//     setTimeout(() => playSound(400, 0.2), 100)
//   }, [playSound])

//   const playClimbSound = useCallback(() => {
//     playSound(400, 0.1)
//     setTimeout(() => playSound(600, 0.1), 50)
//     setTimeout(() => playSound(800, 0.2), 100)
//   }, [playSound])

//   // Timer management functions
//   const setManagedTimeout = useCallback((callback, delay) => {
//     const start = Date.now()
//     const id = setTimeout(() => {
//       timersRef.current = timersRef.current.filter((t) => t.id !== id)
//       callback()
//     }, delay)
//     timersRef.current.push({ id, type: "timeout", callback, delay, start })
//     return id
//   }, [])

//   const clearManagedTimers = useCallback(() => {
//     timersRef.current.forEach((timer) => {
//       if (timer.type === "timeout") clearTimeout(timer.id)
//       else if (timer.type === "interval") clearInterval(timer.id)
//     })
//     timersRef.current = []
//   }, [])

//   // Game functions
//   const showMessage = useCallback((text, duration = 3000) => {
//     setMessage(text)
//     if (messageTimeoutRef.current) {
//       clearTimeout(messageTimeoutRef.current)
//     }
//     if (duration > 0) {
//       messageTimeoutRef.current = setTimeout(() => {
//         setMessage("")
//       }, duration)
//     }
//   }, [])

//   const getRandomQuestion = useCallback(() => {
//     if (questions.length === 0) return null

//     // Reset used questions if we've used them all
//     if (usedQuestions.length >= questions.length) {
//       setUsedQuestions([])
//     }

//     // Get available questions (not used recently)
//     const availableQuestions = questions.filter((q) => !usedQuestions.includes(q))

//     if (availableQuestions.length === 0) {
//       // Fallback: use any question if somehow no questions are available
//       const randomIndex = Math.floor(Math.random() * questions.length)
//       return questions[randomIndex]
//     }

//     // Select random question from available ones
//     const randomIndex = Math.floor(Math.random() * availableQuestions.length)
//     const selectedQuestion = availableQuestions[randomIndex]

//     // Add to used questions
//     setUsedQuestions((prev) => [...prev, selectedQuestion])

//     return selectedQuestion
//   }, [usedQuestions, questions])

//   // Fixed positioning function - start from bottom-right corner (position 1)
//   const getCellPosition = (cellNumber) => {
//     const size = 10
//     const cellSize = 100 / size

//     // Calculate which row from bottom this cell is in
//     const rowFromBottom = Math.floor((cellNumber - 1) / size)
//     const positionInRow = (cellNumber - 1) % size

//     let col
//     if (rowFromBottom % 2 === 0) {
//       // Even rows from bottom: right to left
//       col = size - 1 - positionInRow
//     } else {
//       // Odd rows from bottom: left to right
//       col = positionInRow
//     }

//     // Convert to actual grid position (row 0 is at top in CSS grid)
//     const actualRow = size - 1 - rowFromBottom

//     return {
//       left: `${col * cellSize + cellSize / 2}%`,
//       top: `${actualRow * cellSize + cellSize / 2}%`,
//     }
//   }

//   const generateBoard = () => {
//     const cells = []
//     const size = 10

//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         // Calculate cell number for snake pattern starting from bottom-right
//         const rowFromBottom = size - 1 - row
//         let num

//         if (rowFromBottom % 2 === 0) {
//           // Even rows from bottom: right to left (1-10, 21-30, 41-50, etc.)
//           num = rowFromBottom * size + (size - col)
//         } else {
//           // Odd rows from bottom: left to right (11-20, 31-40, 51-60, etc.)
//           num = rowFromBottom * size + col + 1
//         }

//         const carbonLoss = carbonLosses.find((loss) => loss.from === num)
//         const resource = naturalResources.find((res) => res.from === num)

//         let cellClass = "cell"
//         let title = ""

//         if (carbonLoss) {
//           cellClass += " carbon-loss-cell"
//           title = `${carbonLoss.name}: slides to ${carbonLoss.to}`
//         } else if (resource) {
//           cellClass += " natural-resource-cell"
//           title = `${resource.name}: climbs to ${resource.to}`
//         }

//         cells.push(
//           <div key={num} className={cellClass} title={title}>
//             <span className="cell-number">{num}</span>
//             {carbonLoss && <span className="cell-emoji">{carbonLoss.emoji}</span>}
//             {resource && <span className="cell-emoji">{resource.emoji}</span>}
//           </div>,
//         )
//       }
//     }
//     return cells
//   }

//   const initializePlayers = (numPlayers) => {
//     const newPlayers = []
//     const singlePlayer = numPlayers === 1
//     setIsSinglePlayer(singlePlayer)
//     setGameOver(false)

//     for (let i = 0; i < numPlayers; i++) {
//       newPlayers.push({
//         id: i,
//         name: singlePlayer ? "You" : `Player ${i + 1}`,
//         color: playerStyles[i].color,
//         borderColor: playerStyles[i].borderColor,
//         emoji: playerStyles[i].emoji,
//         emojiName: playerStyles[i].emojiName,
//         position: 1,
//         correctAnswers: 0,
//         totalPoints: 0,
//         lastCorrectPoints: 0,
//       })
//     }

//     setPlayers(newPlayers)
//     setCurrentPlayerIndex(0)
//     setUsedQuestions([])
//     setGameStarted(true)
//   }

//   const startGame = () => {
//     initializeAudio()
//     initializePlayers(numPlayers)
//     startBackgroundMusic()
//   }

//   const showQuestionForCurrentPlayer = () => {
//     if (gameOver || isPaused || players.length === 0) return

//     const player = players[currentPlayerIndex]
//     if (!player) return

//     showMessage(isSinglePlayer ? "Your turn" : `${player.name}'s turn`, 0)

//     const question = getRandomQuestion()
//     if (!question) {
//       showMessage(isSinglePlayer ? "No more questions! Game over!" : "No more questions available!")
//       setGameOver(true)
//       return
//     }

//     setCurrentQuestion(question)
//     setQuestionFlipped(false)
//     setShowQuestion(true)
//   }

//   const processAnswer = (selectedOption) => {
//     if (isPaused || !currentQuestion) return

//     setSelectedAnswer(selectedOption)
//     const isCorrect = selectedOption === currentQuestion.answer
//     const currentPlayer = players[currentPlayerIndex]
//     const points = currentQuestion.points

//     if (isCorrect) {
//       playCorrectSound()
//       setPlayers((prev) =>
//         prev.map((player) =>
//           player.id === currentPlayerIndex
//             ? {
//                 ...player,
//                 correctAnswers: player.correctAnswers + 1,
//                 totalPoints: player.totalPoints + points,
//                 lastCorrectPoints: points,
//               }
//             : player,
//         ),
//       )
//     } else {
//       playIncorrectSound()
//     }

//     setQuestionFlipped(true)

//     setManagedTimeout(() => {
//       setShowQuestion(false)
//       setQuestionFlipped(false)

//       if (isCorrect) {
//         setShowDice(true)
//         rollDice(points)
//       } else {
//         nextTurn()
//       }
//     }, 2000)
//   }

//   const rollDice = (finalNumber) => {
//     setDiceRolling(true)
//     setDiceValue(finalNumber)

//     const interval = setInterval(() => {
//       playDiceSound()
//       setDiceValue(Math.floor(Math.random() * 10) + 1)
//     }, 100)

//     setManagedTimeout(() => {
//       clearInterval(interval)
//       setDiceValue(finalNumber)
//       setDiceRolling(false)

//       setManagedTimeout(() => {
//         movePlayer(finalNumber)
//       }, 1000)
//     }, 1000)
//   }

//   const movePlayer = (points) => {
//     const currentPlayer = players[currentPlayerIndex]
//     const remainingSquares = 100 - currentPlayer.position

//     if (points <= remainingSquares) {
//       const newPos = currentPlayer.position + points
//       playMoveSound()

//       setPlayers((prev) =>
//         prev.map((player) => (player.id === currentPlayerIndex ? { ...player, position: newPos } : player)),
//       )

//       // Check for special squares
//       const carbonLoss = carbonLosses.find((loss) => loss.from === newPos)
//       const resource = naturalResources.find((res) => res.from === newPos)

//       if (carbonLoss) {
//         playSlideSound()
//         const pointsLost = currentPlayer.lastCorrectPoints
//         setPlayers((prev) =>
//           prev.map((player) =>
//             player.id === currentPlayerIndex
//               ? {
//                   ...player,
//                   position: carbonLoss.to,
//                   totalPoints: Math.max(0, player.totalPoints - pointsLost),
//                 }
//               : player,
//           ),
//         )
//         showMessage(
//           isSinglePlayer
//             ? `You contributed to ${carbonLoss.name} ${carbonLoss.emoji}! Slide to ${carbonLoss.to}. Lost ${pointsLost} points!`
//             : `${currentPlayer.name} contributed to ${carbonLoss.name} ${carbonLoss.emoji}! Slide to ${carbonLoss.to}. Lost ${pointsLost} points!`,
//         )
//       } else if (resource) {
//         playClimbSound()
//         const pointsGained = 2 * currentPlayer.lastCorrectPoints
//         setPlayers((prev) =>
//           prev.map((player) =>
//             player.id === currentPlayerIndex
//               ? {
//                   ...player,
//                   position: resource.to,
//                   totalPoints: player.totalPoints + pointsGained,
//                 }
//               : player,
//           ),
//         )
//         showMessage(
//           isSinglePlayer
//             ? `You conserved ${resource.name} ${resource.emoji}! Climb to ${resource.to}. Gained ${pointsGained} points!`
//             : `${currentPlayer.name} conserved ${resource.name} ${resource.emoji}! Climb to ${resource.to}. Gained ${pointsGained} points!`,
//         )
//       }

//       if (newPos === 100 || (resource && resource.to === 100) || (carbonLoss && carbonLoss.to === 100)) {
//         playWinSound()
//         stopBackgroundMusic()
//         showMessage(isSinglePlayer ? "🎉 You won! 🎉" : `🎉 ${currentPlayer.name} won! 🎉`, 0)
//         setShowWin(true)
//         setGameOver(true)
//         return
//       }
//     } else {
//       showMessage(
//         isSinglePlayer
//           ? `You need ${remainingSquares} or less to win! Try again.`
//           : `${currentPlayer.name} needs ${remainingSquares} or less to win! Try again.`,
//         2000,
//       )
//     }

//     setManagedTimeout(() => {
//       nextTurn()
//     }, 1000)
//   }

//   const nextTurn = () => {
//     if (isPaused || gameOver) return
//     setShowDice(false)
//     if (!isSinglePlayer) {
//       setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
//     }
//     setManagedTimeout(() => {
//       if (players.length > 0) {
//         showQuestionForCurrentPlayer()
//       }
//     }, 1000)
//   }

//   const togglePause = () => {
//     setIsPaused(!isPaused)
//     if (!isPaused) {
//       showMessage("Game Paused", 0)
//       clearManagedTimers()
//       stopBackgroundMusic()
//     } else {
//       showMessage("Game Resumed", 2000)
//       if (gameStarted) startBackgroundMusic()
//     }
//   }

//   const restartGame = () => {
//     setGameOver(false)
//     setIsPaused(false)
//     setPlayers([])
//     setCurrentPlayerIndex(0)
//     setUsedQuestions([])
//     setGameStarted(false)
//     setShowQuestion(false)
//     setShowWin(false)
//     setShowDice(false)
//     setShowRules(false)
//     clearManagedTimers()
//     stopBackgroundMusic()
//     showMessage("Game Restarted!", 2000)
//   }

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       clearManagedTimers()
//       stopBackgroundMusic()
//       if (messageTimeoutRef.current) {
//         clearTimeout(messageTimeoutRef.current)
//       }
//       if (audioContextRef.current) {
//         audioContextRef.current.close()
//       }
//     }
//   }, [clearManagedTimers, stopBackgroundMusic])

//   useEffect(() => {
//     if (gameStarted && players.length > 0 && !gameOver && !isPaused) {
//       showQuestionForCurrentPlayer()
//     }
//   }, [gameStarted, players.length])

//   return (
//     <div className={`eco-voyage-container ${isPaused ? "paused" : ""} `}>
//       <header className="header">
//         <button className="burger-menu" onClick={() => setShowRules(!showRules)} aria-label="Open rules menu">
//           ☰
//         </button>
//         <h1 className="main-title">Eco Voyage: Reach the Peak</h1>
//         <button className="music-toggle" onClick={toggleBackgroundMusic} aria-label="Toggle background music">
//           {backgroundMusicEnabled ? "🔊" : "🔇"}
//         </button>
//         <button
//           className={`pause-btn ${isPaused ? "paused" : ""}`}
//           onClick={togglePause}
//           aria-label={isPaused ? "Resume game" : "Pause game"}
//         >
//           {isPaused ? "▶" : "⏸"}
//         </button>
//         <button className="restart-btn" onClick={restartGame} aria-label="Restart game">
//           🔄
//         </button>
//       </header>

//       <div className={`rules-sidebar ${showRules ? "active" : ""}`}>
//         <button className="close-rules" onClick={() => setShowRules(false)} aria-label="Close rules menu">
//           ✕
//         </button>
//         <h2>Game Rules</h2>
//         <ul>
//           <li>Select 1–4 players and click "Start Game."</li>
//           <li>Answer sustainability questions of varying difficulty (2-10 points).</li>
//           <li>Correct answers let you roll dice and move forward by the points earned.</li>
//           <li>Natural resources (🌳☀🌬) help you climb forward and gain double points.</li>
//           <li>Carbon losses (🏭🪓🧊) make you slide backward and lose points.</li>
//           <li>First player to reach square 100 wins!</li>
//           <li>Use ⏸ to pause, 🔄 to restart, and 🔊/🔇 to toggle music.</li>
//           <li>Tokens start from the bottom-right corner (position 1).</li>
//         </ul>
//       </div>

//       {gameStarted && (
//         <div className={`score-board ${gameStarted ? "visible" : ""}`}>
//           {players.map((player, index) => (
//             <div
//               key={player.id}
//               className="player-score"
//               style={{ borderLeft: `4px solid ${playerStyles[index].borderColor}` }}
//             >
//               <span>
//                 <span className="emoji">{playerStyles[index].emoji}</span>
//                 {player.name}
//               </span>
//               <br />
//               Position: {player.position}
//               <br />
//               Correct: {player.correctAnswers}
//               <br />
//               Points: {player.totalPoints}
//             </div>
//           ))}
//         </div>
//       )}

//       {!gameStarted && (
//         <div className="player-selection">
//           <label htmlFor="numPlayers">Select number of players:</label>
//           <select id="numPlayers" value={numPlayers} onChange={(e) => setNumPlayers(Number.parseInt(e.target.value))}>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//           </select>
//           <button className="start-game-btn" onClick={startGame}>
//             Start Game
//           </button>
//         </div>
//       )}

//       <div className={`game-board ${showQuestion ? "question-active" : ""}`}>
//         {generateBoard()}
//         {/* Render players */}
//         {players.map((player, index) => {
//           const position = getCellPosition(player.position)
//           return (
//             <div
//               key={player.id}
//               className="player"
//               style={{
//                 background: player.color,
//                 border: `3px solid ${player.borderColor}`,
//                 left: position.left,
//                 top: position.top,
//               }}
//             >
//               {player.emoji}
//             </div>
//           )
//         })}
//       </div>

//       <div className="game-message">{message}</div>

//       {/* Question Area */}
//       <div className={`question-area ${showQuestion ? "visible" : ""}`}>
//         <div className={`flip-card ${questionFlipped ? "flipped" : ""}`}>
//           <div className="flip-card-inner">
//             <div className="flip-card-front">
//               <p className="question-text">{currentQuestion?.question}</p>
//               <p className="question-points">Points: {currentQuestion?.points}</p>
//               <div className="options">
//                 {currentQuestion?.options.map((option, index) => (
//                   <button key={index} className="option-btn" onClick={() => processAnswer(option)} disabled={isPaused}>
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flip-card-back">
//               <p className="answer-result">
//                 {currentQuestion && questionFlipped
//                   ? selectedAnswer === currentQuestion.answer
//                     ? `Correct! +${currentQuestion.points} points`
//                     : `Incorrect! Answer: ${currentQuestion.answer}`
//                   : ""}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Win Card */}
//       <div className={`win-card ${showWin ? "visible" : ""}`}>
//         <div className={`flip-card ${winFlipped ? "flipped" : ""}`}>
//           <div className="flip-card-inner">
//             <div className="win-front">
//               <p className="win-message">🎉 Congratulations! 🎉 🐼</p>
//               <p className="win-stats">
//                 Correct Answers: {players[currentPlayerIndex]?.correctAnswers}
//                 <br />
//                 Total Points: {players[currentPlayerIndex]?.totalPoints}
//               </p>
//             </div>
//             <div className="win-back">
//               <p className="coin-reward">
//                 Collected Coins: {players[currentPlayerIndex]?.totalPoints} <span className="coin">🪙</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dice Area */}
//       <div className={`dice-area ${showDice ? "visible" : ""} ${diceRolling ? "rolling" : ""}`}>
//         <div className="dice-number">{diceValue}</div>
//       </div>

//       {/* Energy Icons */}
//       <div className="energy-icons">
//         <div className="tooltip">
//           <div className="energy-icon">☀️</div>
//           <span className="tooltiptext">Solar Energy: Harnesses sunlight to generate electricity.</span>
//         </div>
//         <div className="tooltip">
//           <div className="energy-icon">🌬️</div>
//           <span className="tooltiptext">Wind Energy: Uses wind turbines to produce power.</span>
//         </div>
//         <div className="tooltip">
//           <div className="energy-icon">💧</div>
//           <span className="tooltiptext">Hydropower: Generates energy from flowing water.</span>
//         </div>
//         <div className="tooltip">
//           <div className="energy-icon">🌱</div>
//           <span className="tooltiptext">Bio Energy: Derived from organic materials like plants.</span>
//         </div>
//         <div className="tooltip">
//           <div className="energy-icon">🌍</div>
//           <span className="tooltiptext">Earth & Nature: Promotes sustainable ecosystems.</span>
//         </div>
//       </div>
//     </div>
//   )
// }
// src/App.jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserDashboard from './userDashboard';
import OrgDashboard from './orgDashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
     <Route path="/userDashboard" element={<UserDashboard />} />
  <Route path="/orgDashboard" element={<OrgDashboard />} />
    </Routes>
  );
}

export default App;
