function fadeOutBackground() {
    const container = document.getElementById('container');
    let opacity = 1;
    const interval = 50; // Adjust the interval in milliseconds
    const decrement = 0.02; // Adjust the decrement value for a faster/slower fade

    const fadeOutInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= decrement;
            container.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            container.style.backgroundImage = `url('../lib/images/blocks.jpg')`; // Update the image URL
            container.style.backgroundPosition = 'center';
            container.style.backgroundSize = 'cover';
        } else {
            clearInterval(fadeOutInterval);
        }
    }, interval);
}

// Call the fade out function after a delay
setTimeout(fadeOutBackground, 2000); // Change the delay (in milliseconds) as needed