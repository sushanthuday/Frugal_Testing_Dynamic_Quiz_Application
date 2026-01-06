/**
 * Quiz Questions Database
 * Contains questions for multiple categories and difficulty levels
 */

const questionsDatabase = {
    // ========================================
    // GENERAL KNOWLEDGE
    // ========================================
    general: {
        easy: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correctAnswer: 2
            },
            {
                question: "How many continents are there on Earth?",
                options: ["5", "6", "7", "8"],
                correctAnswer: 2
            },
            {
                question: "What is the largest planet in our solar system?",
                options: ["Earth", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 2
            },
            {
                question: "What color is the sky on a clear day?",
                options: ["Green", "Blue", "Red", "Yellow"],
                correctAnswer: 1
            },
            {
                question: "How many days are in a week?",
                options: ["5", "6", "7", "8"],
                correctAnswer: 2
            },
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1
            },
            {
                question: "What animal is known as 'man's best friend'?",
                options: ["Cat", "Dog", "Fish", "Bird"],
                correctAnswer: 1
            },
            {
                question: "What is the primary color of grass?",
                options: ["Blue", "Yellow", "Green", "Red"],
                correctAnswer: 2
            },
            {
                question: "How many legs does a spider have?",
                options: ["6", "8", "10", "4"],
                correctAnswer: 1
            },
            {
                question: "What is the opposite of 'hot'?",
                options: ["Warm", "Cold", "Mild", "Cool"],
                correctAnswer: 1
            },
            {
                question: "What do bees produce?",
                options: ["Milk", "Honey", "Silk", "Wax"],
                correctAnswer: 1
            },
            {
                question: "How many months are in a year?",
                options: ["10", "11", "12", "13"],
                correctAnswer: 2
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Pacific", "Arctic"],
                correctAnswer: 2
            },
            {
                question: "What fruit is known for keeping the doctor away?",
                options: ["Banana", "Orange", "Apple", "Grape"],
                correctAnswer: 2
            },
            {
                question: "What is the primary language spoken in Brazil?",
                options: ["Spanish", "Portuguese", "English", "French"],
                correctAnswer: 1
            }
        ],
        medium: [
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Mercury"],
                correctAnswer: 1
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correctAnswer: 2
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
                correctAnswer: 2
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                correctAnswer: 1
            },
            {
                question: "In which year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                correctAnswer: 2
            },
            {
                question: "What is the currency of Japan?",
                options: ["Yuan", "Won", "Yen", "Ringgit"],
                correctAnswer: 2
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                correctAnswer: 1
            },
            {
                question: "What is the tallest mountain in the world?",
                options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
                correctAnswer: 1
            },
            {
                question: "What is the largest mammal on Earth?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                correctAnswer: 1
            },
            {
                question: "How many bones are in the adult human body?",
                options: ["186", "206", "226", "246"],
                correctAnswer: 1
            },
            {
                question: "What is the capital of Australia?",
                options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                correctAnswer: 2
            },
            {
                question: "Who discovered penicillin?",
                options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
                correctAnswer: 1
            },
            {
                question: "What is the largest desert in the world?",
                options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
                correctAnswer: 3
            },
            {
                question: "How many players are on a soccer team on the field?",
                options: ["9", "10", "11", "12"],
                correctAnswer: 2
            },
            {
                question: "What is the main ingredient in guacamole?",
                options: ["Tomato", "Avocado", "Onion", "Pepper"],
                correctAnswer: 1
            }
        ],
        hard: [
            {
                question: "What is the capital of Mongolia?",
                options: ["Ulaanbaatar", "Astana", "Bishkek", "Dushanbe"],
                correctAnswer: 0
            },
            {
                question: "In what year was the United Nations founded?",
                options: ["1942", "1943", "1944", "1945"],
                correctAnswer: 3
            },
            {
                question: "What is the rarest blood type in humans?",
                options: ["O Negative", "AB Negative", "B Negative", "A Negative"],
                correctAnswer: 1
            },
            {
                question: "Who was the first woman to win a Nobel Prize?",
                options: ["Marie Curie", "Dorothy Hodgkin", "Irène Joliot-Curie", "Barbara McClintock"],
                correctAnswer: 0
            },
            {
                question: "What is the deepest point in the ocean called?",
                options: ["Mariana Trench", "Challenger Deep", "Tonga Trench", "Puerto Rico Trench"],
                correctAnswer: 1
            },
            {
                question: "What is the speed of light in vacuum (approximate)?",
                options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
                correctAnswer: 0
            },
            {
                question: "Which element has the highest melting point?",
                options: ["Tungsten", "Carbon", "Rhenium", "Osmium"],
                correctAnswer: 1
            },
            {
                question: "Who wrote 'War and Peace'?",
                options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],
                correctAnswer: 1
            },
            {
                question: "What is the largest organ in the human body?",
                options: ["Liver", "Brain", "Skin", "Lungs"],
                correctAnswer: 2
            },
            {
                question: "In which country was the game of chess invented?",
                options: ["China", "India", "Persia", "Greece"],
                correctAnswer: 1
            },
            {
                question: "What is the half-life of Carbon-14?",
                options: ["3,730 years", "5,730 years", "7,730 years", "9,730 years"],
                correctAnswer: 1
            },
            {
                question: "Who was the first person to circumnavigate the globe?",
                options: ["Christopher Columbus", "Ferdinand Magellan", "Juan Sebastián Elcano", "Vasco da Gama"],
                correctAnswer: 2
            },
            {
                question: "What is the most abundant gas in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                correctAnswer: 2
            },
            {
                question: "In which year did the Berlin Wall fall?",
                options: ["1987", "1988", "1989", "1990"],
                correctAnswer: 2
            },
            {
                question: "What is the smallest prime number?",
                options: ["0", "1", "2", "3"],
                correctAnswer: 2
            }
        ]
    },

    // ========================================
    // SCIENCE
    // ========================================
    science: {
        easy: [
            {
                question: "What is H2O commonly known as?",
                options: ["Salt", "Sugar", "Water", "Oil"],
                correctAnswer: 2
            },
            {
                question: "What planet do we live on?",
                options: ["Mars", "Venus", "Earth", "Jupiter"],
                correctAnswer: 2
            },
            {
                question: "What is the center of an atom called?",
                options: ["Electron", "Proton", "Nucleus", "Neutron"],
                correctAnswer: 2
            },
            {
                question: "What gas do plants absorb from the air?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                correctAnswer: 2
            },
            {
                question: "How many planets are in our solar system?",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1
            },
            {
                question: "What is the closest star to Earth?",
                options: ["Proxima Centauri", "Sun", "Sirius", "Alpha Centauri"],
                correctAnswer: 1
            },
            {
                question: "What do we call animals that eat only plants?",
                options: ["Carnivores", "Herbivores", "Omnivores", "Insectivores"],
                correctAnswer: 1
            },
            {
                question: "What is the boiling point of water in Celsius?",
                options: ["90°C", "100°C", "110°C", "120°C"],
                correctAnswer: 1
            },
            {
                question: "What force keeps us on the ground?",
                options: ["Magnetism", "Friction", "Gravity", "Tension"],
                correctAnswer: 2
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Platinum"],
                correctAnswer: 2
            },
            {
                question: "What part of the plant conducts photosynthesis?",
                options: ["Roots", "Stem", "Leaves", "Flowers"],
                correctAnswer: 2
            },
            {
                question: "How many bones does a newborn baby have?",
                options: ["About 200", "About 270", "About 300", "About 350"],
                correctAnswer: 2
            },
            {
                question: "What is the chemical symbol for oxygen?",
                options: ["Ox", "O", "O2", "Om"],
                correctAnswer: 1
            },
            {
                question: "What organ pumps blood through the body?",
                options: ["Brain", "Lungs", "Heart", "Liver"],
                correctAnswer: 2
            },
            {
                question: "What is the freezing point of water in Celsius?",
                options: ["-10°C", "0°C", "10°C", "32°C"],
                correctAnswer: 1
            }
        ],
        medium: [
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
                correctAnswer: 2
            },
            {
                question: "What is the most abundant element in the universe?",
                options: ["Oxygen", "Carbon", "Helium", "Hydrogen"],
                correctAnswer: 3
            },
            {
                question: "What type of bond involves the sharing of electrons?",
                options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
                correctAnswer: 1
            },
            {
                question: "What is the pH of pure water?",
                options: ["5", "6", "7", "8"],
                correctAnswer: 2
            },
            {
                question: "Which planet has the most moons?",
                options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correctAnswer: 1
            },
            {
                question: "What is the process of water changing from liquid to gas?",
                options: ["Condensation", "Evaporation", "Precipitation", "Sublimation"],
                correctAnswer: 1
            },
            {
                question: "What is the atomic number of carbon?",
                options: ["4", "6", "8", "12"],
                correctAnswer: 1
            },
            {
                question: "What is Newton's first law of motion also known as?",
                options: ["Law of Acceleration", "Law of Inertia", "Law of Action-Reaction", "Law of Gravity"],
                correctAnswer: 1
            },
            {
                question: "What is the unit of electrical resistance?",
                options: ["Ampere", "Volt", "Ohm", "Watt"],
                correctAnswer: 2
            },
            {
                question: "What is the most common gas in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                correctAnswer: 2
            },
            {
                question: "What type of rock is formed from cooled lava?",
                options: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"],
                correctAnswer: 2
            },
            {
                question: "What is the human body's largest organ?",
                options: ["Heart", "Liver", "Skin", "Brain"],
                correctAnswer: 2
            },
            {
                question: "What is the speed of sound in air at room temperature?",
                options: ["243 m/s", "343 m/s", "443 m/s", "543 m/s"],
                correctAnswer: 1
            },
            {
                question: "Which vitamin is produced when skin is exposed to sunlight?",
                options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
                correctAnswer: 3
            },
            {
                question: "What is the chemical formula for table salt?",
                options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
                correctAnswer: 0
            }
        ],
        hard: [
            {
                question: "What is the Chandrasekhar limit?",
                options: ["1.4 solar masses", "2.4 solar masses", "3.4 solar masses", "4.4 solar masses"],
                correctAnswer: 0
            },
            {
                question: "What is the uncertainty principle associated with?",
                options: ["Einstein", "Heisenberg", "Bohr", "Planck"],
                correctAnswer: 1
            },
            {
                question: "What is the half-life of Uranium-238?",
                options: ["4.5 million years", "4.5 billion years", "45 million years", "450 million years"],
                correctAnswer: 1
            },
            {
                question: "What is the Schwarzschild radius?",
                options: ["Event horizon of a black hole", "Radius of a neutron star", "Radius of the Sun", "Orbital radius of Earth"],
                correctAnswer: 0
            },
            {
                question: "What is the Avogadro's number?",
                options: ["6.022 × 10^21", "6.022 × 10^22", "6.022 × 10^23", "6.022 × 10^24"],
                correctAnswer: 2
            },
            {
                question: "What is the process called when an atomic nucleus splits?",
                options: ["Nuclear Fusion", "Nuclear Fission", "Radioactive Decay", "Nuclear Binding"],
                correctAnswer: 1
            },
            {
                question: "What is the Krebs cycle also known as?",
                options: ["Glycolysis", "Citric Acid Cycle", "Calvin Cycle", "Electron Transport Chain"],
                correctAnswer: 1
            },
            {
                question: "What is the unit of inductance?",
                options: ["Farad", "Henry", "Tesla", "Weber"],
                correctAnswer: 1
            },
            {
                question: "What is the name of the particle that mediates the electromagnetic force?",
                options: ["Gluon", "W boson", "Photon", "Graviton"],
                correctAnswer: 2
            },
            {
                question: "What is the Planck constant's approximate value?",
                options: ["6.626 × 10^-34 J·s", "6.626 × 10^-32 J·s", "6.626 × 10^-36 J·s", "6.626 × 10^-30 J·s"],
                correctAnswer: 0
            },
            {
                question: "What is the name of the phenomenon where light bends around massive objects?",
                options: ["Refraction", "Diffraction", "Gravitational Lensing", "Total Internal Reflection"],
                correctAnswer: 2
            },
            {
                question: "What is the main component of natural gas?",
                options: ["Ethane", "Propane", "Butane", "Methane"],
                correctAnswer: 3
            },
            {
                question: "What is the escape velocity from Earth's surface?",
                options: ["11.2 km/s", "9.8 km/s", "15.4 km/s", "7.9 km/s"],
                correctAnswer: 0
            },
            {
                question: "What is the process of a solid changing directly to gas called?",
                options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
                correctAnswer: 2
            },
            {
                question: "What is the charge of an electron?",
                options: ["-1.6 × 10^-19 C", "+1.6 × 10^-19 C", "-9.1 × 10^-31 C", "+9.1 × 10^-31 C"],
                correctAnswer: 0
            }
        ]
    },

    // ========================================
    // MATHEMATICS
    // ========================================
    math: {
        easy: [
            {
                question: "What is 5 × 6?",
                options: ["25", "30", "35", "36"],
                correctAnswer: 1
            },
            {
                question: "What is 15 ÷ 3?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 2
            },
            {
                question: "What is 7 + 8?",
                options: ["13", "14", "15", "16"],
                correctAnswer: 2
            },
            {
                question: "How many sides does a triangle have?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 1
            },
            {
                question: "What is 100 - 37?",
                options: ["53", "63", "73", "83"],
                correctAnswer: 1
            },
            {
                question: "What is 9 × 9?",
                options: ["72", "81", "90", "99"],
                correctAnswer: 1
            },
            {
                question: "What is half of 50?",
                options: ["20", "25", "30", "35"],
                correctAnswer: 1
            },
            {
                question: "What is 12 × 12?",
                options: ["124", "134", "144", "154"],
                correctAnswer: 2
            },
            {
                question: "How many degrees are in a right angle?",
                options: ["45°", "60°", "90°", "180°"],
                correctAnswer: 2
            },
            {
                question: "What is 1000 ÷ 10?",
                options: ["10", "100", "1000", "10000"],
                correctAnswer: 1
            },
            {
                question: "What is 3²?",
                options: ["6", "9", "12", "27"],
                correctAnswer: 1
            },
            {
                question: "What is the next prime number after 7?",
                options: ["8", "9", "10", "11"],
                correctAnswer: 3
            },
            {
                question: "What is 25% of 80?",
                options: ["15", "20", "25", "30"],
                correctAnswer: 1
            },
            {
                question: "How many centimeters are in a meter?",
                options: ["10", "100", "1000", "10000"],
                correctAnswer: 1
            },
            {
                question: "What is the sum of angles in a triangle?",
                options: ["90°", "180°", "270°", "360°"],
                correctAnswer: 1
            }
        ],
        medium: [
            {
                question: "What is the square root of 144?",
                options: ["10", "11", "12", "13"],
                correctAnswer: 2
            },
            {
                question: "What is 15% of 200?",
                options: ["20", "25", "30", "35"],
                correctAnswer: 2
            },
            {
                question: "If x + 5 = 12, what is x?",
                options: ["5", "6", "7", "8"],
                correctAnswer: 2
            },
            {
                question: "What is the value of π (pi) to two decimal places?",
                options: ["3.12", "3.14", "3.16", "3.18"],
                correctAnswer: 1
            },
            {
                question: "What is 2^5?",
                options: ["16", "32", "64", "128"],
                correctAnswer: 1
            },
            {
                question: "What is the area of a rectangle with length 8 and width 5?",
                options: ["13", "26", "40", "48"],
                correctAnswer: 2
            },
            {
                question: "What is the greatest common factor of 12 and 18?",
                options: ["2", "3", "6", "9"],
                correctAnswer: 2
            },
            {
                question: "What is -5 + (-3)?",
                options: ["-8", "-2", "2", "8"],
                correctAnswer: 0
            },
            {
                question: "What is the perimeter of a square with side length 7?",
                options: ["14", "21", "28", "49"],
                correctAnswer: 2
            },
            {
                question: "What is 3/4 as a decimal?",
                options: ["0.25", "0.5", "0.75", "0.8"],
                correctAnswer: 2
            },
            {
                question: "What is the least common multiple of 4 and 6?",
                options: ["8", "10", "12", "24"],
                correctAnswer: 2
            },
            {
                question: "If 2x = 18, what is x?",
                options: ["6", "7", "8", "9"],
                correctAnswer: 3
            },
            {
                question: "What is the cube of 3?",
                options: ["9", "18", "27", "81"],
                correctAnswer: 2
            },
            {
                question: "What is 0.5 × 0.5?",
                options: ["0.1", "0.25", "0.5", "1"],
                correctAnswer: 1
            },
            {
                question: "What is the sum of the first 10 natural numbers?",
                options: ["45", "50", "55", "60"],
                correctAnswer: 2
            }
        ],
        hard: [
            {
                question: "What is the derivative of x³?",
                options: ["x²", "2x²", "3x²", "3x³"],
                correctAnswer: 2
            },
            {
                question: "What is the integral of 2x?",
                options: ["x", "x²", "2x²", "x² + C"],
                correctAnswer: 3
            },
            {
                question: "What is log₁₀(1000)?",
                options: ["2", "3", "4", "10"],
                correctAnswer: 1
            },
            {
                question: "What is the value of e (Euler's number) to two decimal places?",
                options: ["2.71", "2.72", "2.73", "2.74"],
                correctAnswer: 1
            },
            {
                question: "What is sin(90°)?",
                options: ["0", "0.5", "1", "√2/2"],
                correctAnswer: 2
            },
            {
                question: "What is the solution to the quadratic equation x² - 5x + 6 = 0?",
                options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 1, 5"],
                correctAnswer: 0
            },
            {
                question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
                options: ["1", "2", "e", "π"],
                correctAnswer: 2
            },
            {
                question: "What is the factorial of 6 (6!)?",
                options: ["120", "360", "720", "840"],
                correctAnswer: 2
            },
            {
                question: "What is the value of i² (where i is the imaginary unit)?",
                options: ["1", "-1", "i", "-i"],
                correctAnswer: 1
            },
            {
                question: "What is the sum of an arithmetic series with first term 1, last term 100, and 100 terms?",
                options: ["5000", "5050", "5100", "5150"],
                correctAnswer: 1
            },
            {
                question: "What is the determinant of a 2×2 matrix [[a,b],[c,d]]?",
                options: ["a+d-b-c", "ad+bc", "ad-bc", "ac-bd"],
                correctAnswer: 2
            },
            {
                question: "What is cos(0°)?",
                options: ["0", "0.5", "1", "-1"],
                correctAnswer: 2
            },
            {
                question: "What is the binomial coefficient C(5,2)?",
                options: ["5", "10", "15", "20"],
                correctAnswer: 1
            },
            {
                question: "What is the standard deviation of the data set {2, 4, 4, 4, 5, 5, 7, 9}?",
                options: ["1", "2", "3", "4"],
                correctAnswer: 1
            },
            {
                question: "What is the value of ln(e)?",
                options: ["0", "1", "e", "2.718"],
                correctAnswer: 1
            }
        ]
    },

    // ========================================
    // HISTORY
    // ========================================
    history: {
        easy: [
            {
                question: "Who was the first President of the United States?",
                options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
                correctAnswer: 2
            },
            {
                question: "In which year did World War I begin?",
                options: ["1912", "1914", "1916", "1918"],
                correctAnswer: 1
            },
            {
                question: "What ancient wonder was located in Egypt?",
                options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Temple of Artemis"],
                correctAnswer: 2
            },
            {
                question: "Who discovered America in 1492?",
                options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Amerigo Vespucci"],
                correctAnswer: 1
            },
            {
                question: "What was the name of the ship on which the Pilgrims sailed to America?",
                options: ["Santa Maria", "Mayflower", "Victory", "Endeavour"],
                correctAnswer: 1
            },
            {
                question: "Who was the leader of Nazi Germany?",
                options: ["Benito Mussolini", "Joseph Stalin", "Adolf Hitler", "Winston Churchill"],
                correctAnswer: 2
            },
            {
                question: "In which country were the ancient Olympic Games held?",
                options: ["Rome", "Egypt", "Greece", "Persia"],
                correctAnswer: 2
            },
            {
                question: "What empire was Julius Caesar a part of?",
                options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Persian Empire"],
                correctAnswer: 1
            },
            {
                question: "Who wrote the Declaration of Independence?",
                options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
                correctAnswer: 2
            },
            {
                question: "What was the name of the first man to walk on the moon?",
                options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "John Glenn"],
                correctAnswer: 1
            },
            {
                question: "What wall divided Berlin after World War II?",
                options: ["Great Wall", "Berlin Wall", "Iron Curtain", "Hadrian's Wall"],
                correctAnswer: 1
            },
            {
                question: "Who was the Egyptian queen known for her beauty?",
                options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Isis"],
                correctAnswer: 1
            },
            {
                question: "In which century did the Renaissance begin?",
                options: ["12th century", "14th century", "16th century", "18th century"],
                correctAnswer: 1
            },
            {
                question: "What was the name of the conflict between the North and South in America?",
                options: ["Revolutionary War", "Civil War", "World War", "Cold War"],
                correctAnswer: 1
            },
            {
                question: "Who was the first female Prime Minister of the United Kingdom?",
                options: ["Theresa May", "Margaret Thatcher", "Queen Victoria", "Elizabeth II"],
                correctAnswer: 1
            }
        ],
        medium: [
            {
                question: "In what year did the French Revolution begin?",
                options: ["1776", "1789", "1804", "1815"],
                correctAnswer: 1
            },
            {
                question: "Who was the first Emperor of Rome?",
                options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
                correctAnswer: 1
            },
            {
                question: "What treaty ended World War I?",
                options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Westphalia", "Treaty of Vienna"],
                correctAnswer: 1
            },
            {
                question: "Who led India's independence movement through non-violent protest?",
                options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh"],
                correctAnswer: 2
            },
            {
                question: "What was the main cause of the Black Death in the 14th century?",
                options: ["Cholera", "Typhoid", "Bubonic Plague", "Smallpox"],
                correctAnswer: 2
            },
            {
                question: "In which year did the Titanic sink?",
                options: ["1910", "1912", "1914", "1916"],
                correctAnswer: 1
            },
            {
                question: "Who was the longest-reigning British monarch?",
                options: ["Queen Victoria", "George III", "Elizabeth II", "Elizabeth I"],
                correctAnswer: 2
            },
            {
                question: "What was the Manhattan Project?",
                options: ["City planning initiative", "Atomic bomb development", "Space exploration program", "Economic recovery plan"],
                correctAnswer: 1
            },
            {
                question: "Who united the Mongol tribes and founded the Mongol Empire?",
                options: ["Kublai Khan", "Attila the Hun", "Genghis Khan", "Tamerlane"],
                correctAnswer: 2
            },
            {
                question: "What year did the Berlin Wall fall?",
                options: ["1985", "1987", "1989", "1991"],
                correctAnswer: 2
            },
            {
                question: "Who was the last Tsar of Russia?",
                options: ["Alexander II", "Alexander III", "Nicholas I", "Nicholas II"],
                correctAnswer: 3
            },
            {
                question: "What was the Reformation?",
                options: ["Economic reform", "Religious reform movement", "Military reform", "Educational reform"],
                correctAnswer: 1
            },
            {
                question: "In which year did Japan bomb Pearl Harbor?",
                options: ["1939", "1940", "1941", "1942"],
                correctAnswer: 2
            },
            {
                question: "Who was the first person to print books using movable type in Europe?",
                options: ["Leonardo da Vinci", "Johannes Gutenberg", "Galileo Galilei", "Nicolaus Copernicus"],
                correctAnswer: 1
            },
            {
                question: "What ancient civilization built Machu Picchu?",
                options: ["Mayans", "Aztecs", "Incas", "Olmecs"],
                correctAnswer: 2
            }
        ],
        hard: [
            {
                question: "What was the Treaty of Tordesillas (1494)?",
                options: ["Trade agreement", "Division of New World between Spain and Portugal", "Peace treaty ending a war", "Religious reformation document"],
                correctAnswer: 1
            },
            {
                question: "Who was the Byzantine Emperor during the fall of Constantinople in 1453?",
                options: ["Constantine X", "Constantine XI", "Justinian I", "Basil II"],
                correctAnswer: 1
            },
            {
                question: "What was the significance of the Battle of Hastings in 1066?",
                options: ["End of Roman Britain", "Norman conquest of England", "Viking invasion repelled", "Scottish independence"],
                correctAnswer: 1
            },
            {
                question: "Which dynasty built the Taj Mahal?",
                options: ["Delhi Sultanate", "Maurya Empire", "Mughal Empire", "Gupta Empire"],
                correctAnswer: 2
            },
            {
                question: "What was the Congress of Vienna (1814-1815)?",
                options: ["Economic summit", "Scientific conference", "Post-Napoleonic European reorganization", "Religious council"],
                correctAnswer: 2
            },
            {
                question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
                options: ["Joseph Stalin", "Leonid Brezhnev", "Nikita Khrushchev", "Mikhail Gorbachev"],
                correctAnswer: 2
            },
            {
                question: "What was the Meiji Restoration?",
                options: ["Chinese revolution", "Japanese modernization movement", "Korean unification", "Vietnamese independence"],
                correctAnswer: 1
            },
            {
                question: "In what year was the Magna Carta signed?",
                options: ["1066", "1215", "1415", "1515"],
                correctAnswer: 1
            },
            {
                question: "Who was the first Holy Roman Emperor?",
                options: ["Charlemagne", "Otto I", "Frederick Barbarossa", "Constantine the Great"],
                correctAnswer: 0
            },
            {
                question: "What was the main purpose of the Silk Road?",
                options: ["Military expansion", "Trade between East and West", "Religious pilgrimage", "Colonial exploration"],
                correctAnswer: 1
            },
            {
                question: "Who wrote 'The Prince', a political treatise?",
                options: ["Thomas More", "John Locke", "Niccolò Machiavelli", "Jean-Jacques Rousseau"],
                correctAnswer: 2
            },
            {
                question: "What event triggered World War I?",
                options: ["German invasion of Poland", "Assassination of Archduke Franz Ferdinand", "Sinking of the Lusitania", "Treaty of Versailles"],
                correctAnswer: 1
            },
            {
                question: "What was the Scramble for Africa?",
                options: ["African independence movements", "European colonization of Africa", "African civil wars", "Migration of African peoples"],
                correctAnswer: 1
            },
            {
                question: "Who was Hammurabi?",
                options: ["Egyptian Pharaoh", "Persian King", "Babylonian King known for his code of laws", "Greek philosopher"],
                correctAnswer: 2
            },
            {
                question: "What was the significance of the Rosetta Stone?",
                options: ["Religious artifact", "Key to deciphering Egyptian hieroglyphics", "Ancient map", "Royal decree"],
                correctAnswer: 1
            }
        ]
    },

    // ========================================
    // GEOGRAPHY
    // ========================================
    geography: {
        easy: [
            {
                question: "What is the largest continent?",
                options: ["Africa", "North America", "Asia", "Europe"],
                correctAnswer: 2
            },
            {
                question: "Which river is the longest in the world?",
                options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
                correctAnswer: 1
            },
            {
                question: "What is the capital of Japan?",
                options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                correctAnswer: 2
            },
            {
                question: "Which ocean is the largest?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correctAnswer: 3
            },
            {
                question: "What country has the most people?",
                options: ["United States", "India", "China", "Indonesia"],
                correctAnswer: 2
            },
            {
                question: "What is the smallest continent?",
                options: ["Europe", "Antarctica", "Australia", "South America"],
                correctAnswer: 2
            },
            {
                question: "In which country would you find the Eiffel Tower?",
                options: ["Italy", "Spain", "France", "Germany"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of Canada?",
                options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
                correctAnswer: 3
            },
            {
                question: "Which country is known as the Land of the Rising Sun?",
                options: ["China", "Japan", "Korea", "Thailand"],
                correctAnswer: 1
            },
            {
                question: "What desert is the largest in the world?",
                options: ["Gobi", "Sahara", "Arabian", "Antarctic"],
                correctAnswer: 3
            },
            {
                question: "What is the capital of Italy?",
                options: ["Milan", "Venice", "Rome", "Florence"],
                correctAnswer: 2
            },
            {
                question: "Which mountain range separates Europe from Asia?",
                options: ["Alps", "Himalayas", "Andes", "Ural Mountains"],
                correctAnswer: 3
            },
            {
                question: "What is the largest country by land area?",
                options: ["Canada", "United States", "China", "Russia"],
                correctAnswer: 3
            },
            {
                question: "On which continent is Egypt located?",
                options: ["Asia", "Europe", "Africa", "Middle East"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of Germany?",
                options: ["Munich", "Frankfurt", "Berlin", "Hamburg"],
                correctAnswer: 2
            }
        ],
        medium: [
            {
                question: "What is the capital of Australia?",
                options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                correctAnswer: 2
            },
            {
                question: "Which country has the most natural lakes?",
                options: ["Russia", "United States", "Canada", "Finland"],
                correctAnswer: 2
            },
            {
                question: "What is the deepest lake in the world?",
                options: ["Lake Superior", "Lake Baikal", "Lake Victoria", "Caspian Sea"],
                correctAnswer: 1
            },
            {
                question: "Which African country was never colonized?",
                options: ["Nigeria", "Kenya", "Ethiopia", "South Africa"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of New Zealand?",
                options: ["Auckland", "Christchurch", "Wellington", "Hamilton"],
                correctAnswer: 2
            },
            {
                question: "Which river flows through the Grand Canyon?",
                options: ["Mississippi River", "Colorado River", "Rio Grande", "Missouri River"],
                correctAnswer: 1
            },
            {
                question: "What is the only country that borders both France and the UK?",
                options: ["Belgium", "Spain", "None - they don't share borders", "Ireland"],
                correctAnswer: 2
            },
            {
                question: "What is the largest island in the world?",
                options: ["Madagascar", "Borneo", "Greenland", "New Guinea"],
                correctAnswer: 2
            },
            {
                question: "Which country has the longest coastline?",
                options: ["Russia", "Australia", "Canada", "Indonesia"],
                correctAnswer: 2
            },
            {
                question: "What strait separates Africa from Europe?",
                options: ["Bering Strait", "Strait of Hormuz", "Strait of Gibraltar", "English Channel"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of South Korea?",
                options: ["Busan", "Seoul", "Incheon", "Daegu"],
                correctAnswer: 1
            },
            {
                question: "Which is the only Great Lake entirely within the United States?",
                options: ["Lake Erie", "Lake Ontario", "Lake Michigan", "Lake Huron"],
                correctAnswer: 2
            },
            {
                question: "What is the tallest waterfall in the world?",
                options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
                correctAnswer: 2
            },
            {
                question: "Which European country has the most UNESCO World Heritage Sites?",
                options: ["France", "Spain", "Italy", "Germany"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of Brazil?",
                options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
                correctAnswer: 2
            }
        ],
        hard: [
            {
                question: "What is the capital of Kazakhstan?",
                options: ["Almaty", "Astana", "Shymkent", "Karaganda"],
                correctAnswer: 1
            },
            {
                question: "Which country has the most time zones?",
                options: ["Russia", "United States", "France", "China"],
                correctAnswer: 2
            },
            {
                question: "What is the driest desert in the world?",
                options: ["Sahara", "Gobi", "Atacama", "Mojave"],
                correctAnswer: 2
            },
            {
                question: "What is the capital of Myanmar?",
                options: ["Yangon", "Mandalay", "Naypyidaw", "Bago"],
                correctAnswer: 2
            },
            {
                question: "Which country is home to the ancient city of Petra?",
                options: ["Egypt", "Jordan", "Syria", "Lebanon"],
                correctAnswer: 1
            },
            {
                question: "What is the largest landlocked country in the world?",
                options: ["Mongolia", "Kazakhstan", "Chad", "Niger"],
                correctAnswer: 1
            },
            {
                question: "Which sea is the saltiest in the world?",
                options: ["Dead Sea", "Red Sea", "Mediterranean Sea", "Caspian Sea"],
                correctAnswer: 0
            },
            {
                question: "What is the capital of Slovenia?",
                options: ["Zagreb", "Ljubljana", "Sarajevo", "Belgrade"],
                correctAnswer: 1
            },
            {
                question: "Which country has the highest population density?",
                options: ["Bangladesh", "Singapore", "Monaco", "Malta"],
                correctAnswer: 2
            },
            {
                question: "What is the longest cave system in the world?",
                options: ["Carlsbad Caverns", "Mammoth Cave", "Son Doong Cave", "Jewel Cave"],
                correctAnswer: 1
            },
            {
                question: "What is the capital of Bhutan?",
                options: ["Kathmandu", "Thimphu", "Paro", "Punakha"],
                correctAnswer: 1
            },
            {
                question: "Which country contains the source of the Nile?",
                options: ["Egypt", "Sudan", "Uganda", "Ethiopia"],
                correctAnswer: 2
            },
            {
                question: "What is the highest capital city in the world?",
                options: ["Quito, Ecuador", "Bogotá, Colombia", "La Paz, Bolivia", "Mexico City, Mexico"],
                correctAnswer: 2
            },
            {
                question: "Which island nation is located in the Indian Ocean east of Africa?",
                options: ["Mauritius", "Seychelles", "Madagascar", "Comoros"],
                correctAnswer: 2
            },
            {
                question: "What percentage of the world's fresh water is in the Amazon River?",
                options: ["5%", "10%", "15%", "20%"],
                correctAnswer: 3
            }
        ]
    }
};

// Timer durations based on difficulty (in seconds)
const timerDurations = {
    easy: 30,
    medium: 25,
    hard: 20
};

// Export for use in quiz.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsDatabase, timerDurations };
}
