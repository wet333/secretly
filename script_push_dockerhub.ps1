# Define repository names (they will be used as part of the image name on Docker Hub)
$dockerHubUsername = "wetagustin"
$frontendRepo = "secretly_frontend"
$apiRepo = "secretly_api"
$version = "v1.0.2"                           # Define the version/tag for your images

# Define paths to the Dockerfile directories
$frontendPath = ".\frontend"
$apiPath = ".\secretly_api"

# Log in to Docker Hub
Write-Host "Logging in to Docker Hub..."
docker login  # You can also use: docker login -u $dockerHubUsername -p $dockerHubPassword
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker Hub login failed. Please check your credentials."
    exit 1
}

# Build the frontend image
Write-Host "Building the frontend image..."
$frontendImage = "${dockerHubUsername}/${frontendRepo}:${version}"
docker build -t $frontendImage $frontendPath
if ($LASTEXITCODE -ne 0) {
    Write-Error "Building the frontend image failed."
    exit 1
}

# Build the API image
Write-Host "Building the API image..."
$apiImage = "${dockerHubUsername}/${apiRepo}:${version}"
docker build -t $apiImage $apiPath
if ($LASTEXITCODE -ne 0) {
    Write-Error "Building the API image failed."
    exit 1
}

# Push the frontend image to Docker Hub
Write-Host "Pushing the frontend image..."
docker push $frontendImage
if ($LASTEXITCODE -ne 0) {
    Write-Error "Pushing the frontend image failed."
    exit 1
}

# Push the API image to Docker Hub
Write-Host "Pushing the API image..."
docker push $apiImage
if ($LASTEXITCODE -ne 0) {
    Write-Error "Pushing the API image failed."
    exit 1
}

Write-Host "Both images have been successfully built and pushed to Docker Hub."