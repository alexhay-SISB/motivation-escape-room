# Unlock — The Motivation Files

A cooperative HTML escape room for Cambridge IGCSE Business Studies 0450. Students enter a made-up nickname, join their teacher’s class, and are randomly paired on separate devices.

**Play:** https://alexhay-SISB.github.io/motivation-escape-room/

## Run a class

1. Open the game on your laptop and choose **Teacher · Create a class**.
2. Copy the student invitation link and share it with your class. Students open that link and enter a nickname only.
3. Wait until the roster is ready, then choose **Shuffle pairs & start**. Ask partners to sit together: each has different clues and tasks.
4. Keep the teacher tab open and the computer awake. Do not refresh it: the live class exists in its memory.
5. Use **Pair waiting students** for late arrivals. An odd student waits for another player; the teacher can open the student link in another tab and join as their partner. Existing pairs are preserved.
6. Use **Pause** for discussion. The elapsed-time display continues, but submissions and progression pause. **End class** disconnects students and clears the in-memory roster and results.

Students who briefly disconnect can refresh their original tab and enter their nickname again to rejoin their existing team. Rejoining requires the same tab’s session storage and the original class link. If that storage is lost or the tab is closed, there is no guaranteed recovery. A new class gives everyone a fresh start.

## Gameplay

- 16 locks: four in each of Maslow’s Needs Tower, Herzberg’s Two-Factor Lab, Taylor’s Output Engine, and the mixed-theory Exit Vault.
- Sequence puzzles, category sorting, shuffled multiple-choice answers, a piece-rate calculation, workplace decisions and a final key code.
- Each student must finish their own task. Both must click ready after reading the explanation.
- Each team lock earns 100 points. A wrong submission costs 10; a shared hint costs 15 once per lock. Score is floored at zero. There is no failure countdown.
- The final debrief identifies locks needing retries and provides explanations.
- Shared-device practice works without the live connection service: two players switch turns on one device. This mode is explicitly labelled and does not do online pairing.
- Keyboard-friendly controls, mobile layout, optional synthesised sound, reduced-motion support. No microphone or camera permissions.

## Content and scope

Based on the supplied **Motivation Theorists .pptx**, including its image-based teaching diagrams. Wording has been adapted for accessible classroom English. Applications, strengths and limitations remain at IGCSE level. An ambiguous slide heading about hygiene factors has been interpreted in the context of Herzberg’s overall theory; hygiene factors are consistently distinguished from motivators.

Official scope: [Cambridge IGCSE Business Studies 0450, 2026 syllabus, section 2.1](https://www.cambridgeinternational.org/Images/697146-2026-syllabus.pdf). This includes Maslow’s hierarchy, Taylor and Herzberg, and financial/non-financial motivation. It is not an official Cambridge product. No additional theorists or A-Level process theories are included. The source PowerPoint and copyrighted slide images are not republished.

## Privacy and connections

- Ask students to use invented nicknames, never full names. The app asks for no email address, login, student ID, age, location or contact information.
- Nicknames, answers and progress travel through encrypted WebRTC data channels to the teacher’s browser. Partners receive only the nickname and game progress needed for play; they do not receive the full class roster.
- The app has no student database, analytics, cookies or advertising. The teacher holds live data in memory. A random rejoin token and nickname are stored in each student tab’s sessionStorage and removed on leaving or receiving an end-class message; browser session restoration can preserve session storage.
- The free public PeerJS signalling service and STUN infrastructure establish browser connections. GitHub and these services receive ordinary technical network information, including IP addresses. This is not a guarantee of zero personal/technical data processing by infrastructure providers.
- The invitation uses an unpredictable 128-bit class ID. Anyone with that link can join; share it only with the intended class. The public home page creates a *new* independent class, not access to an existing teacher dashboard. No permanent teacher credentials are used.
- The teacher is the game authority. Rejoin tokens are random, answers are validated on the teacher device, and stale or duplicate actions cannot advance the game. This is a low-stakes learning game, not a secure exam: the static source includes answers.
- GitHub Pages hosts static files. PeerJS Cloud provides free signalling; a paid backend is not required. Availability is outside the game’s control. School firewalls or restrictive NAT can block WebRTC. No TURN relay is configured. Test on the classroom Wi-Fi before the lesson; shared-device practice is the fallback.
- Live class supports up to 80 roster entries. Automated logic tests exercise 31-student pairing, but this is not a claim of real-device load testing.

## Hosting and editing

No build required. GitHub Pages should serve the `main` branch, `/ (root)` folder.

- `index.html`: page shell
- `style.css`: responsive visual design
- `app.js`: interface, classroom network and connection recovery
- `engine.js`: pairing, validation, scoring and progression
- `content.js`: all puzzles, answers, clues and explanations
- `peerjs.min.js`: vendored PeerJS 1.5.5 (MIT; see `PEERJS-LICENSE`)

Run `npm test` with a current Node.js installation. Tests use Node’s built-in test runner; there are no installation steps. Serve this folder over HTTP locally; live browser connections require HTTPS or localhost.
