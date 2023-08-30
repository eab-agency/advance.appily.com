function isDevMode() {
    return process.env.NODE_ENV === 'development';
}

export default isDevMode;
