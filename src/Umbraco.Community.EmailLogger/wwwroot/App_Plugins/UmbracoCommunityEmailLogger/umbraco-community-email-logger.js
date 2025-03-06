const a = [
  {
    name: "Umbraco Community Email Logger Entrypoint",
    alias: "Umbraco.Community.EmailLogger.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-A6cli0Iz.js")
  }
], o = [
  {
    name: "Umbraco Community Email Logger Dashboard",
    alias: "Umbraco.Community.EmailLogger.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-CxPcqtl1.js"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], m = [
  ...a,
  ...o
];
export {
  m as manifests
};
//# sourceMappingURL=umbraco-community-email-logger.js.map
