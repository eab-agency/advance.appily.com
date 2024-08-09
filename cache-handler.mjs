import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache.js'
import path from 'path'

class CacheHandler extends FileSystemCache.default {
  constructor(ctx) {
    super(ctx)
  }

  getFilePath(pathname, kind) {
    if (kind === 'app') {
      return path.join(this.serverDistDir, 'pages', 'app', pathname)
    }

    return super.getFilePath(pathname, kind)
  }
}

export default CacheHandler