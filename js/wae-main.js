// wae-main.js

// Configuration
require.config({
    baseUrl: './js/wae-modules',
    paths: {
        'WAESpriteSheet': 'wae-spritesheet',
        'WAEFrame': 'wae-animation-frame',
        'WAEAnimation': 'wae-animation',
        'WAEObject': 'wae-object'
    },
    
    // Use it in dev to bust cache
    urlArgs: 'bust=' +  (new Date()).getTime()
    
});

// Main
require(
    
    // Load all modules
    ['WAESpriteSheet', 'WAEFrame', 'WAEAnimation', 'WAEObject', 'WAESprite', 'WAEScene'],
    
    // Run program
    function (WAESpriteSheet, WAEFrame, WAEAnimation, WAEObject, WAESprite, WAEScene) {

        var ss = new WAESpriteSheet({
            ssid: 0,
            rowCount: 2,
            colCount: 5,
            cellWidth: 20,
            cellHeight: 20
        });
        
        var f1 = new WAEFrame({
            spriteSheet: ss,
            cellIndex: 0,
            cellCount: 1,
            center: { x: 10, y: 10 }
        });
        
        var f2 = new WAEFrame({
            spriteSheet: ss,
            cellIndex: 1,
            cellCount: 1,
            center: { x: 10, y: 10 }
        });
        
        var f3 = new WAEFrame({
            spriteSheet: ss,
            cellIndex: 2,
            cellCount: 1,
            center: { x: 10, y: 10 }
        });
        
        var anim = new WAEAnimation({
            name: 'Idle',
            frameCount: 4,
            isLoop: true,
            next: 0,
            ttl: 0
        });
        
        anim.addFrame(0, f1, 10);
        anim.addFrame(1, f2, 20);
        anim.addFrame(2, f3, 30);
        anim.addFrame(3, f2, 40);
        
        var obj = new WAEObject({
            oid: 0,
            type: 0,
            name: 'Balloon'
        });
        
        obj.addAnimationAt(0, anim);
        
        console.log(obj);
        
        
        // Start main loop
        var start = null;
        
        function mainLoop(now) {
            if (!start) start = now;
            var colorOffset = (now - start) / 1000.0;
            start = now;
            var buffers = updateBuffers(gl, colorOffset);
            drawScene(gl, programInfo, buffers, texture);
            window.requestAnimationFrame(render);
        }
        
        window.requestAnimationFrame(render);
        
    }

);