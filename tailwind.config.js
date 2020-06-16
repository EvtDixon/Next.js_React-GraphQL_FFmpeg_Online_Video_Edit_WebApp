module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./**/*.js'],
    },
    theme: {
        extend: {
            colors: {
                'blue-500': '#3268F1',
            },
            fontFamily: {
                sans:
                    'Nunito sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
            height: {
                '6/10': '60%',
                '4/10': '40%',
            },
        },
    },
    variants: {},
    plugins: [],
}
