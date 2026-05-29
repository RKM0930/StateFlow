// =======================================================
// CORRECT DFA DATA (exactly as required)
// =======================================================
var dfa1 = {
    states: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    alphabet: ['a', 'b'],
    start: 0,
    accept: [11, 15],  // x1+ = 11, x2+ = 15
    transitions: [
        // - (0): a→s1(1), b→q1(2)
        [0,"a",1], [0,"b",2],

        // s1 (1): a→s2(12), b→r1(5)
        [1,"a",12], [1,"b",5],

        // q1 (2): a→q2(3), b→r1(5)
        [2,"a",3], [2,"b",5],

        // q2 (3): b→q3(4), a→T(14)
        [3,"b",4], [3,"a",14],

        // q3 (4): b→q1(2), a→r3(7)
        [4,"b",2], [4,"a",7],

        // r1 (5): a→r2(6), b→T(14)
        [5,"a",6], [5,"b",14],

        // r2 (6): b→r3(7), a→T(14)
        [6,"b",7], [6,"a",14],

        // r3 (7): a→t1(8), b→t1(8)
        [7,"a",8], [7,"b",8],

        // t1 (8): a→t2(9), b→t3(10)
        [8,"a",9], [8,"b",10],

        // t2 (9): a→x1+(11), b→t3(10)
        [9,"a",11], [9,"b",10],

        // t3 (10): a→t2(9), b→x2+(15)
        [10,"a",9], [10,"b",15],

        // x1+ (11): a→x1+(11), b→t3(10)
        [11,"a",11], [11,"b",10],

        // s2 (12): a→T(14), b→s3(13)
        [12,"a",14], [12,"b",13],

        // s3 (13): a→r3(7), b→T(14)
        [13,"a",7], [13,"b",14],

        // T (14): a→T(14), b→T(14)
        [14,"a",14], [14,"b",14],

        // x2+ (15): a→t2(9), b→x2+(15)
        [15,"a",9], [15,"b",15],
    ],
    positions: {
        0: {x:60,   y:100},   // - (start)  
        1: {x:60,   y:500},   // s1         
        2: {x:220,  y:100},   // q1        
        3: {x:540,  y:100},   // q2        
        4: {x:700,  y:100},   // q3         
        5: {x:220,  y:260},   // r1         
        6: {x:540,  y:260},   // r2         
        7: {x:700,  y:260},   // r3         
        8: {x:860,  y:260},   // t1         
        9: {x:1020, y:100},   // t2         
        10:{x:1020, y:500},   // t3         
        11:{x:1180, y:100},   // x1+        
        12:{x:220,  y:500},   // s2         
        13:{x:540,  y:500},   // s3         
        14:{x:380,  y:380},   // T (trap)   
        15:{x:1180, y:500},   // x2+        
    },
    transform: { dx: 20, dy: 20, scale: 1.4 },
    // Per-DFA state labels — two accept states, one trap state T
    stateLabels: {
        0: '-',  1: 's1', 2: 'q1',  3: 'q2',
        4: 'q3', 5: 'r1', 6: 'r2',  7: 'r3',
        8: 't1', 9: 't2', 10: 't3', 11: '+',
        12: 's2', 13: 's3', 14: 'T', 15: '+'
    }
};

var dfa2 = {
    states: [0,1,2,3,4,5,6,7,8],
    alphabet: ['0', '1'],
    start: 0,
    accept: [8],  // t1+ = 8
    transitions: [
        // - (0): 0→s1(1), 1→q1(2)
        [0,"0",1], [0,"1",2],

        // s1 (1): 0→q2(3), 1→q1(2)
        [1,"0",3], [1,"1",2],

        // q1 (2): 0→s1(1), 1→q2(3)
        [2,"0",1], [2,"1",3],

        // q2 (3): 0→q3(4), 1→q3(4)
        [3,"0",4], [3,"1",4],

        // q3 (4): 0→q3(4), 1→r1(5)
        [4,"0",4], [4,"1",5],

        // r1 (5): 0→r2(6), 1→r3(7)
        [5,"0",6], [5,"1",7],

        // r2 (6): 0→q3(4), 1→t1+(8)
        [6,"0",4], [6,"1",8],

        // r3 (7): 0→r2(6), 1→t1+(8)
        [7,"0",6], [7,"1",8],

        // t1+ (8): 0→t1+(8), 1→t1+(8)
        [8,"0",8], [8,"1",8]
    ],
    positions: {
        0: { x: 60,  y: 260 },   // - (start)
        1: { x: 200, y: 110 },   // s1
        2: { x: 200, y: 410 },   // q1
        3: { x: 360, y: 260 },   // q2
        4: { x: 520, y: 260 },   // q3
        5: { x: 680, y: 260 },   // r1
        6: { x: 840, y: 110 },   // r2
        7: { x: 840, y: 410 },   // r3
        8: { x: 1020, y: 260 }   // t1+ (accept)
    },
    transform: { dx: -10, dy: -20, scale: 1.2 },
    stateLabels: {
        0: '-',  1: 'q1', 2: 'q2', 3: 'q3',
        4: 's1', 5: 'r1', 6: 'r2', 7: 'r3',
        8: '+'
    }
};

// =======================================================
// SIMULATION STATE (unchanged)
// =======================================================
var simulation = {
    dfaNum: null,
    input: '',
    path: [],
    stepIndex: 0,
    finished: false,
    autoTimer: null,
    activeSubTab: 1
};

var runHistory = { 1: [], 2: [] };

var currentSubTab = 1;
var currentSection = 'dfa-regex';

// =======================================================
// THEME MANAGEMENT
// =======================================================
(function() {
    var savedTheme = localStorage.getItem('dfa-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').textContent = '☾';
    } else {
        document.body.classList.remove('light-theme');
        document.getElementById('theme-icon').textContent = '☀';
    }
})();

