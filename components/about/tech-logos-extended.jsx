export * from './tech-logos'

// Extending the existing tech-logos set with new ones
export const FramerLogo = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 0h16v8h-8zM4 12h8v8zM12 24l-8-8V8h8z" fill="#0055FF" />
    </svg>
)

export const TailwindLogo = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.0001 6.00017C12.0001 2.39999 15.6001 -0.600006 19.2002 2.40018C22.8002 5.40036 19.2002 9.00036 15.6001 9.00036C12.0001 9.00036 12.0001 6.00017 12.0001 6.00017ZM6 13.2004C6 9.60018 9.60001 6.60018 13.2001 9.60037C16.8001 12.6005 13.2001 16.2006 9.60001 16.2006C6.00001 16.2006 6 13.2004 6 13.2004ZM6.00001 6.00017C6.00001 2.39999 9.60001 -0.600006 13.2001 2.40018C13.5601 2.7002 13.8001 3.00021 13.9201 3.36023C13.2001 3.24022 12.6001 3.36023 12.0001 3.60025C10.8001 4.20029 9.60001 5.40037 9.60001 6.60046C9.60001 7.44052 9.72001 8.28058 10.0801 9.00063C10.0801 9.00063 7.80005 8.16057 6.00001 6.00017ZM0 13.2004C0 9.60018 3.60002 6.60018 7.20004 9.60037C7.56004 9.90039 7.80005 10.2004 7.92005 10.5604C7.20004 10.4404 6.60004 10.5604 6.00004 10.8004C4.80003 11.4005 3.60002 12.6005 3.60002 13.8006C3.60002 14.6407 3.72002 15.4807 4.08003 16.2008C4.08003 16.2008 1.80001 15.3608 0 13.2004Z" fill="#38BDF8" />
    </svg>
)

export const ShadcnLogo = (props) => (
    <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <line x1="208" y1="128" x2="128" y2="208" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="192" y1="40" x2="40" y2="192" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const JokeApiLogo = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
)
