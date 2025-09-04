export type ISaveInput = {
  type: 'photos' | 'videos'
  base64Data: string
  filename: string
}

export interface IStorageProvider {
  getUrl(input: ISaveInput): Promise<string>
  delete(input: ISaveInput): Promise<void>
  save(input: ISaveInput): Promise<string>
}
