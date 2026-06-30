# Re-copy global skills into this repo (for Cursor Mobile)
$src = Join-Path $env:USERPROFILE ".cursor\skills"
$dst = Join-Path $PSScriptRoot "..\.cursor\skills"
robocopy $src $dst /E /XD frontend-design vercel-best-practices /NFL /NDL /NJH /NJS | Out-Null
if ($LASTEXITCODE -le 7) {
  Write-Host "Skills synced to $dst"
  Write-Host "Commit and push to update Cursor Mobile."
} else {
  exit $LASTEXITCODE
}
