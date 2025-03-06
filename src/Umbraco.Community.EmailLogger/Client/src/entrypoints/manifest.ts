export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Email Logger Entrypoint",
    alias: "Umbraco.Community.EmailLogger.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
