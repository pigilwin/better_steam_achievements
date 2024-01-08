export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                width: 'width',
                height: 'height',
                bg: 'background-color',
            },
        },
    },
    plugins: [],
};