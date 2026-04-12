Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content.Replace('<li><a href="contact.html"', '<li><a href="gallery.html">Gallery</a></li>`r`n            <li><a href="contact.html"')
    $content = $content.Replace('<li><a href="#">Gallery</a></li>', '<li><a href="gallery.html">Gallery</a></li>')
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
}
