export const sizeDecoration = size => {
  // const units = 'TGMK'
  return Math.round(size / 1000) + 'KB'
}
