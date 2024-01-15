export const useFlagsmithFlag = async (flagsmith: any, key: string) => {
  return flagsmith.getValue(key)
}