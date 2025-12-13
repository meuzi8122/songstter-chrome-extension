export class UnauthorizedSongstterError extends Error {
  constructor() {
    super("songstter authentication is failed");
    this.name = "UnauthorizedSongstterError";
  }
}
