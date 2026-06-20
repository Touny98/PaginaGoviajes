# GoViajes — WhatsApp-Native Ride-Hailing SaaS

> **Multi-tenant ride-hailing platform built for Latin America. No app download. Runs entirely through WhatsApp.**

[Live Product](https://touny98.github.io/PaginaGoviajes) · [Acquisition & Partnership Inquiries](mailto:augustocastroo38@gmail.com)

---

## What is GoViajes?

GoViajes is a **production-ready, multi-tenant SaaS** that connects passengers with drivers through WhatsApp — the messaging app that over 90% of Latin Americans already have installed. No download, no account creation, no friction.

Each city operator runs under their own WhatsApp Business number, pricing structure, and driver pool. The platform handles everything: passenger flow, driver matching, ride lifecycle, payments, and driver onboarding — all through conversational WhatsApp messages and native Meta Flows.

---

## Live Metrics — June 2026

| Metric | Value |
|---|---|
| Tenants (operators) in production | 3 |
| Cities active | 3 |
| Active drivers | 18 |
| Completed rides | 42+ |
| In production since | April 2026 |

*Updated automatically from production database.*

---

## Why WhatsApp?

The core insight behind GoViajes: **distribution is the hardest problem in ride-hailing**, not the technology.

| Channel | Install friction | LatAm penetration |
|---|---|---|
| Uber / Cabify app | High (download + signup + card) | ~20-30% of target market |
| WhatsApp | Zero — already installed | ~90-95% |

GoViajes eliminates the install barrier entirely. A passenger who has never heard of GoViajes can request their first ride in under 60 seconds — no app store, no account, no credit card required upfront.

This matters especially in **mid-sized and rural Latin American cities** where Uber and Cabify don't operate due to low density and different driver economics. That's the segment GoViajes targets.

---

## Product Overview

### Passenger flow
```
"Hola" → choose trip type (moto / auto)
       → set pickup & drop-off
       → receive driver confirmation + ETA
       → ride in progress
       → ride complete + rating
```

### Driver onboarding (fully automated)
- No human agent required
- Native WhatsApp Forms (Meta Flows v6): name, DNI, vehicle type, photo upload
- Age gate, vehicle validation, real-time activation

### Operator (tenant) control
- Web admin panel: manage drivers, view trips, configure pricing
- Own WhatsApp Business number — complete brand isolation
- Activating a new city takes days, not months

---

## Architecture

```
WhatsApp Cloud API (Meta)
          │
    BullMQ Queue (Redis)        ← concurrency-controlled, no dropped messages
          │
   ┌──────────────────────┐
   │     GoViajes Core     │
   │   Node.js · Express   │
   │   Multi-tenant engine │
   └──────────────────────┘
          │
   ┌──────┴──────────────────────┐
   │                             │
Supabase (PostgreSQL)     Supabase Storage
Per-tenant row isolation  Driver photos · PDFs
          │
  MercadoPago Payments
```

**Design principles:**
- **Multi-tenant from day one**: city-level credential isolation, per-tenant pricing and driver pools, no data bleed between operators
- **Queue-first messaging**: BullMQ + Redis ensures every inbound WhatsApp message is processed reliably, even under bursts
- **Meta-native**: WhatsApp Cloud API + Flows v6 — no unofficial clients, no scrapers, TOS-compliant
- **Containerized**: Docker Compose on any VPS, deployable to new infrastructure in minutes
- **Idempotent schema migrations**: versioned SQL with advisory locks and rollback isolation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Web framework | Express |
| Message queue | BullMQ + Redis |
| Database | PostgreSQL (Supabase) |
| File storage | Supabase Storage |
| WhatsApp | Meta Business Cloud API + Flows v6 |
| Driver onboarding | Meta WhatsApp Flows (native forms) |
| Payments | MercadoPago |
| Admin panel | Server-rendered + REST API |
| Infrastructure | Docker · Hetzner VPS |
| CI / deploy | GitHub → git pull → docker compose |

---

## Revenue Model

- **Monthly SaaS fee per city** — operators pay to activate a city under the platform
- Operators own their driver relationships and keep trip revenue
- Platform earns recurring subscription, not per-trip commission → more predictable, lower conflict with operators

---

## Strategic Value for an Acquirer

GoViajes solves a distribution problem that no amount of capital has fully solved in informal transport markets:

| Advantage | Why it matters |
|---|---|
| **WhatsApp distribution** | Instant penetration at near-zero CAC in any LatAm city |
| **Multi-tenant SaaS** | White-labelable under any existing brand in days |
| **No app maintenance** | No iOS/Android dev cycles, no App Store reviews, no forced updates |
| **Automated operator onboarding** | New city live in days — no field operations team required |
| **Proven model** | Real operators, real drivers generating real income — not a demo |
| **Informal market expertise** | Built for the segment Uber/Cabify ignore: mid-sized cities, moto-taxis, shared transport |

The informal transport market in Latin America moves billions of dollars per year through WhatsApp coordination, phone calls, and Facebook groups. GoViajes systematizes that — with a platform operators already pay for.

---

## Acquisition & Partnership

**Looking for:** strategic acquirers in the mobility, logistics, or fintech space seeking WhatsApp-native distribution in Latin America.

**What transfers:** full codebase, production infrastructure, tenant relationships, domain knowledge, and the team that built it.

**Contact:** [augustocastroo38@gmail.com](mailto:augustocastroo38@gmail.com)

---

<p align="center">
  <img src="assets/Logo iluminado.jpeg" width="80" alt="GoViajes logo" />
  <br>
  <sub>Built in Argentina · Operating in northern Argentina · Expanding across Latin America</sub>
</p>
