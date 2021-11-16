module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: { sans: ['Quicksand'] },
        color: {
            main: {
                light: '#E3FDFD',
                default: '#CBF1F5',
                dark: '#A6E3E9',
                darkest: '#71C9CE',
            },
        },
        extend: {
            textColor: {
                skin: {
                    base: 'var(--color-text-base)',
                    muted: 'var(--color-text-muted)',
                    inverted: 'var(--color-text-inverted)',
                },
            },
            backgroundColor: {
                skin: {
                    fill: 'var(--color-fill)',
                    'button-accent': 'var(--color-button-accent)',
                    'button-accent-hover': 'var(--color-button-accent-hover)',
                    'button-muted': 'var(--color-button-muted)',
                },
            },
            gradientColorStops: {
                skin: {
                    hue: 'var(--color-fill)',
                },
            },
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
