import { BadgeCheck, Globe2, ShieldCheck, Snowflake, Timer, Truck } from 'lucide-react'

export const brand = {
  name: 'DI-VI Transport',
  slogan: 'Frigo Transport Across Europe',
  accent: 'Fast. Safe. On time.'
}

export const services = [
  {
    key: 'international',
    title: 'International Transport',
    description: 'International transport across Europe with reliable timelines and clear communication.',
    icon: Globe2
  },
  {
    key: 'domestic',
    title: 'Frigo (Refrigerated) Transport',
    description: 'Temperature-controlled transport with frigo trucks for sensitive goods.',
    icon: Snowflake
  },
  {
    key: 'safety',
    title: 'Fast & Safe Delivery',
    description: 'Fast and safe transport with on-time delivery as a standard.',
    icon: Truck
  },
  {
    key: 'certificates',
    title: 'CEMT / ECMT Certificates',
    description: 'All vehicles have CEMT/ECMT certificates for compliant international operations.',
    icon: BadgeCheck
  }
]

export const whyChooseUs = [
  { title: 'On-time delivery', description: 'We focus on delivering on time with predictable planning.', icon: Timer },
  { title: 'Safe transport', description: 'Safe handling and disciplined dispatch from pickup to delivery.', icon: ShieldCheck },
  { title: 'Certified fleet', description: 'CEMT/ECMT certificates on all vehicles for Europe transport.', icon: BadgeCheck },
  { title: 'Frigo trucks', description: 'Refrigerated transport capability for temperature-sensitive cargo.', icon: Snowflake }
]

export const testimonials = [
  {
    name: 'Operations Manager',
    company: 'Manufacturing Partner',
    quote:
      'Clear communication and consistent delivery times. DI-VI Transport is our go-to carrier for urgent loads.'
  },
  {
    name: 'Logistics Coordinator',
    company: 'Retail Client',
    quote: 'From booking to delivery, everything runs smoothly. Great responsiveness from dispatch.'
  }
]

export const fleetItems = [
  {
    title: 'Frigo Truck (Refrigerated)',
    specs: ['Temperature controlled transport', 'Safe handling', 'International routes']
  },
  {
    title: 'Tractor + Trailer',
    specs: ['Long-haul ready', 'Europe coverage', 'On-time delivery']
  }
]

export const company = {
  locationShort: 'Stojakovo, Bogdanci, North Macedonia',
  locationAddress: 'DI-VI TRANSPORT, MK, Маршал Тито, Стојаково 1489',
  email: 'transport.divi@gmail.com',
  phones: {
    viber: ['+38971265400', '+38970345493'],
    whatsapp: ['+38971265400']
  },
  lanes: ['Albania', 'Turkey', 'Romania', 'Poland', 'Lithuania', 'Bulgaria', 'Other European countries']
}

