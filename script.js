const API_URL = "https://stake-mine-predictor-api.railway.app"; // 👈 UPDATE THIS

async function predictMines() {
    const serverSeed = document.getElementById("server-seed").value;
    const clientSeed = document.getElementById("client-seed").value;
    const mineCount = parseInt(document.getElementById("mine-count").value);

    if (!serverSeed || !clientSeed || mineCount < 1 || mineCount > 24) {
        alert("Please enter valid inputs!");
        return;
    }

    try {
        let response = await fetch(`${API_URL}/predict-mines`, {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serverSeed, clientSeed, mineCount })
        });

        let data = await response.json();
        if (data.error) {
            alert(data.error);
            return;
        }

        displayMines(data.mines);
    } catch (error) {
        alert("Server error! Make sure backend is running.");
    }
}

function displayMines(mines) {
    let grid = document.getElementById("mine-grid");
    grid.innerHTML = "";

    for (let i = 0; i < 25; i++) {
        let box = document.createElement("div");
        box.classList.add("mine-box");
        if (mines.includes(i)) {
            box.classList.add("mine");
            box.innerText = "💣";
        }
        grid.appendChild(box);
    }
}
