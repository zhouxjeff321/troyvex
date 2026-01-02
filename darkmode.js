// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
    document.body.appendChild(toggleButton);
    
    // Toggle theme on button click
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
});
