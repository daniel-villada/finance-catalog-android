module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@/env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.tsx",
            ".android.tsx",
            ".js",
            ".ts",
            ".tsx",
            ".json",
          ],
          alias: {
            "@/components": './components',
            "@/constants": './constants',
            "@/global-stores": './global-stores',
            "@/lib": './lib',
            "@/hooks": './hooks',
            "@/navigator": './navigator',
            "@/theme": './theme',
            "@/screens": './screens',
            "@/styles": './styles',
            "@/utils": './utils',
            "@/assets": './assets',
            "@/context": './context',
            "@/helpers": './helpers',
            "@native-base/icons": "@native-base/icons/lib",
          },
        },
      ],
    ]
  };
};
