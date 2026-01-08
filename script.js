function getCityTime() {
    const cityInput = document.getElementById('cityInput');
    const timeDisplay = document.getElementById('timeDisplay');
    const city = cityInput.value.trim().toLowerCase();
    
    if (!city) {
        timeDisplay.textContent = "Please enter a city name!";
        return;
    }
    
    // City to timezone offset mapping (in hours)
    const cityOffsets = {
        'tokyo': 9,
        'new york': -5,
        'london': 0,
        'paris': 1,
        'sydney': 10,
        'los angeles': -8,
        'berlin': 1,
        'mumbai': 5.5,
        'dubai': 4,
        'singapore': 8,
        'beijing': 8,
        'seoul': 9,
        'rome': 1,
        'madrid': 1,
        'toronto': -5,
        'chicago': -6,
        'mexico city': -6,
        'sao paulo': -3,
        'cairo': 2,
        'johannesburg': 2,
        'lausanne': 0
    };
    
    if (cityOffsets[city]) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utc + (3600000 * cityOffsets[city]));
        
        const timeString = cityTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        const dateString = cityTime.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        timeDisplay.innerHTML = `
            <strong>${timeString}</strong><br>
            <small>${dateString} in ${capitalize(city)}</small>
        `;
        timeDisplay.style.color = "#27ae60";
    } else {
        timeDisplay.innerHTML = `
            City not in database.<br>
            <small>Try: Tokyo, New York, London, Paris, Sydney</small>
        `;
        timeDisplay.style.color = "#e74c3c";
    }
}

function capitalize(str) {
    return str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

// Enter key support
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getCityTime();
    }
});

// Show example cities on load
document.getElementById('timeDisplay').innerHTML = `
    Try: <strong>Tokyo</strong>, <strong>London</strong>, or <strong>New York</strong>
`;
