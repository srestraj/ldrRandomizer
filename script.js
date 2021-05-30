const app = new PIXI.Application({
  backgroundColor: 000,
  height: 200,
  width: 480,
});
var slotContainer = document.querySelector('.innerContainer');
slotContainer.appendChild(app.view);

var triggerButton = document.querySelector('.btnTrigger');

app.loader
  .add('tourist', '/icons/apocalypse-tourist.svg')
  .add('barn', '/icons/barn.svg')
  .add('blood-like', '/icons/blood-like.svg')
  .add('bloody', '/icons/bloody.svg')
  .add('catastrophe', '/icons/catastrophe.svg')
  .add('cup', '/icons/cup-o-death.svg')
  .add('cyborg-nipple', '/icons/cyborg-niple.svg')
  .add('cycloborgps', '/icons/cycloborgps.svg')
  .add('devil-kitty', '/icons/devil-kitty.svg')
  .add('heart', '/icons/heart.svg')
  .add('hook', '/icons/hook.svg')
  .add('killing-star', '/icons/killing-star.svg')
  .add('mute', '/icons/mute.svg')
  .add('mystery-box', '/icons/mystery-box.svg')
  .add('ofer-eye', '/icons/ofer-eye.svg')
  .add('ofer-pet-snake', '/icons/ofer-pet-snake.svg')
  .add('ofer-skull', '/icons/ofer-skull.svg')
  .add('ofer', '/icons/ofer.svg')
  .add('other-x', '/icons/other-x.svg')
  .add('parts', '/icons/parts.svg')
  .add('pirates', '/icons/pirates.svg')
  .add('plus', '/icons/plus.svg')
  .add('sadomazofembotochist', '/icons/sadomazofembotochist.svg')
  .add('screamer', '/icons/screamer.svg')
  .add('slim-jim', '/icons/slim-jim.svg')
  .add('snake-eatself', '/icons/snake-eatself.svg')
  .add('split-skull', '/icons/split-skull.svg')
  .add('toast-robot', '/icons/toast-robot.svg')
  .add('u', '/icons/u.svg')
  .add('under-a-killing-moon', '/icons/under-a-killing-moon.svg')
  .add('werewolf', '/icons/werewolf.svg')
  .add('x', '/icons/x.svg')
  .add('zippo', '/icons/zippo.svg')
  .load(onAssetsLoaded);
