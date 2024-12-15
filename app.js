// app.js

// Fetch all available currencies and populate the dropdown
async function populateCurrencies() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    
    // Replace with your API key from ExchangeRate-API
    const apiKey = '2be4dd8f54947ccdbae537b3';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;  // Use the /codes endpoint

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            // Get the list of currencies
            const currencies = data.supported_codes;

            // Clear any existing options in the dropdowns (in case the function is called multiple times)
            fromCurrencySelect.innerHTML = '';
            toCurrencySelect.innerHTML = '';

            // Populate both 'fromCurrency' and 'toCurrency' dropdowns
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency[0];
                option.textContent = currency[1];
                fromCurrencySelect.appendChild(option);

                const optionClone = option.cloneNode(true);
                toCurrencySelect.appendChild(optionClone);
            });

            // Pre-select first option (e.g., USD)
            fromCurrencySelect.selectedIndex = 0;
            toCurrencySelect.selectedIndex = 0;
        } else {
            alert('Failed to fetch currency codes.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching currency codes.');
    }
}

// Convert the currency based on user input
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    const apiKey = '2be4dd8f54947ccdbae537b3';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            const conversionRate = data.conversion_rates[toCurrency];
            if (conversionRate) {
                const convertedAmount = (amount * conversionRate).toFixed(2);
                resultElement.textContent = `${convertedAmount} ${toCurrency}`;
            } else {
                alert('Conversion rate not available.');
            }
        } else {
            alert('Error fetching exchange rates.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching exchange rates.');
    }
}

// Initialize the currency dropdowns on page load
window.onload = populateCurrencies;
