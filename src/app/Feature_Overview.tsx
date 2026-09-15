1. Overview
The BITS Alumni App is a unified digital platform designed to connect BITS Pilani alumni across the world. It enables community building, professional networking, mentorship, event participation, hiring, chapter engagement, campus updates, and safe, privacy-first alumni discovery.
This PRD outlines the functional, non-functional, privacy/safety, and design requirements for the BITS Alumni App (Web + Mobile).

2. Vision & Objectives
Vision: Build the world’s most engaged, trusted, and purpose-driven alumni community platform.
Primary Objectives:
Strengthen global alumni connectivity.


Enable career growth through mentorship, jobs, and referrals.


Enhance chapter engagement and local community activation.


Facilitate alumni–institute collaboration.


Ensure safety, trust, and privacy-first communication.


Provide frictionless access to events, updates, and alumni services.



3. Core Features
3.1 Global Alumni Directory
Search alumni using filters: location, industry, skills, batch, campus, company.


Profile fields: bio, work history, skills, interests, contact preferences, badges.


Visibility controls for every field.


Preferred contact method selection.


Approval-based contact requests.


In-app secure messaging.


3.2 Networking & Micro-Communities
Interest groups (AI/ML, Finance, Product, Music, etc.).


Group chats and topic boards.


Suggested connections (AI-powered).


3.3 Mentorship Hub
Mentor/mentee matching.


Availability calendar.


Session scheduling.


Structured mentorship programs (6–12 weeks).


3.4 Career Hub (Jobs + Hiring)
BITSian-first job board.


Internal referral system.


Startup hiring.


Resume review and career guidance tools.


3.5 Chapters & Events
Chapter discovery via map.


Chapter info pages.


Create/host events.


Event management: RSVPs, ticketing, QR check-in.


Global calendar.


3.6 Relocation & City Guide
Alumni discovery in new city.


Housing tips, neighbourhood guides.


City buddies.


3.7 Campus Connect
Campus news feed.


Faculty updates.


Fest updates (Oasis/APOGEE/BOSM).


Research and innovation highlights.


3.8 BITSAA Philanthropy & Giving
Scholarship and endowment listings.


Donation flow.


Impact reports.


Donor badges.



4. Privacy & Safety Features (Critical Section)
4.1 Visibility Controls (Per-Field Privacy)
Each profile field has visibility states:
Public to all alumni


Visible only to verified contacts


Visible only to chapter members


Visible only during events


Completely hidden


Fields with privacy toggles:
Email


Phone number


City


Company


LinkedIn


Availability status


4.2 Preferred Contact Method
In-app messages only


LinkedIn only


Email


Phone


Contact Requests (approval-based)


4.3 Contact Request System
Alumni cannot directly see private fields.


They must send a request to view email/phone.


User can:


Accept


Decline


Block


Allow for limited time (e.g., 7 days)


4.4 In-App Messaging Privacy
No phone/email shared during chat.


Anti-spam rate limits.


Quick block/report actions.


4.5 Discovery Modes
Fully discoverable


Limited profile (name + batch only)


Private mode (invisible in directory)


Event mode (visible only to co-attendees)


Chapter mode (visible to city chapter only)


4.6 Data Protection
Data encryption at rest and in transit.


Minimal data retention.


Clear consent screen during onboarding.


4.7 Special Persona: Privacy-Anxious User
To support users fearful of sharing their information:
Minimal profile mode.


Approval-only communication.


Anonymous participation in events (optional).


Strict control over visibility.


Frequent reminders about data safety.


Education tooltips: “This field is private unless you enable it.”



5. Personas
(Detailed persona document will exist separately; high-level personas included here for alignment.)
The Networker: Wants professional and social connection.


The Career Seeker: Focused on jobs, mentorship, and referrals.


The Mentor/Leader: Senior alumnus looking to give back.


The Chapter Organizer: Focused on events and city engagement.


The Relocating Alumnus: Needs city-specific help.


The Privacy-Anxious Alumnus: Wants maximum control and safety.



6. User Scenarios (Samples)
"I am moving to Bengaluru — find me relevant alumni and chapters."


"I want a product management mentor for 2 months."


"I want to host an alumni meetup in Singapore."


"I want to hire a BITSian developer."


"I want to hide my phone number but still network safely."



7. Functional Requirements
7.1 Directory
Search, filters, detailed profiles, messaging.


7.2 Events
Create, view, join, manage, ticketing, notifications.


7.3 Mentorship
Matching, scheduling, tracking.


7.4 Jobs
Posting, applying, referral requests.


7.5 Chapters
Discovery, membership, communication.


7.6 Campus Feed
Aggregated updates, announcements.



8. Non-Functional Requirements
Scalability: 100k+ alumni.


High availability.


GDPR-style data privacy.


Secure auth (OAuth, SSO optional).


Multi-platform (iOS, Android, Web).



9. Success Metrics
% alumni onboarded


Monthly active users


Connections made


Mentorship matches


Event RSVPs


Job postings & hires


Privacy compliance scores



10. Future Enhancements
AI assistant for networking and career guidance.


AI-generated alumni summaries.


Verified alumni badges via blockchain credential.



End of PRD



