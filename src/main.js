import './style.css'

// ---- 页脚年份自动更新 ----
document.getElementById('year').textContent = new Date().getFullYear()

// ---- 滚动渐入：进入视口后一次性显示，不回退 ----
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const revealEls = document.querySelectorAll('.reveal')

if (prefersReduced) {
  // 减少动态效果：直接全部可见
  revealEls.forEach((el) => el.classList.add('is-visible'))
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 }
  )
  revealEls.forEach((el) => io.observe(el))
}
