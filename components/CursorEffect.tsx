'use client'

import { useEffect } from 'react'

export default function CursorEffect() {
  useEffect(() => {
    const dot    = document.getElementById('af-cursor-dot')    as HTMLElement | null
    const bubble = document.getElementById('af-cursor-bubble') as HTMLElement | null
    if (!dot || !bubble) return

    // Non-null references safe to use inside closures
    const d = dot
    const b = bubble

    let mouseX = 0, mouseY = 0
    let bubbleX = 0, bubbleY = 0
    let raf: number

    // Dot follows instantly
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      d.style.left = mouseX + 'px'
      d.style.top  = mouseY + 'px'
    }

    // Bubble lerps behind
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
    function animate() {
      bubbleX = lerp(bubbleX, mouseX, 0.12)
      bubbleY = lerp(bubbleY, mouseY, 0.12)
      b.style.left = bubbleX + 'px'
      b.style.top  = bubbleY + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()

    // Hover + click states
    function addHover()    { document.body.classList.add('af-hovering') }
    function removeHover() { document.body.classList.remove('af-hovering') }
    function addClick()    { document.body.classList.add('af-clicking') }
    function removeClick() { document.body.classList.remove('af-clicking') }
    function hide() { d.style.opacity = '0'; b.style.opacity = '0' }
    function show() { d.style.opacity = '1'; b.style.opacity = '1' }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  addClick)
    document.addEventListener('mouseup',    removeClick)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    // Attach hover listeners to all interactive elements
    function attachHover() {
      document.querySelectorAll('a, button, .card, .af-nav-link, input, select, label, [data-hoverable]')
        .forEach(el => {
          el.addEventListener('mouseenter', addHover)
          el.addEventListener('mouseleave', removeHover)
        })
    }
    attachHover()

    // Re-attach on DOM mutations (modals, dynamic content)
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  addClick)
      document.removeEventListener('mouseup',    removeClick)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="af-cursor-dot"    />
      <div id="af-cursor-bubble" />
    </>
  )
}
