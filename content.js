const words = [
        "apple", "banana", "cherry", "orange", "grape",
        "peach", "pear", "watermelon", "strawberry", "kiwi", "famous",
        "delicious",
        "scary",
        "fantastic",
        "beautiful",
        "silly",
        "colorful",
        "exciting",
        "amazing",
        "weird",
        "abrupt",
        "adorable",
        "amiable",
        "awkward",
        "bizarre",
        "blushing",
        "brisk",
        "calm",
        "charming",
        "cheerful",
        "clumsy",
        "cooperative",
        "courageous",
        "creative",
        "cute",
        "delightful",
        "determined",
        "diligent",
        "elegant",
        "enthusiastic",
        "fabulous",
        "friendly",
        "funny",
        "gentle",
        "glamorous",
        "gorgeous",
        "graceful",
        "hilarious",
        "humble",
        "innocent",
        "intelligent",
        "jolly",
        "kind-hearted",
        "lively",
        "lovely",
        "lucky",
        "magnificent",
        "mysterious",
        "naughty",
        "happy",
        "embarrassing",
        "tall",
        "uncomfortable",
        "suspicious",
        "goofy",
        "cowardly",
        "brave",
        "groovy",
        "abrupt",
        "dog",
        "cat",
        "robot",
        "unicorn",
        "dragon",
        "spaceship",
        "planet",
        "piano",
        "jungle",
        "mountain",
        "apple",
        "banana",
        "book",
        "bottle",
        "car",
        "chair",
        "cloud",
        "coffee",
        "computer",
        "cup",
        "desk",
        "door",
        "flower",
        "guitar",
        "hat",
        "house",
        "jacket",
        "key",
        "lamp",
        "leaf",
        "lightning",
        "moon",
        "motorcycle",
        "ocean",
        "painting",
        "phone",
        "pillow",
        "rain",
        "river",
        "shoe",
        "sky",
        "snowflake",
        "star",
        "sunflower",
        "table",
        "tree",
        "umbrella",
        "window",
        "tulu",
        "ron",
        "sagar",
        "bipin",
        "lee",
        "jadu",
        "game",
        "valo",
        "rohan",
        "tulasha",
        "rito",
        "video", "technology", "innovation", "coding", "software", "programming", "web development",
        "algorithm", "data structure", "JavaScript", "database", "networking", "Linux", "frontend",
        "backend", "Python", "Java", "HTML", "CSS", "server", "cloud computing", "security", "API",
        "git", "SQL", "React", "Node.js", "router", "encryption", "authentication", "operating system",
        "compiler", "software engineering", "agile", "code review", "API design", "docker", "RESTful",
        "responsive design", "UX/UI", "framework", "data mining", "blockchain", "cybersecurity",
        "machine learning", "artificial intelligence", "debugging", "open source", "virtualization",
        "IoT", "metadata", "scalability", "API endpoint", "data modeling", "GraphQL", "cookies",
        "bug tracking", "JSON", "serverless", "testing", "devOps", "innovation", "problem-solving",
        "creativity", "communication", "teamwork", "project management", "science", "mathematics",
        "history", "culture", "philosophy", "literature", "art"
        // ... continue adding more words
    ];

// Function to simulate key press
function simulateKeyPress(elem, key) {
    var eventObj = new KeyboardEvent('keydown', {
        key: key,
        keyCode: key.charCodeAt(0),
        which: key.charCodeAt(0),
        shiftKey: false,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true,
    });
    elem.dispatchEvent(eventObj);
}

// Function to generate a random word not previously used
function generateRandomWords(usedWords) {
    let randomWordIndex;
    do {
        randomWordIndex = Math.floor(Math.random() * words.length);
    } while (usedWords.has(words[randomWordIndex])); // Check if the word has been used before

    usedWords.add(words[randomWordIndex]); // Add the word to usedWords set
    return words[randomWordIndex];
}

// Initialize a set to keep track of used words
const usedWords = new Set();

// Function to perform the sequence of actions
function performActions() {
    var searchInput = document.querySelector("#sb_form_q");
    var searchIcon = document.querySelector("#sb_form_go");

    if (searchInput && searchIcon) {
        searchInput.focus();

         // Simulate pressing Enter on the search input after 1 second
         setTimeout(() => simulateKeyPress(searchInput, 'Enter'), 1000);

         setTimeout(() => {
             // Simulate pressing Ctrl+A (to select all text) after another 1-2 seconds
             simulateKeyPress(searchInput, 'a');
             simulateKeyPress(searchInput, 'Control');
         }, 1500 + Math.random() * 500); // Random delay between 1.5 to 2 seconds
 
         setTimeout(() => {
            // simulateKeyPress(searchInput, 'ArrowRight');
             // Simulate pressing Backspace (to clear any existing text) after another 1-2 seconds
             simulateKeyPress(searchInput, 'Backspace');
 
             // Generate a random word not used before
             var randomWord = generateRandomWords(usedWords);
 
             // Type the random word into the search input
             searchInput.value = randomWord;
 
             // Click on the search icon after another 1-2 seconds
             setTimeout(() => searchIcon.click(), 1000 + Math.random() * 1000);
         }, 2000 + Math.random() * 1000); // Random delay between 2 to 3 seconds
    } else {
        console.error("Search input or icon element not found.");
    }
}

// Execute the actions once
performActions();
