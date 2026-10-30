import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OUTFITS } from '../data/portfolioData';

const OUTFIT_MAP = new Map(OUTFITS.map((outfit) => [outfit.id, outfit]));

const LAUGH_SET = new Set(['laugh', 'cheer', 'yay', 'happy', 'giggle', 'tickle', 'dance']);
const SHOCK_SET = new Set(['faaah', 'wow', 'surprised', 'panic']);
const CHEEKY_SET = new Set(['fart', 'cheeky', 'peekaboo', 'selfie']);
const SAD_SET = new Set(['womp-womp', 'wompwomp', 'womp', 'sad', 'sulk', 'dizzy']);

const SKIN_TONE = '#E5AE86';
const INK_DARK = '#1A120E';
const MOUTH_DARK = '#2A0E13';
const TONGUE_PINK = '#E15B64';

function dampValue(current, target, lambda, delta) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}

function configureTexture(texture) {
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
}

function resolveExpressionState({ emotion, mood, trickKind, isReading, isGrabbed }) {
  const candidates = [emotion, trickKind, mood]
    .filter(Boolean)
    .map((val) => String(val).toLowerCase());

  for (const token of candidates) {
    if (LAUGH_SET.has(token)) return { kind: 'laugh', raw: token };
    if (SHOCK_SET.has(token)) return { kind: 'shocked', raw: token };
    if (CHEEKY_SET.has(token)) return { kind: 'cheeky', raw: token };
    if (SAD_SET.has(token)) return { kind: 'sad', raw: token };
  }

  if (isGrabbed) {
    return { kind: 'shocked', raw: 'grabbed' };
  }

  if (isReading) {
    return { kind: 'reading', raw: 'reading' };
  }

  return { kind: 'normal', raw: 'normal' };
}

