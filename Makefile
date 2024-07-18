# Makefile for Noble to Ethereum USDC Bridge

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build Docker image
docker-build:
	docker build -t noble-ethereum-bridge .

# Run Docker container
docker-run:
	docker run -p 5173:5173 noble-ethereum-bridge