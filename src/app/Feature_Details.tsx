1. Product Vision
To build the most trusted, privacy-first, global alumni engagement platform—connecting BITSians across generations through networking, mentorship, careers, events, chapters, and giving.

2. Product Pillars (Detailed)
Global Alumni Identity — Verified profiles with granular privacy controls.


Networking & Community — Directory, groups, conversations.


Mentorship & Career Growth — Jobs, referrals, structured guidance.


Local & Global Engagement — Chapters, events, campus updates.


Giving & Impact — Donations, volunteering.


Trust, Privacy & Safety — Controls at every layer.



3. Feature Breakdown (Deep Dive)
Each core module is expanded with:
Purpose


Feature list


User stories


Acceptance criteria


Data fields (high level)


Edge cases



3.1 Global Alumni Directory (Detailed)
Purpose
Enable alumni to discover and connect with each other safely.
Core Feature Set
Search (free text + structured)


Filters (location, industry, skills, batch, campus)


Profile cards with privacy indicators


Alumni profile (full/limited/private)


Preferred contact method


Contact request workflow


In-app messaging (privacy-safe)


User Stories
As an alumnus, I want to search for BITSians in my city so I can build a professional and social network.


As a privacy-conscious user, I want to hide my phone number so I can avoid spam.


As a founder, I want to find alumni with certain skills for hiring.


Acceptance Criteria
Users can filter using any combination of parameters.


Hidden fields must not appear in API responses.


Contact requests must require explicit approval.


No user can bypass privacy settings.


Data Fields
name, batch, degree, campus


company, role, industry


city, country, relocation interest


skills, interests


phone (private/visible)


email (private/visible)


LinkedIn/X/GitHub


badges (mentor, donor, organiser)


Edge Cases
User sets “Private Mode”: only name visible.


User blocks another alumnus: profile must disappear.


Search returns zero results → suggest global alumni.



3.2 Profile & Identity (Detailed)
Features
Profile editing


Section-based visibility controls


Alumni verification


Identity badges


Interests & skill taxonomy


Stories
As a user, I want to control what each type of user can see about me.


As an alumnus, I want to verify my identity with minimal friction.


Edge Cases
Batch mismatch during verification.


Duplicate profile prevention.



3.3 In-App Messaging (Detailed)
Features
1:1 chat


Contact request gating


Optional approval-only messaging mode


File sharing (Phase 2)


Voice notes (Phase 3)


Stories
As a user, I want to chat without revealing my phone number.


As a privacy-anxious user, I want only approved users to message me.


Acceptance Criteria
Phone/email must never appear unless approved.


Block/report must instantly restrict messaging.


Edge Cases
User deletes account → chats anonymised.


High-frequency spam → automatic rate limiting.



3.4 Interest Groups & Micro-Communities (Detailed)
Features
Topic-based groups


Group posts


Group chat


Admin/moderator controls


Event linking from groups


Stories
As an alumnus, I want to join groups matching my hobbies or skills.


As a group moderator, I want to manage posts and control spam.


Acceptance Criteria
Group size infinite; performance must be maintained.


Moderators must have control panel.



3.5 Mentorship Hub (Detailed)
Features
Mentor listing with expertise tags


Mentee goal selection


Matching algorithm


Request-accept workflow


Program structure: 6–12 weeks


Calendar + session tracking


Mentor badges


Stories
As a career seeker, I want to find mentors aligned with my goals.


As a senior alum, I want structured mentoring rather than ad-hoc requests.


Acceptance Criteria
Mentor availability must be respected.


Mentorship sessions logged.


Reminders for weekly check-ins.


Edge Cases
Mentor overwhelmed → temporarily auto-hide.


Mentee no-shows → automatic removal after 3 strikes.



3.6 Jobs & Hiring (Detailed)
Features
Job board


Alumni referral flow


Recruiter dashboard


Startup hiring category


Skill-based matching


Stories
As a job seeker, I want to ask alumni for referrals.


As a recruiter, I want to post roles only for BITSians.


Acceptance Criteria
Referral requests cap/day.


Job expiry auto-triggers.


Edge Cases
Fake job postings blocked via moderation.


Recruiter not an alumnus → dual verification required.



3.7 Events & Chapters (Detailed)
Features
Chapter discovery via map


Chapter membership


Event creation (title, banner, venue, speakers)


Ticketing (paid/free)


QR-based check-in


Event analytics


Stories
As a chapter leader, I want to easily manage RSVPs.


As an alumnus, I want to see events around me.


Acceptance Criteria
Events must display accurate attendee count.


QR must be scannable offline.


Edge Cases
Multi-city events.


Duplicate check-ins.



3.8 Relocation Assistant (Detailed)
Features
City selection


Alumni mapping


Housing recommendations


City buddy program


Local guide (verified by alumni)


Stories
As an alumnus moving to Singapore, I want to connect with locals to settle quickly.


Acceptance Criteria
Buddy program must match based on availability.


Edge Cases
City with no alumni → show nearby chapters.



3.9 Campus Connect (Detailed)
Features
News feed


Fest updates (Oasis/APOGEE/BOSM)


Clubs & faculty updates


Streams by campus


Stories
As an alumnus, I want to know what’s happening at my campus.


Acceptance Criteria
Content must be moderated.



3.10 Donations & Giving (Detailed)
Features
Donation campaigns


Scholarship details


Endowment pages


One-time or recurring giving


Donor wall + donor badges


Stories
As an alumnus, I want to contribute online easily.


As BITSAA, I want to show impact transparently.


Acceptance Criteria
Secure payment gateway.


Verified campaigns only.



4. Privacy & Security (Deep Implementation Requirements)
Per-field visibility toggles (backend-enforced)


Server-side filtering


Discovery modes (Public, Limited, Private, Event-only)


Approval-only messaging


AI-based spam detection


Encrypted PII vault


Role-based access control for chapters



5. Integration Requirements
BITSAA alumni database sync


API for chapter management


Payment system


Notifications service


AI recommendation engine (Phase 2)



6. Success Metrics (Expanded)
NPS by persona


% profiles fully set up


Weekly connections made


Mentor–mentee pairings


Job referral conversions


Event attendance rate


Privacy settings usage



7. Appendices
Taxonomies (skills, interests)


Chapter list


Verification workflow


Data model outline (high-level)



End of Detailed PRD

