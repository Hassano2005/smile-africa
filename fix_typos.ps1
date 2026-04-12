$files = @("contact.html", "about.html", "gallery.html", "services.html")

# Use a Python-style bytes approach via .NET
# The garbled characters come from Latin-1 misinterpretation of UTF-8 bytes
# We'll re-encode: read as Latin-1, then encode bytes back to UTF-8, then decode as UTF-8
Add-Type -AssemblyName System

foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    
    # Read raw bytes
    $bytes = [System.IO.File]::ReadAllBytes($path)
    
    # Decode as Latin-1 (to get original raw text)
    $latin1 = [System.Text.Encoding]::GetEncoding(28591)
    $utf8    = [System.Text.Encoding]::UTF8
    
    $rawString = $latin1.GetString($bytes)
    
    # Re-encode Latin-1 string to bytes (this restores original UTF-8 bytes)
    $reBytes = $latin1.GetBytes($rawString)
    
    # Decode those bytes as UTF-8 (correct interpretation)
    $fixedString = $utf8.GetString($reBytes)
    
    # Write back as UTF-8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $fixedString, $utf8NoBom)
    
    Write-Host "Fixed encoding: $file"
}

# Fix wrong phone number in gallery.html footer
$g = [System.IO.File]::ReadAllText("$PSScriptRoot\gallery.html", [System.Text.Encoding]::UTF8)
$g = $g -replace "\+255 712\s+345 678", "+255 747 014 246"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$PSScriptRoot\gallery.html", $g, $utf8NoBom)
Write-Host "Fixed phone number in gallery.html"

# Fix capitalization 'About us' -> 'About Us' in about.html
$a = [System.IO.File]::ReadAllText("$PSScriptRoot\about.html", [System.Text.Encoding]::UTF8)
$a = $a -replace ">About us<", ">About Us<"
[System.IO.File]::WriteAllText("$PSScriptRoot\about.html", $a, $utf8NoBom)
Write-Host "Fixed capitalization in about.html"

# Fix extra leading space in services.html footer heading
$s = [System.IO.File]::ReadAllText("$PSScriptRoot\services.html", [System.Text.Encoding]::UTF8)
$s = $s -replace "<h3> Join Our Travel Community</h3>", "<h3>Join Our Travel Community</h3>"
[System.IO.File]::WriteAllText("$PSScriptRoot\services.html", $s, $utf8NoBom)
Write-Host "Fixed extra space in services.html"

Write-Host "`nAll done!"
