import { useEffect } from 'react'

// Lightweight per-route SEO: title, meta description and canonical.
// In WordPress these map to the SEO plugin's title / description / canonical fields.
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title
    const set = (selector, attr, value, create) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = create()
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }
    if (description) {
      set('meta[name="description"]', 'content', description, () => Object.assign(document.createElement('meta'), { name: 'description' }))
      set('meta[property="og:description"]', 'content', description, () => {
        const m = document.createElement('meta')
        m.setAttribute('property', 'og:description')
        return m
      })
    }
    set('link[rel="canonical"]', 'href', window.location.origin + window.location.pathname, () => Object.assign(document.createElement('link'), { rel: 'canonical' }))
  }, [title, description])
}
