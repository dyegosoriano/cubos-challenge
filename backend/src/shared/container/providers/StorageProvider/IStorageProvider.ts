export type ISaveInput = {
  type: 'photos' | 'videos'
  base64Data: string
  filename: string
}

export interface IStorageProvider {
  getUrl(input: { type: 'photos' | 'videos'; filename: string }): Promise<string>
  delete(input: { type: 'photos' | 'videos'; filename: string }): Promise<void>
  save(input: ISaveInput): Promise<string>
}
