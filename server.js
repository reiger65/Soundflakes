const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Helper function to get local IP address
function getLocalIPAddress() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// HTTP server for serving the HTML file
const server = http.createServer((req, res) => {
    // Parse URL to handle query strings
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    // Serve index.html for root path or /index.html (with or without query strings)
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                // Add cache-busting headers to prevent browser caching
                res.writeHead(200, { 
                    'Content-Type': 'text/html',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/test-websocket.html') {
        // Serve test file if it exists
        fs.readFile(path.join(__dirname, 'test-websocket.html'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Test file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/logo.jpg' || pathname === '/logo.jpeg') {
        // Serve logo file
        const logoPath = pathname === '/logo.jpg' ? 'logo.jpg' : 'logo.jpeg';
        fs.readFile(path.join(__dirname, logoPath), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Logo not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    } else if (pathname === '/favicon.ico') {
        // Handle favicon requests - serve logo.jpg as favicon or return 204 (No Content)
        const logoPath = path.join(__dirname, 'logo.jpg');
        fs.readFile(logoPath, (err, data) => {
            if (err) {
                // Return 204 No Content instead of 404 for favicon to prevent browser errors
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    } else if (pathname === '/service-worker.js' || pathname === '/sw.js') {
        // Handle service worker requests - return 204 (No Content) to prevent 404 errors
        res.writeHead(204);
        res.end();
    } else {
        // Return proper 404 with better error message
        // Don't log favicon or other common browser requests as errors
        if (!pathname.includes('favicon') && !pathname.includes('robots.txt')) {
            console.log(`404 - Path not found: ${pathname}`);
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`Not found: ${pathname}`);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIPAddress();
    console.log('\n========================================');
    console.log('🎵 Sound Marbles Server Started! 🎵');
    console.log('========================================');
    console.log(`📱 Local access: http://localhost:${PORT}`);
    console.log(`🌐 Network access: http://${localIP}:${PORT}`);
    console.log('\n📲 To access from iPhone/iPad:');
    console.log(`   Master: http://${localIP}:${PORT}`);
    console.log(`   Slave:  http://${localIP}:${PORT}?slave=true`);
    console.log('\n💡 Make sure your iPhone is on the same Wi-Fi network!');
    console.log('========================================\n');
});

// WebSocket server attached to the HTTP server (same port)
// This allows WebSocket connections on the same port as HTTP
console.log(`Creating WebSocket server on port ${PORT} (same as HTTP)...`);
const wss = new WebSocket.Server({ 
    server: server, // Attach to HTTP server instead of separate port
    verifyClient: (info) => {
        console.log('WebSocket connection attempt from:', info.origin || 'no origin', info.req.headers['user-agent'] || 'no UA');
        return true; // Accept all connections
    }
});

let masterConnection = null;
let slaves = [];
let currentPreset = null;
let currentNoteData = null;
let masterIsPlaying = false; // Track if master is currently playing

wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const clientPort = req.socket.remotePort || 'unknown';
    console.log('=== New WebSocket Connection ===');
    console.log('Client IP:', clientIP);
    console.log('Client Port:', clientPort);
    console.log('Request URL:', req.url);
    console.log('Upgrade header:', req.headers.upgrade);
    console.log('Connection header:', req.headers.connection);
    console.log('User-Agent:', req.headers['user-agent'] || 'unknown');
    console.log('WebSocket readyState:', ws.readyState);
    console.log('Socket remote address:', req.socket.remoteAddress);
    console.log('Socket remote port:', req.socket.remotePort);
    
    // Send initial ping immediately to keep connection alive (especially for iOS Safari)
    // iOS Safari can close idle connections very quickly, so send data immediately
    setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                ws.ping();
                console.log('Initial ping sent to keep connection alive');
            } catch (e) {
                console.error('Error sending initial ping:', e);
            }
        }
    }, 100); // Send ping after 100ms
    
    // Set keep-alive ping interval to prevent connection timeout (especially for iOS Safari)
    const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                ws.ping();
            } catch (e) {
                console.error('Error sending ping:', e);
                clearInterval(pingInterval);
            }
        } else {
            clearInterval(pingInterval);
        }
    }, 30000); // Ping every 30 seconds
    
    // Handle pong response
    ws.on('pong', () => {
        // Client responded to ping, connection is alive
    });
    
    // Handle connection errors
    ws.on('error', (error) => {
        console.error('WebSocket error from', clientIP, ':', error.message);
        console.error('Error stack:', error.stack);
        clearInterval(pingInterval);
    });
    
    ws.on('close', (code, reason) => {
        clearInterval(pingInterval); // Clear ping interval on close
        const reasonStr = reason ? reason.toString() : 'no reason';
        console.log('WebSocket closed from', clientIP, 'code:', code, 'reason:', reasonStr);
        console.log('Was clean close:', code === 1000);
        
        // Check if this was a slave
        const wasSlave = slaves.find(s => s.ws === ws);
        if (wasSlave) {
            console.log('Slave disconnected:', wasSlave.id);
            slaves = slaves.filter(s => s.ws !== ws);
            console.log('Remaining slaves:', slaves.length);
        }
    });
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'master') {
                // Master device connected
                if (masterConnection) {
                    masterConnection.close();
                }
                masterConnection = ws;
                console.log('Master connected');
                
                // Send current slave list to master
                ws.send(JSON.stringify({
                    type: 'slaves',
                    count: slaves.length,
                    slaves: slaves.map(s => s.id)
                }));
            } else if (data.type === 'slave') {
                // Slave device connected
                const slaveId = data.id || `slave-${Date.now()}`;
                console.log(`Processing slave registration: ${slaveId}`);
                
                // Remove any existing connection with same ID
                slaves = slaves.filter(s => s.id !== slaveId && s.ws !== ws);
                
                slaves.push({ id: slaveId, ws, connected: true, volume: 100 }); // Default volume 100%
                const slaveIndex = slaves.length; // Slave number (1-based)
                console.log(`✓ Slave registered successfully: ${slaveId} (Total: ${slaves.length}, Number: ${slaveIndex})`);
                
                // Send welcome message to slave immediately
                try {
                    ws.send(JSON.stringify({
                        type: 'welcome',
                        slaveId,
                        slaveName: String(slaveIndex), // Send slave number as name
                        totalSlaves: slaves.length
                    }));
                    console.log(`Welcome message sent to slave ${slaveId} with name: ${slaveIndex}`);
                } catch (e) {
                    console.error(`Error sending welcome to slave ${slaveId}:`, e);
                }
                
                // Notify master of new slave
                if (masterConnection && masterConnection.readyState === WebSocket.OPEN) {
                    try {
                        masterConnection.send(JSON.stringify({
                            type: 'slave_connected',
                            slaveId,
                            slaveName: String(slaveIndex), // Send slave number as name
                            totalSlaves: slaves.length
                        }));
                        console.log(`Master notified of slave ${slaveId} (name: ${slaveIndex})`);
                        
                        // If master has a current preset, immediately assign notes to new slave
                        if (currentPreset && currentNoteData) {
                            console.log('Distributing notes to new slave');
                            // Re-distribute notes to all slaves including the new one
                            distributeNotes(currentPreset, currentNoteData);
                            
                            // If master is already playing, send play command to new slave
                            if (masterIsPlaying) {
                                console.log('Master is playing, sending play command to new slave');
                                setTimeout(() => {
                                    if (ws.readyState === WebSocket.OPEN) {
                                        try {
                                            ws.send(JSON.stringify({ type: 'play' }));
                                            console.log(`Play command sent to new slave ${slaveId}`);
                                        } catch (e) {
                                            console.error(`Error sending play command to new slave ${slaveId}:`, e);
                                        }
                                    }
                                }, 300); // Small delay to ensure notes are received first
                            }
                        }
                    } catch (e) {
                        console.error('Error notifying master:', e);
                    }
                } else {
                    console.log('Master not connected, skipping notification');
                }
            } else if (data.type === 'note_playing') {
                // Slave reported currently playing note - forward to master
                const slave = slaves.find(s => s.ws === ws);
                if (slave && masterConnection && masterConnection.readyState === WebSocket.OPEN) {
                    try {
                        masterConnection.send(JSON.stringify({
                            type: 'note_playing',
                            slaveId: slave.id,
                            note: data.note,
                            freq: data.freq,
                            color: data.color
                        }));
                        console.log(`Forwarded note_playing from slave ${slave.id} to master: ${data.note}`);
                    } catch (e) {
                        console.error('Error forwarding note_playing to master:', e);
                    }
                }
            } else if (data.type === 'slave_notes_assigned') {
                // Slave reported assigned notes - forward to master
                const slave = slaves.find(s => s.ws === ws);
                if (slave && masterConnection && masterConnection.readyState === WebSocket.OPEN) {
                    try {
                        masterConnection.send(JSON.stringify({
                            type: 'slave_notes_assigned',
                            slaveId: slave.id,
                            notes: data.notes
                        }));
                        console.log(`Forwarded slave_notes_assigned from slave ${slave.id} to master`);
                    } catch (e) {
                        console.error('Error forwarding slave_notes_assigned to master:', e);
                    }
                }
            } else if (data.type === 'slave_volume' && masterConnection === ws) {
                // Master sent volume update for a specific slave
                const slaveId = data.slaveId;
                const volume = data.volume;
                
                const slave = slaves.find(s => s.id === slaveId);
                if (slave) {
                    // Store the volume
                    slave.volume = volume;
                    console.log(`Master updated volume for slave ${slaveId}: ${volume}%`);
                    
                    // Forward volume_update to the slave
                    if (slave.ws && slave.ws.readyState === WebSocket.OPEN) {
                        try {
                            slave.ws.send(JSON.stringify({
                                type: 'volume_update',
                                volume: volume
                            }));
                            console.log(`Sent volume_update to slave ${slaveId}: ${volume}%`);
                        } catch (e) {
                            console.error(`Error sending volume_update to slave ${slaveId}:`, e);
                        }
                    } else {
                        console.log(`Slave ${slaveId} WebSocket not open, readyState:`, slave.ws?.readyState);
                    }
                } else {
                    console.log(`Slave ${slaveId} not found for volume update`);
                }
            } else if (data.type === 'preset_update' && masterConnection === ws) {
                // Master sent preset update
                currentPreset = data.preset;
                currentNoteData = data.noteData;
                
                // Store per-slave volumes if provided
                if (data.slaveVolumes && typeof data.slaveVolumes === 'object') {
                    Object.keys(data.slaveVolumes).forEach(slaveId => {
                        const slave = slaves.find(s => s.id === slaveId);
                        if (slave) {
                            slave.volume = data.slaveVolumes[slaveId];
                            console.log(`Stored volume for slave ${slaveId}: ${slave.volume}%`);
                        }
                    });
                }
                
                // Broadcast preset_update directly to all slaves for immediate updates
                console.log('Broadcasting preset_update to', slaves.length, 'slaves');
                slaves.forEach((slave, index) => {
                    if (slave.ws && slave.ws.readyState === WebSocket.OPEN) {
                        try {
                            slave.ws.send(JSON.stringify({
                                type: 'preset_update',
                                preset: data.preset,
                                noteData: data.noteData
                            }));
                            console.log(`  ✓ Sent preset_update to slave ${index + 1} (${slave.id})`);
                        } catch (e) {
                            console.error(`  ✗ Error sending preset_update to slave ${slave.id}:`, e);
                        }
                    }
                });
                
                // Also distribute notes (which sends notes_assigned)
                distributeNotes(data.preset, data.noteData, data.preset.masterIncluded !== false); // Default to true if not specified
            } else if (data.type === 'play' && masterConnection === ws) {
                // Master started playing
                masterIsPlaying = true;
                console.log('Master sent play command, broadcasting to', slaves.length, 'slaves');
                broadcastToSlaves({ type: 'play' });
            } else if (data.type === 'stop' && masterConnection === ws) {
                // Master stopped playing
                masterIsPlaying = false;
                console.log('Master sent stop command, broadcasting to', slaves.length, 'slaves');
                broadcastToSlaves({ type: 'stop' });
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });
    
    ws.on('close', () => {
        if (ws === masterConnection) {
            masterConnection = null;
            masterIsPlaying = false; // Reset playing state when master disconnects
            console.log('Master disconnected');
        } else {
            slaves = slaves.filter(s => s.ws !== ws);
            console.log(`Slave disconnected (Total: ${slaves.length})`);
            
            // Notify master if it exists
            if (masterConnection) {
                masterConnection.send(JSON.stringify({
                    type: 'slave_disconnected',
                    totalSlaves: slaves.length
                }));
            }
        }
    });
});

