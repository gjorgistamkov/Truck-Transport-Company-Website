import { Button } from './Button.jsx'
import { SectionWrapper } from './SectionWrapper.jsx'

export function CTASection({ title, subtitle, to = '/quote', buttonText = 'Request a Quote' }) {
  return (
    <section className="bg-accent-500">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(26,54,93,0.35),transparent_40%)]" />
        <div className="relative">
          <SectionWrapper className="py-14 sm:py-18 md:py-20">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <div className="text-xs font-bold tracking-widest text-primary/80">DI-VI Transport</div>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-primary">{title}</h2>
                <p className="mt-3 text-sm sm:text-base text-primary/80 leading-relaxed">{subtitle}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button as="link" to={to} variant="primary" className="bg-primary text-white hover:bg-primary/90 w-full md:w-auto">
                  {buttonText}
                </Button>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

