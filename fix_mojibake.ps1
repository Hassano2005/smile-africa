$files = @("contact.html", "about.html", "gallery.html", "services.html")

foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    
    # Read text 
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Simple string replacements
    $content = $content.Replace('ðŸŒ Â ', "🌍 ")
    $content = $content.Replace('â€”Â ', "— ")
    $content = $content.Replace('âœ¨', "✨")
    $content = $content.Replace('ðŸŒ ', "🌍 ")
    $content = $content.Replace('â€”', "—")
    $content = $content.Replace('ðŸ¦ ', "🦁")
    $content = $content.Replace('ðŸ¦Ž', "🦎")
    $content = $content.Replace('ðŸ”¥', "🔥")
    $content = $content.Replace('ðŸŒ´', "🌴")
    $content = $content.Replace('ðŸ ž', "🏞️")

    # Save
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

Write-Host "Replaced strings in HTML files."