const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;
// onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
  // Create different slot symbols.
  const slotTextures = [
    PIXI.Texture.from('tourist'),
    PIXI.Texture.from('barn'),
    PIXI.Texture.from('blood-like'),
    PIXI.Texture.from('bloody'),
    PIXI.Texture.from('catastrophe'),
    PIXI.Texture.from('cup'),
    PIXI.Texture.from('cyborg-nipple'),
    PIXI.Texture.from('cycloborgps'),
    PIXI.Texture.from('devil-kitty'),
    PIXI.Texture.from('heart'),
    PIXI.Texture.from('hook'),
    PIXI.Texture.from('killing-star'),
    PIXI.Texture.from('mute'),
    PIXI.Texture.from('mystery-box'),
    PIXI.Texture.from('ofer-eye'),
    PIXI.Texture.from('ofer-pet-snake'),
    PIXI.Texture.from('ofer-skull'),
    PIXI.Texture.from('ofer'),
    PIXI.Texture.from('other-x'),
    PIXI.Texture.from('parts'),
    PIXI.Texture.from('pirates'),
    PIXI.Texture.from('plus'),
    PIXI.Texture.from('sadomazofembotochist'),
    PIXI.Texture.from('screamer'),
    PIXI.Texture.from('slim-jim'),
    PIXI.Texture.from('snake-eatself'),
    PIXI.Texture.from('split-skull'),
    PIXI.Texture.from('toast-robot'),
    PIXI.Texture.from('u'),
    PIXI.Texture.from('under-a-killing-moon'),
    PIXI.Texture.from('werewolf'),
    PIXI.Texture.from('x'),
    PIXI.Texture.from('zippo'),
  ];

  // Build the reels
  // var children = new PIXI.
  const reels = [];
  const PDO = new PIXI.DisplayObject();

  const reelContainer = new PIXI.Container();
  for (let i = 0; i < 3; i++) {
    const rc = new PIXI.Container();
    rc.x = i * REEL_WIDTH;
    reelContainer.addChild(rc);

    const reel = {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new PIXI.filters.BlurFilter(),
    };
    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    rc.filters = [reel.blur];

    // Build the symbols
    for (let j = 0; j < 32; j++) {
      const symbol = new PIXI.Sprite(
        slotTextures[Math.floor(Math.random() * slotTextures.length)],
      );
      // Scale the symbol to fit symbol area.
      symbol.y = j * SYMBOL_SIZE;
      symbol.scale.x = symbol.scale.y = Math.min(
        SYMBOL_SIZE / symbol.width,
        SYMBOL_SIZE / symbol.height,
      );
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
      reel.symbols.push(symbol);
      rc.addChild(symbol);
    }
    reels.push(reel);
  }
  app.stage.addChild(reelContainer);

  // Build top & bottom covers and position reelContainer
  const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
  // reelContainer.y = 300;
  // reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 3);
  const top = new PIXI.Graphics();
  const bottom = new PIXI.Graphics();
  bottom.beginFill(0, 1);
  bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);
  var g = new PIXI.Graphics();
  g.beginFill(0, 1);
  g.drawRect(0, 0, 500, 150);
  g.endFill();
  reelContainer.addChild(g);
  reelContainer.mask = g;

  triggerButton.addEventListener('click', function onclick(event) {
    startPlay();
  });
  let running = false;

  // Function to start playing.
  function startPlay() {
    if (running) return;
    running = true;

    for (let i = 0; i < reels.length; i++) {
      const r = reels[i];
      const extra = Math.floor(Math.random() * 3);
      const target = r.position + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 300;
      tweenTo(
        r,
        'position',
        target,
        time,
        backout(0.5),
        null,
        i === reels.length - 1 ? reelsComplete : null,
      );
    }
  }

  // Reels done handler.
  function reelsComplete() {
    running = false;
  }

  // Listen for animate update.
  app.ticker.add((delta) => {
    // Update the slots.
    for (let i = 0; i < reels.length; i++) {
      const r = reels[i];
      // Update blur filter y amount based on speed.
      // This would be better if calculated with time in mind also. Now blur depends on frame rate.
      r.blur.blurY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      // Update symbol positions on reel.
      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j];
        const prevy = s.y;
        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
        if (s.y < 0 && prevy > SYMBOL_SIZE) {
          // Detect going over and swap a texture.
          // This should in proper product be determined from some logical reel.
          s.texture =
            slotTextures[Math.floor(Math.random() * slotTextures.length)];
          s.scale.x = s.scale.y = Math.min(
            SYMBOL_SIZE / s.texture.width,
            SYMBOL_SIZE / s.texture.height,
          );
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
        }
      }
    }
  });
}

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now(),
  };

  tweening.push(tween);
  return tween;
}
// Listen for animate update.
app.ticker.add((delta) => {
  const now = Date.now();
  const remove = [];
  for (let i = 0; i < tweening.length; i++) {
    const t = tweening[i];
    const phase = Math.min(1, (now - t.start) / t.time);

    t.object[t.property] = lerp(
      t.propertyBeginValue,
      t.target,
      t.easing(phase),
    );
    if (t.change) t.change(t);
    if (phase === 1) {
      t.object[t.property] = t.target;
      if (t.complete) t.complete(t);
      remove.push(t);
    }
  }
  for (let i = 0; i < remove.length; i++) {
    tweening.splice(tweening.indexOf(remove[i]), 1);
  }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
  return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
  return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}