function updatePDAImages() {
    var isDark = !document.body.classList.contains('light-theme');

    var pda1Img = document.getElementById('pda-img-1');
    var pda2Img = document.getElementById('pda-img-2');

    if (pda1Img) {
        pda1Img.src = isDark ? 'Images/pda1-dark.png' : 'Images/pda1-light.png';
    }

    if (pda2Img) {
        pda2Img.src = isDark ? 'Images/pda2-dark.png' : 'Images/pda2-light.png';
    }
}

function toggleTheme() {
    var body = document.body;
    body.classList.toggle('light-theme');

    var isLight = body.classList.contains('light-theme');
    localStorage.setItem('dfa-theme', isLight ? 'light' : 'dark');
    document.getElementById('theme-icon').textContent = isLight ? '☾' : '☀';

    if (currentSection === 'dfa-regex') {
        var dfaNum = currentSubTab;
        var dfa = dfaNum === 1 ? dfa1 : dfa2;
        drawDFA(dfa, 'dfa' + dfaNum + '-svg', simulation.path, simulation.stepIndex, getFinalResult());
    }

    updatePDAImages();
}

// =======================================================
// INIT
// =======================================================
window.onload = function() {
    drawDFA(dfa1, 'dfa1-svg', [], 0, null);
    drawDFA(dfa2, 'dfa2-svg', [], 0, null);
    switchSection('dfa-regex');
    applySubTab(1);
    initPDAZoom('pda-viewport-1');
    initPDAZoom('pda-viewport-2');
    updatePDAImages();
};

