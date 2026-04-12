import os
import glob
import codecs

# Strings to fix
replacements = {
    "ðŸŒ ": "🌍",
    "â€”": "—",
    "âœ¨": "✨",
    "â€“": "-",
    "`r`n": ""
}

html_files = glob.glob("*.html")

for file in html_files:
    # Read the file with UTF-8
    try:
        with codecs.open(file, "r", "utf-8") as f:
            content = f.read()
            
        modified = False
        for bad_str, good_str in replacements.items():
            if bad_str in content:
                content = content.replace(bad_str, good_str)
                modified = True
                
        if modified:
            with codecs.open(file, "w", "utf-8") as f:
                f.write(content)
            print(f"Fixed {file}")
            
    except Exception as e:
        print(f"Error processing {file}: {e}")

print("Cleanup complete!")
