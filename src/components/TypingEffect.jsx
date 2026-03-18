'use client';
import { useEffect, useRef, useState, ElementType } from 'react';

export default function TypingEffect({
  text,
  as: Tag = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  cursorClassName = '',
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
}) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState('');
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [phase, setPhase] = useState('waiting'); // waiting | typing | pausing | deleting
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const getSpeed = (base) => {
    if (!variableSpeed) return base;
    return base + Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
  };

  useEffect(() => {
    if (!startOnVisible) { setPhase('waiting'); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase('waiting'); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    // Cursor blink
    const id = setInterval(() => setCursorVisible(v => !v), cursorBlinkDuration * 1000);
    return () => clearInterval(id);
  }, [cursorBlinkDuration]);

  useEffect(() => {
    const target = texts[sentenceIdx];
    const isReverse = reverseMode;

    const schedule = (fn, delay) => { timeoutRef.current = setTimeout(fn, delay); };
    const clear = () => clearTimeout(timeoutRef.current);

    if (phase === 'waiting') {
      schedule(() => setPhase('typing'), initialDelay);
    } else if (phase === 'typing') {
      if (displayed.length < target.length) {
        schedule(() => {
          const next = isReverse
            ? target.slice(target.length - displayed.length - 1)
            : target.slice(0, displayed.length + 1);
          setDisplayed(next);
        }, getSpeed(typingSpeed));
      } else {
        onSentenceComplete?.(target, sentenceIdx);
        schedule(() => setPhase('pausing'), 0);
      }
    } else if (phase === 'pausing') {
      schedule(() => setPhase(texts.length > 1 || loop ? 'deleting' : 'done'), pauseDuration);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        schedule(() => setDisplayed(d => isReverse ? d.slice(1) : d.slice(0, -1)), getSpeed(deletingSpeed));
      } else {
        const next = (sentenceIdx + 1) % texts.length;
        if (!loop && next === 0) { setPhase('done'); return; }
        setSentenceIdx(next);
        setPhase('typing');
      }
    }
    return clear;
  }, [phase, displayed, sentenceIdx]);

  const color = textColors[sentenceIdx] || undefined;
  const showCursorNow = showCursor && !(hideCursorWhileTyping && phase === 'typing');

  return (
    <Tag ref={containerRef} className={className} style={{ color }}>
      {displayed}
      {showCursorNow && (
        <span
          className={cursorClassName}
          style={{
            opacity: cursorVisible ? 1 : 0,
            transition: `opacity ${cursorBlinkDuration * 0.3}s`,
            marginLeft: '2px',
            color: color || 'inherit',
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </Tag>
  );
}
