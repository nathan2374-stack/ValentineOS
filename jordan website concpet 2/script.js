(function() {
    const apiKey = ""; // Add your Gemini API Key here if needed
    const canvas = document.getElementById('master-canvas');
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Background Particle System
    const particles = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2
        });
    }

    function drawBG() {
        ctx.fillStyle = '#020205';
        ctx.fillRect(0, 0, w, h);
        particles.forEach(p => {
            ctx.fillStyle = 'rgba(255, 0, 127, 0.25)';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if(p.x < 0 || p.x > w) p.vx *= -1;
            if(p.y < 0 || p.y > h) p.vy *= -1;
        });
        
        ctx.strokeStyle = 'rgba(255, 0, 127, 0.03)';
        ctx.lineWidth = 1;
        for(let i=0; i<w; i+=50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
        for(let j=0; j<h; j+=50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }
        
        requestAnimationFrame(drawBG);
    }
    drawBG();

    // Rising Heart Icons
    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-icon-stream';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.transition = 'all 10s linear';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 100);
        
        setTimeout(() => heart.remove(), 11000);
    }
    setInterval(spawnHeart, 800);

    // Neural Grid Generation
    const bioGrid = document.getElementById('bio-grid');
    for(let i=0; i<100; i++) {
        const cell = document.createElement('div');
        cell.className = 'bio-cell';
        bioGrid.appendChild(cell);
    }

    const neuralBarsContainer = document.getElementById('neural-bars');
    for(let i=0; i<20; i++) {
        const bar = document.createElement('div');
        bar.className = 'n-bar';
        neuralBarsContainer.appendChild(bar);
    }

    // Dynamic UI Updates (BPM and Bars)
    setInterval(() => {
        const cells = document.querySelectorAll('.bio-cell');
        cells.forEach(c => {
            c.style.background = Math.random() > 0.95 ? 'rgba(255, 0, 127, 0.5)' : 'rgba(255, 0, 127, 0.05)';
        });
        
        const bars = document.querySelectorAll('.n-bar');
        bars.forEach(b => {
            b.style.height = (Math.random() * 100) + '%';
            b.style.background = Math.random() > 0.5 ? 'var(--neon-purple)' : 'var(--neon-pink)';
        });

        document.getElementById('hr-val').innerText = (70 + Math.floor(Math.random()*12)) + ' BPM';
    }, 300);

    // Time and Countdown Logic
    const clockEl = document.getElementById('real-time');
    const ccmaEl = document.getElementById('ccma-timer');
    const targetDate = new Date("February 11, 2026 09:00:00").getTime();

    function updateTime() {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString() + ':' + now.getMilliseconds().toString().padStart(3, '0');
        const diff = targetDate - now.getTime();
        if(diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            ccmaEl.innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
        }
    }
    setInterval(updateTime, 100);

    // Evasive "No" Button Logic
    const btnNo = document.getElementById('auth-no-btn');
    const evasive = () => {
        const padding = 100;
        const x = Math.random() * (window.innerWidth - 200) + padding;
        const y = Math.random() * (window.innerHeight - 100) + padding;
        btnNo.className = 'decision-btn btn-no evasive';
        btnNo.style.left = Math.min(x, window.innerWidth - 180) + 'px';
        btnNo.style.top = Math.min(y, window.innerHeight - 100) + 'px';
        
        const log = document.createElement('div');
        log.style.color = 'var(--error-red)';
        log.innerHTML = `[CRITICAL_ERR] REJECTION_LOGIC_BLOCKED_BY_HEART_CORE. MATTHEW_W AUTHORIZATION REQUIRED.`;
        const tOut = document.getElementById('term-out');
        tOut.appendChild(log);
        tOut.scrollTop = tOut.scrollHeight;
    };
    btnNo.onmouseover = evasive;
    btnNo.onclick = (e) => { e.preventDefault(); evasive(); };

    // Authorize (Yes) Logic
    document.getElementById('auth-yes-center').onclick = () => {
        document.getElementById('deployment-success').style.display = 'flex';
        const tOut = document.getElementById('term-out');
        const log = document.createElement('div');
        log.style.color = 'var(--neon-gold)';
        log.innerHTML = `[SUCCESS] DEPLOYMENT_AUTHORIZED. MATTHEW + JORDAN SYNC ESTABLISHED.`;
        tOut.appendChild(log);
    };

    // Terminal Input and AI Processing
    const tOut = document.getElementById('term-out');
    const tIn = document.getElementById('term-in');

    async function handleTermInput() {
        const input = tIn.value.trim();
        if(!input) return;
        const userDiv = document.createElement('div');
        userDiv.style.color = 'var(--neon-pink)';
        userDiv.innerHTML = `[OBJECTION] > ${input}`;
        tOut.appendChild(userDiv);
        tIn.value = '';
        
        let aiResponse = "ERROR: Objection processing failed. Target Jordan is too perfect for logical rejection. Manual override: I love you.";
        
        if(apiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `You are the Matthew-and-Jordan-AI. Jordan has an objection: "${input}". 
                        Counter her with high-tech romantic logic. Mention Matthew is the only authorized partner. Mention the CCMA case win on Feb 11 and Cape Town deployment. 
                        Keep it sweet, tactical, and slightly sci-fi.` }] }]
                    })
                });
                const data = await response.json();
                aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || aiResponse;
            } catch(err) {
                aiResponse = "[CONNECTION_LOST] Reverting to manual heart override: The logic of the heart dictates Matthew and Jordan belong together.";
            }
        }
        
        const aiDiv = document.createElement('div');
        aiDiv.style.color = 'var(--terminal-green)';
        aiDiv.style.paddingLeft = '15px';
        aiDiv.innerHTML = `[AI] > ${aiResponse}`;
        tOut.appendChild(aiDiv);
        tOut.scrollTop = tOut.scrollHeight;
    }

    tIn.onkeydown = (e) => { if(e.key === 'Enter') handleTermInput(); };
})();