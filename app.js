let makeTableCount = 0;
function makeTable() {
    if (makeTableCount == 0) {
        makeTableCount++;

        const numberOfTables = Number(document.getElementById("nTables").value);
        const numberOfColumns = Number(document.getElementById("cTables").value);
        const numberOfRows = Number(document.getElementById("rTables").value);
    
        const divElementForTables = document.createElement("div");
        divElementForTables.setAttribute("class", "tables");
        const divElementForEachTable = document.createElement("div");
        divElementForEachTable.setAttribute("class", "eachTable");
        divElementForTables.appendChild(divElementForEachTable);
    
        for (let i = 0; i < numberOfTables; i++) {
            const tableElement = document.createElement("table");
            tableElement.setAttribute("border", "1");
            divElementForEachTable.appendChild(tableElement);
            for (let j = 0; j < numberOfRows; j++) {
                const trElement = document.createElement("tr");
                tableElement.appendChild(trElement);
                for (let k = 0; k < numberOfColumns; k++) {
                    const tdElement = document.createElement("td");
                    trElement.appendChild(tdElement);
                }
            }
            divElementForEachTable.appendChild(tableElement);
        }
        const containerElement = document.getElementsByClassName("container");
        containerElement[0].appendChild(divElementForTables);
    } else {
        makeTableCount++;

        const tableElement = document.getElementsByClassName("tables");
        tableElement[0].remove();

        const numberOfTables = Number(document.getElementById("nTables").value);
        const numberOfColumns = Number(document.getElementById("cTables").value);
        const numberOfRows = Number(document.getElementById("rTables").value);
    
        const divElementForTables = document.createElement("div");
        divElementForTables.setAttribute("class", "tables");
        const divElementForEachTable = document.createElement("div");
        divElementForEachTable.setAttribute("class", "eachTable");
        divElementForTables.appendChild(divElementForEachTable);
    
        for (let i = 0; i < numberOfTables; i++) {
            const tableElement = document.createElement("table");
            tableElement.setAttribute("border", "1");
            divElementForEachTable.appendChild(tableElement);
            for (let j = 0; j < numberOfRows; j++) {
                const trElement = document.createElement("tr");
                tableElement.appendChild(trElement);
                for (let k = 0; k < numberOfColumns; k++) {
                    const tdElement = document.createElement("td");
                    trElement.appendChild(tdElement);
                }
            }
            divElementForEachTable.appendChild(tableElement);
        }
        const containerElement = document.getElementsByClassName("container");
        containerElement[0].appendChild(divElementForTables);
    }
}

let seatsNumber = [];
let managersSeats = [];
let notManagersSeats = [];
let tables = "";
let seats = "";
let seat = "";
function splitSeats() {
    // 役職者用の席番号が指定されている場合
    if (document.getElementById("mSeats").value) {
        // 全ての席番号を取得して配列に格納
        tables = document.getElementsByClassName("eachTable");
        seats = tables[0].getElementsByTagName('td');
        for (let i = 0; i < seats.length; i++) {
            seat = window.getComputedStyle(tables[0].getElementsByTagName('td')[i], '::before').content;
            if (seat == "counter(seatNumber)") {
                seatsNumber[seatsNumber.length] = i + 1;
            }
        }

        // 役職者用の席番号を取得して配列に格納
        managersSeats = document.getElementById("mSeats").value.split(",").map(Number);

        // 役職者用の席番号に色をつける
        for (const managerEachSeat of managersSeats) {
            seats[managerEachSeat - 1].setAttribute("id", "seatsForManagers");
        }

        // 全ての席番号から役職者用の席番号を引き、非役職者用の席番号を取得して配列に格納
        notManagersSeats = seatsNumber.filter(i => managersSeats.indexOf(i) == -1);
    // 役職者用の席番号が指定されていない場合
    } else {
        // 全ての席番号を取得して配列に格納
        tables = document.getElementsByClassName("eachTable");
        seats = tables[0].getElementsByTagName('td');
        for (let i = 0; i < seats.length; i++) {
            seat = window.getComputedStyle(tables[0].getElementsByTagName('td')[i], '::before').content;
            if (seat == "counter(seatNumber)") {
                seatsNumber[seatsNumber.length] = i + 1;
            }
        }

        // 全ての席番号から役職者用の席番号を引き、非役職者用の席番号を取得して配列に格納
        notManagersSeats = seatsNumber.filter(i => managersSeats.indexOf(i) == -1);
    }
}

function decideSeat() {
    // 役職有無の確認
    const radioElements = document.getElementsByName('position');
    let checkValue = "";
    for (let i = 0; i < radioElements.length; i++) {
        if (radioElements.item(i).checked) {
            checkValue = radioElements.item(i).value;
        }
    }

    // 役職者or非役職者の配列からランダムに席を決定して、席番号を表示
    let seatNumber = 0;
    let rand = 0;
    if (checkValue == "manager") {
        if (managersSeats.length === 0) {
            document.getElementById('displaySeat').textContent = "空いている役職者用の席はありません。";
        } else {
            rand = Math.floor(Math.random() * managersSeats.length);
            seatNumber = managersSeats[rand];
            document.getElementById('displaySeat').textContent = "あなたの席は" + seatNumber + "番です。";
            managersSeats.splice(rand,1);
        }  
    } else {
        if (checkValue == "notManager") {
            if (notManagersSeats.length === 0) {
                document.getElementById('displaySeat').textContent = "空いている非役職者用の席はありません。";
            } else {
                rand = Math.floor(Math.random() * notManagersSeats.length);
                seatNumber = notManagersSeats[rand];
                document.getElementById('displaySeat').textContent = "あなたの席は" + seatNumber + "番です。";
                notManagersSeats.splice(rand,1);
            }
        }

    }

    // 席番号を名前に変更
    const name = document.getElementById("name").value;
    seats[seatNumber - 1].innerHTML = name;
}
    