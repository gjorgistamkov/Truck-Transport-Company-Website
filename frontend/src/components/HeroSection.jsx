import { motion } from 'framer-motion'
import { Button } from './Button.jsx'
import { SectionWrapper } from './SectionWrapper.jsx'

export function HeroSection({
  backgroundImage,
  eyebrow,
  title,
  subtitle,
  primaryCta = { text: 'Request a Quote', to: '/quote' },
  //secondaryCta = { text: 'Contact Us', to: '/contact' },
  align = 'left'
}) {
  const textAlign = align === 'center' ? 'text-center' : 'text-left'
  const wrapperClass = align === 'center' ? 'items-center' : 'items-start'

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/65" />

      <SectionWrapper className="relative h-full">
        <div className={`flex h-full ${wrapperClass} py-20 ${textAlign}`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}
          >
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/90 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent-500" />
                {eyebrow}
              </div>
            ) : null}

            <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] text-white">
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-100/90 leading-relaxed">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button as="link" to={primaryCta.to} variant="primary" className="w-full sm:w-auto">
                {primaryCta.text}
              </Button>
              {/*<Button
                as="link"
                to={secondaryCta.to}
                variant="secondary"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/40"
              >
                {secondaryCta.text}
              </Button>*/}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4">
                <div className="text-lg font-black text-white">EU</div>
                <div className="mt-1 text-xs text-white/80">Coverage</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4">
                <div className="text-lg font-black text-white">24/7</div>
                <div className="mt-1 text-xs text-white/80">Dispatch</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4">
                <div className="text-lg font-black text-white">Fast</div>
                <div className="mt-1 text-xs text-white/80">Quotes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  )
}

