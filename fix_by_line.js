const fs = require('fs');

function processFile(path) {
    let content = fs.readFileSync(path, 'utf8');
    let lines = content.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Join Our Travel Community')) {
            lines[i] = '                    <h3>🌍 Join Our Travel Community</h3>';
        }
        if (lines[i].includes('In Africa Adventures') && lines[i].includes('where every journey creates unforgettable memories.')) {
            lines[i] = '                        In Africa Adventures — where every journey creates unforgettable memories.</p>';
        }
        if (lines[i].includes('Your Gateway to African Safari')) {
            lines[i] = '                    <span class="footer-tagline">✨ Your Gateway to African Safari</span>';
        }
    }

    fs.writeFileSync(path, lines.join('\n'), 'utf8');
    console.log(`Fixed ${path}`);
}

['contact.html', 'about.html', 'gallery.html', 'services.html'].forEach(processFile);
