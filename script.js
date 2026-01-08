async function getCityTime() {
    const cityInput = document.getElementById('cityInput');
    const timeDisplay = document.getElementById('timeDisplay');
    const city = cityInput.value.trim();
    
    if (!city) {
        timeDisplay.textContent = "Please enter a city name!";
        cityInput.focus();
        return;
    }
    
    // Show loading
    timeDisplay.textContent = `Checking time in ${city}...`;
    
    try {
        // Using WorldTimeAPI - no API key needed
        const response = await fetch('https://worldtimeapi.org/api/timezone');
        const timezones = await response.json();
        
        // Find matching timezone
        let foundTimezone = null;
        
        // Common city mappings
        const cityMap = {
            'tokyo': 'Asia/Tokyo',
            'new york': 'America/New_York',
            'london': 'Europe/London',
            'paris': 'Europe/Paris',
            'sydney': 'Australia/Sydney',
            'los angeles': 'America/Los_Angeles',
            'berlin': 'Europe/Berlin',
            'mumbai': 'Asia/Kolkata',
            'singapore': 'Asia/Singapore',
            'dubai': 'Asia/Dubai'
        };
        
        // Check mapped cities first
        const lowerCity = city.toLowerCase();
        if (cityMap[lowerCity]) {
            foundTimezone = cityMap[lowerCity];
        } else {
            // Try to find in timezone list
            for (const timezone of timezones) {
                if (timezone.toLowerCase().includes(lowerCity)) {
                    foundTimezone = timezone;
                    break;
                }
            }
        }
        
        if (!foundTimezone) {
            timeDisplay.textContent = "City not found. Try: Tokyo, London, New York";
            return;
        }
        
        // Get time for the timezone
        const timeResponse = await fetch(`https://worldtimeapi.org/api/timezone/${foundTimezone}`);
        const timeData = await timeResponse.json();
        
        // Format the time
        const date = new Date(timeData.datetime);
        const timeString = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        timeDisplay.textContent = `${timeString} in ${city}`;
        
    } catch (error) {
        console.error('Error:', error);
        timeDisplay.textContent = "Error fetching time. Please try again.";
    }
}

// Allow Enter key to submit
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getCityTime();
    }
});