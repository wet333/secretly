<#
.SYNOPSIS
Loads environment variables from a .env file into the current PowerShell session
and then runs the Maven build command (`mvn clean package`).

.DESCRIPTION
Maven does not natively support loading environment variables from a `.env` file,
but it can access environment variables available in the system or process environment.
This script parses a `.env` file (key=value format), sets each variable in the current
PowerShell process environment, and then executes `mvn clean package` so that the
variables are accessible as `${env.VAR_NAME}` inside Maven's POM or plugins.

.NOTES
- Comments and blank lines in the .env file are ignored.
- Variables are only set for the duration of the current PowerShell session.

.AUTHOR
Agustin Wet
#>
docker compose down

Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
    }
}

# Go to Spring backend folder
cd ./secretly_api

# Run maven
mvn clean package

# Return to root folder
cd ..

docker compose -f .\docker-compose-prod.yml up --build -d