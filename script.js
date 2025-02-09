const categories = {
    "Marketing": ["business", "advertising", "sales", "brand", "customer", "strategy"],
    "Technology": ["tech", "AI", "machine learning", "software", "coding", "programming"],
    "Pets": ["dog", "cat", "pet", "animal", "fish", "bird"],
    "Biography": ["life", "story", "history", "biography", "memoir"],
    "Life Hacks": ["hack", "tips", "productivity", "life", "efficiency"]
};

function showLoading() {
    document.getElementById("loading").style.display = "flex";
}

function hideLoading() {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1000);
}

function categorizeArticle() {
    showLoading();

    setTimeout(() => {
        const articleInput = document.getElementById("articleInput").value.trim();
        if (!articleInput) {
            alert("Please enter an article name.");
            hideLoading();
            return;
        }

        let categoryFound = false;
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

        if (!categoryFound) {
            alert("Could not categorize the article.");
        }

        document.getElementById("articleInput").value = "";
        hideLoading();
    }, 1000);
}

function updateArticleList(category) {
    let storedArticles = JSON.parse(localStorage.getItem(category)) || [];
    let list = document.getElementById(category);
    list.innerHTML = "";

    storedArticles.forEach((article, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = article;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
        editButton.onclick = () => editArticle(category, index, listItem);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        deleteButton.onclick = () => deleteArticle(category, index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

function editArticle(category, index, listItem) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = listItem.firstChild.textContent;
    listItem.innerHTML = "";
    listItem.appendChild(input);
    input.focus();

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

function deleteArticle(category, index) {
    if (confirm("Are you sure you want to delete this article?")) {
        let storedArticles = JSON.parse(localStorage.getItem(category));
        storedArticles.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(storedArticles));

        updateArticleList(category);
    }
}

function loadStoredArticles() {
    for (const category of Object.keys(categories)) {
        updateArticleList(category);
    }
}

function downloadCSV() {
    showLoading();

    setTimeout(() => {
        let csvContent = "Marketing,Technology,Pets,Biography,Life Hacks\n";
        let maxRows = Math.max(
            JSON.parse(localStorage.getItem("Marketing") || "[]").length,
            JSON.parse(localStorage.getItem("Technology") || "[]").length,
            JSON.parse(localStorage.getItem("Pets") || "[]").length,
            JSON.parse(localStorage.getItem("Biography") || "[]").length,
            JSON.parse(localStorage.getItem("Life Hacks") || "[]").length
        );

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

        let blob = new Blob([csvContent], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "articles.csv";
        link.click();

        hideLoading();
    }, 1000);
}

function clearAllArticles() {
    if (confirm("Are you sure you want to clear all articles?")) {
        showLoading();
        
        setTimeout(() => {
            for (const category of Object.keys(categories)) {
                localStorage.removeItem(category);
                updateArticleList(category);
            }
            alert("All articles have been cleared.");
            hideLoading();
        }, 1000);
    }
}

window.onload = loadStoredArticles;

