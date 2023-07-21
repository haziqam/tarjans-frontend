param (
    [Parameter(Mandatory=$true, Position=0)]
    [string]$f
)

# Compile TypeScript file
tsc.cmd $f

# Execute compiled JavaScript file with Node.js
$jsFile = [System.IO.Path]::ChangeExtension($f, "js")
node $jsFile

# Remove compiled JavaScript files
Remove-Item *.js -Force
