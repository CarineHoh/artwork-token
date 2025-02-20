# ArtworkToken (ERC-721)

Ein ERC-721 Token-Projekt für die Repräsentation von Kunstwerken auf der Ethereum Blockchain.

## Installation

1. Klone das Repository
```bash
git clone [repository-url]
cd artwork-token
```

2. Installiere die Abhängigkeiten
```bash
npm install
```

3. Starte einen lokalen Blockchain-Client (z.B. Ganache)

4. Kompiliere die Smart Contracts
```bash
truffle compile
```

5. Führe die Migrationen aus
```bash
truffle migrate
```

6. Führe die Tests aus
```bash
truffle test
```

## Funktionen

- Erstellen neuer Artwork Tokens (nur Owner)
- Transfer von Tokens zwischen Benutzern
- Abfragen von Artwork-Namen anhand der Token ID

## Technologien

- Solidity
- Truffle Framework
- OpenZeppelin Contracts
- Ethereum

## Lizenz

MIT