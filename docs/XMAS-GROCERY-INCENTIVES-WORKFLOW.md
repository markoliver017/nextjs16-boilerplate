Project Proposal: PCMC Digital Incentive Management System
Date: November 28, 2025 Prepared For: PCMC Executive Committee & PRAISE Committee

1. Executive Summary

This proposal outlines the implementation of a centralized, digital platform to manage the distribution of the 2024 Christmas Grocery Incentives. The system replaces manual masterlists with a secure online portal that allows PCMC Admins to configure item bundles, enables employees to book their preferred pickup locations, and empowers Store Partners to validate claims using digital checklists.

2. Project Objectives

Inventory Control: To digitally define and track the exact contents (e.g., 2 Hams, 1 Cheese) of every incentive package to ensure completeness upon release.

Operational Efficiency: To streamline the selection of preferred store branches (WalterMart/Puregold) for all eligible personnel.

Accountability: To prevent duplicate claims through secure identity validation and real-time tracking.

Feedback Loop: To provide employees with immediate digital confirmation (email receipts) upon the release of their incentives.

3. Functional Requirements

3.1. Admin Configuration Module (New)

Item Masterlist: The system allows Admins to create a library of all grocery items (e.g., "Luncheon Meat 340g", "Premium Rice 25kg") including descriptions and reference prices.

Package Bundling: Admins can create "Incentive Packages" (e.g., Christmas Grocery 2024) and assign specific items and quantities to them (e.g., Bundle contains: 2 Hams, 1 Fruit Cocktail).

Eligibility Rules: Admins can restrict specific packages to certain employee groups (e.g., Premium Rice is visible only to Consultants).

3.2. User Role Management (RBAC)

Super Admin (PCMC): Full control over events, item catalogs, package recipes, and masterlists.

Store Admin (Partner): Restricted access to validate redemptions and view the "Item Checklist" for verification.

Employee (User): Self-service access to register and generate redemption codes.

3.3. Registration & Redemption

Store Selection: Employees select a branch based on their package type (e.g., Grocery Package → WalterMart branches only).

Digital Checklist: Upon scanning, the Store Admin sees the exact list of items the employee is entitled to receive.

4. System Security & Data Integrity

Identity Verification: Users must match their Employee ID and Last Name against the official HR Masterlist to claim an account.

Location-Locking: Store Admin accounts are linked strictly to one location.

One-Time Use Tokens: QR codes are single-use and encrypted.

Audit Trails: Every action—from package creation to redemption scanning—is logged.

5. Process Workflow

Phase 1: Admin Setup & Configuration (Pre-Event)

This phase is critical for defining what employees will receive.

Event Creation: Admin creates the "Christmas Incentive 2024" event with valid dates.

Item Cataloging: Admin populates the system with individual items:

Item A: Ham (1kg)

Item B: Queso de Bola

Item C: Rice (25kg)

Package "Recipe" Creation:

Admin creates Package A (Grocery) and adds: 2x Item A, 1x Item B.

Admin creates Package B (Rice) and adds: 1x Item C.

Admin links Package A to WalterMart and Package B to Puregold.

Masterlist Import: Admin uploads the Excel list of eligible employees.

Store Setup: Admin creates accounts for Store Managers.

Phase 2: Employee Registration (Dec 09 – Dec 10)

Account Claim: Employee verifies identity using ID/Last Name.

Selection: Employee sees only the packages they are eligible for.

Example: A Consultant sees "Rice Package"; An Active Employee sees "Grocery Package".

Booking: Employee selects a specific store branch for pickup.

QR Generation: System generates a QR code.

Phase 3: Redemption (Dec 16 – Dec 22)

Store Visit: Employee presents QR code.

Validation & Checklist:

Store Admin scans the code.

System Display: Shows Employee Name AND the List of Items (e.g., "2 Hams, 1 Cheese").

Store Admin physically verifies the grocery bag contents against the screen.

Confirmation: Store Admin clicks "Confirm Redemption".

Notification: System emails the employee a receipt.

6. User Interface (UI) Overview

A. PCMC Admin Dashboard

Inventory Manager: A view to add/edit items and build package bundles (recipes).

Event Monitor: Live charts showing Registered vs. Claimed stats.

Masterlist View: Searchable list of all personnel status.

B. Employee Portal

Status Card: Visual indicator (Action Required / Ready / Claimed).

My QR Code: Printable view with branch address.

C. Store Partner Interface

Scanner Mode: Camera input for QR codes.

Verification Card: A pop-up showing the Employee Name and the Item Checklist (with checkboxes) to ensure the correct goods are handed over.
