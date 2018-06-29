FROM microsoft/aspnetcore-build:2.1.300-preview1 AS builder

WORKDIR /source

COPY *.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish --configuration Release --output /out/

FROM microsoft/aspnetcore:2.1.0-preview1
WORKDIR /app
COPY --from=builder /out .

ENTRYPOINT [ "dotnet", "aspnet-react-template.dll" ]
