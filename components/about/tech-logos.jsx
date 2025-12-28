export const NextJsLogo = (props) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_next" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_next)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.791" y2="109.54" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
)

export const CloudflareLogo = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M36.6526 21.0984C36.1972 21.1448 35.7335 21.1666 35.2662 21.1666C32.1895 21.1666 29.352 19.5397 27.7018 16.9804C27.0722 16.0359 26.68 14.9395 26.68 13.7371C26.68 11.4554 27.9103 9.43555 29.7424 8.29102C28.2863 7.64413 26.6661 7.28821 24.9655 7.28821C18.6738 7.28821 13.3768 11.7583 12.2748 17.7042C12.0163 17.6833 11.7533 17.671 11.4877 17.671C5.14322 17.671 0 22.8142 0 29.1587C0 35.5032 5.14322 40.6464 11.4877 40.6464H38.5445C43.7656 40.6464 48 36.4173 48 31.1963C48 26.0468 43.8965 21.8596 38.7845 21.75C38.0792 21.4651 37.3621 21.2407 36.6526 21.0984Z" fill="#F38020" />
        <path d="M35.2662 21.1666C35.7335 21.1666 36.1972 21.1448 36.6526 21.0984C37.3621 21.2407 38.0792 21.4651 38.7845 21.75C43.8965 21.8596 48 26.0468 48 31.1963C48 36.4173 43.7656 40.6464 38.5445 40.6464H11.4877C5.14322 40.6464 0 35.5032 0 29.1587C0 22.8142 5.14322 17.671 11.4877 17.671C11.7533 17.671 12.0163 17.6833 12.2748 17.7042C13.3768 11.7583 18.6738 7.28821 24.9655 7.28821C26.6661 7.28821 28.2863 7.64413 29.7424 8.29102C29.6231 8.52835 29.5161 8.77196 29.4216 9.02237C28.4239 11.6668 28.5262 14.6366 29.6997 17.2081C30.8732 19.7797 32.9996 21.6888 35.6321 22.5276C35.5103 22.0805 35.3884 21.6268 35.2662 21.1666Z" fill="#FAAD3F" />
    </svg>
)

export const DeepSeekLogo = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Abstract Brain / Node network representation for AI */}
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-blue-500 opacity-20" />
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2" className="text-blue-600" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor" className="text-blue-500" />
        <circle cx="12" cy="7" r="1" fill="currentColor" className="text-blue-400" />
        <circle cx="17" cy="12" r="1" fill="currentColor" className="text-blue-400" />
        <circle cx="7" cy="12" r="1" fill="currentColor" className="text-blue-400" />
        <circle cx="12" cy="17" r="1" fill="currentColor" className="text-blue-400" />
        <line x1="12" y1="7" x2="12" y2="9" stroke="currentColor" strokeWidth="1" className="text-blue-300" />
        <line x1="17" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1" className="text-blue-300" />
        <line x1="7" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1" className="text-blue-300" />
        <line x1="12" y1="17" x2="12" y2="15" stroke="currentColor" strokeWidth="1" className="text-blue-300" />
    </svg>
)

export const ShieldLock = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-green-500/20 fill-green-500/10" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <rect x="10" y="8" width="4" height="6" rx="1" />
    </svg>
)
