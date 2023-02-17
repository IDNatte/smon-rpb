export function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatBytesRaw(bytes: number, decimals = 2): number {
  if (!+bytes) 0

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
}

export function formatToKB(bytes: number): number {
  return parseFloat((bytes / Math.pow(1024, 1)).toFixed(2))
}

export function formatToMB(bytes: number): number {
  return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2))
}