function distributeNotes(preset, noteData, includeMaster = true) {
    if (!noteData || noteData.length === 0) {
        console.log('distributeNotes: No note data provided');
        return;
    }
    
    const enabledNotes = noteData.filter(n => n.enabled);
    if (enabledNotes.length === 0) {
        console.log('distributeNotes: No enabled notes');
        return;
    }
    
    // Calculate total devices based on whether master is included
    const totalDevices = includeMaster ? 1 + slaves.length : slaves.length;
    const slaveCount = slaves.length;
    
    if (totalDevices === 0) {
        console.log('distributeNotes: No devices connected');
        return;
    }
    
    console.log(`Distributing ${enabledNotes.length} notes among ${totalDevices} devices (${includeMaster ? '1 master + ' : ''}${slaveCount} slaves)`);
    
    // Distribute notes evenly among devices
    // Strategy: Divide notes into ranges, assign each device a range
    // If more devices than notes, some devices will play the same notes
    
    let masterAssignedNotes = [];
    
    if (includeMaster) {
        // First, assign notes to master (index 0)
        const notesPerDevice = Math.ceil(enabledNotes.length / totalDevices);
        const masterStartIndex = 0;
        const masterEndIndex = Math.min(masterStartIndex + notesPerDevice, enabledNotes.length);
        masterAssignedNotes = enabledNotes.slice(masterStartIndex, masterEndIndex);
        
        // If master has no notes, wrap around
        if (masterAssignedNotes.length === 0) {
            masterAssignedNotes.push(enabledNotes[0 % enabledNotes.length]);
        }
        
        console.log(`Master assigned ${masterAssignedNotes.length} notes:`, masterAssignedNotes.map(n => n.note));
        
        // Send notes to master
        if (masterConnection && masterConnection.readyState === WebSocket.OPEN) {
            masterConnection.send(JSON.stringify({
                type: 'notes_assigned',
                notes: masterAssignedNotes,
                preset: preset
            }));
        }
    } else {
        // Master not included - clear its assigned notes
        if (masterConnection && masterConnection.readyState === WebSocket.OPEN) {
            masterConnection.send(JSON.stringify({
                type: 'notes_assigned',
                notes: [],
                preset: preset
            }));
        }
        console.log('Master excluded from note distribution');
    }
    
    // Then assign notes to slaves
    const notesPerDevice = Math.ceil(enabledNotes.length / totalDevices);
    slaves.forEach((slave, index) => {
        const deviceIndex = includeMaster ? index + 1 : index; // Adjust index based on master inclusion
        const startIndex = deviceIndex * notesPerDevice;
        const endIndex = Math.min(startIndex + notesPerDevice, enabledNotes.length);
        const assignedNotes = enabledNotes.slice(startIndex, endIndex);
        
        // If we've run out of notes, wrap around (some devices play same notes)
        if (assignedNotes.length === 0) {
            assignedNotes.push(enabledNotes[deviceIndex % enabledNotes.length]);
        }
        
        console.log(`Slave ${index} (${slave.id}) assigned ${assignedNotes.length} notes:`, assignedNotes.map(n => n.note));
        
        if (slave.ws.readyState === WebSocket.OPEN) {
            // Send notes assignment
            console.log(`Sending notes_assigned to slave ${index} with preset:`, JSON.stringify(preset));
            console.log(`  Preset includes soundPreset:`, preset?.soundPreset || 'MISSING');
            slave.ws.send(JSON.stringify({
                type: 'notes_assigned',
                notes: assignedNotes,
                preset: preset,
                slaveVolume: slave.volume || 100 // Include slave volume
            }));
            
            // Also send volume_update message separately to ensure volume is applied
            setTimeout(() => {
                if (slave.ws.readyState === WebSocket.OPEN) {
                    slave.ws.send(JSON.stringify({
                        type: 'volume_update',
                        volume: slave.volume || 100
                    }));
                    console.log(`Sent volume_update to slave ${index}: ${slave.volume || 100}%`);
                }
            }, 100);
        } else {
            console.log(`Slave ${index} WebSocket not open, readyState:`, slave.ws.readyState);
        }
    });
}

function broadcastToSlaves(message) {
    console.log('Broadcasting to', slaves.length, 'slaves:', message.type);
    slaves.forEach((slave, index) => {
        if (slave.ws.readyState === WebSocket.OPEN) {
            try {
                slave.ws.send(JSON.stringify(message));
                console.log(`  ✓ Sent ${message.type} to slave ${index + 1} (${slave.id})`);
            } catch (e) {
                console.error(`  ✗ Error sending ${message.type} to slave ${slave.id}:`, e);
            }
        } else {
            console.warn(`  ✗ Slave ${slave.id} WebSocket not open (state: ${slave.ws.readyState})`);
        }
    });
}

// Error handling for WebSocket server
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

wss.on('listening', () => {
    console.log(`WebSocket server running on ws://0.0.0.0:${PORT} (same port as HTTP)`);
    console.log('Ready to accept connections from any device on the network');
});

