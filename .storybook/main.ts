import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../components/atoms/**/*.stories.tsx", 
            "../components/molecules/**/*.stories.tsx",
            "../components/organisms/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react-webpack5",
};

export default config;
