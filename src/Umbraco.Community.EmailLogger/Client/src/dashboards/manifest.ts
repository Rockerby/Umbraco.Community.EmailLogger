export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Email Logger Dashboard",
    alias: "Umbraco.Community.EmailLogger.Dashboard",
    type: 'dashboard',
    js: () => import("./dashboard.element"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: 'Umb.Condition.SectionAlias',
        match: 'Umb.Section.Content',
      }
    ],
  }
];
