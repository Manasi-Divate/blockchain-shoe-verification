$pairs = @(
  @('https://source.unsplash.com/1600x900/?nike,sneakers','nike.jpg'),
  @('https://source.unsplash.com/1600x900/?adidas,sneakers','adidas.jpg'),
  @('https://source.unsplash.com/1600x900/?puma,sneakers','puma.jpg'),
  @('https://source.unsplash.com/1600x900/?newbalance,sneakers','newbalance.jpg')
)

foreach($p in $pairs) {
  $url = $p[0]
  $name = $p[1]
  Write-Host "Downloading $name from $url"
  $out = Join-Path (Join-Path $PWD 'public') (Join-Path 'images' $name)
  Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
}
