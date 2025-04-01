export function bytesToKb(bytes: number) {
  return Math.ceil(bytes / 1024)
}

export function kbToMb(kb: number) {
  return Math.ceil(kb / 1024)
}

export function bytesToMb(bytes: number) {
  return kbToMb(bytesToKb(bytes))
}
