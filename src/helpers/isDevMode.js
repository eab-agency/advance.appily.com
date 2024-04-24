function isDevMode() {
    return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ISDEV === 'true';
}

export default isDevMode;