function drawFourPointStar(ctx, cx, cy, outerR, innerR, color) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function paintHeadExpressionCanvas({
  ctx,
  baseImage,
  expressionKind,
  rawSignal,
  isReading,
  isBlinking,
  elapsed,
}) {
  if (!ctx || !baseImage) return;

  ctx.clearRect(0, 0, 1024, 1024);
  ctx.drawImage(baseImage, 0, 0, 1024, 1024);

  const leftEyeX = 176;
  const rightEyeX = 242;
  const eyeY = 156;
  const eyeR = 14;
  const browY = 126;
  const mouthCenterX = 209;
  const mouthCenterY = 218;

  const eraseEyes = (radius = 16.5) => {
    ctx.fillStyle = SKIN_TONE;
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, radius, 0, Math.PI * 2);
    ctx.arc(rightEyeX, eyeY, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const eraseBrows = () => {
    ctx.fillStyle = SKIN_TONE;
    ctx.beginPath();
    ctx.roundRect(154, 114, 44, 22, 8);
    ctx.roundRect(220, 114, 44, 22, 8);
    ctx.fill();
  };

  const eraseMouth = () => {
    ctx.fillStyle = SKIN_TONE;
    ctx.beginPath();
    ctx.ellipse(mouthCenterX, mouthCenterY + 1, 23, 9.5, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawClosedEyelids = () => {
    eraseEyes(16.5);
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.4;
    ctx.lineCap = 'round';

    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, eyeY - 3, 12.5, 0.18 * Math.PI, 0.82 * Math.PI);
      ctx.stroke();
    });
  };

  const drawTalkingMouth = () => {
    eraseMouth();
    const openAmount = Math.abs(Math.sin(elapsed * 16));
    const syllableMod = 0.72 + 0.28 * Math.cos(elapsed * 7.5);
    const mouthHalfW = 14 + openAmount * 6.5 * syllableMod;
    const mouthHalfH = 2.5 + openAmount * 6.8 * syllableMod;

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(mouthCenterX, mouthCenterY, mouthHalfW, mouthHalfH, 0, 0, Math.PI * 2);
    ctx.fillStyle = MOUTH_DARK;
    ctx.fill();
    ctx.clip();

    if (openAmount > 0.18) {
      // Upper white teeth strip
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(
        mouthCenterX - mouthHalfW,
        mouthCenterY - mouthHalfH,
        mouthHalfW * 2,
        Math.max(3, mouthHalfH * 0.58)
      );

      // Warm pink tongue
      ctx.fillStyle = TONGUE_PINK;
      ctx.beginPath();
      ctx.ellipse(
        mouthCenterX,
        mouthCenterY + mouthHalfH * 0.72,
        mouthHalfW * 0.72,
        mouthHalfH * 0.65,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();

    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(mouthCenterX, mouthCenterY, mouthHalfW, mouthHalfH, 0, 0, Math.PI * 2);
    ctx.stroke();
  };

  // 1. Laughing / Joyful expression
  if (expressionKind === 'laugh') {
    eraseBrows();
    eraseEyes(17);
    eraseMouth();

    // Raised cheerful eyebrows
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.6;
    ctx.lineCap = 'round';
    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, browY + 8, 15, 1.18 * Math.PI, 1.82 * Math.PI);
      ctx.stroke();
    });

    // Bold happy curved ^ ^ squinting laughing arcs
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.5;
    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, eyeY + 6, 12.5, 1.15 * Math.PI, 1.85 * Math.PI);
      ctx.stroke();
    });

    // Warm rosy cheek blushes at (158, 174) and (260, 174)
    ctx.fillStyle = 'rgba(225, 91, 100, 0.38)';
    ctx.beginPath();
    ctx.ellipse(158, 174, 9.5, 5.5, 0, 0, Math.PI * 2);
    ctx.ellipse(260, 174, 9.5, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Big joyful open D-shaped laughing mouth at (209, 218)
    const laughPulse = 1 + Math.sin(elapsed * 18) * 0.08;
    const mW = 20 * laughPulse;
    const mH = 10.5 * laughPulse;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(mouthCenterX - mW, mouthCenterY - 4);
    ctx.lineTo(mouthCenterX + mW, mouthCenterY - 4);
    ctx.bezierCurveTo(
      mouthCenterX + mW,
      mouthCenterY + mH,
      mouthCenterX - mW,
      mouthCenterY + mH,
      mouthCenterX - mW,
      mouthCenterY - 4
    );
    ctx.closePath();
    ctx.fillStyle = MOUTH_DARK;
    ctx.fill();
    ctx.clip();

    // Bright white upper teeth
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(mouthCenterX - mW, mouthCenterY - 5, mW * 2, 5.2);

    // Warm pink tongue
    ctx.fillStyle = TONGUE_PINK;
    ctx.beginPath();
    ctx.ellipse(mouthCenterX, mouthCenterY + mH * 0.62, mW * 0.68, 5.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(mouthCenterX - mW, mouthCenterY - 4);
    ctx.lineTo(mouthCenterX + mW, mouthCenterY - 4);
    ctx.bezierCurveTo(
      mouthCenterX + mW,
      mouthCenterY + mH,
      mouthCenterX - mW,
      mouthCenterY + mH,
      mouthCenterX - mW,
      mouthCenterY - 4
    );
    ctx.closePath();
    ctx.stroke();
    return;
  }

  // 2. Shocked / Amazed expression
  if (expressionKind === 'shocked') {
    eraseBrows();
    eraseEyes(17.5);
    eraseMouth();

    // High arched eyebrows at y = 118
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.6;
    ctx.lineCap = 'round';
    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, 118 + 9, 15.5, 1.15 * Math.PI, 1.85 * Math.PI);
      ctx.stroke();
    });

    // Wide white eye sclera with large pupils (or golden star highlights for 'wow')
    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, eyeY, eyeR + 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = INK_DARK;
      ctx.stroke();

      ctx.fillStyle = INK_DARK;
      ctx.beginPath();
      ctx.arc(cx, eyeY, 9.2, 0, Math.PI * 2);
      ctx.fill();

      if (rawSignal === 'wow') {
        drawFourPointStar(ctx, cx - 2.5, eyeY - 2.5, 6.2, 2.4, '#FFD000');
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx + 3.5, eyeY + 3.5, 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx - 3.5, eyeY - 3.5, 3.6, 0, Math.PI * 2);
        ctx.arc(cx + 3.2, eyeY + 3.2, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Surprised round O mouth (radius = 9px) at (209, 219)
    ctx.save();
    ctx.beginPath();
    ctx.arc(209, 219, 9, 0, Math.PI * 2);
    ctx.fillStyle = MOUTH_DARK;
    ctx.fill();
    ctx.clip();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(198, 209, 22, 3.8);

    ctx.fillStyle = TONGUE_PINK;
    ctx.beginPath();
    ctx.arc(209, 226, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(209, 219, 9, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }

  // 3. Cheeky / Mischievous expression
  if (expressionKind === 'cheeky') {
    eraseBrows();
    eraseEyes(16.5);
    eraseMouth();

    // Left eyebrow cocked up, right eyebrow relaxed
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(leftEyeX, 121 + 9, 15, 1.12 * Math.PI, 1.88 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightEyeX - 13, browY + 2);
    ctx.quadraticCurveTo(rightEyeX, browY - 2, rightEyeX + 13, browY + 3);
    ctx.stroke();

    // Left eye open & bright
    ctx.fillStyle = INK_DARK;
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, eyeR - 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(leftEyeX - 4, eyeY - 4, 4, 0, Math.PI * 2);
    ctx.arc(leftEyeX + 3.5, eyeY + 3.5, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Right eye (242, 156) closed in a playful wink arc
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(rightEyeX, eyeY + 4, 12, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();

    if (isReading) {
      drawTalkingMouth();
    } else {
      // Lopsided cheeky smirk at (209, 218)
      ctx.strokeStyle = INK_DARK;
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(191, 220);
      ctx.quadraticCurveTo(211, 224, 228, 212);
      ctx.stroke();
    }
    return;
  }

  // 4. Deadpan / Sad expression
  if (expressionKind === 'sad') {
    eraseBrows();
    eraseMouth();

    if (isBlinking) {
      drawClosedEyelids();
    } else {
      // Half-lidded flat eyelids over top half of both eyes
      ctx.fillStyle = SKIN_TONE;
      ctx.fillRect(leftEyeX - 17, eyeY - 17, 34, 17);
      ctx.fillRect(rightEyeX - 17, eyeY - 17, 34, 17);

      ctx.strokeStyle = INK_DARK;
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      [leftEyeX, rightEyeX].forEach((cx) => {
        ctx.beginPath();
        ctx.moveTo(cx - 14, eyeY - 1);
        ctx.lineTo(cx + 14, eyeY - 1);
        ctx.stroke();
      });
    }

    // Droopy outer eyebrows
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(leftEyeX - 14, browY + 5);
    ctx.quadraticCurveTo(leftEyeX, browY, leftEyeX + 13, browY - 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightEyeX - 13, browY - 3);
    ctx.quadraticCurveTo(rightEyeX, browY, rightEyeX + 14, browY + 5);
    ctx.stroke();

    if (isReading) {
      drawTalkingMouth();
    } else {
      // Curved frown mouth at (209, 221)
      ctx.strokeStyle = INK_DARK;
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(192, 225);
      ctx.quadraticCurveTo(209, 214, 226, 225);
      ctx.stroke();
    }
    return;
  }

  // 5. Reading / Talking expression
  if (expressionKind === 'reading' || isReading) {
    eraseBrows();
    // Attentive slightly raised eyebrows
    ctx.strokeStyle = INK_DARK;
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    [leftEyeX, rightEyeX].forEach((cx) => {
      ctx.beginPath();
      ctx.arc(cx, 122 + 9, 15, 1.16 * Math.PI, 1.84 * Math.PI);
      ctx.stroke();
    });

    if (isBlinking) {
      drawClosedEyelids();
    } else {
      eraseEyes(16.5);
      const offsetX = Math.sin(elapsed * 3.5) * 3.5;
      [leftEyeX, rightEyeX].forEach((cx) => {
        const shiftedX = cx + offsetX;
        ctx.fillStyle = INK_DARK;
        ctx.beginPath();
        ctx.arc(shiftedX, eyeY, eyeR - 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(shiftedX - 4, eyeY - 4, 4, 0, Math.PI * 2);
        ctx.arc(shiftedX + 3.5, eyeY + 3.5, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    drawTalkingMouth();
    return;
  }

  // 6. Periodic Natural Blink on default face
  if (isBlinking) {
    drawClosedEyelids();
  }
}

function getCharacterPose({
  mood,
  emotion,
  isReading = false,
  scrollVelocity = 0,
  elapsed,
  pointer,
  trickKind,
  trickProgress,
  isBatman,
  walkBlend = 0,
  walkCycle = 0,
  walkDirection,
  isGrabbed,
  suitUpProgress = 0,
  expressionKind = 'normal',
}) {
  const idleWave = Math.sin(elapsed * 2.2);
  const idleBounce = Math.abs(Math.sin(elapsed * 2.2));
  const clampedScroll = THREE.MathUtils.clamp(scrollVelocity, -3, 3);
  const scrollBillow = Math.min(0.55, Math.abs(clampedScroll) * 0.16);

  const pose = {
    rootX: 0,
    rootY: idleBounce * 0.015,
    rootZ: 0,
    rootRotX: pointer.y * -0.05,
    rootRotY: pointer.x * 0.28,
    rootRotZ: pointer.x * -0.02,
    scaleMult: 1,
    torsoX: pointer.y * -0.06,
    torsoY: pointer.x * 0.16,
    torsoZ: 0,
    headX: -pointer.y * 0.22,
    headY: pointer.x * 0.38,
    headZ: pointer.x * -0.04,
    leftArmX: idleWave * 0.05,
    leftArmZ: 0.04,
    rightArmX: -idleWave * 0.05,
    rightArmZ: -0.04,
    leftLegX: 0,
    rightLegX: 0,
    capeX: 0.14 + idleBounce * 0.04 + scrollBillow,
  };

  // Grabbed in mid-air: dangling legs & flailing arms
  if (isGrabbed) {
    const flail = Math.sin(elapsed * 16);
    pose.rootY += 0.12;
    pose.rootRotZ = flail * 0.08;
    pose.leftArmX = -1.35 + flail * 0.35;
    pose.rightArmX = -1.35 - flail * 0.35;
    pose.leftArmZ = 0.25;
    pose.rightArmZ = -0.25;
    pose.leftLegX = flail * 0.32;
    pose.rightLegX = -flail * 0.32;
    pose.capeX = 0.35 + Math.abs(flail) * 0.18 + scrollBillow * 0.5;
    return pose;
  }

  // Contextual Mood Poses (idle gestures)
  if (mood === 'wave') {
    pose.rightArmX = -2.1 + Math.sin(elapsed * 5.2) * 0.14;
    pose.rightArmZ = -0.22 + Math.cos(elapsed * 5.2) * 0.16;
  } else if (mood === 'pointRight') {
    const pointBeat = Math.sin(elapsed * 4.8);
    pose.rootRotY = 0.24 + pointer.x * 0.12;
    pose.headY = 0.18 + pointer.x * 0.15;
    pose.headX = pointBeat * 0.04 - pointer.y * 0.1;
    pose.leftArmX = -1.32 + pointBeat * 0.08;
    pose.leftArmZ = 0.34;
    pose.rightArmX = 0.12;
  } else if (mood === 'pointLeft') {
    const pointBeat = Math.sin(elapsed * 4.8);
    pose.rootRotY = -0.24 + pointer.x * 0.12;
    pose.headY = -0.18 + pointer.x * 0.15;
    pose.headX = pointBeat * 0.04 - pointer.y * 0.1;
    pose.rightArmX = -1.32 + pointBeat * 0.08;
    pose.rightArmZ = -0.34;
    pose.leftArmX = 0.12;
  } else if (mood === 'caller') {
    pose.rightArmX = -1.55 + Math.sin(elapsed * 3.4) * 0.06;
    pose.rightArmZ = -0.15;
    pose.leftArmX = -0.45 + Math.cos(elapsed * 3.4) * 0.08;
  } else if (mood === 'champion' || mood === 'thumbsup') {
    pose.rightArmX = -1.65 + Math.sin(elapsed * 3.6) * 0.08;
    pose.leftArmX = -0.35;
  }

  // Reading / Talking subtle head nods
  if (isReading) {
    pose.headX += Math.sin(elapsed * 6) * 0.045;
    pose.headY += Math.sin(elapsed * 2.5) * 0.08;
  }

  // Laughing / Joyful rhythmic shoulder/torso bounce & backward head tilt
  if (expressionKind === 'laugh' || LAUGH_SET.has(String(emotion || mood || '').toLowerCase())) {
    const laughBounce = Math.abs(Math.sin(elapsed * 14)) * 0.06;
    pose.rootY += laughBounce;
    pose.torsoX -= laughBounce * 0.85;
    pose.headX -= 0.14;
    pose.leftArmX -= laughBounce * 2.2;
    pose.rightArmX -= laughBounce * 2.2;
  }

  if (isBatman) {
    pose.capeX =
      0.16 +
      Math.sin(elapsed * 2.8) * 0.05 +
      scrollBillow +
      Math.sin(elapsed * 12) * Math.min(0.08, scrollBillow * 0.35);
  }

  // Real Walk / Run Cycle — smoothly blended via walkBlend (0 -> 1)
  if (walkBlend > 0.001) {
    const stride = Math.sin(walkCycle);
    const bob = Math.abs(Math.cos(walkCycle));
    const dir = walkDirection < 0 ? -1 : 1;

    const walkRootY = bob * 0.075;
    const walkRootRotY = dir * 0.62;
    const walkRootRotX = 0.12;
    const walkTorsoX = 0.08;
    const walkTorsoY = dir * 0.12;
    const walkHeadY = -dir * 0.22 + pointer.x * 0.15;
    const walkLeftLegX = stride * 0.72;
    const walkRightLegX = -stride * 0.72;
    const walkLeftArmX = -stride * 0.62;
    const walkRightArmX = stride * 0.62;
    const walkLeftArmZ = 0.08;
    const walkRightArmZ = -0.08;
    const walkCapeX = 0.42 + bob * 0.16 + scrollBillow * 0.5;

    pose.rootY = THREE.MathUtils.lerp(pose.rootY, walkRootY, walkBlend);
    pose.rootRotY = THREE.MathUtils.lerp(pose.rootRotY, walkRootRotY, walkBlend);
    pose.rootRotX = THREE.MathUtils.lerp(pose.rootRotX, walkRootRotX, walkBlend);
    pose.torsoX = THREE.MathUtils.lerp(pose.torsoX, walkTorsoX, walkBlend);
    pose.torsoY = THREE.MathUtils.lerp(pose.torsoY, walkTorsoY, walkBlend);
    pose.headY = THREE.MathUtils.lerp(pose.headY, walkHeadY, walkBlend);
    pose.leftLegX = THREE.MathUtils.lerp(pose.leftLegX, walkLeftLegX, walkBlend);
    pose.rightLegX = THREE.MathUtils.lerp(pose.rightLegX, walkRightLegX, walkBlend);
    pose.leftArmX = THREE.MathUtils.lerp(pose.leftArmX, walkLeftArmX, walkBlend);
    pose.rightArmX = THREE.MathUtils.lerp(pose.rightArmX, walkRightArmX, walkBlend);
    pose.leftArmZ = THREE.MathUtils.lerp(pose.leftArmZ, walkLeftArmZ, walkBlend);
    pose.rightArmZ = THREE.MathUtils.lerp(pose.rightArmZ, walkRightArmZ, walkBlend);
    pose.capeX = THREE.MathUtils.lerp(pose.capeX, walkCapeX, walkBlend);
  }

  // 600ms "Suit-Up" 360-degree spin + grapple-line drop transition
  if (suitUpProgress > 0 && suitUpProgress < 1) {
    const inv = 1 - suitUpProgress;
    const dropArc = inv * inv;
    pose.rootY += dropArc * 0.52;
    pose.rootRotY += suitUpProgress * Math.PI * 2;
    pose.leftArmX = -1.65 * Math.sin(suitUpProgress * Math.PI);
    pose.rightArmX = -2.25 * Math.sin(suitUpProgress * Math.PI);
    pose.capeX = Math.max(pose.capeX, 0.58 * Math.sin(suitUpProgress * Math.PI));
  }

  // Active Trick / Reaction Override
  if (trickProgress > 0 && trickKind) {
    const arc = Math.sin(trickProgress * Math.PI);
    switch (trickKind) {
      case 'backflip':
        pose.rootY += arc * 0.38;
        pose.rootRotX = -trickProgress * Math.PI * 2;
        pose.leftArmX = -2.1;
        pose.rightArmX = -2.1;
        pose.leftLegX = -0.32 * arc;
        pose.rightLegX = 0.32 * arc;
        break;
      case 'spin':
        pose.rootY += arc * 0.24;
        pose.rootRotY += trickProgress * Math.PI * 2;
        pose.leftArmZ = 0.32;
        pose.rightArmZ = -0.32;
        break;
      case 'superhero': {
        if (trickProgress < 0.42) {
          const leap = Math.sin((trickProgress / 0.42) * Math.PI);
          pose.rootY += leap * 0.48;
          pose.headX = -0.35 * leap;
          pose.rightArmX = -2.4 * leap;
          pose.leftArmX = -2.4 * leap;
          pose.capeX = 0.52 * leap;
        } else {
          const landProg = (trickProgress - 0.42) / 0.58;
          const punch = Math.sin(landProg * Math.PI);
          pose.rootY -= 0.14 * punch;
          pose.torsoX = 0.35 * punch;
          pose.headX = -0.42 * punch;
          pose.headY = pointer.x * 0.15;
          pose.rightArmX = -0.75 * punch;
          pose.rightArmZ = 0.18 * punch;
          pose.leftArmX = -1.95 * punch;
          pose.leftArmZ = 0.35 * punch;
          pose.leftLegX = 0.58 * punch;
          pose.rightLegX = -0.62 * punch;
          pose.capeX = 0.45 * punch;
        }
        break;
      }
      case 'dance': {
        const beat = Math.sin(trickProgress * Math.PI * 8);
        pose.rootY += Math.abs(beat) * 0.16;
        pose.rootRotY += beat * 0.45;
        pose.torsoZ = beat * 0.15;
        pose.leftArmX = -1.6 + beat * 0.65;
        pose.rightArmX = -1.6 - beat * 0.65;
        pose.leftLegX = beat * 0.45;
        pose.rightLegX = -beat * 0.45;
        break;
      }
      case 'panic': {
        const shake = Math.sin(trickProgress * Math.PI * 14);
        pose.rootY += Math.abs(shake) * 0.12;
        pose.rootRotY += shake * 0.35;
        pose.leftArmX = -2.4 + shake * 0.25;
        pose.rightArmX = -2.4 - shake * 0.25;
        pose.leftLegX = shake * 0.5;
        pose.rightLegX = -shake * 0.5;
        break;
      }
      case 'fly':
        pose.rootY += arc * 0.52;
        pose.rootRotX = 0.28 * arc;
        pose.rootRotY += Math.sin(trickProgress * Math.PI * 2) * 0.35;
        pose.leftArmX = -2.45 * arc;
        pose.rightArmX = -2.45 * arc;
        pose.capeX = 0.55 * arc;
        break;
      case 'vanish':
        pose.scaleMult = Math.max(0.06, 1 - arc * 0.94);
        pose.rootRotY += trickProgress * Math.PI * 4;
        break;
      case 'hiccup': {
        const jolt = Math.sin(trickProgress * Math.PI * 4);
        pose.rootY += Math.max(0, jolt) * 0.22;
        pose.torsoX = -Math.max(0, jolt) * 0.25;
        pose.leftArmX = -0.8 * Math.max(0, jolt);
        pose.rightArmX = -0.8 * Math.max(0, jolt);
        break;
      }
      case 'peekaboo':
        pose.headY = Math.sin(trickProgress * Math.PI * 2) * 0.55;
        pose.leftArmX = -1.95 * arc;
        pose.rightArmX = -1.95 * arc;
        pose.leftArmZ = -0.25 * arc;
        pose.rightArmZ = 0.25 * arc;
        break;
      case 'selfie':
        pose.rootRotY = -0.28 * arc;
        pose.headZ = 0.16 * arc;
        pose.rightArmX = -1.75 * arc;
        pose.rightArmZ = -0.25 * arc;
        pose.leftArmX = -1.2 * arc;
        break;
      case 'dizzy': {
        const wobble = Math.sin(trickProgress * Math.PI * 6);
        pose.rootRotZ = wobble * 0.22;
        pose.rootRotY += trickProgress * Math.PI * 2;
        pose.headZ = -wobble * 0.28;
        pose.headX = Math.cos(trickProgress * Math.PI * 6) * 0.22;
        pose.leftArmX = -0.9 + wobble * 0.35;
        pose.rightArmX = -0.9 - wobble * 0.35;
        break;
      }
      case 'tickle': {
        const wiggle = Math.sin(trickProgress * Math.PI * 12);
        pose.rootY += Math.abs(wiggle) * 0.1;
        pose.torsoZ = wiggle * 0.16;
        pose.headZ = -wiggle * 0.18;
        pose.leftArmX = -1.2 + wiggle * 0.4;
        pose.rightArmX = -1.2 - wiggle * 0.4;
        break;
      }
      case 'sneeze': {
        if (trickProgress < 0.45) {
          const windup = trickProgress / 0.45;
          pose.torsoX = -0.32 * windup;
          pose.headX = -0.38 * windup;
          pose.rootY += 0.06 * windup;
        } else {
          const snap = Math.sin(((trickProgress - 0.45) / 0.55) * Math.PI);
          pose.torsoX = 0.42 * snap;
          pose.headX = 0.48 * snap;
          pose.leftArmX = -0.9 * snap;
          pose.rightArmX = -0.9 * snap;
        }
        break;
      }
      case 'sulk':
        pose.torsoX = 0.28 * arc;
        pose.headX = 0.36 * arc;
        pose.headY = -0.25 * arc;
        pose.leftArmX = 0.15 * arc;
        pose.rightArmX = 0.15 * arc;
        break;
      default:
        pose.rootY += arc * 0.18;
        pose.rightArmX = -2.15;
        pose.rightArmZ = -0.22 + Math.sin(trickProgress * Math.PI * 6) * 0.22;
        break;
    }
  }

  return pose;
}

function createBatmanEyeSlitMesh(sideSign) {
  const shape = new THREE.Shape();
  // Angular fierce Batman eye slit polygon
  shape.moveTo(-0.042 * sideSign, -0.008);
  shape.lineTo(0.042 * sideSign, 0.011);
  shape.lineTo(0.036 * sideSign, 0.022);
  shape.lineTo(-0.038 * sideSign, 0.006);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.044,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  geometry.center();

  const material = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(sideSign * 0.115, 0.34, 0.375);
  mesh.rotation.y = sideSign * 0.28;
  mesh.rotation.z = sideSign * 0.18;
  return mesh;
}

function createUtilityBeltGroup() {
  const beltGroup = new THREE.Group();
  beltGroup.name = 'BatmanUtilityBelt';

  const yellowBeltMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FFD000',
    roughness: 0.22,
    metalness: 0.05,
    clearcoat: 0.35,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.0,
  });

  const darkBuckleInsetMaterial = new THREE.MeshPhysicalMaterial({
    color: '#0B0C10',
    roughness: 0.18,
    metalness: 0.1,
    clearcoat: 0.45,
    clearcoatRoughness: 0.12,
  });

  // Molded waist band wrapping the seam between Hips and Torso
  const bandMesh = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.105, 0.585), yellowBeltMaterial);
  bandMesh.position.set(0, 0, -0.029);
  bandMesh.castShadow = true;
  bandMesh.receiveShadow = true;
  beltGroup.add(bandMesh);

  // Central utility buckle
  const buckleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.135, 0.052), yellowBeltMaterial);
  buckleMesh.position.set(0, 0, 0.272);
  buckleMesh.castShadow = true;
  beltGroup.add(buckleMesh);

  const buckleInset = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.062, 0.018),
    darkBuckleInsetMaterial
  );
  buckleInset.position.set(0, 0, 0.294);
  beltGroup.add(buckleInset);

  // 6 molded capsule utility pockets around the waist
  const capsuleGeo = new THREE.CapsuleGeometry(0.036, 0.052, 8, 12);
  const pocketSpecs = [
    { pos: [-0.23, 0, 0.268], rotY: 0 },
    { pos: [-0.385, 0, 0.262], rotY: -0.12 },
    { pos: [0.23, 0, 0.268], rotY: 0 },
    { pos: [0.385, 0, 0.262], rotY: 0.12 },
    { pos: [-0.538, 0, -0.025], rotY: Math.PI / 2 },
    { pos: [0.538, 0, -0.025], rotY: Math.PI / 2 },
  ];

  pocketSpecs.forEach(({ pos, rotY }) => {
    const pocket = new THREE.Mesh(capsuleGeo, yellowBeltMaterial);
    pocket.position.set(pos[0], pos[1], pos[2]);
    pocket.rotation.y = rotY;
    pocket.castShadow = true;
    beltGroup.add(pocket);
  });

  return beltGroup;
}

