import {
  provideFluentDesignSystem,
  fluentButton,
  fluentTab,
  fluentTabs,
  fluentTabPanel,
  fluentTextField,
  fluentSlider,
  fluentCheckbox,
} from "@fluentui/web-components";

export function initFluent() {
  provideFluentDesignSystem().register(
    fluentButton(),
    fluentTab(),
    fluentTabs(),
    fluentTabPanel(),
    fluentTextField(),
    fluentSlider(),
    fluentCheckbox()
  );
}
