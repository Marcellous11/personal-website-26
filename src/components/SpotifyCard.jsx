import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WORKER_URL = 'https://spotify-now-playing.1mcj001.workers.dev'

export default function SpotifyCard() {
  const [track, setTrack] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(WORKER_URL)
        const data = await res.json()
        setTrack(data)
      } catch {
        setTrack(null)
      } finally {
        setLoading(false)
      }
    }
    load()
    // Refresh every 30s
    const interval = setInterval(load, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {/* Spotify logo */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs font-medium text-light">
            {track?.isPlaying ? 'Now Playing' : 'Last Played'}
          </span>
        </div>
        {track?.isPlaying && (
          <div className="flex items-end gap-[3px] h-4">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] bg-[#1DB954] rounded-full"
                animate={{ height: ['4px', '14px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Track info */}
      {loading ? (
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 rounded-lg bg-border animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-border rounded animate-pulse w-3/4" />
            <div className="h-3 bg-border rounded animate-pulse w-1/2" />
          </div>
        </div>
      ) : track?.title ? (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 items-center group"
        >
          {track.albumArt && (
            <img
              src={track.albumArt}
              alt={track.album}
              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-border"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-light truncate group-hover:text-accent transition-colors duration-200">
              {track.title}
            </p>
            <p className="text-xs text-muted truncate mt-0.5">{track.artist}</p>
            <p className="text-xs text-muted/60 truncate mt-0.5">{track.album}</p>
          </div>
        </a>
      ) : (
        <p className="text-xs text-muted">Nothing playing right now.</p>
      )}
    </motion.div>
  )
}