export default function Minifig({
  outfitId = 'classic',
  mood = 'wave',
  emotion,
  isReading = false,
  scrollVelocity = 0,
  trickState,
  onCharacterClick,
  isWalking = false,
  walkDirection = -1,
  isGrabbed = false,
  badgeMode = false,
  globalPointerRef,
}) {
  const gltf = useLoader(GLTFLoader, '/models/vince_lego_rig.glb');

  const textures = useLoader(THREE.TextureLoader, [
    '/media/characters/atlas-base.png',
    '/media/characters/atlas-doctor.png',
    '/media/characters/atlas-techy.png',
    '/media/characters/atlas-masterplayer.png',
    '/media/characters/atlas-gotham.png',
    '/media/characters/cape-gotham.png',
    '/media/characters/hair-atlas.png',
  ]);

  const [
    baseAtlas,
    doctorAtlas,
    techyAtlas,
    masterplayerAtlas,
    gothamAtlas,
    gothamCape,
    hairAtlas,
  ] = useMemo(() => {
    textures.forEach(configureTexture);
    return textures;
  }, [textures]);

  const atlasByKey = useMemo(
    () => ({
      base: baseAtlas,
      doctor: doctorAtlas,
      techy: techyAtlas,
      masterplayer: masterplayerAtlas,
      gotham: gothamAtlas,
    }),
    [baseAtlas, doctorAtlas, techyAtlas, masterplayerAtlas, gothamAtlas]
  );

  // Offscreen 1024x1024 HTML canvas + THREE.CanvasTexture for 60fps dynamic facial expressions on Head
  const headFaceSurfaceRef = useRef(null);
  const getHeadFaceSurface = () => {
    if (!headFaceSurfaceRef.current && typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      const texture = new THREE.CanvasTexture(canvas);
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
      headFaceSurfaceRef.current = { canvas, ctx, texture };
    }
    return headFaceSurfaceRef.current;
  };

  const rig = useMemo(() => {
    const root = gltf.scene.clone(true);
    const nodes = {};
    const bodyMaterials = [];
    let headMaterial = null;
    let hairMaterial = null;
    let helmetMaterial = null;
    let capeMaterial = null;

    root.traverse((child) => {
      if (child.name) {
        nodes[child.name] = child;
      }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === 'Head') {
          headMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#ffffff'),
            roughness: 0.22,
            metalness: 0.05,
            clearcoat: 0.35,
            clearcoatRoughness: 0.15,
            envMapIntensity: 0.9,
          });
          child.material = headMaterial;
        } else if (child.name === 'Hair') {
          hairMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#ffffff'),
            roughness: 0.22,
            metalness: 0.05,
            clearcoat: 0.35,
            clearcoatRoughness: 0.15,
            envMapIntensity: 0.85,
          });
          child.material = hairMaterial;
        } else if (child.name === 'BatmanHelmet') {
          helmetMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#0B0C10'),
            roughness: 0.15,
            metalness: 0.08,
            clearcoat: 0.5,
            clearcoatRoughness: 0.12,
            envMapIntensity: 1.15,
          });
          child.material = helmetMaterial;
        } else if (child.name === 'BatmanCape') {
          capeMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#141821'),
            roughness: 0.85,
            metalness: 0.01,
            clearcoat: 0.0,
            side: THREE.DoubleSide,
            envMapIntensity: 0.35,
          });
          child.material = capeMaterial;
        } else {
          const bodyMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#ffffff'),
            roughness: 0.4,
            metalness: 0.03,
            clearcoat: 0.1,
            clearcoatRoughness: 0.25,
            envMapIntensity: 0.78,
          });
          child.material = bodyMat;
          bodyMaterials.push(bodyMat);
        }
      }
    });

    // Attach glowing white slit eyes to BatmanHelmet and raise cowl +0.04 for beard/mouth clarity
    let batEyeLeft = null;
    let batEyeRight = null;
    if (nodes.BatmanHelmet) {
      nodes.BatmanHelmet.position.y += 0.04;
      batEyeLeft = createBatmanEyeSlitMesh(-1);
      batEyeRight = createBatmanEyeSlitMesh(1);
      nodes.BatmanHelmet.add(batEyeLeft);
      nodes.BatmanHelmet.add(batEyeRight);
    }

    // Attach 3D molded yellow LEGO utility belt at waist seam on Hips
    let utilityBelt = null;
    if (nodes.Hips) {
      utilityBelt = createUtilityBeltGroup();
      utilityBelt.position.set(0, 0.118, 0);
      nodes.Hips.add(utilityBelt);
    }

    const rest = {};
    [
      'Hips',
      'LegL',
      'LegR',
      'Torso',
      'ArmL',
      'ArmR',
      'Head',
      'Hair',
      'BatmanHelmet',
      'BatmanCape',
    ].forEach((name) => {
      const node = nodes[name];
      if (node) {
        rest[name] = {
          position: node.position.clone(),
          rotation: node.rotation.clone(),
        };
      }
    });

    return {
      root,
      nodes,
      rest,
      bodyMaterials,
      headMaterial,
      hairMaterial,
      helmetMaterial,
      capeMaterial,
      batEyeLeft,
      batEyeRight,
      utilityBelt,
    };
  }, [gltf]);

  // 10-Stud Particle Burst trajectories for the 600ms Suit-Up transition
  const studBurstSpecs = useMemo(() => {
    return Array.from({ length: 10 }, (_, idx) => {
      const angle = (idx / 10) * Math.PI * 2 + (idx % 2 === 0 ? 0.18 : -0.18);
      const isYellow = idx % 2 === 0;
      return {
        idx,
        isYellow,
        dirX: Math.cos(angle) * (0.95 + (idx % 3) * 0.22),
        dirZ: Math.sin(angle) * (0.95 + (idx % 3) * 0.22),
        peakY: 0.55 + (idx % 4) * 0.18,
        startY: 0.95 + (idx % 3) * 0.25,
        rotSpeedX: (idx % 2 === 0 ? 1 : -1) * (8 + idx * 1.4),
        rotSpeedZ: (idx % 2 === 0 ? -1 : 1) * (7 + idx * 1.2),
      };
    });
  }, []);

  const studGeo = useMemo(() => new THREE.CylinderGeometry(0.055, 0.055, 0.045, 16), []);
  const studPipGeo = useMemo(() => new THREE.CylinderGeometry(0.032, 0.032, 0.016, 12), []);
  const blackStudMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#14161D',
        roughness: 0.18,
        metalness: 0.08,
        clearcoat: 0.45,
        clearcoatRoughness: 0.12,
      }),
    []
  );
  const yellowStudMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#FFD000',
        emissive: new THREE.Color('#FFD000'),
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.05,
        clearcoat: 0.5,
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  const rigRef = useRef(rig);
  const outerGroup = useRef(null);
  const studGroupRefs = useRef([]);
  const grappleLineRef = useRef(null);
  const rimFlashLightRef = useRef(null);
  const scalePulse = useRef(1);
  const walkBlendRef = useRef(0);
  const walkCycleRef = useRef(0);
  const activeTrickRef = useRef({ nonce: 0, startedAt: 0, kind: null, duration: 1.35 });
  const prevOutfitRef = useRef(outfitId);
  const suitUpRef = useRef({ active: false, startedAt: 0, duration: 600 });
  const lastFaceSignatureRef = useRef('');

  useEffect(() => {
    if (
      trickState &&
      trickState.nonce !== activeTrickRef.current.nonce &&
      (trickState.kind || trickState.name)
    ) {
      activeTrickRef.current = {
        nonce: trickState.nonce,
        startedAt: trickState.startedAt || performance.now(),
        kind: trickState.kind || trickState.name,
        duration: trickState.duration || 1.35,
      };
    }
  }, [trickState]);

  useEffect(() => {
    rigRef.current = rig;
    const currentRig = rigRef.current;
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const selectedAtlas = atlasByKey[outfit.atlasKey] ?? baseAtlas;
    const isBatman = Boolean(outfit.showHelmet);
    const faceSurface = getHeadFaceSurface();

    if (prevOutfitRef.current !== outfitId) {
      prevOutfitRef.current = outfitId;
      suitUpRef.current = {
        active: true,
        startedAt: performance.now(),
        duration: 600,
      };
    }

    currentRig.bodyMaterials.forEach((material) => {
      material.map = selectedAtlas;
      material.color.set('#ffffff');
      material.roughness = 0.4;
      material.metalness = 0.03;
      material.clearcoat = 0.1;
      material.clearcoatRoughness = 0.25;
      material.needsUpdate = true;
    });

    if (currentRig.headMaterial && faceSurface) {
      currentRig.headMaterial.map = faceSurface.texture;
      currentRig.headMaterial.roughness = 0.22;
      currentRig.headMaterial.metalness = 0.05;
      currentRig.headMaterial.clearcoat = 0.35;
      currentRig.headMaterial.clearcoatRoughness = 0.15;
      currentRig.headMaterial.needsUpdate = true;
      lastFaceSignatureRef.current = '';
    }

    if (currentRig.hairMaterial) {
      currentRig.hairMaterial.map = hairAtlas;
      currentRig.hairMaterial.color.set('#ffffff');
      currentRig.hairMaterial.roughness = 0.22;
      currentRig.hairMaterial.metalness = 0.05;
      currentRig.hairMaterial.clearcoat = 0.35;
      currentRig.hairMaterial.clearcoatRoughness = 0.15;
      currentRig.hairMaterial.needsUpdate = true;
    }

    if (currentRig.helmetMaterial) {
      currentRig.helmetMaterial.map = null;
      currentRig.helmetMaterial.color.set('#0B0C10');
      currentRig.helmetMaterial.roughness = 0.15;
      currentRig.helmetMaterial.metalness = 0.08;
      currentRig.helmetMaterial.clearcoat = 0.5;
      currentRig.helmetMaterial.clearcoatRoughness = 0.12;
      currentRig.helmetMaterial.needsUpdate = true;
    }

    if (currentRig.capeMaterial) {
      currentRig.capeMaterial.map = gothamCape;
      currentRig.capeMaterial.color.set('#141821');
      currentRig.capeMaterial.roughness = 0.85;
      currentRig.capeMaterial.metalness = 0.01;
      currentRig.capeMaterial.clearcoat = 0.0;
      currentRig.capeMaterial.side = THREE.DoubleSide;
      currentRig.capeMaterial.needsUpdate = true;
    }

    if (currentRig.nodes.Hair) {
      currentRig.nodes.Hair.visible = !isBatman;
    }
    if (currentRig.nodes.BatmanHelmet) {
      currentRig.nodes.BatmanHelmet.visible = isBatman;
    }
    if (currentRig.nodes.BatmanCape) {
      currentRig.nodes.BatmanCape.visible = Boolean(outfit.showCape);
    }
    if (currentRig.utilityBelt) {
      currentRig.utilityBelt.visible = isBatman;
    }

    scalePulse.current = 1.08;
  }, [outfitId, atlasByKey, baseAtlas, gothamCape, hairAtlas, rig]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const now = performance.now();
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const selectedAtlas = atlasByKey[outfit.atlasKey] ?? baseAtlas;
    const isBatman = Boolean(outfit.showHelmet);
    const faceSurface = getHeadFaceSurface();

    let trickProgress = 0;
    let trickKind = null;
    const curTrick = activeTrickRef.current;
    if (curTrick.kind && curTrick.startedAt > 0) {
      const raw = (now - curTrick.startedAt) / (curTrick.duration * 1000);
      if (raw >= 0 && raw <= 1) {
        trickProgress = raw;
        trickKind = curTrick.kind;
      }
    }

    // 600ms Suit-Up progress
    let suitUpProgress = 0;
    if (suitUpRef.current.active) {
      const rawSuit = (now - suitUpRef.current.startedAt) / suitUpRef.current.duration;
      if (rawSuit >= 0 && rawSuit <= 1) {
        suitUpProgress = rawSuit;
      } else {
        suitUpRef.current.active = false;
      }
    }

    // Periodic natural blink: every ~3.4s for 130ms
    const isBlinking = elapsed % 3.4 < 0.13;

    const { kind: expressionKind, raw: rawSignal } = resolveExpressionState({
      emotion,
      mood,
      trickKind,
      isReading,
      isGrabbed,
    });

    // Live 60fps facial emotion canvas updates on Head
    if (faceSurface && selectedAtlas?.image) {
      const isAnimatedFace = isReading || expressionKind === 'reading' || expressionKind === 'laugh';
      const timeBucket = isAnimatedFace ? Math.floor(elapsed * 60) : 0;
      const signature = `${outfit.atlasKey}:${expressionKind}:${rawSignal}:${isReading ? 1 : 0}:${isBlinking ? 1 : 0}:${timeBucket}`;

      if (signature !== lastFaceSignatureRef.current) {
        lastFaceSignatureRef.current = signature;
        paintHeadExpressionCanvas({
          ctx: faceSurface.ctx,
          baseImage: selectedAtlas.image,
          expressionKind,
          rawSignal,
          isReading,
          isBlinking,
          elapsed,
        });
        faceSurface.texture.needsUpdate = true;
      }
    }

    // Scale Batman's glowing white slit eyes during blink / laugh / squint / shock / wink
    const { batEyeLeft, batEyeRight } = rigRef.current;
    if (batEyeLeft && batEyeRight) {
      let targetLeftScaleY = 1;
      let targetRightScaleY = 1;

      if (isBlinking) {
        targetLeftScaleY = 0.08;
        targetRightScaleY = 0.08;
      } else if (expressionKind === 'laugh') {
        targetLeftScaleY = 0.36;
        targetRightScaleY = 0.36;
      } else if (expressionKind === 'shocked') {
        targetLeftScaleY = 1.32;
        targetRightScaleY = 1.32;
      } else if (expressionKind === 'cheeky') {
        targetLeftScaleY = 1.08;
        targetRightScaleY = 0.12;
      } else if (expressionKind === 'sad') {
        targetLeftScaleY = 0.5;
        targetRightScaleY = 0.5;
      }

      batEyeLeft.scale.y = dampValue(batEyeLeft.scale.y, targetLeftScaleY, 18, delta);
      batEyeRight.scale.y = dampValue(batEyeRight.scale.y, targetRightScaleY, 18, delta);
    }

    // Update 10-Stud Particle Burst & Grapple Line during 600ms Suit-Up transition
    studGroupRefs.current.forEach((studNode, i) => {
      if (!studNode) return;
      const spec = studBurstSpecs[i];
      if (suitUpProgress > 0 && suitUpProgress < 1) {
        studNode.visible = true;
        const t = suitUpProgress;
        const radial = Math.sin(t * Math.PI * 0.65);
        studNode.position.set(
          spec.dirX * radial,
          spec.startY + Math.sin(t * Math.PI) * spec.peakY - t * t * 0.65,
          spec.dirZ * radial
        );
        studNode.rotation.x = t * spec.rotSpeedX;
        studNode.rotation.z = t * spec.rotSpeedZ;
        const studScale = Math.max(0.001, Math.sin(t * Math.PI) * 1.15);
        studNode.scale.setScalar(studScale);
      } else {
        studNode.visible = false;
      }
    });

    if (grappleLineRef.current) {
      if (suitUpProgress > 0 && suitUpProgress < 0.85) {
        grappleLineRef.current.visible = true;
        grappleLineRef.current.scale.y = 1 - suitUpProgress * 0.7;
      } else {
        grappleLineRef.current.visible = false;
      }
    }

    if (rimFlashLightRef.current) {
      rimFlashLightRef.current.intensity =
        suitUpProgress > 0 && suitUpProgress < 1
          ? Math.sin(suitUpProgress * Math.PI) * 4.2
          : 0;
    }

    const pointer = globalPointerRef?.current ?? state.pointer;

    const targetWalk = isWalking && !isGrabbed ? 1 : 0;
    walkBlendRef.current = dampValue(walkBlendRef.current, targetWalk, 14, delta);
    if (walkBlendRef.current > 0.001) {
      walkCycleRef.current += delta * 15.5 * walkBlendRef.current;
    }

    const pose = getCharacterPose({
      mood,
      emotion,
      isReading,
      scrollVelocity,
      elapsed,
      pointer,
      trickKind,
      trickProgress,
      isBatman,
      walkBlend: walkBlendRef.current,
      walkCycle: walkCycleRef.current,
      walkDirection,
      isGrabbed,
      suitUpProgress,
      expressionKind,
    });

    scalePulse.current = dampValue(scalePulse.current, 1, 9, delta);

    if (outerGroup.current) {
      const targetY = (badgeMode ? -1.35 : -1.02) + pose.rootY;
      const targetScale = (badgeMode ? 0.96 : 0.72) * scalePulse.current * pose.scaleMult;
      outerGroup.current.position.y = dampValue(outerGroup.current.position.y, targetY, 10, delta);
      outerGroup.current.position.z = dampValue(outerGroup.current.position.z, pose.rootZ, 10, delta);
      outerGroup.current.rotation.x = dampValue(outerGroup.current.rotation.x, pose.rootRotX, 10, delta);
      outerGroup.current.rotation.y = dampValue(outerGroup.current.rotation.y, pose.rootRotY, 10, delta);
      outerGroup.current.rotation.z = dampValue(outerGroup.current.rotation.z, pose.rootRotZ, 10, delta);
      outerGroup.current.scale.setScalar(targetScale);
    }

    const { nodes, rest } = rigRef.current;
    if (nodes.Torso && rest.Torso) {
      nodes.Torso.rotation.x = dampValue(nodes.Torso.rotation.x, rest.Torso.rotation.x + pose.torsoX, 9, delta);
      nodes.Torso.rotation.y = dampValue(nodes.Torso.rotation.y, rest.Torso.rotation.y + pose.torsoY, 9, delta);
      nodes.Torso.rotation.z = dampValue(nodes.Torso.rotation.z, rest.Torso.rotation.z + pose.torsoZ, 9, delta);
    }

    if (nodes.Head && rest.Head) {
      nodes.Head.rotation.x = dampValue(nodes.Head.rotation.x, rest.Head.rotation.x + pose.headX, 11, delta);
      nodes.Head.rotation.y = dampValue(nodes.Head.rotation.y, rest.Head.rotation.y + pose.headY, 11, delta);
      nodes.Head.rotation.z = dampValue(nodes.Head.rotation.z, rest.Head.rotation.z + pose.headZ, 11, delta);
    }

    if (nodes.Hair && rest.Hair && nodes.Head) {
      nodes.Hair.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.BatmanHelmet && rest.BatmanHelmet && nodes.Head) {
      nodes.BatmanHelmet.position.y = rest.BatmanHelmet.position.y;
      nodes.BatmanHelmet.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.ArmL && rest.ArmL) {
      nodes.ArmL.rotation.x = dampValue(nodes.ArmL.rotation.x, rest.ArmL.rotation.x + pose.leftArmX, 12, delta);
      nodes.ArmL.rotation.z = dampValue(nodes.ArmL.rotation.z, rest.ArmL.rotation.z + pose.leftArmZ, 12, delta);
    }

    if (nodes.ArmR && rest.ArmR) {
      nodes.ArmR.rotation.x = dampValue(nodes.ArmR.rotation.x, rest.ArmR.rotation.x + pose.rightArmX, 12, delta);
      nodes.ArmR.rotation.z = dampValue(nodes.ArmR.rotation.z, rest.ArmR.rotation.z + pose.rightArmZ, 12, delta);
    }

    if (nodes.LegL && rest.LegL) {
      nodes.LegL.rotation.x = dampValue(nodes.LegL.rotation.x, rest.LegL.rotation.x + pose.leftLegX, 12, delta);
    }

    if (nodes.LegR && rest.LegR) {
      nodes.LegR.rotation.x = dampValue(nodes.LegR.rotation.x, rest.LegR.rotation.x + pose.rightLegX, 12, delta);
    }

    if (nodes.BatmanCape && rest.BatmanCape) {
      nodes.BatmanCape.rotation.x = dampValue(
        nodes.BatmanCape.rotation.x,
        rest.BatmanCape.rotation.x + pose.capeX,
        9,
        delta
      );
    }
  });

  return (
    <group
      ref={outerGroup}
      position={[0, -1.02, 0]}
      scale={0.72}
      onClick={(event) => {
        event.stopPropagation();
        onCharacterClick?.();
      }}
    >
      <primitive object={rig.root} />

      {/* Grapple-Line Cable during 600ms Suit-Up Drop */}
      <mesh ref={grappleLineRef} position={[0, 3.2, 0]} visible={false}>
        <cylinderGeometry args={[0.014, 0.014, 2.6, 8]} />
        <meshStandardMaterial color="#FFD000" emissive="#FFD000" emissiveIntensity={0.6} />
      </mesh>

      {/* Suit-Up Rim-Light Flash */}
      <pointLight
        ref={rimFlashLightRef}
        position={[0, 1.5, 0.9]}
        color="#FFD000"
        intensity={0}
        distance={4.5}
      />

      {/* 10 Miniature Black & Translucent-Yellow 1x1 Round LEGO Studs Burst */}
      {studBurstSpecs.map((spec, i) => (
        <group
          key={spec.idx}
          ref={(el) => {
            studGroupRefs.current[i] = el;
          }}
          visible={false}
        >
          <mesh
            geometry={studGeo}
            material={spec.isYellow ? yellowStudMat : blackStudMat}
            castShadow
          />
          <mesh
            geometry={studPipGeo}
            material={spec.isYellow ? yellowStudMat : blackStudMat}
            position={[0, 0.03, 0]}
          />
        </group>
      ))}
    </group>
  );
}
