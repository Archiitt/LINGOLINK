// Selecting the DOM element with the class "from-text"
const fromText = document.querySelector(".from-text"),

// Selecting the DOM element with the class "to-text"
toText = document.querySelector(".to-text"),

// Selecting the DOM element with the class "exchange" (presumably an icon for exchange)
exchangeIcon = document.querySelector(".exchange"),

// Selecting all DOM elements of type "select"
selectTags = document.querySelectorAll("select"),

// Selecting all DOM elements with the class "row" and the element "i" (presumably icons)
icons = document.querySelectorAll(".row i");

// Selecting the DOM button element
translateBtn = document.querySelector("button");

// Looping through each select element in the NodeList
selectTag.forEach((tag, id) => {
    // Looping through each country code in the 'countries' object
    for (let country_code in countries) {
        // Checking if it's the first select element (English) and setting "selected" accordingly
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : 
                        (country_code == "hi-IN" ? "selected" : "");
                        
        // Creating an HTML option element with the appropriate attributes and values
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        
        // Adding the option to the current select element
        tag.insertAdjacentHTML("beforeend", option);
    }
});
// Adding an event listener to the exchange icon for a click event
exchageIcon.addEventListener("click", () => {
    // Swapping the text and language values between 'fromText' and 'toText'
    let tempText = fromText.value,
        tempLang = selectTag[0].value;

    fromText.value = toText.value;
    toText.value = tempText;
    // Swapping the language selections between the two select elements
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// Adding an event listener to the 'fromText' input for a keyup event
fromText.addEventListener("keyup", () => {
    // If 'fromText' is empty, clear the 'toText'
    if (!fromText.value) {
        toText.value = "";
    }
});
// Adding an event listener to the translate button for a click event
translateBtn.addEventListener("click", () => {
    // Extracting the text to be translated and the chosen languages
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;

    // If there's no text to translate, return early
    if (!text) return;

    // Setting a placeholder text while translating
    toText.setAttribute("placeholder", "Translating...");
    // Constructing the API URL for translation
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    // Fetching the translation from the API
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // Updating the 'toText' input with the translated text
            toText.value = data.responseData.translatedText;

            // Looping through matches to check if a more accurate translation is available
            data.matches.forEach(data => {
                if (data.id === 0) {
                    toText.value = data.translation;
                }
            });

            // Setting back the placeholder to indicate translation completion
            toText.setAttribute("placeholder", "Translation");
        });
});
// Adding click event listeners to all icons in the NodeList
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        // Check if 'fromText' or 'toText' is empty, and if so, return early
        if (!fromText.value || !toText.value) return;
