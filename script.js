// Define keyword-based categories for classification
const categories = {
    "Marketing": ["business", "advertising", "sales", "brand", "customer", "strategy"],
    "Technology": ["tech", "AI", "machine learning", "software", "coding", "programming"],
    "Pets": ["dog", "cat", "pet", "animal", "fish", "bird"],
    "Biography": ["life", "story", "history", "biography", "memoir"],
    "Life Hacks": ["hack", "tips", "productivity", "life", "efficiency"]
};

// Function to categorize an article
function categorizeArticle() {
    const articleInput = document.getElementById("articleInput").value.trim();
    
    // Ensure input is not empty
    if (!articleInput) {
        alert("Please enter an article name.");
        return;
    }

    let categoryFound = false;

    // Check if article name contains any keyword from the categories
    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => articleInput.toLowerCase().includes(keyword))) {
            let storedArticles = JSON.parse(localStorage.getItem(category)) || [];
            storedArticles.push(articleInput);
            localStorage.setItem(category, JSON.stringify(storedArticles));

            updateArticleList(category);
            categoryFound = true;
            break;
        }
    }

    // If no category matches, alert the user
    if (!categoryFound) {
        alert("Could not categorize the article.");
    }

    // Clear input field
    document.getElementById("articleInput").value = "";
}

// Function to update article lists in the UI
function updateArticleList(category) {
    let storedArticles = JSON.parse(localStorage.getItem(category)) || [];
    let list = document.getElementById(category);
    list.innerHTML = ""; // Clear existing list

    // Add stored articles as list items
    storedArticles.forEach((article, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = article;
        
        // Add click event for editing articles
        listItem.addEventListener("click", () => editArticle(category, index, listItem));

        list.appendChild(listItem);
    });
}

// Function to edit an article in the list
function editArticle(category, index, listItem) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = listItem.textContent;
    listItem.textContent = "";
    listItem.appendChild(input);
    input.focus();

    // Save edited article when "Enter" key is pressed
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let updatedText = input.value.trim();
            if (updatedText) {
                let storedArticles = JSON.parse(localStorage.getItem(category));
                storedArticles[index] = updatedText;
                localStorage.setItem(category, JSON.stringify(storedArticles));

                updateArticleList(category);
            }
        }
    });
}

// Function to load stored articles on page load
function loadStoredArticles() {
    for (const category of Object.keys(categories)) {
        updateArticleList(category);
    }
}

// Function to download categorized articles as a CSV file
function downloadCSV() {
    let csvContent = "Marketing,Technology,Pets,Biography,Life Hacks\n";

    // Find the maximum number of articles in any category
    let maxRows = Math.max(
        JSON.parse(localStorage.getItem("Marketing") || "[]").length,
        JSON.parse(localStorage.getItem("Technology") || "[]").length,
        JSON.parse(localStorage.getItem("Pets") || "[]").length,
        JSON.parse(localStorage.getItem("Biography") || "[]").length,
        JSON.parse(localStorage.getItem("Life Hacks") || "[]").length
    );

    // Generate CSV content row-wise
    for (let i = 0; i < maxRows; i++) {
        let row = [
            (JSON.parse(localStorage.getItem("Marketing") || "[]")[i] || ""),
            (JSON.parse(localStorage.getItem("Technology") || "[]")[i] || ""),
            (JSON.parse(localStorage.getItem("Pets") || "[]")[i] || ""),
            (JSON.parse(localStorage.getItem("Biography") || "[]")[i] || ""),
            (JSON.parse(localStorage.getItem("Life Hacks") || "[]")[i] || "")
        ].join(",");
        csvContent += row + "\n";
    }

    // Create a downloadable CSV file
    let blob = new Blob([csvContent], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "articles.csv";
    link.click();
}

// Load articles from localStorage when the page is opened
window.onload = loadStoredArticles;
