const fs = require('fs');
const files = ['contact.html', 'about.html', 'gallery.html', 'services.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Since the mojibake was read in as utf8 string, we can literal match
        content = content.replace(/ðŸŒ Â/g, '🌍');
        content = content.replace(/â€”Â/g, '—');
        content = content.replace(/âœ¨/g, '✨');
        content = content.replace(/ðŸŒ /g, '🌍');
        content = content.replace(/â€”/g, '—');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Successfully processed ${file}`);
    } catch(err) {
        console.error(`Error processing ${file}: ${err.message}`);
    }
});
