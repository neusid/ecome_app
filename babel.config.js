module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/assets': './assets',
            '@/data': './src/data',
            '@/domain': './src/domain',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/features': './src/features',
            '@/hooks': './src/hooks',
            '@/stores': './src/stores',
          },
          extensions: ['.ios.ts', '.android.ts', '.web.ts', '.ts', '.ios.tsx', '.android.tsx', '.web.tsx', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
