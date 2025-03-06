@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/Rockerby/Umbraco.Community.EmailLogger.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "Umbraco.Community.EmailLogger" --site-domain 'https://localhost:44324' --include-example --allow-scripts Yes

:: replace package .csproj with the one from the template so has nuget info
cd Umbraco.Community.EmailLogger
del Umbraco.Community.EmailLogger.csproj
ren Umbraco.Community.EmailLogger_nuget.csproj Umbraco.Community.EmailLogger.csproj

:: add project to solution
cd..
dotnet sln add "Umbraco.Community.EmailLogger"

:: add reference to project from test site
dotnet add "Umbraco.Community.EmailLogger.TestSite/Umbraco.Community.EmailLogger.TestSite.csproj" reference "Umbraco.Community.EmailLogger/Umbraco.Community.EmailLogger.csproj"