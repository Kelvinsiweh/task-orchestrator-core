# Task Orchestrator Core

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An event-driven distributed task execution framework built with TypeScript. Implements state machine lifecycle transitions, retry backoff algorithms, and pub/sub event bus hooks.

## Architecture
```
[ REST Ingestion API ] ──► [ Task Validation Layer ]
                                      │
                                      ▼
[ Event Bus Dispatcher ] ◄──► [ Execution Pipeline Engine ]
                                      │
                                      ▼
                         [ Memory / Audit Store ]
```

## Quick Start
```bash
npm install
npm run build
npm start
```

### State Flow
PENDING -> RUNNING -> COMPLETED
