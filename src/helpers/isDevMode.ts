function isDevMode(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ISDEV === 'true' || false;
}

export default isDevMode;