# Spring Boot Runner Script
Write-Host "Starting Java Spring Boot Backend (Port 8080)..." -ForegroundColor Yellow

# Download maven-wrapper.jar if not present
if (-not (Test-Path "mvnw.cmd")) {
    Write-Host "Setting up Maven Wrapper..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri "https://repo1.maven.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar" -OutFile "maven-wrapper.jar"
}

# Run Maven compile and Spring Boot bootRun
if (Get-Command "mvn" -ErrorAction SilentlyContinue) {
    mvn spring-boot:run
} else {
    Write-Host "Downloading Portable Apache Maven..." -ForegroundColor Cyan
    $zipPath = "$env:TEMP\apache-maven-3.9.6-bin.zip"
    $mvnDir = "$env:TEMP\apache-maven-3.9.6"
    
    if (-not (Test-Path $mvnDir)) {
        Invoke-WebRequest -Uri "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip" -OutFile $zipPath
        Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force
    }
    
    & "$mvnDir\bin\mvn.cmd" spring-boot:run
}