// =======================================================
// NAVIGATION (unchanged)
// =======================================================
function switchSection(sectionId) {
    currentSection = sectionId;
    document.querySelectorAll('.section-content').forEach(function(s) {
        s.classList.remove('active');
    });
    document.getElementById('section-' + sectionId).classList.add('active');

    document.querySelectorAll('.nav-center .nav-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    document.getElementById('nav-' + sectionId).classList.add('active');

    applySubTab(currentSubTab);
}

function switchSubTabGlobal(num) {
    currentSubTab = num;
    applySubTab(num);
}

function applySubTab(num) {
    currentSubTab = num;

    document.getElementById('nav-sub1').classList.toggle('active', num === 1);
    document.getElementById('nav-sub2').classList.toggle('active', num === 2);

    var info1 = document.getElementById('regex-info-1');
    var info2 = document.getElementById('regex-info-2');
    if (info1) info1.style.display = num === 1 ? 'block' : 'none';
    if (info2) info2.style.display = num === 2 ? 'block' : 'none';

    var col1 = document.getElementById('two-column-1');
    var col2 = document.getElementById('two-column-2');
    if (col1) col1.style.display = num === 1 ? 'flex' : 'none';
    if (col2) col2.style.display = num === 2 ? 'flex' : 'none';

    var cfg1 = document.getElementById('cfg-regex-1');
    var cfg2 = document.getElementById('cfg-regex-2');
    if (cfg1) cfg1.style.display = num === 1 ? 'block' : 'none';
    if (cfg2) cfg2.style.display = num === 2 ? 'block' : 'none';

    var pda1 = document.getElementById('pda-regex-1');
    var pda2 = document.getElementById('pda-regex-2');
    if (pda1) pda1.style.display = num === 1 ? 'block' : 'none';
    if (pda2) pda2.style.display = num === 2 ? 'block' : 'none';

    if (simulation.autoTimer) {
        clearTimeout(simulation.autoTimer);
        simulation.autoTimer = null;
    }
    var otherNum = num === 1 ? 2 : 1;
    resetSimulationSilent(otherNum);
    simulation.activeSubTab = num;
}

// =======================================================
// DFA GRAPH DRAWING – ADAPTIVE CURVATURE RENDERING
// =======================================================
function drawDFA(dfa, svgId, path, stepIndex, finalResult) {
    var svg = document.getElementById(svgId);
    svg.innerHTML = '';

    var pos = dfa.positions;
    var R = 18;
    var CURVE = 55;               // base curve for diagonal bidirectional pairs
    var PARALLEL_SPACING = 30;   // same-direction parallel edges
    var INCOMING_CURVE = 25;     // gentle curve when multiple edges converge on one node

    // Midnight blue palette
    var edgeBase      = '#4a658a';
    var edgeActive    = '#5b9cf5';
    var nodeStroke    = '#5a7ea0';
    var nodeFill      = '#162231';
    var nodeFillTraversed = '#1e3a5c';
    var nodeFillActive   = '#2d5a9e';
    var labelFill     = '#d1e0f5';
    var pillFill      = '#162231';
    var pillOpacity   = '0.96';

    if (document.body.classList.contains('light-theme')) {
        edgeBase      = '#7d8da6';
        edgeActive    = '#3b7ddd';
        nodeStroke    = '#8899bb';
        nodeFill      = '#f0f3f8';
        nodeFillTraversed = '#dce2eb';
        nodeFillActive   = '#c0d0f0';
        labelFill     = '#1a1f2e';
        pillFill      = '#f0f3f8';
    }

    var glowGreen     = '#3cc972';
    var glowRed       = '#e05555';

    var mNorm   = svgId + '_n';
    var mActive = svgId + '_a';
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    var filterStr = '<filter id="' + svgId + '_glow" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feGaussianBlur stdDeviation="4" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
        '</filter>';
    defs.innerHTML =
        '<marker id="' + mNorm + '" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">' +
        '<polygon points="0 0,10 3.5,0 7" fill="' + edgeBase + '"/></marker>' +
        '<marker id="' + mActive + '" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">' +
        '<polygon points="0 0,10 3.5,0 7" fill="' + edgeActive + '"/></marker>' +
        filterStr;
    svg.appendChild(defs);

    var T = dfa.transform;
    var graphGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    graphGroup.setAttribute("transform", "translate(" + T.dx + "," + T.dy + ") scale(" + T.scale + ")");
    svg.appendChild(graphGroup);

    // Determine active transition
    var activeFrom = -1, activeTo = -1, activeSym = '';
    if (path && stepIndex > 0 && stepIndex < path.length) {
        activeFrom = path[stepIndex - 1];
        activeTo   = path[stepIndex];
        activeSym  = (simulation.input && stepIndex - 1 < simulation.input.length)
                     ? simulation.input[stepIndex - 1] : '';
    }

    // Build list of traversed states so far
    var traversedStates = [];
    if (path && stepIndex > 0) {
        for (var ti = 0; ti <= stepIndex && ti < path.length; ti++) {
            if (traversedStates.indexOf(path[ti]) === -1) {
                traversedStates.push(path[ti]);
            }
        }
    }

    // Helper: draw a label with pill background
    function addLabel(lx, ly, text, color) {
        var charW = 7, fSize = 12, padX = 5, padY = 3;
        var bw = text.length * charW + padX * 2;
        var bh = fSize + padY * 2;
        var bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("x", lx - bw / 2);
        bg.setAttribute("y", ly - bh / 2);
        bg.setAttribute("width", bw);
        bg.setAttribute("height", bh);
        bg.setAttribute("rx", "3");
        bg.setAttribute("fill", pillFill);
        bg.setAttribute("opacity", pillOpacity);
        graphGroup.appendChild(bg);
        var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", lx);
        txt.setAttribute("y", ly);
        txt.setAttribute("fill", color);
        txt.setAttribute("font-size", fSize);
        txt.setAttribute("font-weight", "700");
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("dominant-baseline", "central");
        txt.textContent = text;
        graphGroup.appendChild(txt);
    }

    // Helper: draw a path
    function addPath(d, color, width, markerId) {
        var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
        el.setAttribute("d", d);
        el.setAttribute("stroke", color);
        el.setAttribute("stroke-width", width);
        el.setAttribute("fill", "none");
        el.setAttribute("marker-end", "url(#" + markerId + ")");
        graphGroup.appendChild(el);
    }

    // --- PREPARE EDGE GROUPS ---
    // Count directed edges (excluding self-loops)
    var dirCount = {};
    for (var i = 0; i < dfa.transitions.length; i++) {
        var t = dfa.transitions[i];
        if (t[0] === t[2]) continue;
        var key = t[0] + '-' + t[2];
        dirCount[key] = (dirCount[key] || 0) + 1;
    }

    // True bidirectional pairs (exactly one each way)
    var isBidir = {};
    for (var i = 0; i < dfa.transitions.length; i++) {
        var t = dfa.transitions[i];
        if (t[0] === t[2]) continue;
        var a = Math.min(t[0], t[2]), b = Math.max(t[0], t[2]);
        var pairKey = a + '-' + b;
        if (isBidir[pairKey] !== undefined) continue;
        var forward = dirCount[t[0] + '-' + t[2]] || 0;
        var backward = dirCount[t[2] + '-' + t[0]] || 0;
        isBidir[pairKey] = (forward === 1 && backward === 1);
    }

    // Same-direction parallel groups (multiple edges A→B, not part of a bidirectional pair)
    var sameDirGroups = {};
    for (var i = 0; i < dfa.transitions.length; i++) {
        var t = dfa.transitions[i];
        if (t[0] === t[2]) continue;
        var key = t[0] + '-' + t[2];
        var a = Math.min(t[0], t[2]), b = Math.max(t[0], t[2]);
        if (isBidir[a + '-' + b]) continue;
        if (dirCount[key] > 1) {
            if (!sameDirGroups[key]) sameDirGroups[key] = [];
            sameDirGroups[key].push(i);
        }
    }

    // Incoming edge groups for convergence handling
    var incomingGroups = {};
    for (var i = 0; i < dfa.transitions.length; i++) {
        var t = dfa.transitions[i];
        if (t[0] === t[2]) continue;
        var target = t[2];
        if (!incomingGroups[target]) incomingGroups[target] = [];
        incomingGroups[target].push(i);
    }

    // --- DRAW ALL TRANSITIONS ---
    for (var i = 0; i < dfa.transitions.length; i++) {
        var t = dfa.transitions[i];
        var from = t[0], symbol = t[1], to = t[2];
        var isActive = (from === activeFrom && to === activeTo && symbol === activeSym);
        // Check if this edge was already traversed in the path
        var isTraversed = false;
        if (path && stepIndex > 0) {
            for (var ti = 0; ti < stepIndex && ti + 1 < path.length; ti++) {
                if (path[ti] === from && path[ti + 1] === to) {
                    // Also verify the symbol matches
                    var expectedSym = simulation.input ? simulation.input[ti] : '';
                    if (expectedSym === symbol) {
                        isTraversed = true;
                        break;
                    }
                }
            }
        }
        var color = isActive ? edgeActive : (isTraversed ? edgeActive : edgeBase);
        var width = isActive ? '3.5' : (isTraversed ? '2.5' : '1.8');
        var markerId = isActive ? mActive : (isTraversed ? mActive : mNorm);
        // Check if this edge was already traversed in the path
        var isTraversed = false;
        if (path && stepIndex > 0) {
            for (var ti = 0; ti < stepIndex && ti + 1 < path.length; ti++) {
                if (path[ti] === from && path[ti + 1] === to) {
                    // Also verify the symbol matches
                    var expectedSym = simulation.input ? simulation.input[ti] : '';
                    if (expectedSym === symbol) {
                        isTraversed = true;
                        break;
                    }
                }
            }
        }
        var color = isActive ? edgeActive : (isTraversed ? edgeActive : edgeBase);
        var width = isActive ? '3.5' : (isTraversed ? '2.5' : '1.8');
        var markerId = isActive ? mActive : (isTraversed ? mActive : mNorm);

        // ---------- SELF-LOOPS ----------
        if (from === to) {
            // Check if this self-loop has already been drawn (for combined a,b label)
            var alreadyDrawn = false;
            for (var k = 0; k < i; k++) {
                if (dfa.transitions[k][0] === from && dfa.transitions[k][2] === from) {
                    alreadyDrawn = true; break;
                }
            }
            if (alreadyDrawn) continue; // skip second self-loop, already drawn combined

            // ---------- SELF-LOOP TRAVERSAL CHECK ----------
            // Standard isTraversed check fails for self-loops because combined
            // a,b labels are drawn as one edge; instead check for consecutive
            // identical states in the path to determine if loop was traversed.
            var selfLoopTraversed = false;
            if (path && stepIndex > 0) {
                for (var ti = 0; ti < stepIndex && ti + 1 < path.length; ti++) {
                    if (path[ti] === from && path[ti + 1] === from) {
                        selfLoopTraversed = true;
                        break;
                    }
                }
            }
            // Override edge styling variables set above for non-self-loop edges
            var color = selfLoopTraversed ? edgeActive : edgeBase;
            var width = selfLoopTraversed ? '2.5' : '1.8';
            var markerId = selfLoopTraversed ? mActive : mNorm;

            // Collect all self-loop symbols for this state
            var selfSymbols = [];
            for (var j = 0; j < dfa.transitions.length; j++) {
                if (dfa.transitions[j][0] === from && dfa.transitions[j][2] === from) {
                    selfSymbols.push(dfa.transitions[j][1]);
                }
            }
            var selfLabel = selfSymbols.join(',');
            var p = pos[from];
            var baseX = p.x, baseY = p.y - R;
            var x1 = baseX;
            var d = 'M ' + x1 + ' ' + baseY +
                    ' C ' + (x1 - 35) + ' ' + (baseY - 45) + ',' +
                    (x1 + 35) + ' ' + (baseY - 45) + ',' +
                    x1 + ' ' + baseY;
            addPath(d, color, width, markerId);
            addLabel(baseX, baseY - 55, selfLabel, color);
            continue;
        }

        // ---------- PARALLEL SAME-DIRECTION EDGES (unchanged) ----------
        var groupKey = from + '-' + to;
        if (sameDirGroups[groupKey] && sameDirGroups[groupKey].indexOf(i) !== -1) {
            var group = sameDirGroups[groupKey];
            var orderIdx = group.indexOf(i);
            var count = group.length;
            var x1 = pos[from].x, y1 = pos[from].y;
            var x2 = pos[to].x,   y2 = pos[to].y;
            var dx = x2 - x1, dy = y2 - y1;
            var len = Math.sqrt(dx*dx + dy*dy) || 1;
            var px = -dy / len, py = dx / len;
            var offset = (orderIdx - (count-1)/2) * PARALLEL_SPACING;
            var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            var cpx = mx + px * offset;
            var cpy = my + py * offset;
            var sdx = cpx - x1, sdy = cpy - y1;
            var slen = Math.sqrt(sdx*sdx + sdy*sdy) || 1;
            var sx = x1 + (sdx / slen) * R;
            var sy = y1 + (sdy / slen) * R;
            var edx = x2 - cpx, edy = y2 - cpy;
            var elen = Math.sqrt(edx*edx + edy*edy) || 1;
            var ex = x2 - (edx / elen) * (R + 1);
            var ey = y2 - (edy / elen) * (R + 1);
            var pathD = 'M ' + sx + ' ' + sy + ' Q ' + cpx + ' ' + cpy + ' ' + ex + ' ' + ey;
            addPath(pathD, color, width, markerId);
            var labelX = 0.25*sx + 0.5*cpx + 0.25*ex;
            var labelY = 0.25*sy + 0.5*cpy + 0.25*ey;
            addLabel(labelX, labelY, symbol, color);
            continue;
        }

        // ---------- BIDIRECTIONAL PAIRS (ADAPTIVE CURVATURE) ----------
        var a = Math.min(from, to), b = Math.max(from, to);
        if (isBidir[a + '-' + b]) {
            var x1 = pos[from].x, y1 = pos[from].y;
            var x2 = pos[to].x,   y2 = pos[to].y;
            var dx = x2 - x1, dy = y2 - y1;
            var len = Math.sqrt(dx*dx + dy*dy) || 1;
            var px = -dy / len, py = dx / len;

            var pairEdges = [];
            for (var j = 0; j < dfa.transitions.length; j++) {
                var tj = dfa.transitions[j];
                if (tj[0] === tj[2]) continue;
                var aj = Math.min(tj[0], tj[2]), bj = Math.max(tj[0], tj[2]);
                if (aj === a && bj === b) pairEdges.push(j);
            }
            pairEdges.sort(function(x, y) { return x - y; });
            var side = (pairEdges[0] === i) ? 1 : -1;

            // --- FIX 1 & 2: Adaptive curvature + cubic bezier for vertical pairs ---
            var vertical   = Math.abs(dx) < 40;
            var horizontal = Math.abs(dy) < 40;

            var adaptiveCurve = CURVE;
            if (vertical)   adaptiveCurve = 28;
            if (horizontal) adaptiveCurve = 20;

            var curveOffset = adaptiveCurve * side;
            var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            var cpx = mx + px * curveOffset;
            var cpy = my + py * curveOffset;

            var sdx = cpx - x1, sdy = cpy - y1;
            var slen = Math.sqrt(sdx*sdx + sdy*sdy) || 1;
            var sx = x1 + (sdx / slen) * R;
            var sy = y1 + (sdy / slen) * R;

            var edx = x2 - cpx, edy = y2 - cpy;
            var elen = Math.sqrt(edx*edx + edy*edy) || 1;
            var ex = x2 - (edx / elen) * (R + 1);
            var ey = y2 - (edy / elen) * (R + 1);

            var pathD;
            if (vertical) {
                var offsetX = 22 * side;
                // Control handles are placed 1/3 of the way along the travel
                // direction so each curve bows outward away from its mirror —
                // prevents both arcs from leaning the same way.
                var cp1x = sx + offsetX, cp1y = sy + (dy * 0.33);
                var cp2x = ex + offsetX, cp2y = ey - (dy * 0.33);
                pathD = 'M ' + sx + ' ' + sy +
                        ' C ' + cp1x + ' ' + cp1y + ',' +
                                cp2x + ' ' + cp2y + ',' +
                                ex + ' ' + ey;
                // Label at the horizontal apex of the cubic arc
                addLabel(
                    (sx + ex) / 2 + offsetX * 1.1,
                    (sy + ey) / 2,
                    symbol, color
                );
            } else {
                pathD = 'M ' + sx + ' ' + sy + ' Q ' + cpx + ' ' + cpy + ' ' + ex + ' ' + ey;
                // Label along quadratic curve, offset toward the bulge
                var bx = 0.25 * sx + 0.5 * cpx + 0.25 * ex;
                var by = 0.25 * sy + 0.5 * cpy + 0.25 * ey;
                addLabel(bx, by, symbol, color);
            }
            addPath(pathD, color, width, markerId);
            continue;
        }

        // ---------- CONVERGENCE CURVES (multiple incoming edges) ----------
        // Edge count alone is not enough to justify fanning. Two edges that
        // arrive from clearly different directions (e.g. one from above-left,
        // one from below-left) will never visually collide and should stay
        // straight. Only fan when at least one pair of incoming arrivals is
        // nearly parallel (angular difference < ANGLE_THRESHOLD degrees).
        var _a = Math.min(from, to), _b = Math.max(from, to);
        var incomingList = incomingGroups[to] || [];
        var ANGLE_THRESHOLD = 35; // degrees — below this, arrivals visually overlap
        var hasNearParallelArrival = false;
        if (incomingList.length > 1 && !isBidir[_a + '-' + _b]) {
            var arrivalAngles = [];
            for (var ai = 0; ai < incomingList.length; ai++) {
                var atr = dfa.transitions[incomingList[ai]];
                var afxA = pos[atr[0]].x, afyA = pos[atr[0]].y;
                var angDeg = Math.atan2(pos[to].y - afyA, pos[to].x - afxA) * 180 / Math.PI;
                arrivalAngles.push(angDeg);
            }
            outer:
            for (var pi = 0; pi < arrivalAngles.length; pi++) {
                for (var qi = pi + 1; qi < arrivalAngles.length; qi++) {
                    var diff = Math.abs(arrivalAngles[pi] - arrivalAngles[qi]);
                    if (diff > 180) diff = 360 - diff;
                    if (diff < ANGLE_THRESHOLD) { hasNearParallelArrival = true; break outer; }
                }
            }
        }
        if (hasNearParallelArrival) {
            var idx = incomingList.indexOf(i);
            if (idx !== -1) {
                var count = incomingList.length;
                var x1 = pos[from].x, y1 = pos[from].y;
                var x2 = pos[to].x,   y2 = pos[to].y;
                var dx = x2 - x1, dy = y2 - y1;
                var len = Math.sqrt(dx*dx + dy*dy) || 1;
                var px = -dy / len, py = dx / len;
                var offset = (idx - (count-1)/2) * INCOMING_CURVE;
                var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                var cpx = mx + px * offset;
                var cpy = my + py * offset;
                var sdx = cpx - x1, sdy = cpy - y1;
                var slen = Math.sqrt(sdx*sdx + sdy*sdy) || 1;
                var sx = x1 + (sdx / slen) * R;
                var sy = y1 + (sdy / slen) * R;
                var edx = x2 - cpx, edy = y2 - cpy;
                var elen = Math.sqrt(edx*edx + edy*edy) || 1;
                var ex = x2 - (edx / elen) * (R + 1);
                var ey = y2 - (edy / elen) * (R + 1);
                var pathD = 'M ' + sx + ' ' + sy + ' Q ' + cpx + ' ' + cpy + ' ' + ex + ' ' + ey;
                addPath(pathD, color, width, markerId);
                var labelX = 0.25*sx + 0.5*cpx + 0.25*ex;
                var labelY = 0.25*sy + 0.5*cpy + 0.25*ey;
                addLabel(labelX, labelY, symbol, color);
                continue;
            }
        }

        // ---------- MANUAL CURVE OVERRIDES ----------
        var manualCurves = {
            '4-2': -80   // q3→q1 on b: curve 80px above Row1
        };
        var mcKey = from + '-' + to;
        if (manualCurves[mcKey] !== undefined) {
            var x1 = pos[from].x, y1 = pos[from].y;
            var x2 = pos[to].x,   y2 = pos[to].y;
            var cpx = (x1 + x2) / 2;
            var cpy = Math.min(y1, y2) + manualCurves[mcKey];
            var sdx = cpx-x1, sdy = cpy-y1, slen = Math.sqrt(sdx*sdx+sdy*sdy)||1;
            var sx = x1+(sdx/slen)*R, sy = y1+(sdy/slen)*R;
            var edx = x2-cpx, edy = y2-cpy, elen = Math.sqrt(edx*edx+edy*edy)||1;
            var ex = x2-(edx/elen)*(R+1), ey = y2-(edy/elen)*(R+1);
            addPath('M '+sx+' '+sy+' Q '+cpx+' '+cpy+' '+ex+' '+ey, color, width, markerId);
            var mlx = 0.25*sx + 0.5*cpx + 0.25*ex;
            var mly = 0.25*sy + 0.5*cpy + 0.25*ey;
            addLabel(mlx, mly, symbol, color);
            continue;
        }

        // ---------- SIMPLE SINGLE EDGE (straight line) ----------
        var x1 = pos[from].x, y1 = pos[from].y;
        var x2 = pos[to].x,   y2 = pos[to].y;
        var dx = x2 - x1, dy = y2 - y1;
        var len = Math.sqrt(dx*dx + dy*dy) || 1;
        var nx = dx / len, ny = dy / len;
        var px = -ny, py = nx;
        var sx = x1 + nx * R, sy = y1 + ny * R;
        var ex = x2 - nx * (R + 1), ey = y2 - ny * (R + 1);
        var pathD = 'M ' + sx + ' ' + sy + ' L ' + ex + ' ' + ey;
        addPath(pathD, color, width, markerId);
        var labelX = (sx + ex) / 2;
        var labelY = (sy + ey) / 2;
        addLabel(labelX, labelY, symbol, color);
    }

    

    // --- DRAW STATE CIRCLES (unchanged) ---
    for (var j = 0; j < dfa.states.length; j++) {
        var state = dfa.states[j];
        var pt = pos[state];
        var accept = dfa.accept.indexOf(state) !== -1;
        var fill = nodeFill, strokeColor = nodeStroke, strokeWidth = '2.2', glowFilter = null;

        if (finalResult === 'accepted' && path && stepIndex === path.length - 1 && state === path[stepIndex] && accept) {
            fill = glowGreen; strokeColor = glowGreen; strokeWidth = '3.5'; glowFilter = 'url(#' + svgId + '_glow)';
        } else if (finalResult === 'rejected' && path && stepIndex === path.length - 1 && state === path[stepIndex]) {
            fill = glowRed; strokeColor = glowRed; strokeWidth = '3.5'; glowFilter = 'url(#' + svgId + '_glow)';
        } else if (path && stepIndex < path.length && state === path[stepIndex]) {
            fill = nodeFillActive; strokeColor = edgeActive; strokeWidth = '3'; glowFilter = 'url(#' + svgId + '_glow)';
        } else if (traversedStates.indexOf(state) !== -1) {
            fill = nodeFillTraversed; strokeColor = '#4a72a0';
        }

        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        if (glowFilter) g.setAttribute("filter", glowFilter);
        if (accept) {
            var outer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            outer.setAttribute("cx", pt.x); outer.setAttribute("cy", pt.y); outer.setAttribute("r", R+5);
            outer.setAttribute("stroke", strokeColor); outer.setAttribute("stroke-width", strokeWidth);
            outer.setAttribute("fill", fill); g.appendChild(outer);
        }
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", pt.x); circle.setAttribute("cy", pt.y); circle.setAttribute("r", R);
        circle.setAttribute("fill", fill); circle.setAttribute("stroke", strokeColor);
        circle.setAttribute("stroke-width", strokeWidth); g.appendChild(circle);

        var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.setAttribute("x", pt.x); lbl.setAttribute("y", pt.y);
        lbl.setAttribute("text-anchor", "middle"); lbl.setAttribute("dominant-baseline", "central");
        lbl.setAttribute("font-size", "12"); lbl.setAttribute("font-weight", "700");
        lbl.setAttribute("fill", (fill === glowGreen || fill === glowRed) ? '#ffffff' : labelFill);
        // Consistent DFA labels
        // Start state uses "-"
        // Final/accepting states use "+"
        // DFA 1 trap state uses "T"
        // DFA 2 visually swaps q6 and q7 labels to match the reference DFA
        // All other normal states use qN
        if (state === dfa.start) {
            lbl.textContent = '-';
        } else if (dfa.accept.indexOf(state) !== -1) {
            lbl.textContent = '+';
        } else if (svgId === 'dfa1-svg' && state === 14) {
            lbl.textContent = 'T';
        } else if (svgId === 'dfa2-svg' && state === 6) {
            lbl.textContent = 'q7';
        } else if (svgId === 'dfa2-svg' && state === 7) {
            lbl.textContent = 'q6';
        } else {
            lbl.textContent = 'q' + state;
        }
        g.appendChild(lbl);     
        graphGroup.appendChild(g);
    }

    // Entry arrow
    var sp = pos[dfa.start];
    var sa = document.createElementNS("http://www.w3.org/2000/svg", "line");

    sa.setAttribute("x1", sp.x - 55);
    sa.setAttribute("y1", sp.y);
    sa.setAttribute("x2", sp.x - R - 4);
    sa.setAttribute("y2", sp.y);

    sa.setAttribute("stroke", edgeBase);
    sa.setAttribute("stroke-width", "2.2");
    sa.setAttribute("stroke-linecap", "round");
    sa.setAttribute("marker-end", "url(#" + mNorm + ")");

    graphGroup.appendChild(sa);

    // Update tape if simulation is active
    if (simulation.dfaNum && simulation.input && simulation.path.length > 0)
        updateTape(simulation.dfaNum, simulation.input, simulation.stepIndex, finalResult);
}

// =======================================================
// SIMULATION & TAPE (unchanged)
// =======================================================
function startValidation(dfaNum) {
    var dfa = (dfaNum === 1) ? dfa1 : dfa2;
    var inputField = document.getElementById('input' + dfaNum);
    var inputStr = inputField.value.trim();

    if (simulation.autoTimer) { clearTimeout(simulation.autoTimer); simulation.autoTimer = null; }

    if (inputStr === '') { alert('Please enter a string.'); return; }
    for (var i = 0; i < inputStr.length; i++) {
        if (dfa.alphabet.indexOf(inputStr[i]) === -1) {
            alert('Invalid character: ' + inputStr[i]); return;
        }
    }

    var path = [dfa.start];
    var current = dfa.start;
    for (var j = 0; j < inputStr.length; j++) {
        var sym = inputStr[j];
        var next = null;
        for (var k = 0; k < dfa.transitions.length; k++) {
            if (dfa.transitions[k][0] === current && dfa.transitions[k][1] === sym) {
                next = dfa.transitions[k][2]; break;
            }
        }
        if (next === null) { path.push(-1); break; }
        current = next;
        path.push(current);
    }

    simulation.dfaNum = dfaNum;
    simulation.input = inputStr;
    simulation.path = path;
    simulation.stepIndex = 0;
    simulation.finished = false;

    document.getElementById('run' + dfaNum + '-btn').disabled = true;
    document.getElementById('step' + dfaNum + '-btn').disabled = true;

    drawDFA(dfa, 'dfa' + dfaNum + '-svg', path, 0, null);
    updateTape(dfaNum, inputStr, 0, null);
    document.getElementById('status' + dfaNum).textContent = 'Tracing...';
    document.getElementById('status' + dfaNum).style.color = '#5b9cf5';

    simulation.autoTimer = setTimeout(function() { autoStep(dfaNum); }, 700);
}

function autoStep(dfaNum) {
    var dfa = (dfaNum === 1) ? dfa1 : dfa2;
    if (simulation.stepIndex >= simulation.path.length - 1) {
        finishSimulation(dfaNum, dfa); return;
    }
    simulation.stepIndex++;
    drawDFA(dfa, 'dfa' + dfaNum + '-svg', simulation.path, simulation.stepIndex, null);
    updateTape(dfaNum, simulation.input, simulation.stepIndex, null);
    simulation.autoTimer = setTimeout(function() { autoStep(dfaNum); }, 700);
}

function manualStep(dfaNum) {
    if (simulation.dfaNum !== dfaNum) {
        var dfa = (dfaNum === 1) ? dfa1 : dfa2;
        var inputField = document.getElementById('input' + dfaNum);
        var inputStr = inputField.value.trim();
        if (inputStr === '') { alert('Please enter a string.'); return; }
        for (var i = 0; i < inputStr.length; i++) {
            if (dfa.alphabet.indexOf(inputStr[i]) === -1) {
                alert('Invalid character: ' + inputStr[i]); return;
            }
        }
        var path = [dfa.start];
        var current = dfa.start;
        for (var j = 0; j < inputStr.length; j++) {
            var sym = inputStr[j];
            var next = null;
            for (var k = 0; k < dfa.transitions.length; k++) {
                if (dfa.transitions[k][0] === current && dfa.transitions[k][1] === sym) {
                    next = dfa.transitions[k][2]; break;
                }
            }
            if (next === null) { path.push(-1); break; }
            current = next;
            path.push(current);
        }
        simulation.dfaNum = dfaNum;
        simulation.input = inputStr;
        simulation.path = path;
        simulation.stepIndex = 0;
        simulation.finished = false;
        document.getElementById('run' + dfaNum + '-btn').disabled = true;
    }

    if (simulation.autoTimer) return;
    var dfa = (dfaNum === 1) ? dfa1 : dfa2;
    if (simulation.stepIndex >= simulation.path.length - 1) {
        if (!simulation.finished) finishSimulation(dfaNum, dfa);
        return;
    }
    simulation.stepIndex++;
    drawDFA(dfa, 'dfa' + dfaNum + '-svg', simulation.path, simulation.stepIndex, null);
    updateTape(dfaNum, simulation.input, simulation.stepIndex, null);
    if (simulation.stepIndex >= simulation.path.length - 1) {
        finishSimulation(dfaNum, dfa);
    } else {
        document.getElementById('status' + dfaNum).textContent = 'Step ' + simulation.stepIndex;
        document.getElementById('status' + dfaNum).style.color = '#5b9cf5';
        document.getElementById('back' + dfaNum + '-btn').disabled = false;
    }
}

function stepBack(dfaNum) {
    if (simulation.dfaNum !== dfaNum) return;
    if (simulation.autoTimer) return;
    if (simulation.stepIndex <= 0) return;

    simulation.finished = false;
    simulation.stepIndex--;
    var dfa = dfaNum === 1 ? dfa1 : dfa2;

    drawDFA(dfa, 'dfa' + dfaNum + '-svg', simulation.path, simulation.stepIndex, null);
    updateTape(dfaNum, simulation.input, simulation.stepIndex, null);

    // Update status
    var statusBadge = document.getElementById('status' + dfaNum);
    if (simulation.stepIndex === 0) {
        statusBadge.textContent = 'Tracing...';
    } else {
        statusBadge.textContent = 'Step ' + simulation.stepIndex;
    }
    statusBadge.style.color = '#5b9cf5';

    // Re-enable Step, disable Back at start
    document.getElementById('step' + dfaNum + '-btn').disabled = false;
    document.getElementById('back' + dfaNum + '-btn').disabled = simulation.stepIndex <= 0;
}

function finishSimulation(dfaNum, dfa) {
    simulation.autoTimer = null;
    simulation.finished = true;
    var lastState = simulation.path[simulation.path.length - 1];
    var statusBadge = document.getElementById('status' + dfaNum);

    var finalResult = null;
    if (lastState === -1 || dfa.accept.indexOf(lastState) === -1) {
        statusBadge.innerHTML = 'Rejected';
        statusBadge.style.color = '#e05555';
        finalResult = 'rejected';
    } else {
        statusBadge.innerHTML = 'Accepted';
        statusBadge.style.color = '#3cc972';
        finalResult = 'accepted';
    }

    drawDFA(dfa, 'dfa' + dfaNum + '-svg', simulation.path, simulation.path.length - 1, finalResult);
    updateTape(dfaNum, simulation.input, simulation.stepIndex, finalResult);
    document.getElementById('run' + dfaNum + '-btn').disabled = true;
    document.getElementById('step' + dfaNum + '-btn').disabled = true;

    // Record to history
    addHistoryEntry(dfaNum, simulation.input, finalResult);
}

function resetSimulation(dfaNum) {
    if (simulation.autoTimer) { clearTimeout(simulation.autoTimer); simulation.autoTimer = null; }
    simulation.dfaNum = null;
    simulation.input = '';
    simulation.path = [];
    simulation.stepIndex = 0;
    simulation.finished = false;

    document.getElementById('input' + dfaNum).value = '';
    document.getElementById('run' + dfaNum + '-btn').disabled = false;
    document.getElementById('step' + dfaNum + '-btn').disabled = false;
    document.getElementById('back' + dfaNum + '-btn').disabled = true;
    document.getElementById('status' + dfaNum).textContent = '\u2013';
    document.getElementById('status' + dfaNum).style.color = '#6a7f99';

    var dfa = (dfaNum === 1) ? dfa1 : dfa2;
    drawDFA(dfa, 'dfa' + dfaNum + '-svg', [], 0, null);
    updateTape(dfaNum, '', 0, null);
}

function resetSimulationSilent(dfaNum) {
    if (simulation.autoTimer) { clearTimeout(simulation.autoTimer); simulation.autoTimer = null; }
    simulation.dfaNum = null;
    simulation.input = '';
    simulation.path = [];
    simulation.stepIndex = 0;
    simulation.finished = false;

    var elInput = document.getElementById('input' + dfaNum);
    if (elInput) elInput.value = '';
    var elRun = document.getElementById('run' + dfaNum + '-btn');
    if (elRun) elRun.disabled = false;
    var elStep = document.getElementById('step' + dfaNum + '-btn');
    if (elStep) elStep.disabled = false;
    var elBack = document.getElementById('back' + dfaNum + '-btn');
    if (elBack) elBack.disabled = true;
    var elStatus = document.getElementById('status' + dfaNum);
    if (elStatus) { elStatus.textContent = '\u2013'; elStatus.style.color = '#6a7f99'; }

    var dfa = (dfaNum === 1) ? dfa1 : dfa2;
    drawDFA(dfa, 'dfa' + dfaNum + '-svg', [], 0, null);
    updateTape(dfaNum, '', 0, null);
}

function updateTape(dfaNum, input, stepIndex, finalResult) {
    var tapeContainer = document.getElementById('tape-cells-' + dfaNum);
    if (!tapeContainer) return;
    tapeContainer.innerHTML = '';
    if (!input) {
        tapeContainer.innerHTML = '<span class="tape-placeholder">Enter a string and run the simulation</span>';
        return;
    }

    for (var i = 0; i < input.length; i++) {
        var cell = document.createElement('span');
        cell.className = 'tape-cell';
        cell.textContent = input[i];
        if (i === stepIndex - 1 && i < input.length) {
            cell.classList.add('active');
        }
        if (finalResult === 'accepted' && i === input.length - 1) {
            cell.classList.remove('active');
            cell.classList.add('accepted');
        } else if (finalResult === 'rejected' && simulation.finished && stepIndex - 1 === i) {
            cell.classList.remove('active');
            cell.classList.add('rejected');
        }
        tapeContainer.appendChild(cell);
    }
}

function getFinalResult() {
    if (!simulation.finished || !simulation.path.length) return null;
    var lastState = simulation.path[simulation.path.length - 1];
    var dfa = simulation.dfaNum === 1 ? dfa1 : dfa2;
    if (lastState === -1 || dfa.accept.indexOf(lastState) === -1) return 'rejected';
    return 'accepted';
}

function addHistoryEntry(dfaNum, inputStr, result) {
    var hist = runHistory[dfaNum];

    // If this input already exists anywhere in history, don't add it again
    for (var i = 0; i < hist.length; i++) {
        if (hist[i].input === inputStr) return;
    }

    hist.push({ input: inputStr, result: result });
    renderHistory(dfaNum);
}

function renderHistory(dfaNum) {
    var container = document.getElementById('history-list-' + dfaNum);
    if (!container) return;
    var hist = runHistory[dfaNum];
    if (hist.length === 0) {
        container.innerHTML = '<span class="tape-placeholder">No runs yet.</span>';
        return;
    }
    container.innerHTML = '';
    // Show newest first
    for (var i = hist.length - 1; i >= 0; i--) {
        (function(entry) {
            var el = document.createElement('div');
            el.className = 'history-entry';
            el.title = 'Click to re-run: ' + entry.input;
            el.innerHTML =
                '<div class="history-entry-left">' +
                '  <span class="history-dot ' + entry.result + '"></span>' +
                '  <span class="history-string">' + entry.input + '</span>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:6px;">' +
                '  <span class="history-badge ' + entry.result + '">' +
                (entry.result === 'accepted' ? 'Accepted' : 'Rejected') +
                '  </span>' +
                '  <button class="history-run-btn" title="Re-run">Run &#9654;</button>' +
                '</div>';

            el.querySelector('.history-run-btn').onclick = function(e) {
                e.stopPropagation();
                resetSimulation(dfaNum);
                setTimeout(function() {
                    document.getElementById('input' + dfaNum).value = entry.input;
                    startValidation(dfaNum);
                }, 50);
            };
            container.appendChild(el);
        })(hist[i]);
    }
}

function clearHistory(dfaNum) {
    runHistory[dfaNum] = [];
    renderHistory(dfaNum);
}

// =======================================================
// PDA ZOOM & PAN (unchanged)
// =======================================================
var pdaStates = {};

function initPDAZoom(viewportId) {
    var vp = document.getElementById(viewportId);
    if (!vp) return;
    pdaStates[viewportId] = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        dragging: false,
        lastX: 0,
        lastY: 0
    };
    var img = vp.querySelector('.pda-zoomable-img');
    if (img) {
        img.style.transform = 'scale(1) translate(0px, 0px)';
    }
    vp.addEventListener('wheel', function(e) {
        e.preventDefault();
        var dir = e.deltaY < 0 ? 1.25 : 0.8;
        pdaZoom(viewportId, dir, e);
    });
    vp.addEventListener('mousedown', function(e) {
        pdaStates[viewportId].dragging = true;
        pdaStates[viewportId].lastX = e.clientX;
        pdaStates[viewportId].lastY = e.clientY;
        vp.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', function(e) {
        if (!pdaStates[viewportId] || !pdaStates[viewportId].dragging) return;
        var dx = e.clientX - pdaStates[viewportId].lastX;
        var dy = e.clientY - pdaStates[viewportId].lastY;
        pdaStates[viewportId].lastX = e.clientX;
        pdaStates[viewportId].lastY = e.clientY;
        pdaStates[viewportId].translateX += dx;
        pdaStates[viewportId].translateY += dy;
        applyPDATransform(viewportId);
    });
    window.addEventListener('mouseup', function() {
        if (pdaStates[viewportId]) {
            pdaStates[viewportId].dragging = false;
            document.getElementById(viewportId).style.cursor = 'grab';
        }
    });
}

function pdaZoom(viewportId, factor, event) {
    var state = pdaStates[viewportId];
    if (!state) return;
    var newScale = Math.min(3, Math.max(0.3, state.scale * factor));
    state.scale = newScale;
    applyPDATransform(viewportId);
}

function pdaResetView(viewportId) {
    var state = pdaStates[viewportId];
    if (!state) return;
    state.scale = 1;
    state.translateX = 0;
    state.translateY = 0;
    applyPDATransform(viewportId);
}

function applyPDATransform(viewportId) {
    var state = pdaStates[viewportId];
    var vp = document.getElementById(viewportId);
    var img = vp.querySelector('.pda-zoomable-img');
    if (img) {
        img.style.transform = 'scale(' + state.scale + ') translate(' + state.translateX + 'px, ' + state.translateY + 'px)';
        img.style.transformOrigin = 'center center';
    }
}