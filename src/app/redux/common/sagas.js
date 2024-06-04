export function* safe(effect) {
  try {
    return { response: yield effect };
  } catch (error) {
    return { error };
  }
}
