/*57353ec0-f8a0-4d15-85da-efcf35e017ce*/

async function fetchCryptoData(){
    const urlParams = new URLSearchParams(window.location.search);
    const coinCode = urlParams.get("code")
    const response = await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "57353ec0-f8a0-4d15-85da-efcf35e017ce",
        }),
        body: JSON.stringify({
          currency: "USD",
          code: coinCode,
          meta: true,
        }),

        
      }); 
    const coin = await response.json();
    const volume = coin.volume.toLocaleString();
    const changeRate = (coin.delta.day).toFixed(2)

    document.getElementById('cryptoDetails').innerHTML = `
      <img src="${coin.png64}" alt="${coin.name}>
        <h2 class="">Name: ${coin.name}</h2>
        <p id="detailsPrice">Price: $ ${coin.rate?.toFixed(2) || "N/A"}</p>
        <p class="volume">Volume: ${volume}</p>
        <div class="detailStats">
            <label for="changePeriod" class="">Rate of Change in:</label>
            <select name="changePeriod" class="" id="changePeriod">
                <option value="hour">Last hour</option>
                <option value="day">Last Day</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>

            </select>
            <p class="" id="changeRate">${coin.delta.hour}</p>
        </div>
    `



    document.getElementById("changePeriod").addEventListener("change", function(){
        const selectedPeriod = this.value
        const changeRate = (coin.delta[selectedPeriod]).toFixed(2);
        const changeRateElement = document.getElementById("changeRate");

        changeRateElement.innerHTML = `${changeRate}`

    })
}

document.addEventListener("DOMContentLoaded", fetchCryptoData); // Call the function when the page is fully loaded