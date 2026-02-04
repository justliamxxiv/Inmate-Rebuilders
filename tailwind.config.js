/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f7faf2',
  				'100': '#eef6e5',
  				'200': '#d5e9c1',
  				'300': '#bcdc9d',
  				'400': '#8ac255',
  				'500': '#5f9f25',
  				'600': '#568f21',
  				'700': '#47771c',
  				'800': '#395f16',
  				'900': '#2f4d12',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-raleway)',
  				'system-ui',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-prata)',
  				'Georgia',
  				'serif'
  			]
  		},
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			md: '8px',
  			lg: '12px',
  			xl: '16px',
  			'2xl': '24px',
  			'3xl': '32px'
  		},
  		animation: {
  			'float-slow': 'float 25s ease-in-out infinite',
  			'float-medium': 'float 20s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s ease-in-out infinite',
  			'pulse-medium': 'pulse 3s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0) translateX(0)'
  				},
  				'33%': {
  					transform: 'translateY(-20px) translateX(20px)'
  				},
  				'66%': {
  					transform: 'translateY(20px) translateX(-20px)'
  				}
  			},
  			glow: {
  				'0%': {
  					opacity: '0.4',
  					filter: 'blur(20px)'
  				},
  				'100%': {
  					opacity: '0.7',
  					filter: 'blur(25px)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}